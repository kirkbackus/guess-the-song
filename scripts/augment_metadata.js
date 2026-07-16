import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { metadataDictionary } from './metadata_dictionary.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const songsFile = path.join(__dirname, '../src/songs.ts');
const dictionaryFile = path.join(__dirname, 'metadata_dictionary.js');

// Parse command line arguments for limit
const args = process.argv.slice(2);
const limit = args[0] ? parseInt(args[0], 10) : 10;

// Load songs
console.log('Loading songs.ts...');
const content = fs.readFileSync(songsFile, 'utf-8');
const startIdx = content.indexOf('[', content.indexOf('='));
const endIdx = content.lastIndexOf(']') + 1;
const songsList = JSON.parse(content.substring(startIdx, endIdx));

console.log(`Loaded ${songsList.length} songs from database.`);

// Map iTunes genre to our database genre fields
function mapGenre(itunesGenre, category) {
  if (category === 'games') return 'game';
  
  const g = itunesGenre.toLowerCase();
  if (g.includes('pop') || g.includes('j-pop') || g.includes('k-pop')) return 'pop';
  if (g.includes('rock') || g.includes('alternative') || g.includes('punk')) return 'rock';
  if (g.includes('metal') || g.includes('grunge')) return 'metal';
  if (g.includes('electronic') || g.includes('dance') || g.includes('house') || g.includes('techno') || g.includes('trance') || g.includes('edm')) return 'electronic';
  if (g.includes('hip-hop') || g.includes('rap') || g.includes('r&b') || g.includes('soul')) return 'hiphop';
  if (g.includes('soundtrack') || g.includes('score') || g.includes('anime')) return 'soundtrack';
  if (g.includes('folk') || g.includes('country') || g.includes('singer')) return 'folk';
  if (g.includes('classical') || g.includes('holiday') || g.includes('gospel') || g.includes('traditional') || g.includes('hymn')) return 'traditional';
  
  return 'pop'; // default fallback
}

// Clean up album name to get the game title
function cleanGameName(albumName) {
  return albumName
    .replace(/\(original game soundtrack\)/i, '')
    .replace(/\(original soundtrack\)/i, '')
    .replace(/: original game soundtrack/i, '')
    .replace(/: original soundtrack/i, '')
    .replace(/ original game soundtrack/i, '')
    .replace(/ original soundtrack/i, '')
    .replace(/ soundtrack/i, '')
    .replace(/ ost$/i, '')
    .trim();
}

async function queryITunes(song) {
  let query = song.title;
  const hasRealArtist = song.artist && song.artist !== 'Video Game Composer' && song.artist !== 'Various Artists';
  if (hasRealArtist) {
    query = `${song.title} ${song.artist}`;
  }
  
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=music&limit=3`;
  console.log(`  [DEBUG] Querying iTunes: ${url}`);
  
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
    const data = await res.json();
    
    console.log(`  [DEBUG] iTunes returned ${data.results?.length || 0} results for primary query.`);
    
    if (!data.results || data.results.length === 0) {
      if (hasRealArtist) {
        const fallbackUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(song.title)}&media=music&limit=3`;
        console.log(`  [DEBUG] Primary query returned 0 results. Trying title-only fallback query: ${fallbackUrl}`);
        const fallbackRes = await fetch(fallbackUrl);
        const fallbackData = await fallbackRes.json();
        console.log(`  [DEBUG] Fallback query returned ${fallbackData.results?.length || 0} results.`);
        
        if (fallbackData.results && fallbackData.results.length > 0) {
          fallbackData.results.forEach((r, idx) => {
            console.log(`    [DEBUG] Fallback Result #${idx + 1}: "${r.trackName}" by "${r.artistName}" (Album: "${r.collectionName}", Genre: "${r.primaryGenreName}", Release: ${r.releaseDate})`);
          });
          return fallbackData.results[0];
        }
      }
      return null;
    }
    
    // Print all primary results for debug observation
    data.results.forEach((r, idx) => {
      console.log(`    [DEBUG] Primary Result #${idx + 1}: "${r.trackName}" by "${r.artistName}" (Album: "${r.collectionName}", Genre: "${r.primaryGenreName}", Release: ${r.releaseDate})`);
    });
    
    return data.results[0]; // Take the first result
  } catch (error) {
    console.error(`  [ERROR] Error querying iTunes API for "${query}":`, error.message);
    return null;
  }
}

async function run() {
  // Find candidates that need updates
  const candidates = songsList.filter(song => {
    const dictEntry = metadataDictionary[song.id];
    
    // If not in dictionary, it's a candidate
    if (!dictEntry) return true;
    
    // If it is in the dictionary, check if the artist is placeholder or year is missing
    const isPlaceholderArtist = dictEntry.artist === 'Video Game Composer' || dictEntry.artist === 'Various Artists';
    const isMissingYear = !dictEntry.year;
    
    return isPlaceholderArtist || isMissingYear;
  });

  console.log(`Found ${candidates.length} songs that could benefit from metadata augmentation.`);
  const batch = candidates.slice(0, limit);
  console.log(`Processing a batch of ${batch.length} songs (Limit: ${limit})...\n`);

  let updatedCount = 0;

  for (let i = 0; i < batch.length; i++) {
    const song = batch[i];
    console.log(`\n[${i+1}/${batch.length}] Augmenting: "${song.title}" (ID: ${song.id})...`);
    
    const existing = metadataDictionary[song.id];
    if (existing) {
      console.log(`  [DEBUG] Existing metadata entry found in dictionary:`);
      console.log(`          Artist: "${existing.artist}" | Year: ${existing.year} | Category: "${existing.category}"`);
    } else {
      console.log(`  [DEBUG] No existing dictionary entry for ID "${song.id}". A new entry will be generated.`);
    }
    
    // Query iTunes
    const result = await queryITunes(song);
    
    if (result) {
      const year = new Date(result.releaseDate).getFullYear();
      let decade = '80s';
      if (year < 1980) decade = 'retro';
      else if (year < 1990) decade = '80s';
      else if (year < 2000) decade = '90s';
      else if (year < 2010) decade = '2000s';
      else if (year < 2020) decade = '2010s';
      else decade = '2020s';

      const matchedArtist = result.artistName;
      const matchedGenre = mapGenre(result.primaryGenreName, song.category);
      const matchedStyle = result.primaryGenreName;

      // Get existing entry to merge and keep curated "cookies" (e.g. hints, franchise, company)
      const currentEntry = existing || {};
      
      const updated = {
        title: currentEntry.title || song.title,
        artist: (currentEntry.artist && currentEntry.artist !== 'Video Game Composer' && currentEntry.artist !== 'Various Artists') 
                  ? currentEntry.artist 
                  : matchedArtist,
        hint: currentEntry.hint || song.hint,
        category: currentEntry.category || song.category,
        decade: decade,
        genre: matchedGenre,
        year: year,
        style: matchedStyle,
        ...currentEntry // Keep any other hand-curated tags like game, franchise, company, etc.
      };

      // For game songs, we can guess the game/franchise name from album name if not already set
      if (song.category === 'games') {
        if (!updated.game && result.collectionName) {
          updated.game = cleanGameName(result.collectionName);
          console.log(`  [DEBUG] Extracted game name from album title: "${updated.game}"`);
        }
        if (!updated.franchise && updated.game) {
          updated.franchise = updated.game.split(':')[0].trim();
          console.log(`  [DEBUG] Inferred franchise from game title: "${updated.franchise}"`);
        }
      }

      metadataDictionary[song.id] = updated;
      updatedCount++;

      console.log(`  -> Successfully updated!`);
      console.log(`     Artist: ${updated.artist}`);
      console.log(`     Year:   ${updated.year} (${updated.decade})`);
      console.log(`     Genre:  ${updated.genre} (${updated.style})`);
      if (updated.game) console.log(`     Game:   ${updated.game}`);
    } else {
      console.log(`  -> No results found on iTunes Search API.`);
    }

    // Wait 1 second between requests to be polite to the API
    if (i < batch.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  if (updatedCount > 0) {
    console.log(`\nWriting ${updatedCount} updates back to metadata_dictionary.js...`);
    const fileContent = `export const metadataDictionary = ${JSON.stringify(metadataDictionary, null, 2)};\n`;
    fs.writeFileSync(dictionaryFile, fileContent, 'utf-8');
    console.log('Successfully updated metadata_dictionary.js! Remember to run build_library/rebuild_metadata to apply changes to songs.ts.');
  } else {
    console.log('\nNo updates were made.');
  }
}

run();
