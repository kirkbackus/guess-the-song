import * as Tone from 'tone';
import { Midi } from '@tonejs/midi';

export interface NoteEvent {
  midi: number;
  time: number;
  duration: number;
  name: string;
  velocity: number;
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

    return new Promise<void>((resolve, reject) => {
      this.sampler = new Tone.Sampler({
        urls: {
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
        },
        baseUrl: 'audio/salamander/',
        onload: () => {
          this.sampler?.connect(this.filterNode!);
          this.setInstrument(this.selectedInstrumentType);
          resolve();
        },
        onerror: (err) => {
          reject(err);
        }
      });
    });
  }

  // Set the current instrument
  setInstrument(type: string): void {
    this.selectedInstrumentType = type;
    
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

  // Speak the song title
  speakSongTitle(title: string): void {
    if (!this.ttsEnabled) return;
    
    // Stop any current native speech
    window.speechSynthesis.cancel();
    
    // Stop any active Piper audio playback
    if (this.activeAudioElement) {
      this.activeAudioElement.pause();
      this.activeAudioElement = null;
    }

    if (this.onTtsStatusCallback) 
      this.onTtsStatusCallback('');

    if (this.ttsEngine === 'local-native') {
      const utterance = new SpeechSynthesisUtterance(title);
      const voices = window.speechSynthesis.getVoices();
      
      if (this.selectedVoiceName) {
        const selectedVoice = voices.find(voice => voice.name === this.selectedVoiceName);
        if (selectedVoice) 
          utterance.voice = selectedVoice;
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
    } else {
      if (this.isMuted) return;

      void (async () => {
        try {
          if (this.onTtsStatusCallback) 
            this.onTtsStatusCallback('Synthesizing voice...');
          
          const tts = await import('@diffusionstudio/vits-web');
          const wav = await tts.predict(
            {
              text: title,
              voiceId: this.piperVoiceId as any
            },
            (progress) => {
              if (this.onTtsStatusCallback) {
                const percent = Math.round((progress.loaded * 100) / progress.total);
                this.onTtsStatusCallback(`Downloading voice model... ${percent}%`);
              }
            }
          );
          
          if (this.onTtsStatusCallback) 
            this.onTtsStatusCallback('');

          if (this.isMuted) return;

          const audioUrl = URL.createObjectURL(wav);
          const audioEl = new Audio(audioUrl);
          audioEl.volume = 1.0;
          this.activeAudioElement = audioEl;

          audioEl.addEventListener('ended', () => {
            URL.revokeObjectURL(audioUrl);
            if (this.activeAudioElement === audioEl) 
              this.activeAudioElement = null;
          });

          await audioEl.play();
        } catch (err) {
          console.error('Piper TTS error:', err);
          if (this.onTtsStatusCallback) 
            this.onTtsStatusCallback('TTS Error: failed to load voice.');
        }
      })();
    }
  }

  // Set visual callback for notes
  setNoteTriggerCallback(callback: (noteName: string, active: boolean) => void): void {
    this.onNoteTriggerCallback = callback;
  }

  // Load and parse MIDI
  async loadMidi(url: string): Promise<NoteEvent[]> {
    this.stop();
    this.clearScheduledEvents();

    const fetchUrl = (window.location.protocol === 'file:' && url.startsWith('/')) ? url.substring(1) : url;
    const response = await fetch(fetchUrl);
    const arrayBuffer = await response.arrayBuffer();
    this.activeMidi = new Midi(arrayBuffer);
    this.notes = [];

    // Flatten tracks and save events
    this.activeMidi.tracks.forEach((track) => {
      track.notes.forEach((note) => {
        this.notes.push({
          midi: note.midi,
          time: note.time,
          duration: note.duration,
          name: note.name,
          velocity: note.velocity
        });
      });
    });

    // Sort notes chronologically
    this.notes.sort((a, b) => a.time - b.time);

    // Reset volume node gain
    if (this.volumeNode) {
      this.volumeNode.gain.cancelScheduledValues(Tone.now());
      this.volumeNode.gain.value = this.isMuted ? 0 : 1.0;
    }

    // Schedule events in ToneJS
    this.notes.forEach((note) => {
      // Calculate random offsets for velocity and micro-timing if humanization is enabled
      const velocityOffset = this.isHumanized ? (Math.random() * 0.15 - 0.075) : 0;
      const finalVelocity = Math.max(0.1, Math.min(1.0, note.velocity + velocityOffset));

      const timeOffset = this.isHumanized ? (Math.random() * 0.010 - 0.005) : 0; // ±5ms offset
      const finalTime = Math.max(0, note.time + timeOffset);
      const finalDuration = Math.max(0.05, note.duration + (this.isHumanized ? (Math.random() * 0.01 - 0.005) : 0));

      const startId = Tone.Transport.schedule((time) => {
        if (!this.isMuted) 
          this.activeInstrument?.triggerAttack(note.name, time, finalVelocity);
        
        if (this.onNoteTriggerCallback) 
          this.onNoteTriggerCallback(note.name, true);
        
      }, finalTime);

      const endId = Tone.Transport.schedule((time) => {
        if (!this.isMuted) 
          this.activeInstrument?.triggerRelease(note.name, time);
        
        if (this.onNoteTriggerCallback) 
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
    
    // Stop TTS announcements as well
    window.speechSynthesis.cancel();
    if (this.activeAudioElement) {
      this.activeAudioElement.pause();
      this.activeAudioElement = null;
    }
    if (this.onTtsStatusCallback) 
      this.onTtsStatusCallback('');
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

  private clearScheduledEvents(): void {
    this.scheduledEvents.forEach((id) => Tone.Transport.clear(id));
    this.scheduledEvents = [];
  }
}
