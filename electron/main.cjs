const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1080,
    height: 750,
    minWidth: 960,
    minHeight: 680,
    backgroundColor: '#060608',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  // Remove default menu bar (File, Edit, etc.) for a clean kiosk-like experience
  Menu.setApplicationMenu(null);

  // Load the built index.html from Vite production build
  win.loadFile(path.join(__dirname, '../dist/index.html'));

  // Open DevTools if env variable ELECTRON_DEV is set to 1
  if (process.env.ELECTRON_DEV === '1') {
    win.webContents.openDevTools();
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
