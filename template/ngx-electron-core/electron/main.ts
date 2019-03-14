import {app, BrowserWindow} from 'electron';
import {createTray, createWindow, initElectronMainIpcListener, isMac} from '@ngx-electron/main';

let win: BrowserWindow;
initElectronMainIpcListener();

function init() {
    createTray('icon/logo.png');
    win = createWindow('page1', {
        width: 1024,
        height: 768,
        title: 'demo'
    });
    win.on('close', () => app.quit());
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', init);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (!isMac()) {
        app.quit();
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        // loginWin = createLoginWindow(appTray);
    }
});
