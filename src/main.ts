import './style.css';
import { AudioManager } from './audio';
import { WebGLRenderer } from './renderer';
import { GameManager, type GameConfig } from './game';
import { LibraryManager } from './library';
import { SONGS } from './songs';
import { showCustomModal } from './modal';

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

  // Custom Modal close binder
  const elModal = document.getElementById('custom-modal');
  const elModalOk = document.getElementById('btn-modal-ok');
  if (elModalOk && elModal)
    elModalOk.addEventListener('click', () => elModal.classList.add('hidden'));
  
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
  const selectTtsVoice = document.getElementById('select-tts-voice') as HTMLSelectElement;
  const ttsVoiceContainer = document.getElementById('tts-voice-container') as HTMLElement;
  const selectTtsEngine = document.getElementById('select-tts-engine') as HTMLSelectElement;
  const ttsStatusText = document.getElementById('tts-status-text') as HTMLElement;

  const selectInstrument = document.getElementById('select-instrument') as HTMLSelectElement;
  const selectReverb = document.getElementById('select-reverb') as HTMLSelectElement;
  const toggleHumanize = document.getElementById('toggle-humanize') as HTMLInputElement;

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

  // Load and apply saved settings
  const LOCAL_STORAGE_KEY = 'guess-the-song-settings';
  
  interface AppSettings {
    playtime?: string;
    rounds?: string;
    decade?: string;
    genre?: string;
    style?: string;
    company?: string;
    franchise?: string;
    ttsEnabled?: boolean;
    hintsEnabled?: boolean;
    ttsEngine?: string;
    ttsVoice?: string;
    instrument?: string;
    reverb?: string;
    humanize?: boolean;
  }

  const loadSettings = (): AppSettings | null => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!stored) return null;
    try {
      return JSON.parse(stored) as AppSettings;
    } catch (err) {
      console.error('Failed to parse settings', err);
      return null;
    }
  };

  const saveSettings = (): void => {
    const settings: AppSettings = {
      playtime: selectPlaytime.value,
      rounds: selectRounds.value,
      decade: selectDecade.value,
      genre: selectGenre.value,
      style: selectStyle.value,
      company: selectCompany.value,
      franchise: selectFranchise.value,
      ttsEnabled: toggleTts.checked,
      hintsEnabled: toggleHints.checked,
      ttsEngine: selectTtsEngine.value,
      ttsVoice: selectTtsVoice.value,
      instrument: selectInstrument.value,
      reverb: selectReverb.value,
      humanize: toggleHumanize.checked
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(settings));
  };

  const savedSettings = loadSettings();
  if (savedSettings) {
    if (savedSettings.playtime !== undefined) selectPlaytime.value = savedSettings.playtime;
    if (savedSettings.rounds !== undefined) selectRounds.value = savedSettings.rounds;
    if (savedSettings.decade !== undefined) selectDecade.value = savedSettings.decade;
    if (savedSettings.genre !== undefined) selectGenre.value = savedSettings.genre;
    if (savedSettings.style !== undefined) selectStyle.value = savedSettings.style;
    if (savedSettings.company !== undefined) selectCompany.value = savedSettings.company;
    if (savedSettings.franchise !== undefined) selectFranchise.value = savedSettings.franchise;
    if (savedSettings.ttsEnabled !== undefined) toggleTts.checked = savedSettings.ttsEnabled;
    if (savedSettings.hintsEnabled !== undefined) toggleHints.checked = savedSettings.hintsEnabled;
    if (savedSettings.ttsEngine !== undefined) selectTtsEngine.value = savedSettings.ttsEngine;
    if (savedSettings.instrument !== undefined) selectInstrument.value = savedSettings.instrument;
    if (savedSettings.reverb !== undefined) selectReverb.value = savedSettings.reverb;
    if (savedSettings.humanize !== undefined) toggleHumanize.checked = savedSettings.humanize;
  }

  [
    selectPlaytime,
    selectRounds,
    selectDecade,
    selectGenre,
    selectStyle,
    selectCompany,
    selectFranchise,
    toggleTts,
    toggleHints,
    selectTtsEngine,
    selectTtsVoice,
    selectInstrument,
    selectReverb,
    toggleHumanize
  ].forEach(element => element.addEventListener('change', saveSettings));

  // Populate and bind TTS voice options
  const populateTtsVoices = (): void => {
    if (!selectTtsVoice) return;
    
    const engine = selectTtsEngine.value;
    audio.setTtsEngine(engine as 'local-native' | 'piper-wasm');

    if (engine === 'local-native') {
      const voices = window.speechSynthesis.getVoices();
      const englishVoices = voices.filter(voice => voice.lang.toLowerCase().startsWith('en'));
      
      selectTtsVoice.innerHTML = '';
      selectTtsVoice.disabled = false;
      
      const defaultOpt = document.createElement('option');
      defaultOpt.value = 'default';
      defaultOpt.textContent = 'Default (Auto-detect natural)';
      selectTtsVoice.appendChild(defaultOpt);

      englishVoices.forEach(voice => {
        const opt = document.createElement('option');
        opt.value = voice.name;
        opt.textContent = `${voice.name} (${voice.lang})`;
        selectTtsVoice.appendChild(opt);
      });
      
      selectTtsVoice.value = (savedSettings && savedSettings.ttsVoice && savedSettings.ttsEngine === 'local-native' && englishVoices.some(voice => voice.name === savedSettings.ttsVoice))
        ? savedSettings.ttsVoice
        : 'default';
      
      const val = selectTtsVoice.value;
      audio.setSelectedVoice(val === 'default' ? null : val);
    } else {
      selectTtsVoice.innerHTML = '<option value="">Loading AI Voices...</option>';
      selectTtsVoice.disabled = true;

      void (async () => {
        try {
          const tts = await import('@diffusionstudio/vits-web');
          const voicesList = await tts.voices();
          const englishVoices = voicesList.filter(v => v.language.code.startsWith('en'));
          
          selectTtsVoice.innerHTML = '';
          englishVoices.forEach(voice => {
            const opt = document.createElement('option');
            opt.value = voice.key;
            opt.textContent = `${voice.name} (${voice.quality})`;
            selectTtsVoice.appendChild(opt);
          });
          
          selectTtsVoice.disabled = false;
          
          const chosenVoice = (savedSettings && savedSettings.ttsVoice && savedSettings.ttsEngine === 'piper-wasm' && englishVoices.some(v => v.key === savedSettings.ttsVoice))
            ? savedSettings.ttsVoice
            : (englishVoices.length > 0 ? (englishVoices.find(v => v.key.includes('amy')) || englishVoices[0]).key : null);
          
          if (chosenVoice) {
            selectTtsVoice.value = chosenVoice;
            audio.setPiperVoiceId(chosenVoice);
          }
        } catch (err) {
          console.error('Failed to load Piper voices', err);
          selectTtsVoice.innerHTML = '<option value="">Failed to load AI voices</option>';
        }
      })();
    }
  };

  populateTtsVoices();
  if (typeof window.speechSynthesis !== 'undefined' && window.speechSynthesis.onvoiceschanged !== undefined)
    window.speechSynthesis.onvoiceschanged = populateTtsVoices;

  selectTtsEngine.addEventListener('change', () => {
    populateTtsVoices();
  });

  selectTtsVoice.addEventListener('change', () => {
    const val = selectTtsVoice.value;
    if (selectTtsEngine.value === 'local-native')
      audio.setSelectedVoice(val === 'default' ? null : val);
    else
      audio.setPiperVoiceId(val);
  });

  audio.setTtsStatusCallback((status: string) => {
    if (!ttsStatusText) return;
    if (status) {
      ttsStatusText.textContent = status;
      ttsStatusText.classList.remove('hidden');
    } else {
      ttsStatusText.textContent = '';
      ttsStatusText.classList.add('hidden');
    }
  });

  const updateTtsVoiceVisibility = (): void => {
    const isEnabled = toggleTts.checked;
    ttsVoiceContainer.classList.toggle('hidden', !isEnabled);
    const engineContainer = document.getElementById('tts-engine-container');
    if (engineContainer) 
      engineContainer.classList.toggle('hidden', !isEnabled);
    
    if (!isEnabled && ttsStatusText) {
      ttsStatusText.classList.add('hidden');
      ttsStatusText.textContent = '';
    }
  };
  
  toggleTts.addEventListener('change', updateTtsVoiceVisibility);
  updateTtsVoiceVisibility();

  // Instrument selection, Reverb levels, and Humanization bindings
  selectInstrument.addEventListener('change', () => {
    audio.setInstrument(selectInstrument.value);
  });
  
  selectReverb.addEventListener('change', () => {
    audio.setReverbLevel(selectReverb.value as any);
  });
  
  toggleHumanize.addEventListener('change', () => {
    audio.setHumanized(toggleHumanize.checked);
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

    const roundsNeeded = parseInt(selectRounds.value, 10);

    if (filtered.length < roundsNeeded) {
      elFilterStatus.textContent = `Warning: Only ${filtered.length} song${filtered.length === 1 ? '' : 's'} match${filtered.length === 1 ? 'es' : ''} (Need ${roundsNeeded})`;
      elFilterStatus.style.color = 'var(--neon-red)';
      elStartBtn.disabled = true;
      elStartBtn.style.opacity = '0.5';
      elStartBtn.style.pointerEvents = 'none';
    } else {
      elFilterStatus.textContent = `${filtered.length} songs match current filters`;
      elFilterStatus.style.color = 'var(--neon-blue)';
      elStartBtn.disabled = false;
      elStartBtn.style.opacity = '1.0';
      elStartBtn.style.pointerEvents = 'auto';
    }
  };

  [selectDecade, selectGenre, selectStyle, selectCompany, selectFranchise, selectRounds].forEach(select => {
    select.addEventListener('change', updateConfigMatchCount);
  });
  
  // Initial run to populate count
  updateConfigMatchCount();

  // Tab-switching logic for Switch-style settings dashboard
  const tabButtons = document.querySelectorAll('.settings-tabs-sidebar .tab-btn') as NodeListOf<HTMLButtonElement>;
  const tabPanels = document.querySelectorAll('.settings-tab-content .tab-panel') as NodeListOf<HTMLElement>;

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      tabButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const targetTab = btn.getAttribute('data-tab');
      tabPanels.forEach((panel) => {
        panel.classList.toggle('hidden', panel.id !== `tab-${targetTab}`);
      });
    });
  });
  
  // Wire up Start Game
  elStartBtn.addEventListener('click', () => {
    void (async () => {
      const originalText = elStartBtn.innerHTML;
      elStartBtn.disabled = true;
      elStartBtn.innerHTML = '<span>LOADING PIANO...</span>';
      
      try {
        await audio.init();
        audio.setInstrument(selectInstrument.value);
        audio.setReverbLevel(selectReverb.value as any);
        audio.setHumanized(toggleHumanize.checked);
        
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
        showCustomModal('Audio Error', 'Failed to load piano samples. Check your connection.');
      } finally {
        elStartBtn.disabled = false;
        elStartBtn.innerHTML = originalText;
      }
    })();
  });
  
  // Wire up View Music Library
  elLibraryBtn.addEventListener('click', () => {
    void (async () => {
      const originalText = elLibraryBtn.innerHTML;
      elLibraryBtn.disabled = true;
      elLibraryBtn.innerHTML = '<span>LOADING PIANO...</span>';
      
      try {
        await audio.init();
        audio.setInstrument(selectInstrument.value);
        audio.setReverbLevel(selectReverb.value as any);
        audio.setHumanized(toggleHumanize.checked);
        game.quitToMenu();
        
        elMenu.classList.add('hidden');
        elLibraryPanel.classList.remove('hidden');
        library.enter();
      } catch (err) {
        console.error(err);
        showCustomModal('Audio Error', 'Failed to load piano samples. Check your connection.');
      } finally {
        elLibraryBtn.disabled = false;
        elLibraryBtn.innerHTML = originalText;
      }
    })();
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
if (document.readyState === 'loading')
  document.addEventListener('DOMContentLoaded', initApp);
else
  initApp();
