import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.guerry.guessthesong',
  appName: 'Guess The Song',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
