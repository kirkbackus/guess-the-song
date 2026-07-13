import './style.css';
import { AudioManager } from './audio';
import { WebGLRenderer } from './renderer';
import { GameManager, type GameConfig } from './game';
import { LibraryManager } from './library';
import { SONGS } from './songs';

const initApp = (): void => {
  const canvas = document.getElementById('piano-roll-canvas') as HTMLCanvasElement;
  const libraryCanvas = document.getElementById('library-piano-roll-canvas') as HTMLCanvasElement;
  if (!canvas || !libraryCanvas) return;

  const audio = new AudioManager();
  const renderer = new WebGLRenderer();
  const libraryRenderer = new WebGLRenderer();
  
  renderer.init(canvas);
  libraryRenderer.init(libraryCanvas);
  
  const game = new GameManager(audio, renderer);
  const library = new LibraryManager(audio, libraryRenderer);
  
  // Grab DOM Elements
  const elMenu = document.getElementById('menu-panel')!;
  const elGame = document.getElementById('game-panel')!;
  const elSummary = document.getElementById('summary-panel')!;
  const elLibraryPanel = document.getElementById('library-panel')!;
  const elTimer = document.getElementById('timer-text')!;
  const elTimerProgress = document.getElementById('timer-progress-bar')!;
  const elSongTitle = document.getElementById('reveal-title')!;
  const elSongArtist = document.getElementById('reveal-artist')!;
  const elSongHint = document.getElementById('hint-box')!;
  const elRoundInfo = document.getElementById('round-info')!;
  const elSkipBtn = document.getElementById('btn-skip')!;
  
  const elStartBtn = document.getElementById('btn-start') as HTMLButtonElement;
  const elQuitBtn = document.getElementById('btn-quit') as HTMLButtonElement;
  const elMuteBtn = document.getElementById('btn-mute') as HTMLButtonElement;
  const elMuteIcon = document.getElementById('mute-icon')!;
  const elRestartBtn = document.getElementById('btn-restart') as HTMLButtonElement;
  
  const elLibraryBtn = document.getElementById('btn-library') as HTMLButtonElement;
  const elLibraryBackBtn = document.getElementById('btn-library-back') as HTMLButtonElement;
  const elLibraryMuteBtn = document.getElementById('btn-library-mute') as HTMLButtonElement;
  const elLibraryMuteIcon = document.getElementById('library-mute-icon')!;
  
  const selectPlaytime = document.getElementById('select-playtime') as HTMLSelectElement;
  const selectRounds = document.getElementById('select-rounds') as HTMLSelectElement;
  const selectDecade = document.getElementById('select-decade') as HTMLSelectElement;
  const selectGenre = document.getElementById('select-genre') as HTMLSelectElement;
  const selectStyle = document.getElementById('select-style') as HTMLSelectElement;
  const selectCompany = document.getElementById('select-company') as HTMLSelectElement;
  const selectFranchise = document.getElementById('select-franchise') as HTMLSelectElement;
  const toggleTts = document.getElementById('toggle-tts') as HTMLInputElement;
  const toggleHints = document.getElementById('toggle-hints') as HTMLInputElement;

  // Dynamically populate Styles, Companies and Franchises in settings
  const styles = new Set<string>();
  const companies = new Set<string>();
  const franchises = new Set<string>();

  SONGS.forEach(s => {
    if (s.style) styles.add(s.style);
    if (s.company) companies.add(s.company);
    if (s.franchise) franchises.add(s.franchise);
  });

  Array.from(styles).sort().forEach(style => {
    const opt = document.createElement('option');
    opt.value = style;
    opt.textContent = style;
    selectStyle.appendChild(opt);
  });

  Array.from(companies).sort().forEach(company => {
    const opt = document.createElement('option');
    opt.value = company;
    opt.textContent = company;
    selectCompany.appendChild(opt);
  });

  Array.from(franchises).sort().forEach(franchise => {
    const opt = document.createElement('option');
    opt.value = franchise;
    opt.textContent = franchise;
    selectFranchise.appendChild(opt);
  });

  // Bind UI to Game Manager
  game.bindUI({
    menu: elMenu,
    game: elGame,
    summary: elSummary,
    timer: elTimer,
    timerProgress: elTimerProgress,
    songTitle: elSongTitle,
    songArtist: elSongArtist,
    songHint: elSongHint,
    roundInfo: elRoundInfo,
    ttsIndicator: document.createElement('div'), // Dummy element
    muteBtn: elMuteBtn,
    skipBtn: elSkipBtn
  });

  // Bind UI to Library Manager
  library.bindUI({
    muteBtn: elLibraryMuteBtn,
    muteIcon: elLibraryMuteIcon,
    searchInput: document.getElementById('library-search') as HTMLInputElement,
    decadeFilter: document.getElementById('library-filter-decade') as HTMLSelectElement,
    genreFilter: document.getElementById('library-filter-genre') as HTMLSelectElement,
    songList: document.getElementById('library-song-list')!,
    nowPlayingStatus: document.querySelector('#library-now-playing .now-playing-status') as HTMLElement,
    playingTitle: document.getElementById('library-playing-title')!,
    playingArtist: document.getElementById('library-playing-artist')!,
    playPauseBtn: document.getElementById('btn-library-play-pause')!,
    stopBtn: document.getElementById('btn-library-stop')!,
    currentTimeText: document.getElementById('library-current-time')!,
    progressSlider: document.getElementById('library-progress-slider') as HTMLInputElement,
    totalTimeText: document.getElementById('library-total-time')!
  });

  // Dynamic filter match count updater
  const updateConfigMatchCount = (): void => {
    const elFilterStatus = document.getElementById('game-filter-status');
    if (!elFilterStatus) return;

    const filtered = SONGS.filter((s) => {
      const matchDecade = selectDecade.value === 'all' || s.decade === selectDecade.value;
      const matchGenre = selectGenre.value === 'all' || s.genre === selectGenre.value;
      const matchStyle = selectStyle.value === 'all' || s.style === selectStyle.value;
      const matchCompany = selectCompany.value === 'all' || s.company === selectCompany.value;
      const matchFranchise = selectFranchise.value === 'all' || s.franchise === selectFranchise.value;
      return matchDecade && matchGenre && matchStyle && matchCompany && matchFranchise;
    });

    elFilterStatus.textContent = `${filtered.length} songs match current filters`;
  };

  [selectDecade, selectGenre, selectStyle, selectCompany, selectFranchise].forEach(select => {
    select.addEventListener('change', updateConfigMatchCount);
  });
  
  // Initial run to populate count
  updateConfigMatchCount();
  
  // Wire up Start Game
  elStartBtn.addEventListener('click', async () => {
    const originalText = elStartBtn.innerHTML;
    elStartBtn.disabled = true;
    elStartBtn.innerHTML = '<span>LOADING PIANO...</span>';
    
    try {
      await audio.init();
      
      const config: GameConfig = {
        playTime: parseInt(selectPlaytime.value, 10),
        rounds: parseInt(selectRounds.value, 10),
        decade: selectDecade.value,
        genre: selectGenre.value,
        style: selectStyle.value,
        company: selectCompany.value,
        franchise: selectFranchise.value,
        ttsEnabled: toggleTts.checked,
        hintsEnabled: toggleHints.checked
      };
      
      const isMuted = audio.getMuted();
      elMuteIcon.textContent = isMuted ? '🔇' : '🔊';
      elMuteBtn.title = isMuted ? 'Unmute Sound' : 'Mute Sound';

      await game.startNewGame(config);
    } catch (err) {
      console.error(err);
      alert('Failed to load piano samples. Check your connection.');
    } finally {
      elStartBtn.disabled = false;
      elStartBtn.innerHTML = originalText;
    }
  });
  
  // Wire up View Music Library
  elLibraryBtn.addEventListener('click', async () => {
    const originalText = elLibraryBtn.innerHTML;
    elLibraryBtn.disabled = true;
    elLibraryBtn.innerHTML = '<span>LOADING PIANO...</span>';
    
    try {
      await audio.init();
      game.quitToMenu();
      
      elMenu.classList.add('hidden');
      elLibraryPanel.classList.remove('hidden');
      library.enter();
    } catch (err) {
      console.error(err);
      alert('Failed to load piano samples. Check your connection.');
    } finally {
      elLibraryBtn.disabled = false;
      elLibraryBtn.innerHTML = originalText;
    }
  });

  // Quit Library to Menu
  elLibraryBackBtn.addEventListener('click', () => {
    library.exit();
    elLibraryPanel.classList.add('hidden');
    elMenu.classList.remove('hidden');
    
    const isMuted = audio.getMuted();
    elMuteIcon.textContent = isMuted ? '🔇' : '🔊';
    elMuteBtn.title = isMuted ? 'Unmute Sound' : 'Mute Sound';
  });

  // Quit Game
  elQuitBtn.addEventListener('click', () => game.quitToMenu());
  
  // Skip / Reveal / Next Song
  elSkipBtn.addEventListener('click', () => game.handleSkipOrNext());
  
  // Mute / Unmute Toggle
  elMuteBtn.addEventListener('click', () => {
    const isMuted = audio.toggleMute();
    elMuteIcon.textContent = isMuted ? '🔇' : '🔊';
    elMuteBtn.title = isMuted ? 'Unmute Sound' : 'Mute Sound';
  });
  
  // Play Again Restart
  elRestartBtn.addEventListener('click', () => game.quitToMenu());
};

// Execute initialization
document.readyState === 'loading'
  ? document.addEventListener('DOMContentLoaded', initApp)
  : initApp();
