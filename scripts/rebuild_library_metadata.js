import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const songsFile = path.join(__dirname, '../src/songs.ts');

function classifySong(song) {
  const title = song.title.toLowerCase();
  const artist = song.artist.toLowerCase();
  const pathStr = song.path.toLowerCase();

  let decade = '80s'; // default
  let genre = 'pop';  // default

  // 1. Detect Genre
  if (
    song.category === 'games' || 
    pathStr.includes('mario') || 
    pathStr.includes('zelda') || 
    pathStr.includes('tetris') || 
    pathStr.includes('portal') || 
    pathStr.includes('minecraft') || 
    pathStr.includes('undertale') || 
    pathStr.includes('hollow') || 
    pathStr.includes('clash') || 
    pathStr.includes('deltarune') || 
    pathStr.includes('roblox') || 
    pathStr.includes('pokemon') ||
    pathStr.includes('game')
  ) {
    genre = 'game';
  } else if (
    artist.includes('acdc') || 
    artist.includes('ac/dc') || 
    artist.includes('green day') || 
    artist.includes('arctic monkeys') || 
    artist.includes('metallica') || 
    artist.includes('pink floyd') || 
    artist.includes('led zeppelin') || 
    artist.includes('radiohead') || 
    artist.includes('smashing pumpkins') || 
    artist.includes('sublime') || 
    artist.includes('soundgarden') || 
    artist.includes('pearl jam') || 
    artist.includes('weezer') || 
    artist.includes('linkin park') || 
    artist.includes('sabbath') || 
    artist.includes('bowie') || 
    artist.includes('queen') || 
    artist.includes('nirvana') || 
    artist.includes('oasis') || 
    artist.includes('bon jovi') || 
    artist.includes('journey') || 
    artist.includes('van halen') || 
    artist.includes('guns n roses') || 
    artist.includes('scorpions') || 
    artist.includes('deep purple') ||
    title.includes('guns') ||
    title.includes('paranoid')
  ) {
    genre = 'rock';
  }

  // 2. Detect Decade
  // Retro (60s/70s)
  if (
    artist.includes('beatles') || 
    artist.includes('led zeppelin') || 
    artist.includes('pink floyd') || 
    artist.includes('sinatra') || 
    artist.includes('america') || 
    title.includes('america the beautiful') ||
    artist.includes('abba') && title.includes('waterloo')
  ) {
    decade = 'retro';
  }
  // 90s
  else if (
    artist.includes('nirvana') || 
    (artist.includes('green day') && !title.includes('american idiot') && !title.includes('boulevard') && !title.includes('holiday') && !title.includes('september')) || 
    artist.includes('smashing pumpkins') || 
    artist.includes('sublime') || 
    artist.includes('soundgarden') || 
    artist.includes('pearl jam') || 
    artist.includes('coolio') || 
    artist.includes('fugees') || 
    artist.includes('tlc') || 
    artist.includes('soda stereo') || 
    artist.includes('celine dion') || 
    artist.includes('shania twain') || 
    artist.includes('sheryl crow') || 
    artist.includes('alanis') || 
    title.includes('1979') || 
    pathStr.includes('land-2') || 
    pathStr.includes('mario-64') || 
    pathStr.includes('rpg-forest') ||
    title.includes('creutz')
  ) {
    decade = '90s';
  }
  // 2000s
  else if (
    (artist.includes('coldplay') && (title.includes('yellow') || title.includes('clocks'))) || 
    artist.includes('linkin park') || 
    artist.includes('blink') || 
    artist.includes('smash mouth') || 
    artist.includes('weezer') || 
    title.includes('american idiot') || 
    title.includes('holiday') || 
    title.includes('boulevard') || 
    title.includes('september') || 
    title.includes('still standing') || 
    pathStr.includes('portal-still-alive') || 
    pathStr.includes('portal-2') || 
    pathStr.includes('smash-bros')
  ) {
    decade = '2000s';
  }
  // 2010s
  else if (
    artist.includes('avicii') || 
    (artist.includes('coldplay') && title.includes('viva la vida')) || 
    (pathStr.includes('minecraft') && !title.includes('creator')) || 
    (pathStr.includes('hollow') && !title.includes('disarm') && !title.includes('zero')) || 
    pathStr.includes('clash') || 
    pathStr.includes('rdr2') || 
    pathStr.includes('geometry') || 
    pathStr.includes('among') ||
    title.includes('ballin')
  ) {
    decade = '2010s';
  }
  // 2020s
  else if (
    (title.includes('creator') && pathStr.includes('minecraft')) || 
    title.includes('elevator jam') || 
    pathStr.includes('undertale-yellow') || 
    pathStr.includes('doors')
  ) {
    decade = '2020s';
  }

  // Adjust specific core manual mappings
  if (song.id === 'mario' || song.id === 'zelda' || song.id === 'tetris') {
    decade = '80s';
    genre = 'game';
  } else if (song.id === 'rickroll' || song.id === 'billiejean' || song.id === 'takeonme') {
    decade = '80s';
    genre = 'pop';
  }

  return { decade, genre };
}

function start() {
  console.log('Loading songs.ts database...');
  const content = fs.readFileSync(songsFile, 'utf-8');
  const startIdx = content.indexOf('[', content.indexOf('='));
  const endIdx = content.lastIndexOf(']') + 1;
  
  if (startIdx === -1 || endIdx === -1) {
    console.error('Could not parse SONGS array');
    return;
  }

  const songs = JSON.parse(content.substring(startIdx, endIdx));
  console.log(`Loaded ${songs.length} songs. Applying decade and genre classifications...`);

  const updatedSongs = songs.map(s => {
    const classification = classifySong(s);
    return {
      ...s,
      decade: classification.decade,
      genre: classification.genre
    };
  });

  const codeContent = `export interface Song {
  id: string;
  title: string;
  artist: string;
  path: string;
  hint: string;
  category: 'games' | 'pop';
  decade: 'retro' | '80s' | '90s' | '2000s' | '2010s' | '2020s';
  genre: 'game' | 'pop' | 'rock';
}

export const SONGS: Song[] = ${JSON.stringify(updatedSongs, null, 2)};
`;

  fs.writeFileSync(songsFile, codeContent, 'utf-8');
  console.log('Successfully updated songs.ts with decade and genre properties!');
}

start();
