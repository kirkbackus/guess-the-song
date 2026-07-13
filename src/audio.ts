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

  constructor() {
    this.volumeNode = new Tone.Gain(1.0).toDestination();
  }

  // Load ToneJS and sampler
  async init(): Promise<void> {
    if (this.sampler) return;

    await Tone.start();

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
          this.sampler?.connect(this.volumeNode!);
          resolve();
        },
        onerror: (err) => {
          reject(err);
        }
      });
    });
  }

  // Set TTS configuration
  setTtsEnabled(enabled: boolean): void {
    this.ttsEnabled = enabled;
  }

  // Speak the song title
  speakSongTitle(title: string): void {
    if (!this.ttsEnabled) return;
    
    // Stop any current speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(title);
    // Find a good voice if possible, or use default
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(voice => voice.lang.startsWith('en'));
    if (englishVoice) {
      utterance.voice = englishVoice;
    }
    
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  }

  // Set visual callback for notes
  setNoteTriggerCallback(callback: (noteName: string, active: boolean) => void): void {
    this.onNoteTriggerCallback = callback;
  }

  // Load and parse MIDI
  async loadMidi(url: string): Promise<NoteEvent[]> {
    this.stop();
    this.clearScheduledEvents();

    const response = await fetch(url);
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
      const startId = Tone.Transport.schedule((time) => {
        if (!this.isMuted) {
          this.sampler?.triggerAttack(note.name, time, note.velocity);
        }
        if (this.onNoteTriggerCallback) {
          this.onNoteTriggerCallback(note.name, true);
        }
      }, note.time);

      const endId = Tone.Transport.schedule((time) => {
        if (!this.isMuted) {
          this.sampler?.triggerRelease(note.name, time);
        }
        if (this.onNoteTriggerCallback) {
          this.onNoteTriggerCallback(note.name, false);
        }
      }, note.time + note.duration);

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
    this.sampler?.releaseAll();
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

  // Get total song duration
  getDuration(): number {
    if (this.notes.length === 0) return 0;
    const lastNote = this.notes[this.notes.length - 1];
    return lastNote.time + lastNote.duration;
  }

  // Toggle Mute
  toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.volumeNode) {
      this.volumeNode.gain.setValueAtTime(this.isMuted ? 0 : 1.0, Tone.now());
    }
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
