import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { metadataDictionary } from './metadata_dictionary.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const songsFile = path.join(__dirname, '../src/songs.ts');

const gameKeywords = [
  'mario', 'zelda', 'pokemon', 'sonic', 'halo', 'skyrim', 'undertale', 'portal', 'wii', 'minecraft', 
  'tetris', 'metroid', 'castlevania', 'final fantasy', 'chrono', 'megaman', 'pacman', 'doom', 
  'street fighter', 'kirby', 'donkey kong', 'smash bros', 'hollow knight', 'spyro', 'crash bandicoot',
  'wind waker', 'ocarina', 'deltarune', 'sans', 'megalovania', 'roblox', 'geometry dash', 'among us',
  'luigi', 'yoshi', 'star fox', 'splatoon', 'animal crossing', 'fire emblem', 'kingdom hearts', 'persona'
];

const popArtists = [
  'jackson', 'queen', 'abba', 'acdc', 'ac/dc', 'ace of base', 'america', 'green day', 'arctic monkeys', 
  'billy joel', 'elton john', 'madonna', 'prince', 'whitney', 'coldplay', 'bee gees', 'earth wind', 
  'stevie wonder', 'britney', 'bowie', 'rick astley', 'beatles', 'sinatra', 'a-ha', 'backstreet', 
  'jackson 5', 'journey', 'bon jovi', 'pink floyd', 'led zeppelin', 'linkin park', 'oasis', 'radiohead',
  'toto', 'every breath', 'bohemian rhapsody', 'stayin alive', 'thriller', 'beat it', 'take on me', 
  'metallica', 'fleetwood mac', 'phil collins', 'cyndi lauper', 'europe', 'wham', 'survivor', 
  'eurythmics', 'avicii', 'daft punk', 'red hot chili', 'u2', 'blink-182', 'gloria gaynor', 
  'ricky martin', 'smash mouth', 'van halen', 'guns n roses', 'scorpions', 'deep purple', 'starship', 
  'duran duran', 'simple minds', 'tears for fears', 'no doubt', 'celine dion', 'shania twain', 
  'sheryl crowd', 'alanis morissette', 'smashing pumpkins', 'sublime', 'soundgarden', 'pearl jam', 
  'weezer', 'fugees', 'coolio', 'will smith', 'tlc', 'destiny\'s child'
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
      const isPop = popArtists.some(pa => pathLower.includes(pa));
      
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
      } else if (isPop) {
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

    // Take exactly 100 (or cap at max available if slightly less)
    const finalGames = uniqueGames.slice(0, 97); // 97 remote + 3 local = 100
    const finalPop = uniquePop.slice(0, 97);    // 97 remote + 3 local = 100

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
    const combinedGames = [...localSongsMeta.filter(s => s.category === 'games'), ...finalGames].slice(0, 100);
    const combinedPop = [...localSongsMeta.filter(s => s.category === 'pop'), ...finalPop].slice(0, 100);
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
