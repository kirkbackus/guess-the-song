import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { metadataDictionary } from './metadata_dictionary.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const songsFile = path.join(__dirname, '../src/songs.ts');

const gameKeywords = [
  'mario', 'zelda', 'pokemon', 'pok%e9mon', 'sonic', 'halo', 'skyrim', 'undertale', 'portal', 'wii', 'minecraft', 
  'tetris', 'korobeiniki', 'metroid', 'castlevania', 'final fantasy', 'chrono', 'megaman', 'mega man', 'pacman', 'pac-man', 'doom', 
  'street fighter', 'kirby', 'donkey kong', 'smash bros', 'super smash', 'hollow knight', 'spyro', 'crash bandicoot',
  'wind waker', 'ocarina', 'deltarune', 'sans', 'megalovania', 'roblox', 'geometry dash', 'among us',
  'luigi', 'yoshi', 'star fox', 'splatoon', 'animal crossing', 'fire emblem', 'kingdom hearts', 'persona', 'yakuza', 'baka mitai', 'dame da ne',
  'touhou', 'cuphead', 'brawl', 'genshin', 'nier', 'warcraft', 'starcraft', 'diablo', 'overwatch', 'fallout',
  'cyberpunk', 'witcher', 'banjo', 'papyrus', 'kass', 'kk slider', 'k.k.', 'earthbound', 'mother 3',
  'civilization', 'gta', 'grand theft auto', 'red dead', 'rdr', 'clash royale', 'clash of clans', 'angry birds',
  'plants vs zombies', 'pvz', 'terraria', 'stardew', 'resident evil', 'silent hill', 'tomb raider', 'uncharted',
  'god of war', 'devil may cry', 'assassin', 'skyward', 'majora', 'twilight princess', 'breath of the wild',
  'tears of the kingdom', 'mii', 'valheim', 'doors', 'bad apple', 'fortnite', 'league of legends', 'undertale yellow',
  'last breath', 'castle crashers', 'geometrydash', 'robloxdoors', 'subnautica', 'outer wilds', 'celeste', 'shovel knight',
  'deltarune', 'clash', 'hollowknight', 'fnaf', 'five nights', 'payday', 'tf2', 'team fortress', 'oblivion', 'morrowind',
  'elder scrolls', 'deepwoken', 'asura', 'angrybirds', 'plantsvszombies', 'deltarune', 'xenoblade', 'fireemblem', 'leagueoflegends',
  'starfox', 'donkeykong', 'finalfantasy', 'streetfighter', 'kingdomhearts', 'animalcrossing', 'monsterehunter', 'monster hunter',
  'megaman', 'residentevil', 'silenthill', 'tombraider', 'godofwar', 'devilmaycry', 'supermario', 'pacman', 'toby fox', 'c418',
  'kondo', 'uhoh', 'runescape', 'world of warcraft', 'skylanders', 'roblox', 'portal2', 'portal1', 'skywardsword',
  'smashbros', 'kirby', 'deltarune', 'undertale', 'megalovania', 'sans', 'papyrus', 'gaster', 'jevil', 'spamton',
  'flowey', 'toriel', 'asriel', 'undyne', 'alphys', 'mettaton', 'asgore', 'frisk', 'chara', 'muffet', 'temmie',
  'sweden', 'wet hands', 'wethands', 'pigstep', 'otherside', 'chirp', 'stal', 'strad', 'ward', 'mellohi',
  'aria math', 'taswell', 'biome fest', 'haunt muskie',
  'blind spots', 'aria-math', 'chrysopoeia', 'rubedo', 'infinite amethyst', 'floating trees', 'concrete halls',
  'moog city', 'moogcity', 'creative', 'spoke', 'subwoofer', 'equinoxe', 'key', 'oxygene',
  'fifa', 'nintendo', 'sega', 'playstation', 'xbox', 'atari', 'konami',
  'capcom', 'square enix', 'ubisoft', 'ea sports', 'valve', 'bethesda', 'bioware', 'mojang', 'activision', 'blizzard',
  'epic games', 'battle.net', 'ps1', 'ps2', 'ps3', 'ps4', 'ps5', 'nes', 'snes',
  'n64', 'gamecube', 'game boy', 'ds', '3ds', 'switch', 'genesis', 'dreamcast', 'saturn', 'master system', 'game gear',
  'xbox 360', 'xbox one', 'xbox series', 'wii u', 'gameboy', 'megadrive', 'pc98', 'commodore', 'amiga', 'sinclair',
  'spectrum', 'msx', 'neogeo', 'neo geo', 'turbografx', 'pc engine', 'arcade', 'mame', 'cabinet', 'joystick',
  'joycon', 'joy-con', 'controller', 'console', 'cartridge', 'disc', 'rom', 'iso', 'emulator', 'simulation',
  'rpg', 'fps', 'mmo', 'rts', 'moba', 'sandbox', 'survival', 'puzzle', 'platformer', 'adventure', 'shooter',
  'fighting', 'racing', 'sports', 'strategy', 'simulation', 'stealth', 'horror', 'indie', 'aaa', 'casual',
  'hardcore', 'speedrun', 'glitch', 'exploit', 'mod', 'addon', 'dlc', 'expansion', 'patch', 'update', 'beta',
  'alpha', 'prototype', 'demo', 'shareware', 'freeware', 'open source', 'indiedev', 'gamedev', 'ldjam', 'ludum dare',
  'game jam', 'hackathon', 'ggj', 'global game jam', 'itch.io', 'gamejolt', 'kongregate', 'newgrounds', 'miniclip',
  'armorgames', 'addictinggames', 'coolmathgames', 'y8', 'friv', 'nitrome', 'popcap', 'zynga', 'king.com',
  'rovio', 'mojang', 'notch', 'c418', 'toby fox', 'temmie', 'kondo', 'tanaka', 'uhoh', 'kawamura', 'shimomura',
  'mitsuda', 'ue鬆', 'koshiro', 'yamane', 'sakuraba', 'sogabe', 'ishikawa', 'sato', 'fukuda', 'okabe', 'monaca',
  'takada', 'chiba', 'suzuki', 'sato', 'ito', 'narita', 'iwadare', 'baba', 'morizono', 'ohtani', 'senoue',
  'hataya', 'tokoi', 'takahashi', 'yasuhara', 'nakamura', 'miyauchi', 'kawaguchi', 'hiro', 'sega AM2', 'yu suzuki',
  'cybergrind', 'ultrakill', 'megamanx', 'megaman x', 'castlevania', 'simon', 'belmont', 'alucard', 'dracula',
  'vampire killer', 'bloody tears', 'aquarius', 'slash', 'heart of fire', 'out of time', 'rondo of blood',
  'symphony of the night', 'sotn', 'lost painting', 'wood carving partitas', 'nocturne', 'dance of gold', 'requiem for the gods',
  'dracula castle', 'tower of mist', 'rainbow cemetery', 'marble gallery', 'clock tower', 'abandoned castle', 'curse of darkness',
  'portrait of ruin', 'order of ecclesia', 'bloodstained', 'miriam', 'ritual of the night', 'gehry', 'iamthekidyouknowwhatimean',
  'mizuguchi', 'rez', 'lumines', 'child of eden', 'tetris effect', 'flower',
  'abzu', 'telltale', 'walking dead', 'wolf among us', 'tales from the borderlands', 'borderlands', 'handsome jack',
  'claptrap', 'vault hunter', 'pandora', 'destiny', 'ghost shell', 'traveler', 'cayde', 'zavala', 'ikora', 'mara sov',
  'oryx', 'crota', 'atheon', 'vault of glass', 'crotas end', 'kings fall', 'wrath of the machine', 'leviathan',
  'last wish', 'scourge of the past', 'crown of sorrow', 'garden of salvation', 'deep stone crypt', 'vault of glass',
  'vow of the disciple', 'kings fall', 'root of nightmares', 'crotas end', 'salvations edge',
  // Newly added game keywords to avoid false negatives:
  'oneshot', 'omori', 'stalker', 'decaying winter', 'library of ruina', 'limbus company', 'friday night funkin', 'funkin',
  'arknights', 'cod', 'call of duty', 'black ops', 'bo2', 'shadow bonnie', 'does the journey seem long'
];

function cleanString(str) {
  try {
    str = decodeURIComponent(str);
  } catch (e) {}
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/([a-z])([0-9])/g, '$1 $2')
    .replace(/([0-9])([a-z])/g, '$1 $2')
    .replace(/[^a-z0-9]/g, ' ');
}

function matchesKeyword(path, keyword) {
  const pathCleaned = ' ' + cleanString(path) + ' ';
  const kwCleaned = cleanString(keyword).trim();
  
  if (kwCleaned.length === 0) return false;
  
  const substringWhitelist = [
    'mario', 'zelda', 'pokemon', 'sonic', 'metroid', 'castlevania', 'megaman', 'mega man', 'pacman', 'pac-man',
    'kirby', 'donkey', 'smash', 'hollow', 'starfox', 'finalfantasy', 'final fantasy', 'residentevil', 'resident evil',
    'silenthill', 'silent hill', 'tombraider', 'tomb raider', 'godofwar', 'god of war', 'devilmaycry', 'devil may cry',
    'kingdomhearts', 'kingdom hearts', 'animalcrossing', 'animal crossing', 'monsterhunter', 'monster hunter',
    'runescape', 'skylanders', 'roblox', 'undertale', 'deltarune', 'geometrydash', 'geometry dash', 'skyward',
    'majora', 'ocarina', 'deltarune', 'megalovania', 'fallout', 'cyberpunk', 'witcher', 'earthbound', 'warcraft',
    'starcraft', 'diablo', 'overwatch', 'genshin', 'fortnite', 'subnautica', 'celeste', 'fnaf', 'oblivion',
    'morrowind', 'xenoblade', 'fireemblem', 'fire emblem', 'stalker', 'decaying winter', 'library of ruina',
    'limbus company', 'friday night funkin', 'funkin', 'oneshot', 'omori', 'arknights', 'assassin'
  ].map(s => cleanString(s).trim());

  const isSubstringAllowed = substringWhitelist.includes(kwCleaned) || (kwCleaned.includes(' ') && kwCleaned.length > 4);
  
  if (isSubstringAllowed) {
    const pathCollapsed = pathCleaned.replace(/\s+/g, ' ');
    const kwCollapsed = kwCleaned.replace(/\s+/g, ' ');
    return pathCollapsed.includes(kwCollapsed);
  }

  // Must match as a whole word (with singular/plural support for words > 2 chars)
  const tokens = pathCleaned.split(/\s+/).filter(Boolean);
  return tokens.some(t => {
    if (t === kwCleaned) return true;
    if (t.length > 2 && kwCleaned.length > 2) {
      // Allow singular keyword to match plural token in path (e.g., keyword 'assassin' matches token 'assassins')
      if (kwCleaned + 's' === t) return true;
    }
    return false;
  });
}


// Clean up suffixes
function cleanTitle(title) {
  return title
    .replace(/\.mid\.mid$/i, '')
    .replace(/\.mid$/i, '')
    .replace(/\.MID$/i, '')
    .replace(/ K$/i, '')
    .replace(/ cover$/i, '')
    .replace(/ finished$/i, '')
    .replace(/ fixed drums$/i, '')
    .replace(/ remade$/i, '')
    .replace(/ remastered$/i, '')
    .replace(/ ost$/i, '')
    .replace(/\(piano\)/i, '')
    .replace(/\(orchestra\)/i, '')
    .replace(/\(remix\)/i, '')
    .replace(/\(fixed\)/i, '')
    .replace(/_/g, ' ')
    .replace(/-/g, ' ')
    .trim();
}

function parseSongName(filename, category) {
  let cleaned = filename;
  
  // Remove folders in path if any
  const baseName = filename.split('/').pop();
  
  // Clean extension
  let baseClean = cleanTitle(baseName);
  
  let artist = category === 'games' ? 'Video Game Composer' : 'Various Artists';
  let title = baseClean;
 
  // Split by ' - ' or '-' or '.' to guess artist
  if (baseClean.includes(' - ')) {
    const parts = baseClean.split(' - ');
    artist = parts[0].trim();
    title = parts[1].trim();
  } else if (baseClean.includes(' (Theme From')) {
    const parts = baseClean.split(' (Theme From');
    title = parts[0].trim();
    artist = 'Theme Soundtrack';
  } else if (baseClean.includes(' (')) {
    const parts = baseClean.split(' (');
    title = parts[0].trim();
    artist = parts[1].replace(/\)/g, '').trim();
  }

  // Capitalize words
  const capitalize = (str) => str.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  title = capitalize(title);
  artist = capitalize(artist);

  // Generate generic hints
  const hint = category === 'games'
    ? `Iconic soundtrack theme from the game ${artist === 'Video Game Composer' ? title : artist}`
    : `Famous pop/rock hit by ${artist}`;

  return { title, artist, hint };
}

async function build() {
  console.log('Fetching recursive git tree of MIDI repository...');
  try {
    const response = await fetch('https://api.github.com/repos/thewildwestmidis/midis/git/trees/main?recursive=1');
    const data = await response.json();
    
    if (!data.tree) {
      throw new Error(data.message || 'Failed to fetch tree');
    }

    const files = data.tree.filter(f => f.path.endsWith('.mid') || f.path.endsWith('.MID'));
    console.log(`Found ${files.length} raw MIDI files. Filtering...`);

    const gamesPool = [];
    const popPool = [];

    // Local files mapping (our offline fallbacks)
    const localSongs = {
      'mario': '/midi/mario.mid',
      'zelda': '/midi/zelda.mid',
      'tetris': '/midi/tetris.mid',
      'rickroll': '/midi/rickroll.mid',
      'billiejean': '/midi/billiejean.mid',
      'takeonme': '/midi/takeonme.mid'
    };

    files.forEach(f => {
      const isGame = gameKeywords.some(kw => matchesKeyword(f.path, kw));
      
      const parsed = parseSongName(f.path, isGame ? 'games' : 'pop');
      
      // Build song object
      const id = parsed.title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').trim();
      
      // Skip if id matches our local fallbacks (we append them manually)
      if (localSongs[id]) return;

      const song = {
        id,
        title: parsed.title,
        artist: parsed.artist,
        path: `https://raw.githubusercontent.com/thewildwestmidis/midis/main/${encodeURIComponent(f.path)}`,
        hint: parsed.hint,
        category: isGame ? 'games' : 'pop'
      };

      if (isGame) {
        gamesPool.push(song);
      } else {
        popPool.push(song);
      }
    });

    console.log(`Filtered: Game themes: ${gamesPool.length}, Pop/Rock hits: ${popPool.length}`);

    // Deduplicate pools by ID
    const uniqueGames = [];
    const gamesSeen = new Set();
    gamesPool.forEach(s => {
      if (!gamesSeen.has(s.id)) {
        gamesSeen.add(s.id);
        uniqueGames.push(s);
      }
    });

    const uniquePop = [];
    const popSeen = new Set();
    popPool.forEach(s => {
      if (!popSeen.has(s.id)) {
        popSeen.add(s.id);
        uniquePop.push(s);
      }
    });

    const finalGames = uniqueGames;
    const finalPop = uniquePop;

    // Curated local files definitions (to guarantee they match perfectly and stay at the top)
    const localSongsMeta = [
      {
        id: 'tv-tmnt-intro',
        title: 'Teenage Mutant Ninja Turtles TV Theme',
        artist: 'Chuck Lorre / Dennis C. Brown',
        path: '/midi/tv-tmnt-intro.mid',
        hint: 'The legendary theme song of the 1987 TMNT cartoon ("Heroes in a Half Shell")',
        category: 'pop'
      },
      {
        id: 'tv-addams-family',
        title: 'The Addams Family Theme',
        artist: 'Vic Mizzy',
        path: '/midi/tv-addams-family.mid',
        hint: 'The iconic harpsichord theme of the Addams Family with famous finger snaps',
        category: 'pop'
      },
      {
        id: 'tv-ducktales',
        title: 'DuckTales Theme Song',
        artist: 'Mark Mueller',
        path: '/midi/tv-ducktales.mid',
        hint: 'The high-energy theme song of Uncle Scrooge and his nephews ("Woo-oo!")',
        category: 'pop'
      },
      {
        id: 'tv-ducktales-moon',
        title: 'DuckTales - The Moon Theme',
        artist: 'Yoshihiro Sakaguchi',
        path: '/midi/tv-ducktales-moon.mid',
        hint: 'One of the most famous and beautiful 8-bit melodies in cartoon and game history',
        category: 'pop'
      },
      {
        id: 'tv-pokemon-theme',
        title: 'Pokémon Theme (Gotta Catch \'Em All)',
        artist: 'John Siegler / John Loeffler',
        path: '/midi/tv-pokemon-theme.mid',
        hint: 'The legendary main theme song of the English Pokémon anime series first season',
        category: 'pop'
      },
      {
        id: 'tv-team-rocket',
        title: 'Team Rocket Theme (Double Trouble)',
        artist: 'John Siegler / John Loeffler',
        path: '/midi/tv-team-rocket.mid',
        hint: 'The dramatic motto theme song of Jessie, James, and Meowth',
        category: 'pop'
      },
      {
        id: 'tv-inspector-gadget',
        title: 'Inspector Gadget Theme',
        artist: 'Shuki Levy / Haim Saban',
        path: '/midi/tv-inspector-gadget.mid',
        hint: 'The famous Inspector Gadget theme song based on Edvard Grieg\'s In the Hall of the Mountain King',
        category: 'pop'
      },
      {
        id: 'tv-xmen-theme',
        title: 'X-Men Animated Series Theme',
        artist: 'Ron Wasserman',
        path: '/midi/tv-xmen-theme.mid',
        hint: 'The iconic heavy guitar and synth theme of the 1992 X-Men animated cartoon series',
        category: 'pop'
      },

      {
        id: 'movie-robocop',
        title: 'RoboCop Theme',
        artist: 'Basil Poledouris / Jeroen Tel',
        path: '/midi/movie-robocop.mid',
        hint: 'The legendary loading screen theme from the RoboCop NES game',
        category: 'pop'
      },
      {
        id: 'movie-terminator',
        title: 'Terminator 2 Theme',
        artist: 'Brad Fiedel',
        path: '/midi/movie-terminator.mid',
        hint: 'Industrial electronic metal title theme of Judgement Day',
        category: 'pop'
      },
      {
        id: 'movie-top-gun',
        title: 'Top Gun Anthem',
        artist: 'Harold Faltermeyer',
        path: '/midi/movie-top-gun.mid',
        hint: 'Soaring title screen electric guitar theme of Maverick and Goose',
        category: 'pop'
      },
      {
        id: 'movie-james-bond-007',
        title: 'James Bond 007 Theme',
        artist: 'Monty Norman',
        path: '/midi/movie-james-bond-007.mid',
        hint: 'The iconic brass and guitar theme of the worlds most famous secret agent',
        category: 'pop'
      },
      {
        id: 'movie-star-wars-rogue',
        title: 'Star Wars Main Theme',
        artist: 'John Williams',
        path: '/midi/movie-star-wars-rogue.mid',
        hint: 'The legendary sweeping orchestral main theme of the Skywalker Saga',
        category: 'pop'
      },
      {
        id: 'movie-mission-impossible',
        title: 'Mission: Impossible Theme',
        artist: 'Lalo Schifrin',
        path: '/midi/movie-mission-impossible.mid',
        hint: 'Famous 5/4 time signature spy theme song that plays before a self-destructing briefing',
        category: 'pop'
      },
      {
        id: 'movie-batman-elfman',
        title: 'Batman Main Theme (Danny Elfman)',
        artist: 'Danny Elfman',
        path: '/midi/movie-batman-elfman.mid',
        hint: 'Haunting gothic orchestral theme composed for Tim Burtons Batman film',
        category: 'pop'
      },

      {
        id: 'overwatch-watchpoint-gibraltar',
        title: 'Watchpoint: Gibraltar Theme',
        artist: 'Neal Acree',
        path: '/midi/overwatch-watchpoint-gibraltar.mid',
        hint: 'The background map score for Watchpoint: Gibraltar',
        category: 'games'
      },

      {
        id: 'nintendo-gba-route113',
        title: 'Route 113 Theme',
        artist: 'Go Ichinose',
        path: '/midi/nintendo-gba-route113.mid',
        hint: 'Soothing theme from the ash-covered volcanic route in Hoenn',
        category: 'games'
      },
      {
        id: 'nintendo-gba-surfing',
        title: 'Surfing Theme',
        artist: 'Junichi Masuda',
        path: '/midi/nintendo-gba-surfing.mid',
        hint: 'Jazzy and upbeat water surfing theme from Hoenn',
        category: 'games'
      },
      {
        id: 'nintendo-gba-champion-steven',
        title: 'Champion Steven Battle',
        artist: 'Junichi Masuda',
        path: '/midi/nintendo-gba-champion-steven.mid',
        hint: 'High-tempo championship battle theme against Steven Stone',
        category: 'games'
      },
      {
        id: 'nintendo-gba-trainer-battle',
        title: 'Hoenn Trainer Battle',
        artist: 'Junichi Masuda',
        path: '/midi/nintendo-gba-trainer-battle.mid',
        hint: 'Standard battle music when challenging Hoenn trainers',
        category: 'games'
      },
      {
        id: 'nintendo-gba-wild-battle-frlg',
        title: 'Kanto Wild Battle (FRLG)',
        artist: 'Junichi Masuda',
        path: '/midi/nintendo-gba-wild-battle-frlg.mid',
        hint: 'Updated wild battle music from Kanto remakes',
        category: 'games'
      },
      {
        id: 'nintendo-gba-prof-oak',
        title: 'Professor Oak Theme',
        artist: 'Junichi Masuda',
        path: '/midi/nintendo-gba-prof-oak.mid',
        hint: 'Jolly theme played when meeting Professor Oak',
        category: 'games'
      },
      {
        id: 'nintendo-gba-abandoned-ship',
        title: 'Abandoned Ship Theme',
        artist: 'Go Ichinose',
        path: '/midi/nintendo-gba-abandoned-ship.mid',
        hint: 'Moody and atmospheric sunken ship theme from Hoenn',
        category: 'games'
      },
      {
        id: 'nintendo-gba-battle-tower',
        title: 'Battle Tower Theme',
        artist: 'Go Ichinose',
        path: '/midi/nintendo-gba-battle-tower.mid',
        hint: 'Driving battle preparation music from Hoenn Battle Tower',
        category: 'games'
      },
      {
        id: 'nintendo-ds-route209',
        title: 'Route 209 Theme',
        artist: 'Go Ichinose',
        path: '/midi/nintendo-ds-route209.mid',
        hint: 'Extremely popular piano-led route theme from Sinnoh',
        category: 'games'
      },
      {
        id: 'nintendo-ds-cynthia',
        title: 'Champion Cynthia Theme',
        artist: 'Go Ichinose',
        path: '/midi/nintendo-ds-cynthia.mid',
        hint: 'Intense champion battle theme from Pokémon Diamond/Pearl',
        category: 'games'
      },
      {
        id: 'nintendo-ds-roost-cafe',
        title: 'The Roost Cafe Theme',
        artist: 'Kazumi Totaka',
        path: '/midi/nintendo-ds-roost-cafe.mid',
        hint: 'Chilled jazz-piano background theme from Brewster\'s Cafe',
        category: 'games'
      },
      {
        id: 'nintendo-ds-waluigi',
        title: 'Waluigi Pinball Theme',
        artist: 'Shinobu Tanaka',
        path: '/midi/nintendo-ds-waluigi.mid',
        hint: 'Famous fast-paced synth rock racetrack theme from Mario Kart DS',
        category: 'games'
      },
      {
        id: 'nintendo-ds-nsmb-overworld',
        title: 'New Super Mario Bros Overworld',
        artist: 'Koji Kondo',
        path: '/midi/nintendo-ds-nsmb-overworld.mid',
        hint: 'Upbeat side-scrolling level theme with vocal "bah" elements',
        category: 'games'
      },
      {
        id: 'nintendo-ds-nsmb-castle',
        title: 'New Super Mario Bros Castle',
        artist: 'Koji Kondo',
        path: '/midi/nintendo-ds-nsmb-castle.mid',
        hint: 'Dramatic castle level background theme from NSMB',
        category: 'games'
      },
      {
        id: 'nintendo-ds-nsmb-athletic',
        title: 'New Super Mario Bros Athletic',
        artist: 'Koji Kondo',
        path: '/midi/nintendo-ds-nsmb-athletic.mid',
        hint: 'Ragtime-style fast athletic level theme from NSMB',
        category: 'games'
      },
      {
        id: 'nintendo-ds-mkds-airship',
        title: 'Airship Fortress Theme',
        artist: 'Shinobu Tanaka',
        path: '/midi/nintendo-ds-mkds-airship.mid',
        hint: 'Dynamic SMB3-inspired airship track theme from Mario Kart DS',
        category: 'games'
      },
      {
        id: 'nintendo-ds-mkds-bowser-castle',
        title: 'Bowser\'s Castle Theme',
        artist: 'Shinobu Tanaka',
        path: '/midi/nintendo-ds-mkds-bowser-castle.mid',
        hint: 'Fast rock organ theme from Bowser\'s Castle in MKDS',
        category: 'games'
      },
      {
        id: 'nintendo-ds-mkds-delfino',
        title: 'Delfino Square Theme',
        artist: 'Shinobu Tanaka',
        path: '/midi/nintendo-ds-mkds-delfino.mid',
        hint: 'Accordion-heavy Italian-style town theme from Mario Kart DS',
        category: 'games'
      },
      {
        id: 'nintendo-ds-lake-trio',
        title: 'Lake Trio Battle Theme',
        artist: 'Go Ichinose',
        path: '/midi/nintendo-ds-lake-trio.mid',
        hint: 'Pulsing synth battle theme when fighting Sinnoh lake guardians',
        category: 'games'
      },
      {
        id: 'nintendo-ds-gym-battle',
        title: 'Sinnoh Gym Leader Battle',
        artist: 'Go Ichinose',
        path: '/midi/nintendo-ds-gym-battle.mid',
        hint: 'Energetic boss battle theme against Sinnoh gym leaders',
        category: 'games'
      },
      {
        id: 'nintendo-wii-shop-channel',
        title: 'Wii Shop Channel Theme',
        artist: 'Kazumi Totaka',
        path: '/midi/nintendo-wii-shop-channel.mid',
        hint: 'Extremely famous background elevator-jazz music from the Wii Shop',
        category: 'games'
      },
      {
        id: 'nintendo-wii-smash-brawl-menu',
        title: 'Smash Brawl Menu Theme',
        artist: 'Nobuo Uematsu',
        path: '/midi/nintendo-wii-smash-brawl-menu.mid',
        hint: 'Epic operatic orchestral lobby theme from Smash Brawl',
        category: 'games'
      },
      {
        id: 'nintendo-wii-zelda-hyrule-field',
        title: 'Twilight Princess Hyrule Field',
        artist: 'Koji Kondo',
        path: '/midi/nintendo-wii-zelda-hyrule-field.mid',
        hint: 'Epic sweeping adventure theme from Twilight Princess',
        category: 'games'
      },
      {
        id: 'nintendo-wii-sports-boxing',
        title: 'Wii Sports Boxing Results',
        artist: 'Kazumi Totaka',
        path: '/midi/nintendo-wii-sports-boxing.mid',
        hint: 'Chill results music from Wii Sports Boxing',
        category: 'games'
      },
      {
        id: 'nintendo-wii-mario-kart-menu',
        title: 'Mario Kart Wii Menu Theme',
        artist: 'Asuka Ohta',
        path: '/midi/nintendo-wii-mario-kart-menu.mid',
        hint: 'Upbeat electronic theme played on Mario Kart Wii menus',
        category: 'games'
      },
      {
        id: 'nintendo-gc-dragon-roost',
        title: 'Dragon Roost Island',
        artist: 'Koji Kondo',
        path: '/midi/nintendo-gc-dragon-roost.mid',
        hint: 'Famous pan-flute and acoustic guitar theme from Wind Waker',
        category: 'games'
      },
      {
        id: 'nintendo-gc-beedles-shop',
        title: 'Beedle\'s Shop Theme',
        artist: 'Koji Kondo',
        path: '/midi/nintendo-gc-beedles-shop.mid',
        hint: 'Silly mercantile theme for Beedle\'s boat shop',
        category: 'games'
      },
      {
        id: 'nintendo-gc-fzero-shop',
        title: 'F-Zero GX Shop Theme',
        artist: 'Hidenori Shoji',
        path: '/midi/nintendo-gc-fzero-shop.mid',
        hint: 'Upbeat techno-jazz shop theme from F-Zero GX',
        category: 'games'
      },
      {
        id: 'nintendo-gc-waluigi-stadium',
        title: 'Waluigi Stadium Theme',
        artist: 'Shinobu Tanaka',
        path: '/midi/nintendo-gc-waluigi-stadium.mid',
        hint: 'Funky stadium rock track theme from Double Dash',
        category: 'games'
      },
      {
        id: 'nintendo-snes-arrival-on-zebes',
        title: 'Arrival on Zebes Theme',
        artist: 'Kenji Yamamoto',
        path: '/midi/nintendo-snes-arrival-on-zebes.mid',
        hint: 'Moody space rain introduction theme from Super Metroid',
        category: 'games'
      },
      {
        id: 'nintendo-snes-ridley-boss',
        title: 'Ridley Boss Theme',
        artist: 'Kenji Yamamoto',
        path: '/midi/nintendo-snes-ridley-boss.mid',
        hint: 'Chaotic fast battle theme when fighting Ridley',
        category: 'games'
      },
      {
        id: 'nintendo-snes-lost-woods-alt',
        title: 'ALttP Lost Woods Theme',
        artist: 'Koji Kondo',
        path: '/midi/nintendo-snes-lost-woods-alt.mid',
        hint: 'Foggy forest maze theme from Link to the Past',
        category: 'games'
      },
      {
        id: 'nintendo-snes-gangplank-alt',
        title: 'Gang-Plank Galleon Theme',
        artist: 'David Wise',
        path: '/midi/nintendo-snes-gangplank-alt.mid',
        hint: 'Final boss battle theme against King K. Rool in Donkey Kong Country',
        category: 'games'
      },

      {
        id: 'nintendo-more-gba-littleroot',
        title: 'Littleroot Town Theme',
        artist: 'Junichi Masuda',
        path: '/midi/nintendo-more-gba-littleroot.mid',
        hint: 'Cozy starting town music from Pokémon Ruby/Sapphire',
        category: 'games'
      },
      {
        id: 'nintendo-more-gba-route104',
        title: 'Route 104 Theme',
        artist: 'Junichi Masuda',
        path: '/midi/nintendo-more-gba-route104.mid',
        hint: 'Upbeat coastline route theme from Pokémon Ruby/Sapphire',
        category: 'games'
      },
      {
        id: 'nintendo-more-gba-fortree',
        title: 'Fortree City Theme',
        artist: 'Go Ichinose',
        path: '/midi/nintendo-more-gba-fortree.mid',
        hint: 'Treehouse city background music from Pokémon Ruby/Sapphire',
        category: 'games'
      },
      {
        id: 'nintendo-more-gba-slateport',
        title: 'Slateport City Theme',
        artist: 'Go Ichinose',
        path: '/midi/nintendo-more-gba-slateport.mid',
        hint: 'Bustling port city theme from Pokémon Ruby/Sapphire',
        category: 'games'
      },
      {
        id: 'nintendo-more-gamecube-delfino',
        title: 'Delfino Plaza Theme',
        artist: 'Koji Kondo',
        path: '/midi/nintendo-more-gamecube-delfino.mid',
        hint: 'Catchy tropical accordion theme from Mario Sunshine',
        category: 'games'
      },
      {
        id: 'nintendo-more-gamecube-ricco',
        title: 'Ricco Harbor Theme',
        artist: 'Koji Kondo',
        path: '/midi/nintendo-more-gamecube-ricco.mid',
        hint: 'Upbeat harbor level background music from Mario Sunshine',
        category: 'games'
      },
      {
        id: 'nintendo-more-gamecube-dragon',
        title: 'Dragon Roost Island',
        artist: 'Koji Kondo',
        path: '/midi/nintendo-more-gamecube-dragon.mid',
        hint: 'Famous pan-flute and acoustic guitar theme from Wind Waker',
        category: 'games'
      },
      {
        id: 'nintendo-more-gamecube-outset',
        title: 'Outset Island Theme',
        artist: 'Koji Kondo',
        path: '/midi/nintendo-more-gamecube-outset.mid',
        hint: 'Link\'s hometown island theme from Zelda Wind Waker',
        category: 'games'
      },
      {
        id: 'nintendo-more-gamecube-prime',
        title: 'Metroid Prime Title Theme',
        artist: 'Kenji Yamamoto',
        path: '/midi/nintendo-more-gamecube-prime.mid',
        hint: 'Dark electronic atmospheric title music from Metroid Prime',
        category: 'games'
      },
      {
        id: 'nintendo-more-wii-sports',
        title: 'Wii Sports Theme',
        artist: 'Kazumi Totaka',
        path: '/midi/nintendo-more-wii-sports.mid',
        hint: 'Energetic theme played on the main title screen of Wii Sports',
        category: 'games'
      },
      {
        id: 'nintendo-more-wii-gusty',
        title: 'Gusty Garden Galaxy',
        artist: 'Mahito Yokota',
        path: '/midi/nintendo-more-wii-gusty.mid',
        hint: 'Epic sweeping orchestral theme from Super Mario Galaxy',
        category: 'games'
      },
      {
        id: 'nintendo-more-ds-waluigi',
        title: 'Waluigi Pinball Theme',
        artist: 'Shinobu Tanaka',
        path: '/midi/nintendo-more-ds-waluigi.mid',
        hint: 'Famous fast-paced synth rock racetrack theme from Mario Kart DS',
        category: 'games'
      },
      {
        id: 'nintendo-more-ds-dialga',
        title: 'Dialga/Palkia Battle',
        artist: 'Go Ichinose',
        path: '/midi/nintendo-more-ds-dialga.mid',
        hint: 'Legendary dragon battle music from Sinnoh',
        category: 'games'
      },
      {
        id: 'nintendo-more-nes-airship',
        title: 'SMB 3 Airship Theme',
        artist: 'Koji Kondo',
        path: '/midi/nintendo-more-nes-airship.mid',
        hint: 'Regal airship stage music from Super Mario Bros. 3',
        category: 'games'
      },
      {
        id: 'nintendo-more-snes-fairy',
        title: 'Great Fairy Fountain',
        artist: 'Koji Kondo',
        path: '/midi/nintendo-more-snes-fairy.mid',
        hint: 'Beautiful harp arpeggio theme from Zelda',
        category: 'games'
      },
      {
        id: 'nintendo-more-snes-kakariko',
        title: 'Kakariko Village Theme',
        artist: 'Koji Kondo',
        path: '/midi/nintendo-more-snes-kakariko.mid',
        hint: 'Peaceful town theme from Zelda A Link to the Past',
        category: 'games'
      },
      {
        id: 'nintendo-more-nes-kraid',
        title: 'Metroid Kraid\'s Lair',
        artist: 'Hirokazu Tanaka',
        path: '/midi/nintendo-more-nes-kraid.mid',
        hint: 'Underground cavern boss level theme from Metroid',
        category: 'games'
      },

      {
        id: 'nintendo-snes-z3woods',
        title: 'Lost Woods Theme',
        artist: 'Koji Kondo',
        path: '/midi/nintendo-snes-z3woods.mid',
        hint: 'Foggy forest maze theme from Link to the Past',
        category: 'games'
      },
      {
        id: 'nintendo-snes-gangplank',
        title: 'Gang-Plank Galleon',
        artist: 'David Wise',
        path: '/midi/nintendo-snes-gangplank.mid',
        hint: 'Final boss battle theme against King K. Rool in Donkey Kong Country',
        category: 'games'
      },
      {
        id: 'nintendo-snes-mutecity',
        title: 'Mute City Theme',
        artist: 'Yumiko Kanki',
        path: '/midi/nintendo-snes-mutecity.mid',
        hint: 'High-speed jazz-fusion level 1 theme from F-Zero',
        category: 'games'
      },
      {
        id: 'nintendo-n64-bobomb',
        title: 'Bob-omb Battlefield',
        artist: 'Koji Kondo',
        path: '/midi/nintendo-n64-bobomb.mid',
        hint: 'Stage 1 grassy mountain theme from Mario 64',
        category: 'games'
      },
      {
        id: 'nintendo-n64-song-of-storms',
        title: 'Song of Storms',
        artist: 'Koji Kondo',
        path: '/midi/nintendo-n64-song-of-storms.mid',
        hint: 'Windmill track played on ocarina to summon rain in Zelda Ocarina of Time',
        category: 'games'
      },
      {
        id: 'nintendo-n64-sarias-song',
        title: 'Saria\'s Song',
        artist: 'Koji Kondo',
        path: '/midi/nintendo-n64-sarias-song.mid',
        hint: 'Playful Kokiri forest melody from Zelda Ocarina of Time',
        category: 'games'
      },
      {
        id: 'nintendo-n64-ssb-bonus',
        title: 'Super Smash Bros. Bonus Stage',
        artist: 'Hirokazu Ando',
        path: '/midi/nintendo-n64-ssb-bonus.mid',
        hint: 'Groovy bonus target-smashing stage theme from the original Smash Bros.',
        category: 'games'
      },
      {
        id: 'nintendo-gb-pallet-town',
        title: 'Pallet Town Theme',
        artist: 'Junichi Masuda',
        path: '/midi/nintendo-gb-pallet-town.mid',
        hint: 'Peaceful starting town theme from Pokémon Red/Blue',
        category: 'games'
      },
      {
        id: 'nintendo-gb-taltal-heights',
        title: 'Tal Tal Heights',
        artist: 'Yuichi Ozaki',
        path: '/midi/nintendo-gb-taltal-heights.mid',
        hint: 'Extremely heroic mountain climbing theme from Link\'s Awakening',
        category: 'games'
      },
      {
        id: 'nintendo-gb-lavender-town',
        title: 'Lavender Town Theme',
        artist: 'Junichi Masuda',
        path: '/midi/nintendo-gb-lavender-town.mid',
        hint: 'Famous creepy background tune for the Pokémon burial town',
        category: 'games'
      },

      {
        id: 'nintendo-supp-nes-boss_smb3',
        title: 'SMB 3 Boss Theme',
        artist: 'Koji Kondo',
        path: '/midi/nintendo-supp-nes-boss_smb3.mid',
        hint: 'Fast boss battle music from Super Mario Bros. 3',
        category: 'games'
      },
      {
        id: 'nintendo-supp-nes-dungeon_zelda',
        title: 'Zelda Dungeon Theme',
        artist: 'Koji Kondo',
        path: '/midi/nintendo-supp-nes-dungeon_zelda.mid',
        hint: 'Spooky underground theme from the first Zelda',
        category: 'games'
      },
      {
        id: 'nintendo-supp-nes-title_zelda',
        title: 'Zelda Title Theme',
        artist: 'Koji Kondo',
        path: '/midi/nintendo-supp-nes-title_zelda.mid',
        hint: 'Title screen theme from the original Zelda',
        category: 'games'
      },
      {
        id: 'nintendo-supp-snes-sticker_dkc',
        title: 'Stickerbrush Symphony',
        artist: 'David Wise',
        path: '/midi/nintendo-supp-snes-sticker_dkc.mid',
        hint: 'Ethereal thorny level background theme from DKC 2',
        category: 'games'
      },
      {
        id: 'nintendo-supp-snes-brinstar_metroid',
        title: 'Super Metroid Brinstar',
        artist: 'Kenji Yamamoto',
        path: '/midi/nintendo-supp-snes-brinstar_metroid.mid',
        hint: 'Atmospheric green cavern jungle theme from Super Metroid',
        category: 'games'
      },
      {
        id: 'nintendo-supp-n64-docks_mario',
        title: 'Dire Dire Docks',
        artist: 'Koji Kondo',
        path: '/midi/nintendo-supp-n64-docks_mario.mid',
        hint: 'Super relaxing water level theme from Mario 64',
        category: 'games'
      },
      {
        id: 'nintendo-supp-n64-gerudo_zelda',
        title: 'Gerudo Valley Theme',
        artist: 'Koji Kondo',
        path: '/midi/nintendo-supp-n64-gerudo_zelda.mid',
        hint: 'Spanish guitar flamenco style theme from Ocarina of Time',
        category: 'games'
      },
      {
        id: 'nintendo-supp-n64-lost_zelda',
        title: 'OoT Lost Woods',
        artist: 'Koji Kondo',
        path: '/midi/nintendo-supp-n64-lost_zelda.mid',
        hint: 'Upbeat maze theme of the Kokiri forest in Ocarina of Time',
        category: 'games'
      },
      {
        id: 'nintendo-supp-n64-title_zelda',
        title: 'OoT Title Theme',
        artist: 'Koji Kondo',
        path: '/midi/nintendo-supp-n64-title_zelda.mid',
        hint: 'Beautiful ocarina intro screen theme from Ocarina of Time',
        category: 'games'
      },
      {
        id: 'nintendo-supp-gameboy-gym_pkmn',
        title: 'Gym Leader Battle',
        artist: 'Junichi Masuda',
        path: '/midi/nintendo-supp-gameboy-gym_pkmn.mid',
        hint: 'Iconic boss theme when fighting a Gym Leader in Pokémon Red/Blue',
        category: 'games'
      },
      {
        id: 'nintendo-supp-gameboy-lavender_pkmn',
        title: 'Lavender Town Theme',
        artist: 'Junichi Masuda',
        path: '/midi/nintendo-supp-gameboy-lavender_pkmn.mid',
        hint: 'Creepy and infamous ghost town theme from Pokémon Red/Blue',
        category: 'games'
      },
      {
        id: 'nintendo-supp-gameboy-koholint',
        title: 'Koholint Island Overworld',
        artist: 'Yuichi Ozaki',
        path: '/midi/nintendo-supp-gameboy-koholint.mid',
        hint: 'Chiptune overworld exploration theme from Link\'s Awakening',
        category: 'games'
      },

      {
        id: 'nintendo-nes-smb_underground',
        title: 'SMB Underground Theme',
        artist: 'Koji Kondo',
        path: '/midi/nintendo-nes-smb_underground.mid',
        hint: 'The underground level music from Super Mario Bros.',
        category: 'games'
      },
      {
        id: 'nintendo-nes-da_smb3-overworld',
        title: 'SMB 3 Overworld Theme',
        artist: 'Koji Kondo',
        path: '/midi/nintendo-nes-da_smb3-overworld.mid',
        hint: 'Upbeat level selection map music from Super Mario Bros. 3',
        category: 'games'
      },
      {
        id: 'nintendo-nes-metroid_brinstar_ver2',
        title: 'Metroid Brinstar Theme',
        artist: 'Hirokazu Tanaka',
        path: '/midi/nintendo-nes-metroid_brinstar_ver2.mid',
        hint: 'Epic sci-fi cavern level theme from Metroid',
        category: 'games'
      },
      {
        id: 'nintendo-nes-punchout_fight',
        title: 'Punch-Out!! Fight Theme',
        artist: 'Yukio Kaneoka',
        path: '/midi/nintendo-nes-punchout_fight.mid',
        hint: 'Driving boxing fight theme from Punch-Out!!',
        category: 'games'
      },
      {
        id: 'nintendo-nes-duckhunt',
        title: 'Duck Hunt Theme',
        artist: 'Hirokazu Tanaka',
        path: '/midi/nintendo-nes-duckhunt.mid',
        hint: 'Silly dog laughing and duck shooting theme',
        category: 'games'
      },
      {
        id: 'nintendo-snes-smw_overworld',
        title: 'SMW Overworld Theme',
        artist: 'Koji Kondo',
        path: '/midi/nintendo-snes-smw_overworld.mid',
        hint: 'Famous bouncy overworld theme from Super Mario World',
        category: 'games'
      },
      {
        id: 'nintendo-snes-smw_castle-km',
        title: 'SMW Castle Theme',
        artist: 'Koji Kondo',
        path: '/midi/nintendo-snes-smw_castle-km.mid',
        hint: 'Ominous castle level music from Super Mario World',
        category: 'games'
      },
      {
        id: 'nintendo-snes-smk_mario_circuit',
        title: 'Super Mario Kart Circuit',
        artist: 'Soyo Oka',
        path: '/midi/nintendo-snes-smk_mario_circuit.mid',
        hint: 'High-speed race track theme from the original Mario Kart',
        category: 'games'
      },
      {
        id: 'nintendo-snes-z3hyrule',
        title: 'Hyrule Castle Theme',
        artist: 'Koji Kondo',
        path: '/midi/nintendo-snes-z3hyrule.mid',
        hint: 'Regal castle theme from Zelda: A Link to the Past',
        category: 'games'
      },
      {
        id: 'nintendo-snes-dkc_jungle-km',
        title: 'Jungle Hijinxs',
        artist: 'David Wise',
        path: '/midi/nintendo-snes-dkc_jungle-km.mid',
        hint: 'Groovy jungle drums level theme from Donkey Kong Country',
        category: 'games'
      },
      {
        id: 'nintendo-snes-dkc_-_aquatic_ambience',
        title: 'Aquatic Ambience',
        artist: 'David Wise',
        path: '/midi/nintendo-snes-dkc_-_aquatic_ambience.mid',
        hint: 'Relaxing ambient underwater theme from Donkey Kong Country',
        category: 'games'
      },
      {
        id: 'nintendo-snes-fzero-bigblue_rock',
        title: 'Big Blue Theme',
        artist: 'Yumiko Kanki',
        path: '/midi/nintendo-snes-fzero-bigblue_rock.mid',
        hint: 'Fast jazz-fusion rock racing theme from F-Zero',
        category: 'games'
      },
      {
        id: 'nintendo-snes-fzero_sandocean',
        title: 'Sand Ocean Theme',
        artist: 'Yumiko Kanki',
        path: '/midi/nintendo-snes-fzero_sandocean.mid',
        hint: 'Exotic high-speed desert track theme from F-Zero',
        category: 'games'
      },
      {
        id: 'nintendo-snes-kirby_superstar_bubbly_clouds',
        title: 'Bubbly Clouds Theme',
        artist: 'Jun Ishikawa',
        path: '/midi/nintendo-snes-kirby_superstar_bubbly_clouds.mid',
        hint: 'Cheery sky level theme from Kirby Super Star',
        category: 'games'
      },
      {
        id: 'nintendo-snes-kirby_super_star_-_dynablade_overworld',
        title: 'Dyna Blade Map Theme',
        artist: 'Jun Ishikawa',
        path: '/midi/nintendo-snes-kirby_super_star_-_dynablade_overworld.mid',
        hint: 'Overworld map selection theme from Kirby Super Star',
        category: 'games'
      },
      {
        id: 'nintendo-snes-eb_bus',
        title: 'Bus Theme',
        artist: 'Keiichi Suzuki',
        path: '/midi/nintendo-snes-eb_bus.mid',
        hint: 'Jazzy road trip bus theme from EarthBound',
        category: 'games'
      },
      {
        id: 'nintendo-snes-eb_file_select',
        title: 'File Select Theme',
        artist: 'Keiichi Suzuki',
        path: '/midi/nintendo-snes-eb_file_select.mid',
        hint: 'Trippy loading screen theme from EarthBound',
        category: 'games'
      },
      {
        id: 'nintendo-snes-eb_foursidegroove',
        title: 'Fourside Theme',
        artist: 'Keiichi Suzuki',
        path: '/midi/nintendo-snes-eb_foursidegroove.mid',
        hint: 'Urban metropolis background music from EarthBound',
        category: 'games'
      },
      {
        id: 'nintendo-n64-sm64_slide_victory',
        title: 'Slide Theme',
        artist: 'Koji Kondo',
        path: '/midi/nintendo-n64-sm64_slide_victory.mid',
        hint: 'Hectic race track theme from Mario 64',
        category: 'games'
      },
      {
        id: 'nintendo-n64-mk64_rainbow_road-km',
        title: 'MK64 Rainbow Road',
        artist: 'Kenta Nagata',
        path: '/midi/nintendo-n64-mk64_rainbow_road-km.mid',
        hint: 'Long cosmic rainbow track theme from Mario Kart 64',
        category: 'games'
      },
      {
        id: 'nintendo-n64-sf64_corneria',
        title: 'Corneria Theme',
        artist: 'Koji Kondo',
        path: '/midi/nintendo-n64-sf64_corneria.mid',
        hint: 'Heroic stage 1 space battle theme from Star Fox 64',
        category: 'games'
      },
      {
        id: 'nintendo-gameboy-pkmn_-_championbattle',
        title: 'Champion Battle Theme',
        artist: 'Junichi Masuda',
        path: '/midi/nintendo-gameboy-pkmn_-_championbattle.mid',
        hint: 'Epic final battle theme against your rival in Pokémon Red/Blue',
        category: 'games'
      },
      {
        id: 'nintendo-gameboy-pkmn-rb-lt',
        title: 'Vermilion City Gym',
        artist: 'Junichi Masuda',
        path: '/midi/nintendo-gameboy-pkmn-rb-lt.mid',
        hint: 'Gym leader battle theme from Vermilion City in Pokémon Red/Blue',
        category: 'games'
      },
      {
        id: 'nintendo-gameboy-pkmn_rb_route_3_arranged',
        title: 'Route 3 Theme',
        artist: 'Junichi Masuda',
        path: '/midi/nintendo-gameboy-pkmn_rb_route_3_arranged.mid',
        hint: 'Catchy route background theme from Pokémon Red/Blue',
        category: 'games'
      },
      {
        id: 'nintendo-gameboy-pkmn_gsc_bike_v1_1',
        title: 'GSC Bicycle Theme',
        artist: 'Junichi Masuda',
        path: '/midi/nintendo-gameboy-pkmn_gsc_bike_v1_1.mid',
        hint: 'Fast-paced bicycle riding music from Pokémon Gold/Silver',
        category: 'games'
      },
      {
        id: 'nintendo-gameboy-pkmngsc_bug_contest_v1_0',
        title: 'Bug Catching Contest',
        artist: 'Junichi Masuda',
        path: '/midi/nintendo-gameboy-pkmngsc_bug_contest_v1_0.mid',
        hint: 'National Park bug-catching contest theme from Pokémon Gold/Silver',
        category: 'games'
      },
      {
        id: 'nintendo-gameboy-pkmngsc_-_darkcavefrozentears',
        title: 'Dark Cave Theme',
        artist: 'Junichi Masuda',
        path: '/midi/nintendo-gameboy-pkmngsc_-_darkcavefrozentears.mid',
        hint: 'Spooky dark cave exploring music from Pokémon Gold/Silver',
        category: 'games'
      },
      {
        id: 'nintendo-gameboy-pkmn_trainer',
        title: 'Trainer Battle Theme',
        artist: 'Junichi Masuda',
        path: '/midi/nintendo-gameboy-pkmn_trainer.mid',
        hint: 'Standard battle music when challenging other trainers in Pokémon Red/Blue',
        category: 'games'
      },

      {
        id: 'sonic-1-boss',
        title: 'Sonic 1 Boss Theme',
        artist: 'Masato Nakamura',
        path: '/midi/sonic-1-boss.mid',
        hint: 'Tension-filled theme when fighting Dr. Robotnik in Sonic 1',
        category: 'games'
      },
      {
        id: 'sonic-1-continue',
        title: 'Sonic 1 Continue Theme',
        artist: 'Masato Nakamura',
        path: '/midi/sonic-1-continue.mid',
        hint: 'Short retro loop played when you run out of lives in Sonic 1',
        category: 'games'
      },
      {
        id: 'sonic-1-credits',
        title: 'Sonic 1 Credits Theme',
        artist: 'Masato Nakamura',
        path: '/midi/sonic-1-credits.mid',
        hint: 'Upbeat celebratory ending theme for the original Sonic game',
        category: 'games'
      },
      {
        id: 'sonic-1-game-over',
        title: 'Sonic 1 Game Over Theme',
        artist: 'Masato Nakamura',
        path: '/midi/sonic-1-game-over.mid',
        hint: 'Short melancholic jingle played when you lose in Sonic 1',
        category: 'games'
      },
      {
        id: 'sonic-2-aquatic-ruin',
        title: 'Aquatic Ruin Zone Theme',
        artist: 'Masato Nakamura',
        path: '/midi/sonic-2-aquatic-ruin.mid',
        hint: 'Bouncy, flute-led ruins level theme from Sonic 2',
        category: 'games'
      },
      {
        id: 'sonic-2-boss',
        title: 'Sonic 2 Boss Theme',
        artist: 'Masato Nakamura',
        path: '/midi/sonic-2-boss.mid',
        hint: 'Driving boss battle music when fighting Robotnik in Sonic 2',
        category: 'games'
      },
      {
        id: 'sonic-3-death-egg-1',
        title: 'Death Egg Zone Act 1',
        artist: 'Brad Buxer',
        path: '/midi/sonic-3-death-egg-1.mid',
        hint: 'Menacing space station level theme from Sonic 3',
        category: 'games'
      },
      {
        id: 'sonic-3-death-egg-2',
        title: 'Death Egg Zone Act 2',
        artist: 'Brad Buxer',
        path: '/midi/sonic-3-death-egg-2.mid',
        hint: 'Intense high-tech theme for the final zone of Sonic 3',
        category: 'games'
      },
      {
        id: 'sonic-3-doomsday-zone',
        title: 'Doomsday Zone Theme',
        artist: 'Brad Buxer',
        path: '/midi/sonic-3-doomsday-zone.mid',
        hint: 'Epic orchestral-synth hybrid theme for the final boss in Sonic 3 & Knuckles',
        category: 'games'
      },
      {
        id: 'sonic-3-flying-battery',
        title: 'Flying Battery Zone Theme',
        artist: 'Brad Buxer',
        path: '/midi/sonic-3-flying-battery.mid',
        hint: 'Funky industrial battleship theme from Sonic & Knuckles',
        category: 'games'
      },
      {
        id: 'sonic-knuckles-theme',
        title: 'Knuckles\' Theme',
        artist: 'Brad Buxer',
        path: '/midi/sonic-knuckles-theme.mid',
        hint: 'Groovy, snare-heavy theme for Sonic\'s rival Knuckles',
        category: 'games'
      },
      {
        id: 'sonic-knuckles-lava-reef',
        title: 'Lava Reef Zone Act 1',
        artist: 'Brad Buxer',
        path: '/midi/sonic-knuckles-lava-reef.mid',
        hint: 'Atmospheric, volcanic level theme from Sonic & Knuckles',
        category: 'games'
      },
      {
        id: 'streets-of-rage-boss',
        title: 'Streets of Rage Boss Theme',
        artist: 'Yuzo Koshiro',
        path: '/midi/streets-of-rage-boss.mid',
        hint: 'Tense, house-music boss fight theme from the classic beat-em-up',
        category: 'games'
      },
      {
        id: 'streets-of-rage-stage-1',
        title: 'Fighting In the Street',
        artist: 'Yuzo Koshiro',
        path: '/midi/streets-of-rage-stage-1.mid',
        hint: 'Iconic stage 1 theme of Streets of Rage 1 with deep bass',
        category: 'games'
      },
      {
        id: 'streets-of-rage-good-ending',
        title: 'Streets of Rage Good Ending',
        artist: 'Yuzo Koshiro',
        path: '/midi/streets-of-rage-good-ending.mid',
        hint: 'Peaceful house music track played during Streets of Rage 1 credits',
        category: 'games'
      },
      {
        id: 'streets-of-rage-round-3',
        title: 'Dilapidated Town',
        artist: 'Yuzo Koshiro',
        path: '/midi/streets-of-rage-round-3.mid',
        hint: 'Bouncy synth-pop level theme from Streets of Rage 1',
        category: 'games'
      },
      {
        id: 'golden-axe-intro',
        title: 'Golden Axe Intro Theme',
        artist: 'You Takada',
        path: '/midi/golden-axe-intro.mid',
        hint: 'Epic fantasy intro theme for Sega\'s side-scrolling hack-and-slash',
        category: 'games'
      },
      {
        id: 'golden-axe-battlefield',
        title: 'Wilderness Theme',
        artist: 'You Takada',
        path: '/midi/golden-axe-battlefield.mid',
        hint: 'Heroic level 1 battlefield music from Golden Axe',
        category: 'games'
      },
      {
        id: 'golden-axe-ending',
        title: 'Golden Axe Conclusion',
        artist: 'You Takada',
        path: '/midi/golden-axe-ending.mid',
        hint: 'Short brass-heavy fanfare ending theme from Golden Axe',
        category: 'games'
      },
      {
        id: 'shinobi-chinatown',
        title: 'Chinatown Theme',
        artist: 'Yuzo Koshiro',
        path: '/midi/shinobi-chinatown.mid',
        hint: 'Jazzy ninja level theme from The Revenge of Shinobi',
        category: 'games'
      },
      {
        id: 'shinobi-long-distance',
        title: 'Long Distance',
        artist: 'Yuzo Koshiro',
        path: '/midi/shinobi-long-distance.mid',
        hint: 'Melodious fast-paced level theme from Revenge of Shinobi',
        category: 'games'
      },
      {
        id: 'toejam-earl-intro',
        title: 'ToeJam & Earl Intro',
        artist: 'John Baker',
        path: '/midi/toejam-earl-intro.mid',
        hint: 'Extremely funky hip-hop theme for the alien duo ToeJam & Earl',
        category: 'games'
      },
      {
        id: 'vectorman-ocean',
        title: 'Ocean Level Theme',
        artist: 'Jon Holland',
        path: '/midi/vectorman-ocean.mid',
        hint: 'Chill techno beats from Vectorman\'s ocean floor levels',
        category: 'games'
      },
      {
        id: 'vectorman-theme',
        title: 'Vectorman Main Theme',
        artist: 'Jon Holland',
        path: '/midi/vectorman-theme.mid',
        hint: 'High-energy industrial electronic theme for Vectorman',
        category: 'games'
      },
      {
        id: 'ecco-2-title',
        title: 'Ecco 2 Title Screen',
        artist: 'Spencer Nilsen',
        path: '/midi/ecco-2-title.mid',
        hint: 'Beautiful oceanic ambient title music from Ecco 2',
        category: 'games'
      },
      {
        id: 'ecco-2-future-fish',
        title: 'Future Fish Theme',
        artist: 'Spencer Nilsen',
        path: '/midi/ecco-2-future-fish.mid',
        hint: 'Relaxing soundscape from the second Ecco game',
        category: 'games'
      },
      {
        id: 'ristar-level-1',
        title: 'Ristar Level 1 Theme',
        artist: 'Tomoko Sasaki',
        path: '/midi/ristar-level-1.mid',
        hint: 'Cheery and bright level theme for Sega\'s shooting star platformer',
        category: 'games'
      },
      {
        id: 'ristar-boss-battle',
        title: 'Ristar Boss Theme',
        artist: 'Tomoko Sasaki',
        path: '/midi/ristar-boss-battle.mid',
        hint: 'Upbeat and quick boss theme from Ristar',
        category: 'games'
      },
      {
        id: 'gunstar-heroes-intro',
        title: 'Gunstar Heroes Intro',
        artist: 'Norio Hanzawa',
        path: '/midi/gunstar-heroes-intro.mid',
        hint: 'Fast-paced rock and synth intro theme for Treasure\'s run-and-gun',
        category: 'games'
      },
      {
        id: 'gunstar-heroes-ancient-ruins',
        title: 'Ancient Ruins Theme',
        artist: 'Norio Hanzawa',
        path: '/midi/gunstar-heroes-ancient-ruins.mid',
        hint: 'High-tempo stage 1 ruins theme from Gunstar Heroes',
        category: 'games'
      },

      {
        id: 'mario',
        title: 'Super Mario Bros. Main Theme',
        artist: 'Koji Kondo',
        path: '/midi/mario.mid',
        hint: 'NES classic about a plumber rescuing a princess in the Mushroom Kingdom',
        category: 'games'
      },
      {
        id: 'zelda',
        title: 'The Legend of Zelda Theme',
        artist: 'Koji Kondo',
        path: '/midi/zelda.mid',
        hint: 'NES classic action-adventure theme for a hero named Link',
        category: 'games'
      },
      {
        id: 'tetris',
        title: 'Tetris Theme (Korobeiniki)',
        artist: 'Hirokazu Tanaka',
        path: '/midi/tetris.mid',
        hint: 'A Russian folk song turned blocks-stacking puzzle theme',
        category: 'games'
      },
      {
        id: 'sonic-2-chemical-plant-zone',
        title: 'Chemical Plant Zone Theme',
        artist: 'Masato Nakamura',
        path: '/midi/sonic-2-chemical-plant-zone.mid',
        hint: 'Iconic synth bassline and upbeat melody from Sonic the Hedgehog 2',
        category: 'games'
      },
      {
        id: 'sonic-3-ice-cap-zone',
        title: 'Ice Cap Zone Act 1 Theme',
        artist: 'Brad Buxer',
        path: '/midi/sonic-3-ice-cap-zone.mid',
        hint: 'Famous synth-wave sounding cold zone theme from Sonic the Hedgehog 3',
        category: 'games'
      },
      {
        id: 'rickroll',
        title: 'Never Gonna Give You Up',
        artist: 'Rick Astley',
        path: '/midi/rickroll.mid',
        hint: 'The ultimate 80s pop song used to prank people on the internet',
        category: 'pop'
      },
      {
        id: 'billiejean',
        title: 'Billie Jean',
        artist: 'Michael Jackson',
        path: '/midi/billiejean.mid',
        hint: 'Michael Jackson 80s hit with an iconic bassline and moonwalk dance',
        category: 'pop'
      },
      {
        id: 'takeonme',
        title: 'Take On Me',
        artist: 'A-ha',
        path: '/midi/takeonme.mid',
        hint: '80s synth-pop track by Norwegian band A-ha with a famous high-pitched chorus',
        category: 'pop'
      }
    ];

    // Combine local and remote entries
    const combinedGames = [...localSongsMeta.filter(s => s.category === 'games'), ...finalGames];
    const combinedPop = [...localSongsMeta.filter(s => s.category === 'pop'), ...finalPop];
    const songsList = [...combinedGames, ...combinedPop];

    let dictionaryUpdated = false;

    // Map each song through our metadata dictionary to clean up tags
    const enhancedSongsList = songsList.map(s => {
      if (metadataDictionary[s.id]) {
        const dictEntry = metadataDictionary[s.id];
        
        // Correct metadata dictionary category if it disagrees with build_library's classification
        if (s.category === 'games' && dictEntry.category === 'pop') {
          console.log(`[CORRECTION] Reclassifying dictionary entry "${s.id}" from pop to games.`);
          dictEntry.category = 'games';
          dictEntry.genre = 'game';
          if (dictEntry.hint && dictEntry.hint.startsWith('Famous pop/rock hit')) {
            dictEntry.hint = `Iconic soundtrack theme from the game ${s.title}`;
          }
          dictionaryUpdated = true;
        } else if (s.category === 'pop' && dictEntry.category === 'games') {
          const hasManualGameMeta = dictEntry.game || dictEntry.franchise || dictEntry.company;
          if (hasManualGameMeta) {
            s.category = 'games';
          } else {
            console.log(`[CORRECTION] Reclassifying dictionary entry "${s.id}" from games to pop.`);
            dictEntry.category = 'pop';
            dictEntry.genre = 'pop';
            if (dictEntry.hint && dictEntry.hint.startsWith('Iconic soundtrack theme')) {
              dictEntry.hint = `Famous pop/rock hit by ${dictEntry.artist || 'Various Artists'}`;
            }
            // Clear game-specific properties
            delete dictEntry.game;
            delete dictEntry.franchise;
            delete dictEntry.company;
            dictionaryUpdated = true;
          }
        }

        return {
          ...s,
          ...dictEntry
        };
      }

      // Default tags if not in dictionary
      let decade = '80s';
      let genre = s.category === 'games' ? 'game' : 'pop';
      let year = 1985;
      let style = s.category === 'games' ? 'Chiptune' : 'Pop';

      // Guess year and decade from name/path
      const pathLower = s.path.toLowerCase();
      const titleLower = s.title.toLowerCase();
      const artistLower = s.artist.toLowerCase();

      // Look for 4 digit numbers representing years between 1950 and 2029
      const yearMatch = s.path.match(/\b(19[5-9]\d|20[0-2]\d)\b/);
      if (yearMatch) {
        year = parseInt(yearMatch[1], 10);
      } else {
        // Fallback guess based on keywords
        if (pathLower.includes('retro') || pathLower.includes('60s') || pathLower.includes('70s')) year = 1975;
        else if (pathLower.includes('80s') || pathLower.includes('classic')) year = 1985;
        else if (pathLower.includes('90s') || pathLower.includes('grunge')) year = 1995;
        else if (pathLower.includes('2000s')) year = 2005;
        else if (pathLower.includes('2010s') || pathLower.includes('waif')) year = 2015;
        else if (pathLower.includes('2020s') || pathLower.includes('doors')) year = 2022;
      }

      // Determine decade based on year
      if (year < 1980) decade = 'retro';
      else if (year < 1990) decade = '80s';
      else if (year < 2000) decade = '90s';
      else if (year < 2010) decade = '2000s';
      else if (year < 2020) decade = '2010s';
      else decade = '2020s';

      // Guess Style & Genre
      if (s.category === 'games') {
        if (titleLower.includes('orchestra') || titleLower.includes('symphon') || pathLower.includes('zelda') || pathLower.includes('skyrim') || pathLower.includes('heavensward')) {
          style = 'Orchestral';
        } else if (titleLower.includes('metal') || titleLower.includes('guitar') || pathLower.includes('doom') || pathLower.includes('ultrakill')) {
          style = 'Rock';
        } else if (titleLower.includes('piano') || titleLower.includes('lullaby') || titleLower.includes('wet hands')) {
          style = 'Piano';
        } else if (titleLower.includes('dance') || titleLower.includes('edm') || titleLower.includes('electronic') || titleLower.includes('cyber') || pathLower.includes('doors') || pathLower.includes('geometry')) {
          style = 'Electronic';
        } else {
          style = 'Chiptune';
        }
      } else {
        // Pop category
        if (titleLower.includes('metal') || artistLower.includes('metallica') || artistLower.includes('sabbath') || artistLower.includes('linkin park')) {
          genre = 'metal';
          style = 'Heavy Metal';
        } else if (titleLower.includes('rap') || titleLower.includes('hip hop') || titleLower.includes('hiphop') || artistLower.includes('doom') || artistLower.includes('ricch') || artistLower.includes('coolio')) {
          genre = 'hiphop';
          style = 'Hip Hop';
        } else if (titleLower.includes('edm') || titleLower.includes('electronic') || titleLower.includes('dance') || titleLower.includes('house') || artistLower.includes('avicii') || artistLower.includes('daft punk')) {
          genre = 'electronic';
          style = 'Electronic';
        } else if (titleLower.includes('acoustic') || titleLower.includes('folk') || artistLower.includes('america') || artistLower.includes('fleetwood')) {
          genre = 'folk';
          style = 'Folk';
        } else if (titleLower.includes('hymn') || titleLower.includes('sabbath') || titleLower.includes('traditional') || artistLower.includes('vivaldi') || titleLower.includes('beautiful')) {
          genre = 'traditional';
          style = 'Traditional';
        } else if (titleLower.includes('theme') || titleLower.includes('soundtrack') || titleLower.includes('movie') || titleLower.includes('avengers')) {
          genre = 'soundtrack';
          style = 'Soundtrack';
        } else if (titleLower.includes('rock') || artistLower.includes('queen') || artistLower.includes('acdc') || artistLower.includes('green day') || artistLower.includes('arctic monkeys') || artistLower.includes('coldplay') || artistLower.includes('beatles') || artistLower.includes('radiohead') || artistLower.includes('pink floyd') || artistLower.includes('led zeppelin') || artistLower.includes('oasis')) {
          genre = 'rock';
          style = 'Rock';
        } else {
          genre = 'pop';
          style = 'Pop';
        }
      }

      return {
        ...s,
        decade,
        genre,
        year,
        style
      };
    });

    // Write file content
    const codeContent = `export interface Song {
  id: string;
  title: string;
  artist: string;
  path: string;
  hint: string;
  category: 'games' | 'pop';
  decade: 'retro' | '80s' | '90s' | '2000s' | '2010s' | '2020s';
  genre: 'game' | 'pop' | 'rock' | 'electronic' | 'hiphop' | 'metal' | 'folk' | 'traditional' | 'soundtrack';
  year: number;
  style: string;
  game?: string;
  franchise?: string;
  company?: string;
}

export const SONGS: Song[] = ${JSON.stringify(enhancedSongsList, null, 2)};
`;

    fs.writeFileSync(songsFile, codeContent, 'utf-8');
    
    if (dictionaryUpdated) {
      console.log('Writing dictionary corrections back to metadata_dictionary.js...');
      const dictFile = path.join(__dirname, 'metadata_dictionary.js');
      const dictContent = `export const metadataDictionary = ${JSON.stringify(metadataDictionary, null, 2)};\n`;
      fs.writeFileSync(dictFile, dictContent, 'utf-8');
      console.log('Successfully updated metadata_dictionary.js!');
    }

    console.log(`Successfully generated src/songs.ts with ${combinedGames.length} Game songs and ${combinedPop.length} Pop songs (Total: ${enhancedSongsList.length}).`);

  } catch (error) {
    console.error('Error generating library:', error.message);
  }
}

build();
