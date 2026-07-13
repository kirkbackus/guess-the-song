import { SONGS, type Song } from './songs';
import { AudioManager, type NoteEvent } from './audio';
import { WebGLRenderer } from './renderer';

export class LibraryManager {
  private audio: AudioManager;
  private renderer: WebGLRenderer;

  // DOM Elements
  private elMuteBtn: HTMLElement | null = null;
  private elMuteIcon: HTMLElement | null = null;
  
  private elSearchInput: HTMLInputElement | null = null;
  private elDecadeFilter: HTMLSelectElement | null = null;
  private elGenreFilter: HTMLSelectElement | null = null;
  private elSongList: HTMLElement | null = null;

  private elNowPlayingStatus: HTMLElement | null = null;
  private elPlayingTitle: HTMLElement | null = null;
  private elPlayingArtist: HTMLElement | null = null;

  private elPlayPauseBtn: HTMLElement | null = null;
  private elStopBtn: HTMLElement | null = null;
  private elCurrentTimeText: HTMLElement | null = null;
  private elProgressSlider: HTMLInputElement | null = null;
  private elTotalTimeText: HTMLElement | null = null;

  // State
  private filteredSongs: Song[] = [];
  private selectedSong: Song | null = null;
  private currentNotes: NoteEvent[] = [];
  private isPlaying: boolean = false;
  
  // Animation & timers
  private animationFrameId: number | null = null;
  private isUserSeeking: boolean = false;

  constructor(audio: AudioManager, renderer: WebGLRenderer) {
    this.audio = audio;
    this.renderer = renderer;
    this.filteredSongs = [...SONGS];
  }

  // Bind DOM Elements
  bindUI(elements: {
    muteBtn: HTMLElement;
    muteIcon: HTMLElement;
    searchInput: HTMLInputElement;
    decadeFilter: HTMLSelectElement;
    genreFilter: HTMLSelectElement;
    songList: HTMLElement;
    nowPlayingStatus: HTMLElement;
    playingTitle: HTMLElement;
    playingArtist: HTMLElement;
    playPauseBtn: HTMLElement;
    stopBtn: HTMLElement;
    currentTimeText: HTMLElement;
    progressSlider: HTMLInputElement;
    totalTimeText: HTMLElement;
  }): void {
    this.elMuteBtn = elements.muteBtn;
    this.elMuteIcon = elements.muteIcon;
    this.elSearchInput = elements.searchInput;
    this.elDecadeFilter = elements.decadeFilter;
    this.elGenreFilter = elements.genreFilter;
    this.elSongList = elements.songList;
    this.elNowPlayingStatus = elements.nowPlayingStatus;
    this.elPlayingTitle = elements.playingTitle;
    this.elPlayingArtist = elements.playingArtist;
    this.elPlayPauseBtn = elements.playPauseBtn;
    this.elStopBtn = elements.stopBtn;
    this.elCurrentTimeText = elements.currentTimeText;
    this.elProgressSlider = elements.progressSlider;
    this.elTotalTimeText = elements.totalTimeText;

    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    if (!this.elSearchInput || !this.elDecadeFilter || !this.elGenreFilter) return;

    this.elSearchInput.addEventListener('input', () => this.applyFilters());
    this.elDecadeFilter.addEventListener('change', () => this.applyFilters());
    this.elGenreFilter.addEventListener('change', () => this.applyFilters());

    if (this.elPlayPauseBtn) this.elPlayPauseBtn.addEventListener('click', () => this.togglePlayPause());
    if (this.elStopBtn) this.elStopBtn.addEventListener('click', () => this.stopPlayback());
    if (this.elMuteBtn) this.elMuteBtn.addEventListener('click', () => this.toggleMute());

    if (this.elProgressSlider) {
      this.elProgressSlider.addEventListener('input', () => {
        this.isUserSeeking = true;
        this.updateTimeDisplay();
      });
      this.elProgressSlider.addEventListener('change', () => {
        this.isUserSeeking = false;
        this.seekToSlider();
      });
    }
  }

  private applyFilters(): void {
    if (!this.elSearchInput || !this.elDecadeFilter || !this.elGenreFilter) return;

    const searchVal = this.elSearchInput.value.toLowerCase().trim();
    const decadeVal = this.elDecadeFilter.value;
    const genreVal = this.elGenreFilter.value;

    this.filteredSongs = SONGS.filter((s) => {
      const matchSearch = 
        s.title.toLowerCase().includes(searchVal) || 
        s.artist.toLowerCase().includes(searchVal) ||
        (s.game && s.game.toLowerCase().includes(searchVal)) ||
        (s.franchise && s.franchise.toLowerCase().includes(searchVal)) ||
        (s.company && s.company.toLowerCase().includes(searchVal)) ||
        s.style.toLowerCase().includes(searchVal);
      const matchDecade = decadeVal === 'all' || s.decade === decadeVal;
      const matchGenre = genreVal === 'all' || s.genre === genreVal;
      return matchSearch && matchDecade && matchGenre;
    });

    this.renderSongList();
  }

  private renderSongList(): void {
    if (!this.elSongList) return;
    this.elSongList.innerHTML = '';

    const elCount = document.getElementById('library-song-count');
    if (elCount) {
      elCount.textContent = `Showing ${this.filteredSongs.length} of ${SONGS.length} songs`;
    }

    if (this.filteredSongs.length === 0) {
      const emptyMsg = document.createElement('div');
      emptyMsg.className = 'help-text';
      emptyMsg.style.textAlign = 'center';
      emptyMsg.style.padding = '20px';
      emptyMsg.textContent = 'No matching songs found';
      this.elSongList.appendChild(emptyMsg);
      return;
    }

    this.filteredSongs.forEach((song) => {
      const item = document.createElement('div');
      const isActive = this.selectedSong?.id === song.id;
      item.className = isActive ? 'song-item active' : 'song-item';
      
      const info = document.createElement('div');
      info.className = 'song-info';

      const title = document.createElement('div');
      title.className = 'song-title';
      title.textContent = song.title;

      const artist = document.createElement('div');
      artist.className = 'song-artist';
      artist.textContent = song.artist;

      const meta = document.createElement('div');
      meta.className = 'song-meta';

      const decadeBadge = document.createElement('span');
      decadeBadge.className = 'meta-badge';
      decadeBadge.textContent = song.decade;
      meta.appendChild(decadeBadge);

      const yearBadge = document.createElement('span');
      yearBadge.className = 'meta-badge';
      yearBadge.textContent = String(song.year);
      meta.appendChild(yearBadge);

      const genreBadge = document.createElement('span');
      genreBadge.className = 'meta-badge';
      genreBadge.textContent = song.genre;
      meta.appendChild(genreBadge);

      const styleBadge = document.createElement('span');
      styleBadge.className = 'meta-badge';
      styleBadge.textContent = song.style;
      meta.appendChild(styleBadge);

      if (song.game) {
        const gameBadge = document.createElement('span');
        gameBadge.className = 'meta-badge';
        gameBadge.textContent = song.game;
        meta.appendChild(gameBadge);
      }

      if (song.company) {
        const companyBadge = document.createElement('span');
        companyBadge.className = 'meta-badge';
        companyBadge.textContent = song.company;
        meta.appendChild(companyBadge);
      }

      info.appendChild(title);
      info.appendChild(artist);
      info.appendChild(meta);

      const playBtn = document.createElement('button');
      playBtn.className = 'song-play-btn';
      playBtn.textContent = isActive && this.isPlaying ? '⏸' : '▶';

      item.appendChild(info);
      item.appendChild(playBtn);

      item.addEventListener('click', () => this.handleSongSelection(song));
      this.elSongList?.appendChild(item);
    });
  }

  private async handleSongSelection(song: Song): Promise<void> {
    if (this.selectedSong?.id === song.id) return this.togglePlayPause();

    this.selectedSong = song;
    this.isPlaying = false;
    this.currentNotes = [];

    this.updateNowPlayingUI('LOADING...');
    this.updatePlayerControlsState(true);
    this.renderer.setTheme(song.genre === 'game' ? 'games' : 'pop');

    try {
      this.currentNotes = await this.audio.loadMidi(song.path);
      this.audio.start();
      this.isPlaying = true;
      this.updateNowPlayingUI('PLAYING');
      this.startAnimationLoop();
    } catch (e) {
      console.error('Failed to load midi', e);
      this.updateNowPlayingUI('FAILED TO LOAD');
      this.updatePlayerControlsState(false);
    }

    this.renderSongList();
  }

  private updateNowPlayingUI(status: string): void {
    if (this.elNowPlayingStatus) this.elNowPlayingStatus.textContent = status;
    if (this.elPlayingTitle) this.elPlayingTitle.textContent = this.selectedSong ? this.selectedSong.title : '';
    if (this.elPlayingArtist) this.elPlayingArtist.textContent = this.selectedSong ? `by ${this.selectedSong.artist}` : '';
  }

  private updatePlayerControlsState(active: boolean): void {
    if (this.elPlayPauseBtn) {
      const btn = this.elPlayPauseBtn as HTMLButtonElement;
      btn.disabled = !active;
      btn.textContent = this.isPlaying ? '⏸' : '▶';
    }
    if (this.elStopBtn) (this.elStopBtn as HTMLButtonElement).disabled = !active;
    if (this.elProgressSlider) (this.elProgressSlider as HTMLInputElement).disabled = !active;
  }

  private togglePlayPause(): void {
    if (!this.selectedSong) return;

    if (this.isPlaying) {
      this.audio.pause();
      this.isPlaying = false;
      this.updateNowPlayingUI('PAUSED');
      this.stopAnimationLoop();
      if (this.elPlayPauseBtn) this.elPlayPauseBtn.textContent = '▶';
      this.renderSongList();
      return;
    }

    this.audio.start();
    this.isPlaying = true;
    this.updateNowPlayingUI('PLAYING');
    this.startAnimationLoop();
    if (this.elPlayPauseBtn) this.elPlayPauseBtn.textContent = '⏸';
    this.renderSongList();
  }

  stopPlayback(): void {
    this.audio.stop();
    this.isPlaying = false;
    this.updateNowPlayingUI('STOPPED');
    this.stopAnimationLoop();
    this.updatePlayerControlsState(false);
    
    if (this.elPlayPauseBtn) this.elPlayPauseBtn.textContent = '▶';
    if (this.elProgressSlider) (this.elProgressSlider as HTMLInputElement).value = '0';
    if (this.elCurrentTimeText) this.elCurrentTimeText.textContent = '0:00';
    
    this.renderer.render(0, []);
    this.renderSongList();
  }

  private toggleMute(): void {
    const isMuted = this.audio.toggleMute();
    if (this.elMuteIcon) this.elMuteIcon.textContent = isMuted ? '🔇' : '🔊';
    if (this.elMuteBtn) this.elMuteBtn.title = isMuted ? 'Unmute Sound' : 'Mute Sound';
  }

  syncMuteState(): void {
    const isMuted = this.audio.getMuted();
    if (this.elMuteIcon) this.elMuteIcon.textContent = isMuted ? '🔇' : '🔊';
    if (this.elMuteBtn) this.elMuteBtn.title = isMuted ? 'Unmute Sound' : 'Mute Sound';
  }

  private updateTimeDisplay(): void {
    if (!this.elCurrentTimeText || !this.elTotalTimeText || !this.elProgressSlider) return;

    const duration = this.audio.getDuration();
    if (duration <= 0) return;

    const current = this.isUserSeeking 
      ? (parseFloat(this.elProgressSlider.value) / 100) * duration 
      : this.audio.getCurrentTime();

    this.elCurrentTimeText.textContent = this.formatTime(current);
    this.elTotalTimeText.textContent = this.formatTime(duration);

    if (!this.isUserSeeking) {
      const percent = (current / duration) * 100;
      this.elProgressSlider.value = percent.toString();
    }
  }

  private seekToSlider(): void {
    if (!this.elProgressSlider) return;
    const duration = this.audio.getDuration();
    if (duration <= 0) return;

    const percent = parseFloat(this.elProgressSlider.value);
    const targetSeconds = (percent / 100) * duration;
    this.audio.seek(targetSeconds);
    this.updateTimeDisplay();
  }

  private formatTime(secs: number): string {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  enter(): void {
    this.filteredSongs = [...SONGS];
    this.selectedSong = null;
    this.currentNotes = [];
    this.isPlaying = false;
    
    if (this.elSearchInput) this.elSearchInput.value = '';
    if (this.elDecadeFilter) this.elDecadeFilter.value = 'all';
    if (this.elGenreFilter) this.elGenreFilter.value = 'all';

    this.updateNowPlayingUI('Select a song to play');
    this.updatePlayerControlsState(false);
    this.syncMuteState();
    this.renderSongList();

    this.renderer.render(0, []);
  }

  exit(): void {
    this.stopPlayback();
  }

  private startAnimationLoop(): void {
    if (this.animationFrameId !== null) return;
    const loop = () => {
      this.renderFrame();
      this.animationFrameId = requestAnimationFrame(loop);
    };
    this.animationFrameId = requestAnimationFrame(loop);
  }

  private stopAnimationLoop(): void {
    if (this.animationFrameId === null) return;
    cancelAnimationFrame(this.animationFrameId);
    this.animationFrameId = null;
  }

  private renderFrame(): void {
    const current = this.audio.getCurrentTime();
    const duration = this.audio.getDuration();

    if (this.isPlaying && current >= duration && duration > 0) {
      this.stopPlayback();
      return;
    }

    this.renderer.render(current, this.currentNotes);
    this.updateTimeDisplay();
  }
}
