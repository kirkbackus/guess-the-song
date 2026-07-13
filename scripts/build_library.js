import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { metadataDictionary } from './metadata_dictionary.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const songsFile = path.join(__dirname, '../src/songs.ts');

const gameKeywords = [
  'mario', 'zelda', 'pokemon', 'pok%e9mon', 'sonic', 'halo', 'skyrim', 'undertale', 'portal', 'wii', 'minecraft', 
  'tetris', 'metroid', 'castlevania', 'final fantasy', 'chrono', 'megaman', 'mega man', 'pacman', 'pac-man', 'doom', 
  'street fighter', 'kirby', 'donkey kong', 'smash bros', 'super smash', 'hollow knight', 'spyro', 'crash bandicoot',
  'wind waker', 'ocarina', 'deltarune', 'sans', 'megalovania', 'roblox', 'geometry dash', 'among us',
  'luigi', 'yoshi', 'star fox', 'splatoon', 'animal crossing', 'fire emblem', 'kingdom hearts', 'persona',
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
  'danny', 'sweden', 'wet hands', 'wethands', 'pigstep', 'otherside', 'chirp', 'stal', 'strad', 'ward', 'mall', 'mellohi',
  'blocks', 'far', 'cat', 'dog', 'wait', '11', '13', 'aria math', 'taswell', 'ki', 'biome fest', 'haunt muskie',
  'blind spots', 'aria-math', 'chrysopoeia', 'rubedo', 'infinite amethyst', 'lullaby', 'floating trees', 'concrete halls',
  'moog city', 'moogcity', 'creative', 'spoke', 'subwoofer', 'lullaby', 'equinoxe', 'intro', 'key', 'oxygene', 'door',
  'clint eastwood', 'feel good inc', 'gorillaz', 'fifa', 'nintendo', 'sega', 'playstation', 'xbox', 'atari', 'konami',
  'capcom', 'square enix', 'ubisoft', 'ea sports', 'valve', 'bethesda', 'bioware', 'mojang', 'activision', 'blizzard',
  'steam', 'origin', 'epic games', 'gog', 'uplay', 'battle.net', 'ps1', 'ps2', 'ps3', 'ps4', 'ps5', 'nes', 'snes',
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
  'vampire killer', 'bloody tears', 'beginning', 'aquarius', 'slash', 'heart of fire', 'out of time', 'rondo of blood',
  'symphony of the night', 'sotn', 'lost painting', 'wood carving partitas', 'nocturne', 'dance of gold', 'requiem for the gods',
  'dracula castle', 'tower of mist', 'rainbow cemetery', 'marble gallery', 'clock tower', 'abandoned castle', 'curse of darkness',
  'portrait of ruin', 'order of ecclesia', 'bloodstained', 'miriam', 'ritual of the night', 'gehry', 'iamthekidyouknowwhatimean',
  'run', 'pixel-phil', 'wip', 'mizuguchi', 'rez', 'lumines', 'child of eden', 'tetris effect', 'journey', 'flower', 'flow',
  'abzu', 'telltale', 'walking dead', 'wolf among us', 'tales from the borderlands', 'borderlands', 'handsome jack',
  'claptrap', 'vault hunter', 'pandora', 'destiny', 'ghost shell', 'traveler', 'cayde', 'zavala', 'ikora', 'mara sov',
  'oryx', 'crota', 'atheon', 'vault of glass', 'crotas end', 'kings fall', 'wrath of the machine', 'leviathan',
  'last wish', 'scourge of the past', 'crown of sorrow', 'garden of salvation', 'deep stone crypt', 'vault of glass',
  'vow of the disciple', 'kings fall', 'root of nightmares', 'crotas end', 'salvations edge'
];

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
      const pathLower = f.path.toLowerCase();
      const isGame = gameKeywords.some(kw => pathLower.includes(kw));
      
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

    // Map each song through our metadata dictionary to clean up tags
    const enhancedSongsList = songsList.map(s => {
      if (metadataDictionary[s.id]) {
        return {
          ...s,
          ...metadataDictionary[s.id]
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
    console.log(`Successfully generated src/songs.ts with ${combinedGames.length} Game songs and ${combinedPop.length} Pop songs (Total: ${enhancedSongsList.length}).`);

  } catch (error) {
    console.error('Error generating library:', error.message);
  }
}

build();
