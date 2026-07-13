import { type NoteEvent } from './audio';

// Octave mapping for standard 88-key piano (MIDI 21 to 108)
// C is 0, C# is 1, D is 2, D# is 3, E is 4, F is 5, F# is 6, G is 7, G# is 8, A is 9, A# is 10, B is 11
const OCTAVE_WHITE_INDICES = [0, 0, 1, 1, 2, 3, 3, 4, 4, 5, 5, 6];
const OCTAVE_IS_BLACK = [false, true, false, true, false, false, true, false, true, false, true, false];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: [number, number, number, number];
  life: number; // 0 to 1
  size: number;
}

export class WebGLRenderer {
  private gl: WebGLRenderingContext | null = null;
  private canvas: HTMLCanvasElement | null = null;
  private program: WebGLProgram | null = null;
  
  // Buffers
  private positionBuffer: WebGLBuffer | null = null;
  private colorBuffer: WebGLBuffer | null = null;
  private texCoordBuffer: WebGLBuffer | null = null;
  private rectSizeBuffer: WebGLBuffer | null = null;
  private typeBuffer: WebGLBuffer | null = null;

  // Shader locations
  private positionLoc: number = -1;
  private colorLoc: number = -1;
  private texCoordLoc: number = -1;
  private rectSizeLoc: number = -1;
  private typeLoc: number = -1;
  private resolutionLoc: WebGLUniformLocation | null = null;

  // Render variables
  private scrollSpeed: number = 180; // pixels per second
  private keyboardHeight: number = 130;
  private particles: Particle[] = [];
  private colorTheme: 'games' | 'pop' = 'games';

  // Float arrays for batch drawing
  private positions: number[] = [];
  private colors: number[] = [];
  private texCoords: number[] = [];
  private rectSizes: number[] = [];
  private types: number[] = [];

  constructor() {}

  init(canvas: HTMLCanvasElement): void {
    this.canvas = canvas;
    this.gl = canvas.getContext('webgl', { alpha: false, antialias: true });

    if (!this.gl) {
      console.error('WebGL not supported');
      return;
    }

    const gl = this.gl;

    // Enable alpha blending
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    // Create shaders
    const vsSource = `
      attribute vec2 a_position;
      attribute vec4 a_color;
      attribute vec2 a_texCoord;
      attribute vec2 a_rectSize;
      attribute float a_type;

      varying vec4 v_color;
      varying vec2 v_texCoord;
      varying vec2 v_rectSize;
      varying float v_type;

      uniform vec2 u_resolution;

      void main() {
        vec2 zeroToOne = a_position / u_resolution;
        vec2 zeroToTwo = zeroToOne * 2.0;
        vec2 clipSpace = zeroToTwo - vec2(1.0);
        gl_Position = vec4(clipSpace * vec2(1.0, -1.0), 0.0, 1.0);
        v_color = a_color;
        v_texCoord = a_texCoord;
        v_rectSize = a_rectSize;
        v_type = a_type;
      }
    `;

    const fsSource = `
      precision mediump float;
      varying vec4 v_color;
      varying vec2 v_texCoord;
      varying vec2 v_rectSize;
      varying float v_type;

      void main() {
        if (v_type < 0.5) {
          gl_FragColor = v_color;
          return;
        }

        // Rounded note capsule with neon glow (pixel-perfect)
        vec2 p = v_texCoord * v_rectSize;
        float r = min(6.0, min(v_rectSize.x, v_rectSize.y) * 0.5);

        vec2 d = abs(p - v_rectSize * 0.5) - (v_rectSize * 0.5 - vec2(r));
        float dist = length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;

        if (dist > 0.5) {
          discard;
        }

        float alpha = smoothstep(0.5, -0.5, dist);
        float edgeGlow = smoothstep(-3.5, -0.5, dist);
        
        vec3 neonColor = v_color.rgb * 2.0;
        vec3 bodyColor = v_color.rgb * 0.9;
        vec3 finalColor = mix(bodyColor, neonColor, edgeGlow);

        float whiteEdge = smoothstep(-1.2, -0.2, dist);
        finalColor = mix(finalColor, vec3(1.0), whiteEdge * 0.6);

        gl_FragColor = vec4(finalColor, v_color.a * alpha);
      }
    `;

    const vs = this.compileShader(gl.VERTEX_SHADER, vsSource);
    const fs = this.compileShader(gl.FRAGMENT_SHADER, fsSource);

    if (!vs || !fs) return;

    this.program = gl.createProgram();
    if (!this.program) return;

    gl.attachShader(this.program, vs);
    gl.attachShader(this.program, fs);
    gl.linkProgram(this.program);

    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
      console.error('Shader linking failed:', gl.getProgramInfoLog(this.program));
      return;
    }

    // Lookup attributes
    this.positionLoc = gl.getAttribLocation(this.program, 'a_position');
    this.colorLoc = gl.getAttribLocation(this.program, 'a_color');
    this.texCoordLoc = gl.getAttribLocation(this.program, 'a_texCoord');
    this.rectSizeLoc = gl.getAttribLocation(this.program, 'a_rectSize');
    this.typeLoc = gl.getAttribLocation(this.program, 'a_type');
    this.resolutionLoc = gl.getUniformLocation(this.program, 'u_resolution');

    // Create buffers
    this.positionBuffer = gl.createBuffer();
    this.colorBuffer = gl.createBuffer();
    this.texCoordBuffer = gl.createBuffer();
    this.rectSizeBuffer = gl.createBuffer();
    this.typeBuffer = gl.createBuffer();
  }

  setTheme(theme: 'games' | 'pop'): void {
    this.colorTheme = theme;
  }

  private compileShader(type: number, source: string): WebGLShader | null {
    if (!this.gl) return null;
    const shader = this.gl.createShader(type);
    if (!shader) return null;
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);

    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      console.error('Shader compilation error:', this.gl.getShaderInfoLog(shader));
      this.gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  // Map MIDI note number to piano key details
  private getKeyLayout(midi: number, canvasWidth: number): { x: number; width: number; isBlack: boolean } {
    const wWidth = canvasWidth / 52; // 52 white keys
    const noteInOctave = (midi - 12) % 12;
    const octave = Math.floor((midi - 12) / 12);
    
    const whiteKeyOffset = OCTAVE_WHITE_INDICES[noteInOctave];
    const whiteKeyIndex = octave * 7 + whiteKeyOffset - 5; // offset by 5 to align A0 as index 0
    const isBlack = OCTAVE_IS_BLACK[noteInOctave];

    const x = isBlack
      ? (whiteKeyIndex + 0.65) * wWidth
      : whiteKeyIndex * wWidth;
    
    const width = isBlack ? wWidth * 0.62 : wWidth;

    return { x, width, isBlack };
  }

  // Get color for a note based on its pitch and theme
  private getNoteColor(midi: number, isActive: boolean): [number, number, number, number] {
    const alpha = isActive ? 1.0 : 0.75;
    const t = (midi - 21) / 88;

    const isGames = this.colorTheme === 'games';
    const rStart = isGames ? 0.0 : 0.1;
    const rEnd = 1.0;
    const gStart = isGames ? 0.765 : 0.89;
    const gEnd = isGames ? 0.235 : 0.18;
    const bStart = isGames ? 0.89 : 0.35;
    const bEnd = isGames ? 0.314 : 0.58;

    const r = (1 - t) * rStart + t * rEnd;
    const g = (1 - t) * gStart + t * gEnd;
    const b = (1 - t) * bStart + t * bEnd;
    const mult = isActive ? 1.25 : 0.8;

    return [
      Math.min(1.0, r * mult),
      Math.min(1.0, g * mult),
      Math.min(1.0, b * mult),
      alpha
    ];
  }

  // Add rectangle to the batch rendering queues
  private pushRect(
    x: number,
    y: number,
    w: number,
    h: number,
    color: [number, number, number, number],
    type: number = 0
  ): void {
    // 2 triangles forming a quad
    // Top-Left, Top-Right, Bottom-Left, Bottom-Right
    const x1 = x;
    const x2 = x + w;
    const y1 = y;
    const y2 = y + h;

    this.positions.push(
      x1, y1,
      x2, y1,
      x1, y2,
      x1, y2,
      x2, y1,
      x2, y2
    );

    for (let i = 0; i < 6; i++) {
      this.colors.push(...color);
      this.rectSizes.push(w, h);
      this.types.push(type);
    }

    this.texCoords.push(
      0, 0,
      1, 0,
      0, 1,
      0, 1,
      1, 0,
      1, 1
    );
  }

  // Update particles
  private updateParticles(deltaTime: number): void {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx * deltaTime;
      p.y += p.vy * deltaTime;
      p.life -= deltaTime * 1.5; // lifespan of ~0.6s
      if (p.life <= 0) {
        this.particles.splice(i, 1);
      }
    }
  }

  // Trigger burst at hit points
  private spawnParticles(x: number, y: number, color: [number, number, number, number]): void {
    // Spawn 3-5 particles per key-hit event frame
    const count = 3 + Math.floor(Math.random() * 3);
    for (let i = 0; i < count; i++) {
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.0; // upwards spray
      const speed = 40 + Math.random() * 90;
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: [color[0], color[1], color[2], 0.8],
        life: 1.0,
        size: 2 + Math.random() * 5
      });
    }
  }

  // Clear buffers
  private clearBatch(): void {
    this.positions = [];
    this.colors = [];
    this.texCoords = [];
    this.rectSizes = [];
    this.types = [];
  }

  // Main Render Loop
  render(currentTime: number, notes: NoteEvent[], _revealed: boolean = false): void {
    if (!this.gl || !this.canvas || !this.program) return;
    const gl = this.gl;

    // Resize canvas if container size changed
    const rect = this.canvas.getBoundingClientRect();
    const displayWidth = Math.floor(rect.width * window.devicePixelRatio);
    const displayHeight = Math.floor(rect.height * window.devicePixelRatio);
    
    if (this.canvas.width !== displayWidth || this.canvas.height !== displayHeight) {
      this.canvas.width = displayWidth;
      this.canvas.height = displayHeight;
    }

    gl.viewport(0, 0, this.canvas.width, this.canvas.height);

    // Clear background to charcoal
    gl.clearColor(0.169, 0.169, 0.169, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    const wWidth = this.canvas.width / 52;
    const scrollAreaHeight = this.canvas.height - this.keyboardHeight;

    this.clearBatch();

    // 1. Gather active keys from notes currently crossing the line
    const activeKeys = new Set<number>();
    const deltaTime = 1 / 60; // Approximate, but we can compute exact eventually

    // Render grid tracks
    for (let i = 0; i < 52; i++) {
      const lineX = i * wWidth;
      // Draw super subtle grid lines
      this.pushRect(lineX, 0, 1.5, scrollAreaHeight, [0.18, 0.18, 0.18, 0.25]);
    }

    // 2. Add notes to the batch
    notes.forEach((note) => {
      // Check if note is on-screen
      const timeToHit = note.time - currentTime;
      const noteEndOffset = note.time + note.duration - currentTime;

      // Skip past notes
      if (noteEndOffset < 0) return;

      // Skip notes too far in the future
      if (timeToHit * this.scrollSpeed > scrollAreaHeight + 100) return;

      const layout = this.getKeyLayout(note.midi, this.canvas!.width);
      const isActive = currentTime >= note.time && currentTime <= note.time + note.duration;

      if (isActive) {
        activeKeys.add(note.midi);
        // Spawn active particles at the keyboard contact line
        const particleX = layout.x + layout.width / 2;
        this.spawnParticles(particleX, scrollAreaHeight, this.getNoteColor(note.midi, true));
      }

      // Calculate vertical positions
      let bottomY = scrollAreaHeight - timeToHit * this.scrollSpeed;
      let topY = scrollAreaHeight - noteEndOffset * this.scrollSpeed;

      // Pin the bottom of playing notes to the keyboard line
      if (isActive) {
        bottomY = scrollAreaHeight;
      }

      // Render capsule
      const rectHeight = bottomY - topY;
      if (rectHeight > 2) {
        // Note capsule styling
        const color = this.getNoteColor(note.midi, isActive);
        // If the title is not revealed yet, we hide the visual representation of notes OR we keep it to look cool
        // Keeping it looks very cool and helps children guess the speed/intervals. 
        this.pushRect(layout.x + 2, topY, layout.width - 4, rectHeight, color, 1.0);
      }
    });

    // 3. Update & render particles
    this.updateParticles(deltaTime);
    this.particles.forEach((p) => {
      const pColor: [number, number, number, number] = [p.color[0], p.color[1], p.color[2], p.color[3] * p.life];
      this.pushRect(p.x - p.size/2, p.y - p.size/2, p.size, p.size, pColor);
    });

    // 4. Render Keyboard at the bottom
    // We render white keys first, then black keys on top.
    
    // Render White Keys
    for (let midi = 21; midi <= 108; midi++) {
      const layout = this.getKeyLayout(midi, this.canvas.width);
      if (layout.isBlack) continue;

      const isActive = activeKeys.has(midi);
      
      // Default key colors
      let keyColor: [number, number, number, number] = [0.95, 0.95, 0.97, 1.0]; // off-white
      if (isActive) {
        // Glowing key highlight matching the note color
        const noteColor = this.getNoteColor(midi, true);
        keyColor = [noteColor[0], noteColor[1], noteColor[2], 1.0];
      }

      // Draw white key
      this.pushRect(layout.x + 1, scrollAreaHeight, layout.width - 2, this.keyboardHeight - 4, keyColor);

      // Subtle shadow/depth effect at the bottom of keys
      this.pushRect(layout.x + 1, this.canvas.height - 8, layout.width - 2, 4, isActive ? [1.0, 1.0, 1.0, 0.3] : [0.8, 0.8, 0.82, 1.0]);
    }

    // Render Black Keys
    for (let midi = 21; midi <= 108; midi++) {
      const layout = this.getKeyLayout(midi, this.canvas.width);
      if (!layout.isBlack) continue;

      const isActive = activeKeys.has(midi);
      
      let keyColor: [number, number, number, number] = [0.08, 0.08, 0.1, 1.0]; // black
      if (isActive) {
        const noteColor = this.getNoteColor(midi, true);
        keyColor = [noteColor[0], noteColor[1], noteColor[2], 1.0];
      }

      // Draw black key (shorter, sits on top)
      this.pushRect(layout.x, scrollAreaHeight, layout.width, this.keyboardHeight * 0.62, keyColor);
      
      // Key highlight outline
      this.pushRect(layout.x, scrollAreaHeight + this.keyboardHeight * 0.60, layout.width, 2, isActive ? [1, 1, 1, 0.5] : [0.2, 0.2, 0.24, 1.0]);
    }

    // 5. Draw active glowing overlay on the keys divider
    activeKeys.forEach((midi) => {
      const layout = this.getKeyLayout(midi, this.canvas!.width);
      const color = this.getNoteColor(midi, true);
      // Key connection line highlight
      this.pushRect(layout.x, scrollAreaHeight - 3, layout.width, 5, [color[0] * 1.5, color[1] * 1.5, color[2] * 1.5, 0.8]);
    });

    // Write to WebGL Buffers & Draw
    gl.useProgram(this.program);
    gl.uniform2f(this.resolutionLoc, this.canvas.width, this.canvas.height);

    // Bind Position
    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.positions), gl.DYNAMIC_DRAW);
    gl.enableVertexAttribArray(this.positionLoc);
    gl.vertexAttribPointer(this.positionLoc, 2, gl.FLOAT, false, 0, 0);

    // Bind Color
    gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.colors), gl.DYNAMIC_DRAW);
    gl.enableVertexAttribArray(this.colorLoc);
    gl.vertexAttribPointer(this.colorLoc, 4, gl.FLOAT, false, 0, 0);

    // Bind TexCoords
    gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.texCoords), gl.DYNAMIC_DRAW);
    gl.enableVertexAttribArray(this.texCoordLoc);
    gl.vertexAttribPointer(this.texCoordLoc, 2, gl.FLOAT, false, 0, 0);

    // Bind rectSizes
    gl.bindBuffer(gl.ARRAY_BUFFER, this.rectSizeBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.rectSizes), gl.DYNAMIC_DRAW);
    gl.enableVertexAttribArray(this.rectSizeLoc);
    gl.vertexAttribPointer(this.rectSizeLoc, 2, gl.FLOAT, false, 0, 0);

    // Bind types
    gl.bindBuffer(gl.ARRAY_BUFFER, this.typeBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.types), gl.DYNAMIC_DRAW);
    gl.enableVertexAttribArray(this.typeLoc);
    gl.vertexAttribPointer(this.typeLoc, 1, gl.FLOAT, false, 0, 0);

    // Draw Triangles
    gl.drawArrays(gl.TRIANGLES, 0, this.positions.length / 2);
  }
}
