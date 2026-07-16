import * as Tone from 'tone';
import { Midi } from '@tonejs/midi';
import { Capacitor } from '@capacitor/core';
import { TextToSpeech } from '@capacitor-community/text-to-speech';

export interface NoteEvent {
  midi: number;
  time: number;
  duration: number;
  name: string;
  velocity: number;
  instrument?: string;
}

export class AudioManager {
  private sampler: Tone.Sampler | null = null;
  private volumeNode: Tone.Gain | null = null;
  private activeMidi: Midi | null = null;
  private notes: NoteEvent[] = [];
  private scheduledEvents: number[] = [];
  private onNoteTriggerCallback: ((noteName: string, active: boolean) => void) | null = null;
  private isMuted: boolean = false;
  private ttsEnabled: boolean = true;
  private selectedVoiceName: string | null = null;
  private ttsEngine: 'local-native' | 'piper-wasm' = 'local-native';
  private piperVoiceId: string = 'en_US-amy-medium';
  private activeAudioElement: HTMLAudioElement | null = null;
  private onTtsStatusCallback: ((status: string) => void) | null = null;
  private preparedSpeechText: string | null = null;
  private preparedAudioUrl: string | null = null;
  private isPreparingSpeech: boolean = false;
  private speechPreparePromise: Promise<void> | null = null;
  private ttsWorker: Worker | null = null;
  private speechResolver: ((value: void) => void) | null = null;
  private speechRejecter: ((reason?: any) => void) | null = null;
  private disabledInstruments = new Set<string>();
  private grandPianoBuffers = new Map<string, AudioBuffer>();
  private trackInstruments = new Map<string, any>();

  // New audio/instrument custom properties
  private selectedInstrumentType: string = 'grand-piano';
  private activeInstrument: any = null;
  private rhodesSynth: Tone.PolySynth | null = null;
  private musicBoxSynth: Tone.PolySynth | null = null;
  private chiptuneSynth: Tone.PolySynth | null = null;

  // Effects nodes
  private reverbNode: Tone.Reverb | null = null;
  private filterNode: Tone.Filter | null = null;
  private chorusNode: Tone.Chorus | null = null;

  private isHumanized: boolean = true;

  constructor() {
    this.volumeNode = new Tone.Gain(1.0).toDestination();

    // Create effects nodes
    this.reverbNode = new Tone.Reverb({
      decay: 2.5,
      preDelay: 0.01,
      wet: 0.35 // Medium by default
    });

    this.filterNode = new Tone.Filter({
      frequency: 20000,
      type: 'lowpass'
    });

    this.chorusNode = new Tone.Chorus({
      frequency: 1.5,
      delayTime: 3.5,
      depth: 0.7,
      wet: 0.0 // Off by default (enabled for Rhodes)
    });

    // Connect DSP chain:
    // filterNode -> chorusNode -> reverbNode -> volumeNode
    this.filterNode.connect(this.chorusNode);
    this.chorusNode.connect(this.reverbNode);
    this.reverbNode.connect(this.volumeNode);
  }

  // Load ToneJS and sampler
  async init(): Promise<void> {
    await Tone.start();

    // Await reverb initialization
    if (this.reverbNode) 
      await this.reverbNode.ready;
    

    // Initialize Synths if they don't exist
    if (!this.rhodesSynth)
      this.rhodesSynth = new Tone.PolySynth(Tone.FMSynth, {
        harmonicity: 3,
        modulationIndex: 8,
        oscillator: {
          type: 'sine'
        },
        envelope: {
          attack: 0.001,
          decay: 1.5,
          sustain: 0.0,
          release: 1.2
        },
        modulation: {
          type: 'sine'
        },
        modulationEnvelope: {
          attack: 0.005,
          decay: 0.5,
          sustain: 0,
          release: 1.0
        }
      }).connect(this.filterNode!);

    if (!this.musicBoxSynth)
      this.musicBoxSynth = new Tone.PolySynth(Tone.Synth, {
        oscillator: {
          type: 'sine'
        },
        envelope: {
          attack: 0.002,
          decay: 0.8,
          sustain: 0.01,
          release: 0.8
        }
      }).connect(this.filterNode!);

    if (!this.chiptuneSynth)
      this.chiptuneSynth = new Tone.PolySynth(Tone.Synth, {
        oscillator: {
          type: 'square'
        },
        envelope: {
          attack: 0.001,
          decay: 0.1,
          sustain: 0.4,
          release: 0.1
        }
      }).connect(this.filterNode!);

    if (this.sampler) {
      this.setInstrument(this.selectedInstrumentType);
      return;
    }

    const sampleMap: Record<string, string> = {
      A0: 'A0.mp3',
      C1: 'C1.mp3',
      'D#1': 'Ds1.mp3',
      'F#1': 'Fs1.mp3',
      A1: 'A1.mp3',
      C2: 'C2.mp3',
      'D#2': 'Ds2.mp3',
      'F#2': 'Fs2.mp3',
      A2: 'A2.mp3',
      C3: 'C3.mp3',
      'D#3': 'Ds3.mp3',
      'F#3': 'Fs3.mp3',
      A3: 'A3.mp3',
      C4: 'C4.mp3',
      'D#4': 'Ds4.mp3',
      'F#4': 'Fs4.mp3',
      A4: 'A4.mp3',
      C5: 'C5.mp3',
      'D#5': 'Ds5.mp3',
      'F#5': 'Fs5.mp3',
      A5: 'A5.mp3',
      C6: 'C6.mp3',
      'D#6': 'Ds6.mp3',
      'F#6': 'Fs6.mp3',
      A6: 'A6.mp3',
      C7: 'C7.mp3',
      'D#7': 'Ds7.mp3',
      'F#7': 'Fs7.mp3',
      A7: 'A7.mp3',
      C8: 'C8.mp3'
    };

    const baseUrl = 'audio/salamander/';

    return new Promise<void>((resolve, reject) => {
      void (async () => {
        try {
          this.sampler = new Tone.Sampler().connect(this.filterNode!);
          
          const loadPromises = Object.entries(sampleMap).map(async ([note, file]) => {
            const response = await fetch(baseUrl + file);
            const arrayBuffer = await response.arrayBuffer();
            const audioBuffer = await Tone.context.decodeAudioData(arrayBuffer);
            this.sampler!.add(note as any, audioBuffer);
            this.grandPianoBuffers.set(note, audioBuffer);
          });
          
          await Promise.all(loadPromises);
          this.setInstrument(this.selectedInstrumentType);
          resolve();
        } catch (err) {
          reject(err);
        }
      })();
    });
  }

  // Set the current instrument
  setInstrument(type: string): void {
    this.selectedInstrumentType = type;
    
    if (this.trackInstruments.size > 0) {
      const activeKeys = Array.from(this.trackInstruments.keys());
      this.clearTrackInstruments();
      activeKeys.forEach((key) => {
        const instance = this.createInstrumentInstance();
        if (instance) 
          this.trackInstruments.set(key, instance);
      });
    }

    // Set up active instrument
    if (type === 'grand-piano' || type === 'ambient-piano') 
      this.activeInstrument = this.sampler;
    else if (type === 'electric-piano') 
      this.activeInstrument = this.rhodesSynth;
    else if (type === 'music-box') 
      this.activeInstrument = this.musicBoxSynth;
    else if (type === 'chiptune') 
      this.activeInstrument = this.chiptuneSynth;
    

    // Configure effects based on instrument type
    if (type === 'ambient-piano') {
      if (this.filterNode) 
        this.filterNode.frequency.value = 1000;
      if (this.chorusNode) 
        this.chorusNode.wet.value = 0;
    } else if (type === 'electric-piano') {
      if (this.filterNode) 
        this.filterNode.frequency.value = 8000;
      if (this.chorusNode) 
        this.chorusNode.wet.value = 0.5;
    } else if (type === 'music-box') {
      if (this.filterNode) 
        this.filterNode.frequency.value = 12000;
      if (this.chorusNode) 
        this.chorusNode.wet.value = 0.1;
    } else if (type === 'chiptune') {
      if (this.filterNode) 
        this.filterNode.frequency.value = 20000;
      if (this.chorusNode) 
        this.chorusNode.wet.value = 0;
    } else {
      if (this.filterNode) 
        this.filterNode.frequency.value = 20000;
      if (this.chorusNode) 
        this.chorusNode.wet.value = 0;
    }
  }

  // Set reverb decay and mix
  setReverbLevel(level: 'off' | 'low' | 'medium' | 'high'): void {
    if (!this.reverbNode) 
      return;
    
    switch (level) {
      case 'off':
        this.reverbNode.wet.value = 0;
        break;
      case 'low':
        this.reverbNode.wet.value = 0.15;
        this.reverbNode.decay = 1.5;
        break;
      case 'medium':
        this.reverbNode.wet.value = 0.35;
        this.reverbNode.decay = 2.5;
        break;
      case 'high':
        this.reverbNode.wet.value = 0.55;
        this.reverbNode.decay = 4.5;
        break;
    }
  }

  // Set whether note playback is humanized
  setHumanized(humanized: boolean): void {
    this.isHumanized = humanized;
  }

  // Set TTS configuration
  setTtsEnabled(enabled: boolean): void {
    this.ttsEnabled = enabled;
  }

  // Set TTS Engine
  setTtsEngine(engine: 'local-native' | 'piper-wasm'): void {
    this.ttsEngine = engine;
  }

  // Set the selected TTS voice by its name
  setSelectedVoice(voiceName: string | null): void {
    this.selectedVoiceName = voiceName;
  }

  // Set selected Piper voice ID
  setPiperVoiceId(voiceId: string): void {
    this.piperVoiceId = voiceId;
  }

  // Set TTS status callback to inform UI
  setTtsStatusCallback(callback: ((status: string) => void) | null): void {
    this.onTtsStatusCallback = callback;
  }

  // Speak the song title using native speech engine
  private speakNative(title: string): void {
    if (Capacitor.isNativePlatform()) {
      this.speakNativePlugin(title);
      return;
    }
    this.speakNativeBrowser(title);
  }

  private speakNativePlugin(title: string): void {
    let lang = 'en-US';
    const voices = window.speechSynthesis.getVoices();
    if (this.selectedVoiceName) {
      const selectedVoice = voices.find(voice => voice.name === this.selectedVoiceName);
      if (selectedVoice) lang = selectedVoice.lang;
    } else {
      const englishVoices = voices.filter(voice => voice.lang.toLowerCase().startsWith('en'));
      const naturalVoice = englishVoices.find(voice => 
        /google|natural|online|neural|microsoft aria|microsoft guy|microsoft jenny/i.test(voice.name)
      );
      const selected = naturalVoice || englishVoices[0];
      if (selected) lang = selected.lang;
    }
    void TextToSpeech.speak({
      text: title,
      lang,
      rate: 1.0,
      pitch: 1.0,
      volume: 1.0,
      category: 'ambient'
    });
  }

  private speakNativeBrowser(title: string): void {
    const utterance = new SpeechSynthesisUtterance(title);
    const voices = window.speechSynthesis.getVoices();
    
    if (this.selectedVoiceName) {
      const selectedVoice = voices.find(voice => voice.name === this.selectedVoiceName);
      if (selectedVoice) utterance.voice = selectedVoice;
    }

    if (!utterance.voice) {
      const englishVoices = voices.filter(voice => voice.lang.toLowerCase().startsWith('en'));
      const naturalVoice = englishVoices.find(voice => 
        /google|natural|online|neural|microsoft aria|microsoft guy|microsoft jenny/i.test(voice.name)
      );
      utterance.voice = naturalVoice || englishVoices[0] || null;
    }
    
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  }

  private getTtsWorker(): Worker {
    if (!this.ttsWorker) {
      this.ttsWorker = new Worker(new URL('./tts.worker.ts', import.meta.url), {
        type: 'module'
      });
      this.ttsWorker.onmessage = (e: MessageEvent) => this.handleWorkerMessage(e.data);
    }
    return this.ttsWorker;
  }

  private handleWorkerMessage(data: any): void {
    const { type, percent, wav, error } = data;

    if (type === 'progress') {
      if (this.onTtsStatusCallback) this.onTtsStatusCallback(`Downloading voice model... ${percent}%`);
      return;
    }

    if (type === 'success') {
      if (this.onTtsStatusCallback) this.onTtsStatusCallback('');
      if (wav) this.preparedAudioUrl = URL.createObjectURL(wav);
      this.isPreparingSpeech = false;
      if (this.speechResolver) {
        this.speechResolver();
        this.speechResolver = null;
        this.speechRejecter = null;
      }
      return;
    }

    if (type === 'error') {
      console.error('TTS Worker reported error:', error);
      if (this.onTtsStatusCallback) this.onTtsStatusCallback('TTS Error: failed to load voice.');
      this.isPreparingSpeech = false;
      if (this.speechRejecter) {
        this.speechRejecter(new Error(error));
        this.speechResolver = null;
        this.speechRejecter = null;
      }
    }
  }

  // Pre-synthesize speech announcements to reduce reveal latency
  prepareSpeech(title: string): Promise<void> {
    if (!this.ttsEnabled || this.ttsEngine !== 'piper-wasm' || this.isMuted) return Promise.resolve();
    if (this.preparedSpeechText === title) return Promise.resolve();

    this.clearPreparedSpeech();

    this.preparedSpeechText = title;
    this.isPreparingSpeech = true;

    this.speechPreparePromise = new Promise<void>((resolve, reject) => {
      this.speechResolver = resolve;
      this.speechRejecter = reject;

      try {
        const worker = this.getTtsWorker();
        worker.postMessage({
          type: 'synthesize',
          text: title,
          voiceId: this.piperVoiceId
        });
      } catch (err) {
        reject(err);
      }
    });

    return this.speechPreparePromise;
  }

  private clearPreparedSpeech(): void {
    if (this.preparedAudioUrl) {
      URL.revokeObjectURL(this.preparedAudioUrl);
      this.preparedAudioUrl = null;
    }
    this.preparedSpeechText = null;
    this.isPreparingSpeech = false;
    this.speechPreparePromise = null;
    this.speechResolver = null;
    this.speechRejecter = null;

    if (this.ttsWorker) {
      this.ttsWorker.terminate();
      this.ttsWorker = null;
    }
  }

  // Speak the song title
  speakSongTitle(title: string): void {
    if (!this.ttsEnabled) return;
    
    // Stop any current native speech
    window.speechSynthesis.cancel();
    if (Capacitor.isNativePlatform()) void TextToSpeech.stop();
    
    // Stop any active Piper audio playback
    if (this.activeAudioElement) {
      this.activeAudioElement.pause();
      this.activeAudioElement = null;
    }

    if (this.onTtsStatusCallback) this.onTtsStatusCallback('');

    if (this.ttsEngine === 'local-native') {
      this.speakNative(title);
      return;
    }

    if (this.isMuted) return;

    void (async () => {
      // 1. Check if we have a prepared speech URL or are currently preparing it
      if (this.preparedSpeechText === title) {
        if (this.isPreparingSpeech && this.speechPreparePromise)
          try {
            await this.speechPreparePromise;
          } catch (e) {
            console.error('Error awaiting prepared speech:', e);
          }
      } else
        // Fallback: prepare it now
        try {
          await this.prepareSpeech(title);
        } catch (e) {
          console.error('Fallback synthesis failed:', e);
        }

      // 2. Play the prepared audio if it is available now
      if (this.preparedSpeechText === title && this.preparedAudioUrl) {
        const audioUrl = this.preparedAudioUrl;
        // Clear preparation state to transfer ownership of the URL to the Audio element's ended callback
        this.preparedAudioUrl = null;
        this.preparedSpeechText = null;
        this.isPreparingSpeech = false;
        this.speechPreparePromise = null;

        try {
          const audioEl = new Audio(audioUrl);
          audioEl.volume = 1.0;
          this.activeAudioElement = audioEl;

          audioEl.addEventListener('ended', () => {
            URL.revokeObjectURL(audioUrl);
            if (this.activeAudioElement === audioEl) this.activeAudioElement = null;
          });

          await audioEl.play();
        } catch (playErr) {
          console.error('Failed to play prepared audio, falling back:', playErr);
          URL.revokeObjectURL(audioUrl);
        }
      }
    })();
  }

  // Set visual callback for notes
  setNoteTriggerCallback(callback: (noteName: string, active: boolean) => void): void {
    this.onNoteTriggerCallback = callback;
  }

  // Load and parse MIDI
  async loadMidi(url: string): Promise<NoteEvent[]> {
    this.stop();
    this.clearScheduledEvents();
    this.clearDisabledInstruments();
    this.clearTrackInstruments();

    const fetchUrl = url.startsWith('/') ? url.substring(1) : url;
    const response = await fetch(fetchUrl);
    const arrayBuffer = await response.arrayBuffer();
    this.activeMidi = new Midi(arrayBuffer);
    this.notes = [];

    // Flatten tracks and save events (skipping percussion)
    this.activeMidi.tracks.forEach((track) => {
      if (track.instrument.percussion || track.channel === 9) return;
      track.notes.forEach((note) => {
        this.notes.push({
          midi: note.midi,
          time: note.time + 1.0, // Shift notes forward by 1.0s to allow a 1-second preview lead-in
          duration: note.duration,
          name: note.name,
          velocity: note.velocity,
          instrument: track.instrument.name
        });
      });
    });

    // Sort notes chronologically
    this.notes.sort((a, b) => a.time - b.time);

    // Shorten notes of the same pitch that overlap or are consecutive
    // to prevent their release events from cutting off subsequent note attacks.
    const gap = 0.025;
    for (let i = 0; i < this.notes.length; i++) {
      const note = this.notes[i];
      const nextSamePitchNote = this.notes.slice(i + 1).find((n) => n.midi === note.midi);
      if (!nextSamePitchNote) continue;

      const endTime = note.time + note.duration;
      if (endTime > nextSamePitchNote.time - gap)
        note.duration = Math.max(0.05, nextSamePitchNote.time - note.time - gap);
    }

    // Reset volume node gain
    if (this.volumeNode) {
      this.volumeNode.gain.cancelScheduledValues(Tone.now());
      this.volumeNode.gain.value = this.isMuted ? 0 : 1.0;
    }

    // Schedule events in ToneJS
    this.notes.forEach((note) => {
      if (note.instrument && !this.trackInstruments.has(note.instrument)) {
        const instance = this.createInstrumentInstance();
        if (instance) 
          this.trackInstruments.set(note.instrument, instance);
      }
      const inst = note.instrument ? this.trackInstruments.get(note.instrument) : null;
      const targetInstrument = inst || this.activeInstrument;

      // Calculate random offsets for velocity and micro-timing if humanization is enabled
      const velocityOffset = this.isHumanized ? (Math.random() * 0.15 - 0.075) : 0;
      const finalVelocity = Math.max(0.1, Math.min(1.0, note.velocity + velocityOffset));

      const timeOffset = this.isHumanized ? (Math.random() * 0.010 - 0.005) : 0; // ±5ms offset
      const finalTime = Math.max(0, note.time + timeOffset);
      const finalDuration = Math.max(0.05, note.duration + (this.isHumanized ? (Math.random() * 0.01 - 0.005) : 0));

      const startId = Tone.Transport.schedule((time) => {
        if (Tone.Transport.state !== 'started') return;
        if (!this.isMuted && this.isInstrumentEnabled(note.instrument)) 
          targetInstrument?.triggerAttack(note.name, time, finalVelocity);
        
        if (this.onNoteTriggerCallback && this.isInstrumentEnabled(note.instrument)) 
          this.onNoteTriggerCallback(note.name, true);
        
      }, finalTime);

      const endId = Tone.Transport.schedule((time) => {
        if (Tone.Transport.state !== 'started') return;
        if (!this.isMuted && this.isInstrumentEnabled(note.instrument)) 
          targetInstrument?.triggerRelease(note.name, time);
        
        if (this.onNoteTriggerCallback && this.isInstrumentEnabled(note.instrument)) 
          this.onNoteTriggerCallback(note.name, false);
        
      }, finalTime + finalDuration);

      this.scheduledEvents.push(startId, endId);
    });

    return this.notes;
  }

  // Start playback
  start(): void {
    if (this.volumeNode) {
      this.volumeNode.gain.cancelScheduledValues(Tone.now());
      this.volumeNode.gain.value = this.isMuted ? 0 : 1.0;
    }
    Tone.Transport.start();
  }

  // Pause playback
  pause(): void {
    Tone.Transport.pause();
  }

  // Stop playback and reset
  stop(): void {
    Tone.Transport.stop();
    Tone.Transport.seconds = 0;
    
    // Release notes on all instruments to avoid hanging notes
    this.sampler?.releaseAll();
    this.rhodesSynth?.releaseAll();
    this.musicBoxSynth?.releaseAll();
    this.chiptuneSynth?.releaseAll();
    this.trackInstruments.forEach((inst) => {
      if (inst.releaseAll) 
        inst.releaseAll();
    });
    
    // Stop TTS announcements as well
    window.speechSynthesis.cancel();
    if (Capacitor.isNativePlatform()) void TextToSpeech.stop();
    if (this.activeAudioElement) {
      this.activeAudioElement.pause();
      this.activeAudioElement = null;
    }
    this.clearPreparedSpeech();
    if (this.onTtsStatusCallback) this.onTtsStatusCallback('');
  }

  // Fade out music
  fadeOut(durationSeconds: number): void {
    if (!this.volumeNode) return;
    const now = Tone.now();
    this.volumeNode.gain.cancelScheduledValues(now);
    this.volumeNode.gain.value = this.isMuted ? 0 : 1.0;
    this.volumeNode.gain.linearRampToValueAtTime(0, now + durationSeconds);
  }

  // Get current time
  getCurrentTime(): number {
    return Tone.Transport.seconds;
  }

  // Seek playback position
  seek(seconds: number): void {
    Tone.Transport.seconds = seconds;
    this.sampler?.releaseAll();
    this.rhodesSynth?.releaseAll();
    this.musicBoxSynth?.releaseAll();
    this.chiptuneSynth?.releaseAll();
  }


  // Get total song duration
  getDuration(): number {
    if (this.notes.length === 0) return 0;
    const lastNote = this.notes[this.notes.length - 1];
    return lastNote.time + lastNote.duration;
  }

  // Toggle Mute
  toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.volumeNode) 
      this.volumeNode.gain.setValueAtTime(this.isMuted ? 0 : 1.0, Tone.now());
    
    return this.isMuted;
  }

  getMuted(): boolean {
    return this.isMuted;
  }

  // Instrument filtering methods
  getAvailableInstruments(): string[] {
    if (!this.activeMidi) return [];
    const insts = new Set<string>();
    this.activeMidi.tracks.forEach((track) => {
      if (track.instrument.percussion || track.channel === 9) return;
      if (track.notes.length > 0) 
        insts.add(track.instrument.name);
    });
    return Array.from(insts);
  }

  setInstrumentEnabled(instrumentName: string, enabled: boolean): void {
    if (enabled) 
      this.disabledInstruments.delete(instrumentName);
    else 
      this.disabledInstruments.add(instrumentName);
  }

  isInstrumentEnabled(instrumentName?: string): boolean {
    return !instrumentName || !this.disabledInstruments.has(instrumentName);
  }

  clearDisabledInstruments(): void {
    this.disabledInstruments.clear();
  }

  private createInstrumentInstance(): any {
    const type = this.selectedInstrumentType;
    
    if (type === 'grand-piano' || type === 'ambient-piano') {
      const urlsMap: Record<string, AudioBuffer> = {};
      this.grandPianoBuffers.forEach((buffer, note) => {
        urlsMap[note] = buffer;
      });
      return new Tone.Sampler({
        urls: urlsMap
      }).connect(this.filterNode!);
    }
    
    if (type === 'electric-piano') 
      return new Tone.PolySynth(Tone.FMSynth, {
        harmonicity: 3,
        modulationIndex: 8,
        oscillator: { type: 'sine' },
        envelope: { attack: 0.001, decay: 1.5, sustain: 0.0, release: 1.2 },
        modulation: { type: 'sine' },
        modulationEnvelope: { attack: 0.005, decay: 0.5, sustain: 0, release: 1.0 }
      }).connect(this.filterNode!);
    

    if (type === 'music-box') 
      return new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: 'sine' },
        envelope: { attack: 0.002, decay: 0.8, sustain: 0.01, release: 0.8 }
      }).connect(this.filterNode!);
    

    if (type === 'chiptune') 
      return new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: 'square' },
        envelope: { attack: 0.001, decay: 0.1, sustain: 0.4, release: 0.1 }
      }).connect(this.filterNode!);
    

    return null;
  }

  private clearTrackInstruments(): void {
    this.trackInstruments.forEach((instr) => {
      instr.dispose();
    });
    this.trackInstruments.clear();
  }

  private clearScheduledEvents(): void {
    this.scheduledEvents.forEach((id) => Tone.Transport.clear(id));
    this.scheduledEvents = [];
  }
}
