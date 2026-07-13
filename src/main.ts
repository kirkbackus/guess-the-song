import './style.css';
import { AudioManager } from './audio';
import { WebGLRenderer } from './renderer';
import { GameManager, type GameConfig } from './game';

const initApp = (): void => {
  const canvas = document.getElementById('piano-roll-canvas') as HTMLCanvasElement;
  if (!canvas) return;

  const audio = new AudioManager();
  const renderer = new WebGLRenderer();
  
  renderer.init(canvas);
  const game = new GameManager(audio, renderer);
  
  // Grab DOM Elements
  const elMenu = document.getElementById('menu-panel')!;
  const elGame = document.getElementById('game-panel')!;
  const elSummary = document.getElementById('summary-panel')!;
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
  
  const selectPlaytime = document.getElementById('select-playtime') as HTMLSelectElement;
  const selectRounds = document.getElementById('select-rounds') as HTMLSelectElement;
  const selectDecade = document.getElementById('select-decade') as HTMLSelectElement;
  const selectGenre = document.getElementById('select-genre') as HTMLSelectElement;
  const toggleTts = document.getElementById('toggle-tts') as HTMLInputElement;
  const toggleHints = document.getElementById('toggle-hints') as HTMLInputElement;

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
        ttsEnabled: toggleTts.checked,
        hintsEnabled: toggleHints.checked
      };
      
      await game.startNewGame(config);
    } catch (err) {
      console.error(err);
      alert('Failed to load piano samples. Check your connection.');
    } finally {
      elStartBtn.disabled = false;
      elStartBtn.innerHTML = originalText;
    }
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
