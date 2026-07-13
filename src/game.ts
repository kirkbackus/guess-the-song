import { SONGS, type Song } from './songs';
import { AudioManager, type NoteEvent } from './audio';
import { WebGLRenderer } from './renderer';

export type GameState = 'MENU' | 'GET_READY' | 'PLAYING' | 'REVEALING' | 'SUMMARY';

export interface GameConfig {
  playTime: number;      // 10, 15, 20 seconds
  rounds: number;        // 5, 10, 20, 30, 50 rounds
  decade: string;
  genre: string;
  style: string;
  company: string;
  franchise: string;
  ttsEnabled: boolean;
  hintsEnabled: boolean;
}

export class GameManager {
  private state: GameState = 'MENU';
  private config: GameConfig = {
    playTime: 15,
    rounds: 5,
    decade: 'all',
    genre: 'all',
    style: 'all',
    company: 'all',
    franchise: 'all',
    ttsEnabled: true,
    hintsEnabled: true
  };

  private audio: AudioManager;
  private renderer: WebGLRenderer;
  
  // Game session lists
  private sessionSongs: Song[] = [];
  private currentSongIndex: number = 0;
  
  // Timers
  private timerIntervalId: number | null = null;

  // Active notes for rendering
  private currentNotes: NoteEvent[] = [];

  // DOM Elements
  private elMenu: HTMLElement | null = null;
  private elGame: HTMLElement | null = null;
  private elSummary: HTMLElement | null = null;
  private elTimer: HTMLElement | null = null;
  private elTimerProgress: HTMLElement | null = null;
  private elSongTitle: HTMLElement | null = null;
  private elSongArtist: HTMLElement | null = null;
  private elSongHint: HTMLElement | null = null;
  private elRoundInfo: HTMLElement | null = null;
  private elSkipBtn: HTMLElement | null = null;
  
  private animationFrameId: number | null = null;
  private getReadyStartTime: number | null = null;

  constructor(audio: AudioManager, renderer: WebGLRenderer) {
    this.audio = audio;
    this.renderer = renderer;
  }

  // Bind HTML elements to manager
  bindUI(elements: {
    menu: HTMLElement;
    game: HTMLElement;
    summary: HTMLElement;
    timer: HTMLElement;
    timerProgress: HTMLElement;
    songTitle: HTMLElement;
    songArtist: HTMLElement;
    songHint: HTMLElement;
    roundInfo: HTMLElement;
    ttsIndicator: HTMLElement;
    muteBtn: HTMLElement;
    skipBtn: HTMLElement;
  }): void {
    this.elMenu = elements.menu;
    this.elGame = elements.game;
    this.elSummary = elements.summary;
    this.elTimer = elements.timer;
    this.elTimerProgress = elements.timerProgress;
    this.elSongTitle = elements.songTitle;
    this.elSongArtist = elements.songArtist;
    this.elSongHint = elements.songHint;
    this.elRoundInfo = elements.roundInfo;
    this.elSkipBtn = elements.skipBtn;
  }

  // Setup game settings and start session
  async startNewGame(config: GameConfig): Promise<void> {
    this.config = config;
    this.currentSongIndex = 0;
    
    // Set renderer theme
    this.renderer.setTheme(config.genre === 'game' ? 'games' : 'pop');
    
    // Configure audio TTS
    this.audio.setTtsEnabled(config.ttsEnabled);

    // Filter song library
    let filtered = SONGS.filter((s) => {
      const matchDecade = config.decade === 'all' || s.decade === config.decade;
      const matchGenre = config.genre === 'all' || s.genre === config.genre;
      const matchStyle = config.style === 'all' || s.style === config.style;
      const matchCompany = config.company === 'all' || s.company === config.company;
      const matchFranchise = config.franchise === 'all' || s.franchise === config.franchise;
      return matchDecade && matchGenre && matchStyle && matchCompany && matchFranchise;
    });
    
    if (filtered.length === 0) {
      alert('No songs match the selected filters. Reverting to all songs.');
      filtered = SONGS;
    }

    // Build session playlist
    this.sessionSongs = [];
    const shuffledPool = [...filtered];
    
    // Simple shuffle
    const shuffleArray = (arr: any[]) => {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    };

    shuffleArray(shuffledPool);

    // Populate playlist to match requested rounds
    for (let i = 0; i < config.rounds; i++) {
      // Loop array if requested rounds is greater than pool size
      const poolIndex = i % shuffledPool.length;
      if (poolIndex === 0 && i > 0) {
        shuffleArray(shuffledPool);
      }
      this.sessionSongs.push(shuffledPool[poolIndex]);
    }

    // Move to Game screen
    this.changeState('GET_READY');
    await this.loadRound();
  }

  // Load MIDI data for current round
  private async loadRound(): Promise<void> {
    if (this.currentSongIndex >= this.sessionSongs.length) {
      this.changeState('SUMMARY');
      return;
    }

    const currentSong = this.sessionSongs[this.currentSongIndex];
    
    // Hide title reveal info
    if (this.elSongTitle) {
      this.elSongTitle.classList.remove('revealed');
      this.elSongTitle.textContent = '???';
    }
    if (this.elSongArtist) {
      this.elSongArtist.textContent = 'Press Reveal to see Artist';
      this.elSongArtist.classList.add('hidden');
    }
    if (this.elSongHint && this.elRoundInfo) {
      this.elSongHint.textContent = `Hint: ${currentSong.hint}`;
      this.elSongHint.classList.toggle('hidden', !this.config.hintsEnabled);
      this.elRoundInfo.textContent = `Song ${this.currentSongIndex + 1} of ${this.sessionSongs.length}`;
    }
    if (this.elSkipBtn) {
      this.elSkipBtn.textContent = 'Reveal Song';
      this.elSkipBtn.classList.remove('hidden');
    }

    // Load midi file
    try {
      this.currentNotes = await this.audio.loadMidi(currentSong.path);
    } catch (e) {
      console.error('Failed to load midi', e);
      // Skip on error
      this.currentSongIndex++;
      await this.loadRound();
      return;
    }

    // Ready Countdown (3s)
    this.runGetReady();
  }

  // Get Ready Screen Loop
  private runGetReady(): void {
    this.changeState('GET_READY');
    this.audio.stop();
    this.clearTimers();

    let countdown = 3;
    const elCountdownNumber = document.getElementById('countdown-number');
    if (elCountdownNumber) elCountdownNumber.textContent = countdown.toString();
    this.getReadyStartTime = performance.now();

    this.timerIntervalId = window.setInterval(() => {
      countdown--;
      if (countdown <= 0) {
        this.clearTimers();
        this.startPlaying();
      } else {
        if (elCountdownNumber) elCountdownNumber.textContent = countdown.toString();
        if (this.elTimer) {
          this.elTimer.textContent = countdown.toString();
          this.elTimer.style.transform = 'scale(1.2)';
          setTimeout(() => {
            if (this.elTimer) this.elTimer.style.transform = 'scale(1)';
          }, 200);
        }
      }
    }, 1000);
  }

  // Start active play state
  private startPlaying(): void {
    this.changeState('PLAYING');
    this.audio.start();
    this.clearTimers();

    let timeLeft = this.config.playTime;
    this.updateProgressTimer(timeLeft, this.config.playTime);

    this.timerIntervalId = window.setInterval(() => {
      timeLeft--;
      this.updateProgressTimer(timeLeft, this.config.playTime);

      if (timeLeft <= 0) {
        this.clearTimers();
        this.revealSong();
      }
    }, 1000);
  }

  // Action: Manual Skip or Reveal button click
  handleSkipOrNext(): void {
    if (this.state === 'PLAYING') {
      // Manual reveal
      this.clearTimers();
      this.revealSong();
    } else if (this.state === 'REVEALING') {
      // Force next round early (skip reveal playback)
      this.clearTimers();
      this.nextRound();
    }
  }

  // Reveal state
  private revealSong(): void {
    this.changeState('REVEALING');
    
    const currentSong = this.sessionSongs[this.currentSongIndex];

    // Reveal labels
    if (this.elSongTitle) {
      this.elSongTitle.textContent = currentSong.title;
      this.elSongTitle.classList.add('revealed');
    }
    if (this.elSongArtist) {
      this.elSongArtist.textContent = `by ${currentSong.artist}`;
      this.elSongArtist.classList.remove('hidden');
    }
    if (this.elSongHint) {
      this.elSongHint.classList.add('hidden');
    }
    if (this.elSkipBtn) {
      this.elSkipBtn.textContent = 'Next Song';
    }

    // Trigger Speech synthesis
    this.audio.speakSongTitle(currentSong.title);

    // Keep playing MIDI for an extra 7 seconds, then fade out and load next
    let revealTimeLeft = 7;
    if (this.elTimer) {
      this.elTimer.textContent = 'Revealed!';
    }
    if (this.elTimerProgress) {
      this.elTimerProgress.style.width = '100%';
    }

    this.timerIntervalId = window.setInterval(() => {
      revealTimeLeft--;

      // When 2 seconds remain, begin fading out the volume
      if (revealTimeLeft === 2) {
        this.audio.fadeOut(1.8);
      }

      if (revealTimeLeft <= 0) {
        this.clearTimers();
        this.nextRound();
      }
    }, 1000);
  }

  // Next round
  private nextRound(): void {
    this.audio.stop();
    this.currentSongIndex++;
    this.loadRound();
  }

  // Go back to main settings menu
  quitToMenu(): void {
    this.audio.stop();
    this.clearTimers();
    this.changeState('MENU');
  }

  // Handle CSS class switches for screens
  private changeState(newState: GameState): void {
    this.state = newState;
    
    // Toggle menu container
    if (newState === 'MENU') {
      this.elMenu?.classList.remove('hidden');
      this.elGame?.classList.add('hidden');
      this.elSummary?.classList.add('hidden');
      this.stopAnimationLoop();
    } 
    // Toggle active game container
    else if (newState === 'PLAYING' || newState === 'GET_READY' || newState === 'REVEALING') {
      this.elMenu?.classList.add('hidden');
      this.elGame?.classList.remove('hidden');
      this.elSummary?.classList.add('hidden');
      
      // Update screen highlights based on game state
      if (this.elGame) {
        this.elGame.className = 'screen-panel game-container ' + newState.toLowerCase().replace('_', '-');
      }
      
      this.startAnimationLoop();
    } 
    // Toggle summary screen
    else if (newState === 'SUMMARY') {
      this.elMenu?.classList.add('hidden');
      this.elGame?.classList.add('hidden');
      this.elSummary?.classList.remove('hidden');
      this.stopAnimationLoop();
    }
  }

  private updateProgressTimer(timeLeft: number, total: number): void {
    if (this.elTimer) {
      this.elTimer.textContent = `${timeLeft}s`;
    }
    if (this.elTimerProgress) {
      const pct = (timeLeft / total) * 100;
      this.elTimerProgress.style.width = `${pct}%`;
    }
  }

  private clearTimers(): void {
    if (this.timerIntervalId !== null) {
      clearInterval(this.timerIntervalId);
      this.timerIntervalId = null;
    }
    this.getReadyStartTime = null;
  }

  // Render Loop
  private startAnimationLoop(): void {
    if (this.animationFrameId !== null) return;
    const loop = (timestamp: number) => {
      this.renderFrame(timestamp);
      this.animationFrameId = requestAnimationFrame(loop);
    };
    this.animationFrameId = requestAnimationFrame(loop);
  }

  private stopAnimationLoop(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  private renderFrame(timestamp: number): void {
    let currentTime = 0;
    
    if (this.state === 'GET_READY' && this.getReadyStartTime !== null) {
      const elapsed = (timestamp - this.getReadyStartTime) / 1000;
      currentTime = -3.0 + elapsed;
      if (currentTime > 0) currentTime = 0;
    } else {
      currentTime = this.audio.getCurrentTime();
    }
    
    // Render WebGL
    this.renderer.render(currentTime, this.currentNotes);
  }
}
