import * as tts from '@diffusionstudio/vits-web';

self.onmessage = async (e: MessageEvent) => {
  const { type, text, voiceId } = e.data;
  
  if (type !== 'synthesize') return;

  try {
    const wav = await tts.predict(
      {
        text,
        voiceId
      },
      (progress) => {
        const percent = Math.round((progress.loaded * 100) / progress.total);
        self.postMessage({ type: 'progress', percent });
      }
    );

    self.postMessage({ type: 'success', wav });
  } catch (err: any) {
    console.error('TTS Worker prediction error:', err);
    self.postMessage({ type: 'error', error: err.message || String(err) });
  }
};
