import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const midiDir = path.join(__dirname, '../public/midi');

// Ensure directory exists
if (!fs.existsSync(midiDir)) {
  fs.mkdirSync(midiDir, { recursive: true });
}

const songs = [
  {
    name: 'mario.mid',
    url: 'https://raw.githubusercontent.com/beerriot/BashoDidgeridoo/master/midi/mario.mid'
  },
  {
    name: 'zelda.mid',
    url: 'https://raw.githubusercontent.com/beerriot/BashoDidgeridoo/master/midi/zelda.mid'
  },
  {
    name: 'tetris.mid',
    url: 'https://raw.githubusercontent.com/CNugteren/midisurf/master/testmidi/tetris.mid'
  },
  {
    name: 'rickroll.mid',
    url: 'https://raw.githubusercontent.com/callmeyyzx/midi/master/Never%20gonna%20give%20you%20up.mid'
  },
  {
    name: 'billiejean.mid',
    url: 'https://raw.githubusercontent.com/thewildwestmidis/midis/master/Michael%20Jackson%20-%20Billie%20Jean.mid'
  },
  {
    name: 'takeonme.mid',
    url: 'https://raw.githubusercontent.com/SamPersson/akarr/master/Take%20on%20me.mid'
  }
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      // Handle redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }

      if (res.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: HTTP Status ${res.statusCode}`));
        return;
      }

      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function fetchAll() {
  console.log('Starting MIDI downloads...');
  for (const song of songs) {
    const dest = path.join(midiDir, song.name);
    console.log(`Downloading ${song.name} from ${song.url}...`);
    try {
      await downloadFile(song.url, dest);
      console.log(`Successfully downloaded ${song.name}`);
    } catch (error) {
      console.error(`Error downloading ${song.name}:`, error.message);
    }
  }
  console.log('MIDI downloads complete.');
}

fetchAll();
