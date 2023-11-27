const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
    icon: getPlatformIcon(), // 根据操作系统获取相应的图标
  });

  mainWindow.loadFile('index.html');

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}
function getPlatformIcon() {
  if (process.platform === 'darwin') {
    return path.join(__dirname, 'icon.icns'); // macOS 图标路径
  } else {
    return path.join(__dirname, 'icon.ico'); // Windows 图标路径
  }
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (mainWindow === null) createWindow();
});
