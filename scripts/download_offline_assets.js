import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const songsFile = path.join(__dirname, '../src/songs.ts');
const audioFile = path.join(__dirname, '../src/audio.ts');

const pianoFiles = [
  'A0.mp3', 'C1.mp3', 'Ds1.mp3', 'Fs1.mp3',
  'A1.mp3', 'C2.mp3', 'Ds2.mp3', 'Fs2.mp3',
  'A2.mp3', 'C3.mp3', 'Ds3.mp3', 'Fs3.mp3',
  'A3.mp3', 'C4.mp3', 'Ds4.mp3', 'Fs4.mp3',
  'A4.mp3', 'C5.mp3', 'Ds5.mp3', 'Fs5.mp3',
  'A5.mp3', 'C6.mp3', 'Ds6.mp3', 'Fs6.mp3',
  'A6.mp3', 'C7.mp3', 'Ds7.mp3', 'Fs7.mp3',
  'A7.mp3', 'C8.mp3'
];

async function downloadFile(url, dest) {
  const dir = path.dirname(dest);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP Status ${res.status}`);
  }
  const buffer = await res.arrayBuffer();
  fs.writeFileSync(dest, Buffer.from(buffer));
}

async function runBatches(tasks, batchSize = 10) {
  for (let i = 0; i < tasks.length; i += batchSize) {
    const batch = tasks.slice(i, i + batchSize);
    await Promise.all(batch.map(task => task()));
  }
}

async function start() {
  console.log('--- Loading Songs Database ---');
  const songContent = fs.readFileSync(songsFile, 'utf-8');
  const startIdx = songContent.indexOf('[', songContent.indexOf('='));
  const endIdx = songContent.lastIndexOf(']') + 1;
  
  if (startIdx === -1 || endIdx === -1) {
    console.error('Could not find SONGS array in songs.ts');
    return;
  }
  
  const songs = JSON.parse(songContent.substring(startIdx, endIdx));
  console.log(`Loaded ${songs.length} songs. Preparing downloads...`);

  // 1. Download Remote MIDIs
  const midiTasks = [];
  const updatedSongs = [...songs];

  songs.forEach((song, idx) => {
    if (song.path.startsWith('http')) {
      const localPath = `/midi/${song.id}.mid`;
      const localDest = path.join(__dirname, `../public/midi/${song.id}.mid`);
      
      midiTasks.push(async () => {
        try {
          console.log(`Downloading MIDI [${idx + 1}/${songs.length}]: ${song.title}`);
          await downloadFile(song.path, localDest);
          updatedSongs[idx].path = localPath;
        } catch (e) {
          console.error(`Failed to download MIDI for ${song.title}:`, e.message);
        }
      });
    }
  });

  if (midiTasks.length > 0) {
    console.log(`Downloading ${midiTasks.length} remote MIDI files in batches...`);
    await runBatches(midiTasks, 10);
    console.log('MIDI downloads complete.');
  } else {
    console.log('All MIDI files are already local.');
  }

  // 2. Download Piano Samples
  console.log('\n--- Downloading Piano Samples ---');
  const pianoTasks = [];
  const pianoBaseUrl = 'https://tonejs.github.io/audio/salamander/';
  
  pianoFiles.forEach((file, idx) => {
    const localDest = path.join(__dirname, `../public/audio/salamander/${file}`);
    if (!fs.existsSync(localDest)) {
      pianoTasks.push(async () => {
        try {
          console.log(`Downloading Piano Sample [${idx + 1}/${pianoFiles.length}]: ${file}`);
          await downloadFile(`${pianoBaseUrl}${file}`, localDest);
        } catch (e) {
          console.error(`Failed to download piano sample ${file}:`, e.message);
        }
      });
    }
  });

  if (pianoTasks.length > 0) {
    console.log(`Downloading ${pianoTasks.length} piano samples...`);
    await runBatches(pianoTasks, 5);
    console.log('Piano samples downloaded successfully.');
  } else {
    console.log('All piano samples are already local.');
  }

  // 3. Update songs.ts File
  console.log('\n--- Updating songs.ts metadata ---');
  const updatedCode = `export interface Song {
  id: string;
  title: string;
  artist: string;
  path: string;
  hint: string;
  category: 'games' | 'pop';
}

export const SONGS: Song[] = ${JSON.stringify(updatedSongs, null, 2)};
`;
  fs.writeFileSync(songsFile, updatedCode, 'utf-8');
  console.log('Updated songs.ts metadata with local file paths.');

  // 4. Update audio.ts File
  console.log('\n--- Updating audio.ts piano sampler path ---');
  let audioContent = fs.readFileSync(audioFile, 'utf-8');
  if (audioContent.includes("baseUrl: 'https://tonejs.github.io/audio/salamander/'")) {
    audioContent = audioContent.replace(
      "baseUrl: 'https://tonejs.github.io/audio/salamander/'",
      "baseUrl: '/audio/salamander/'"
    );
    fs.writeFileSync(audioFile, audioContent, 'utf-8');
    console.log('Updated audio.ts to use local piano samples path (/audio/salamander/).');
  } else {
    console.log('audio.ts is already configured to use local piano samples.');
  }

  console.log('\nAll assets downloaded successfully! The game is now 100% offline capable.');
}

start();
