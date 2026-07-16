import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { metadataDictionary } from './metadata_dictionary.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const songsFile = path.join(__dirname, '../src/songs.ts');

function classifySong(song) {
  const title = song.title.toLowerCase();
  const artist = song.artist.toLowerCase();
  const pathStr = song.path.toLowerCase();

  let decade = '80s'; // default
  let genre = 'pop';  // default
  let year = 1985;
  let style = 'Pop';

  // 1. Detect Genre
  if (
    song.category === 'games' || 
    pathStr.includes('mario') || 
    pathStr.includes('zelda') || 
    pathStr.includes('tetris') || 
    pathStr.includes('portal') || 
    pathStr.includes('minecraft') || 
    pathStr.includes('undertale') || 
    pathStr.includes('deltarune') || 
    pathStr.includes('roblox') || 
    pathStr.includes('pokemon')
  ) {
    genre = 'game';
    style = 'Chiptune';
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
    style = 'Rock';
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
    (artist.includes('abba') && title.includes('waterloo'))
  ) {
    decade = 'retro';
    year = 1972;
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
    year = 1995;
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
    year = 2004;
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
    year = 2014;
  }
  // 2020s
  else if (
    (title.includes('creator') && pathStr.includes('minecraft')) || 
    title.includes('elevator jam') || 
    pathStr.includes('undertale-yellow') || 
    pathStr.includes('doors')
  ) {
    decade = '2020s';
    year = 2022;
  }

  return { decade, genre, year, style };
}

function assignCompanyAndFranchise(song) {
  if (song.category !== 'games') return song;

  const titleLower = (song.title || '').toLowerCase();
  const gameLower = (song.game || '').toLowerCase();
  const franchiseLower = (song.franchise || '').toLowerCase();
  let pathDecoded = (song.path || '');
  try {
    pathDecoded = decodeURIComponent(pathDecoded);
  } catch (e) {}
  const pathLower = pathDecoded.toLowerCase();
  const searchStr = `${titleLower} ${gameLower} ${franchiseLower} ${pathLower}`;

  // Nintendo
  const nintendoKeywords = ['mario', 'zelda', 'pokemon', 'pokémon', 'kirby', 'donkey kong', 'smash bros', 'super smash', 'animal crossing', 'metroid', 'star fox', 'starfox', 'fire emblem', 'earthbound', 'mother 3', 'luigi', 'yoshi', 'wii', 'mii', 'nintendo'];
  if (nintendoKeywords.some(kw => searchStr.includes(kw))) {
    if (!song.company) song.company = 'Nintendo';
    if (!song.franchise) {
      if (searchStr.includes('mario') || searchStr.includes('luigi') || searchStr.includes('yoshi')) song.franchise = 'Super Mario';
      else if (searchStr.includes('zelda')) song.franchise = 'The Legend of Zelda';
      else if (searchStr.includes('pokemon') || searchStr.includes('pokémon')) song.franchise = 'Pokémon';
      else if (searchStr.includes('kirby')) song.franchise = 'Kirby';
      else if (searchStr.includes('donkey kong')) song.franchise = 'Donkey Kong';
      else if (searchStr.includes('smash')) song.franchise = 'Super Smash Bros.';
      else if (searchStr.includes('animal crossing')) song.franchise = 'Animal Crossing';
      else if (searchStr.includes('metroid')) song.franchise = 'Metroid';
      else if (searchStr.includes('star fox') || searchStr.includes('starfox')) song.franchise = 'Star Fox';
      else if (searchStr.includes('fire emblem')) song.franchise = 'Fire Emblem';
      else if (searchStr.includes('earthbound') || searchStr.includes('mother 3')) song.franchise = 'EarthBound';
      else if (searchStr.includes('wii') || searchStr.includes('mii')) song.franchise = 'Wii';
    }
  }

  // Sega
  if (searchStr.includes('sonic') || searchStr.includes('yakuza') || searchStr.includes('baka mitai') || searchStr.includes('dame da ne')) {
    if (!song.company) song.company = 'Sega';
    if (!song.franchise) {
      if (searchStr.includes('sonic')) song.franchise = 'Sonic the Hedgehog';
      else if (searchStr.includes('yakuza') || searchStr.includes('baka mitai') || searchStr.includes('dame da ne')) song.franchise = 'Yakuza';
    }
  }

  // Mojang
  if (searchStr.includes('minecraft') || searchStr.includes('c418') || searchStr.includes('sweden') || searchStr.includes('mice on venus') || searchStr.includes('aria math')) {
    if (!song.company) song.company = 'Mojang';
    if (!song.franchise) song.franchise = 'Minecraft';
  }

  // Valve
  if (searchStr.includes('portal') || searchStr.includes('half-life') || searchStr.includes('team fortress') || searchStr.includes('tf2') || searchStr.includes('valve')) {
    if (!song.company) song.company = 'Valve';
    if (!song.franchise) {
      if (searchStr.includes('portal')) song.franchise = 'Portal';
      else if (searchStr.includes('half-life')) song.franchise = 'Half-Life';
      else if (searchStr.includes('team fortress') || searchStr.includes('tf2')) song.franchise = 'Team Fortress';
    }
  }

  // Square Enix
  if (searchStr.includes('final fantasy') || searchStr.includes('kingdom hearts') || searchStr.includes('chrono')) {
    if (!song.company) song.company = 'Square Enix';
    if (!song.franchise) {
      if (searchStr.includes('final fantasy')) song.franchise = 'Final Fantasy';
      else if (searchStr.includes('kingdom hearts')) song.franchise = 'Kingdom Hearts';
      else if (searchStr.includes('chrono')) song.franchise = 'Chrono';
    }
  }

  // Roblox
  if (searchStr.includes('roblox') || searchStr.includes('doors') || searchStr.includes('deepwoken')) {
    if (!song.company) song.company = 'Roblox';
    if (!song.franchise) {
      if (searchStr.includes('deepwoken')) song.franchise = 'Deepwoken';
      else if (searchStr.includes('doors')) song.franchise = 'Roblox Doors';
      else song.franchise = 'Roblox';
    }
  }

  // Rockstar Games
  if (searchStr.includes('red dead') || searchStr.includes('rdr') || searchStr.includes('gta') || searchStr.includes('grand theft auto')) {
    if (!song.company) song.company = 'Rockstar Games';
    if (!song.franchise) {
      if (searchStr.includes('red dead') || searchStr.includes('rdr')) song.franchise = 'Red Dead Redemption';
      else if (searchStr.includes('gta') || searchStr.includes('grand theft auto')) song.franchise = 'Grand Theft Auto';
    }
  }

  // miHoYo / HoYoverse
  if (searchStr.includes('genshin') || searchStr.includes('honkai') || searchStr.includes('furina') || searchStr.includes('liyue')) {
    if (!song.company) song.company = 'miHoYo';
    if (!song.franchise) song.franchise = 'Genshin Impact';
  }

  // Scott Cawthon (Five Nights at Freddy's)
  if (searchStr.includes('fnaf') || searchStr.includes('five nights') || searchStr.includes('shadow bonnie') || searchStr.includes('bonnie') || searchStr.includes('toreador') || searchStr.includes('die in a fire') || searchStr.includes('i got no time') || searchStr.includes('it\'s been so long')) {
    if (!song.company) song.company = 'Indie';
    if (!song.franchise) song.franchise = 'Five Nights at Freddy\'s';
  }

  // Ubisoft
  if (searchStr.includes('assassin') || searchStr.includes('rogue') || searchStr.includes('black flag')) {
    if (!song.company) song.company = 'Ubisoft';
    if (!song.franchise) song.franchise = 'Assassin\'s Creed';
  }

  // The Behemoth
  if (searchStr.includes('castle crashers') || searchStr.includes('castle-crashers') || searchStr.includes('jumper')) {
    if (!song.company) song.company = 'The Behemoth';
    if (!song.franchise) song.franchise = 'Castle Crashers';
  }

  // Team Shanghai Alice (Touhou Project)
  if (searchStr.includes('touhou') || searchStr.includes('bad apple') || searchStr.includes('bad-apple')) {
    if (!song.company) song.company = 'Team Shanghai Alice';
    if (!song.franchise) song.franchise = 'Touhou Project';
  }

  // Capcom
  if (searchStr.includes('asura') || searchStr.includes('street fighter') || searchStr.includes('devil may cry')) {
    if (!song.company) song.company = 'Capcom';
    if (!song.franchise) {
      if (searchStr.includes('asura')) song.franchise = 'Asura\'s Wrath';
      else if (searchStr.includes('street fighter')) song.franchise = 'Street Fighter';
      else if (searchStr.includes('devil may cry')) song.franchise = 'Devil May Cry';
    }
  }

  // Toby Fox / Indie (Undertale / Deltarune / Omori / OneShot / FNF / Library of Ruina / Ultrakill)
  const indieKeywords = [
    'undertale', 'deltarune', 'omori', 'duet', 'my time', 'tussle among trees',
    'oneshot', 'children of the ruins', 'my burden is light', 'on little cat feet', 'solstice', 'eleventh hour',
    'fnf', 'funkin', 'ballistic',
    'library of ruina', 'limbus company', 'gone angels', 'mili',
    'ultrakill', 'castle vein', 'order from ultrakill'
  ];
  if (indieKeywords.some(kw => searchStr.includes(kw))) {
    if (!song.company) song.company = 'Indie';
    if (!song.franchise) {
      if (searchStr.includes('undertale')) song.franchise = 'Undertale';
      else if (searchStr.includes('deltarune')) song.franchise = 'Deltarune';
      else if (searchStr.includes('omori') || searchStr.includes('duet') || searchStr.includes('my time') || searchStr.includes('tussle among trees')) song.franchise = 'Omori';
      else if (searchStr.includes('oneshot') || searchStr.includes('children of the ruins') || searchStr.includes('my burden is light') || searchStr.includes('on little cat feet') || searchStr.includes('solstice') || searchStr.includes('eleventh hour')) song.franchise = 'OneShot';
      else if (searchStr.includes('fnf') || searchStr.includes('funkin') || searchStr.includes('ballistic')) song.franchise = 'Friday Night Funkin\'';
      else if (searchStr.includes('library of ruina') || searchStr.includes('gone angels') || searchStr.includes('mili')) song.franchise = 'Library of Ruina';
      else if (searchStr.includes('limbus company')) song.franchise = 'Limbus Company';
      else if (searchStr.includes('ultrakill') || searchStr.includes('castle vein') || searchStr.includes('order from ultrakill')) song.franchise = 'Ultrakill';
    }
  }

  // Cuphead
  if (searchStr.includes('cuphead')) {
    if (!song.company) song.company = 'Studio MDHR';
    if (!song.franchise) song.franchise = 'Cuphead';
  }

  // Hollow Knight
  if (searchStr.includes('hollow knight') || searchStr.includes('hollowknight') || searchStr.includes('hollow-knight')) {
    if (!song.company) song.company = 'Team Cherry';
    if (!song.franchise) song.franchise = 'Hollow Knight';
  }

  // Stalker
  if (searchStr.includes('stalker') || searchStr.includes('journey seem long')) {
    if (!song.company) song.company = 'GSC Game World';
    if (!song.franchise) song.franchise = 'S.T.A.L.K.E.R.';
  }

  // Activision
  if (searchStr.includes('cod') || searchStr.includes('call of duty') || searchStr.includes('black ops') || searchStr.includes('kino der toten')) {
    if (!song.company) song.company = 'Activision';
    if (!song.franchise) song.franchise = 'Call of Duty';
  }

  // Bethesda
  if (searchStr.includes('skyrim') || searchStr.includes('morrowind') || searchStr.includes('elder scrolls') || searchStr.includes('oblivion') || searchStr.includes('fallout') || searchStr.includes('doom')) {
    if (!song.company) {
      if (searchStr.includes('doom')) song.company = 'id Software';
      else song.company = 'Bethesda';
    }
    if (!song.franchise) {
      if (searchStr.includes('doom')) song.franchise = 'Doom';
      else if (searchStr.includes('fallout')) song.franchise = 'Fallout';
      else song.franchise = 'The Elder Scrolls';
    }
  }

  // PopCap
  if (searchStr.includes('pvz') || searchStr.includes('plants vs zombies') || searchStr.includes('grasswalk')) {
    if (!song.company) song.company = 'PopCap';
    if (!song.franchise) song.franchise = 'Plants vs. Zombies';
  }

  // Supercell
  if (searchStr.includes('clash royale') || searchStr.includes('clash of clans') || searchStr.includes('clash')) {
    if (!song.company) song.company = 'Supercell';
    if (!song.franchise) song.franchise = 'Clash Royale';
  }

  // The Tetris Company
  if (searchStr.includes('tetris') || searchStr.includes('korobeiniki')) {
    if (!song.company) song.company = 'The Tetris Company';
    if (!song.franchise) song.franchise = 'Tetris';
  }

  // Mobius Digital
  if (searchStr.includes('outer wilds')) {
    if (!song.company) song.company = 'Indie';
    if (!song.franchise) song.franchise = 'Outer Wilds';
  }

  // Blizzard
  if (searchStr.includes('warcraft') || searchStr.includes('starcraft') || searchStr.includes('diablo') || searchStr.includes('overwatch')) {
    if (!song.company) song.company = 'Blizzard';
    if (!song.franchise) {
      if (searchStr.includes('warcraft')) song.franchise = 'World of Warcraft';
      else if (searchStr.includes('starcraft')) song.franchise = 'StarCraft';
      else if (searchStr.includes('diablo')) song.franchise = 'Diablo';
      else if (searchStr.includes('overwatch')) song.franchise = 'Overwatch';
    }
  }

  // Microsoft / Bungie
  if (searchStr.includes('halo')) {
    if (!song.company) song.company = 'Microsoft';
    if (!song.franchise) song.franchise = 'Halo';
  }

  // CD Projekt Red
  if (searchStr.includes('cyberpunk') || searchStr.includes('witcher') || searchStr.includes('kerry')) {
    if (!song.company) song.company = 'CD Projekt Red';
    if (!song.franchise) {
      if (searchStr.includes('cyberpunk') || searchStr.includes('kerry')) song.franchise = 'Cyberpunk';
      else if (searchStr.includes('witcher')) song.franchise = 'The Witcher';
    }
  }

  // Hypergryph
  if (searchStr.includes('arknights') || searchStr.includes('mortal eye') || searchStr.includes('y1k') || searchStr.includes('doctor')) {
    if (!song.company) song.company = 'Hypergryph';
    if (!song.franchise) song.franchise = 'Arknights';
  }

  // Roblox additions (Badliz / Decaying Winter)
  if (searchStr.includes('badliz') || searchStr.includes('great strategy') || searchStr.includes('decaying winter') || searchStr.includes('devil\'s lullaby')) {
    if (!song.company) song.company = 'Roblox';
    if (!song.franchise) {
      if (searchStr.includes('decaying winter') || searchStr.includes('devil\'s lullaby')) song.franchise = 'Decaying Winter';
      else if (searchStr.includes('badliz') || searchStr.includes('great strategy')) song.franchise = 'Roblox Strategy';
    }
  }

  // Bandai Namco / Anime Mappings
  if (searchStr.includes('jojo') || searchStr.includes('bloody stream') || searchStr.includes('sadame') || searchStr.includes('awaken') || searchStr.includes('gundam') || searchStr.includes('sword art') || searchStr.includes('sao') || searchStr.includes('isabella') || searchStr.includes('promised neverland') || searchStr.includes('neverland')) {
    if (!song.company) song.company = 'Bandai Namco';
    if (!song.franchise) {
      if (searchStr.includes('jojo') || searchStr.includes('bloody stream') || searchStr.includes('sadame') || searchStr.includes('awaken')) song.franchise = 'JoJo\'s Bizarre Adventure';
      else if (searchStr.includes('gundam')) song.franchise = 'Mobile Suit Gundam';
      else if (searchStr.includes('sword art') || searchStr.includes('sao')) song.franchise = 'Sword Art Online';
      else if (searchStr.includes('isabella') || searchStr.includes('promised neverland') || searchStr.includes('neverland')) song.franchise = 'The Promised Neverland';
    }
  }

  // Indie additions (Underverse / SMG4)
  if (searchStr.includes('underverse') || searchStr.includes('mr. puzzles') || searchStr.includes('smg4')) {
    if (!song.company) song.company = 'Indie';
    if (!song.franchise) {
      if (searchStr.includes('underverse')) song.franchise = 'Undertale (Underverse)';
      else if (searchStr.includes('mr. puzzles') || searchStr.includes('smg4')) song.franchise = 'SMG4';
    }
  }

  return song;
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
  console.log(`Loaded ${songs.length} songs. Applying corrections and classifications...`);

  const updatedSongs = songs.map(s => {
    let songObj;
    // If the song is in our metadata dictionary, use the exact hand-tagged details!
    if (metadataDictionary[s.id]) {
      songObj = {
        ...s,
        ...metadataDictionary[s.id]
      };
    } else {
      // Otherwise, apply legacy fallback classification
      const classification = classifySong(s);
      songObj = {
        ...s,
        decade: classification.decade,
        genre: classification.genre,
        year: s.year || classification.year,
        style: s.style || classification.style
      };
    }

    return assignCompanyAndFranchise(songObj);
  });

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

export const SONGS: Song[] = ${JSON.stringify(updatedSongs, null, 2)};
`;

  fs.writeFileSync(songsFile, codeContent, 'utf-8');
  console.log('Successfully updated songs.ts with enhanced tags!');
}

start();
