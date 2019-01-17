# @ngx-electron/main

解决在渲染进程中创建窗口，创建Tray，窗口间传递数据。同时需要在angular中引入@ngx-electron/core模块，以angular的风格来操作。

## 使用(在主进程中引用)

在启动electron时可以配置一些参数如
```
electron . --server --port 4200 --host localhost
```


初始化ipcMain的一些监听，与@ngx-electron/core或@ngx-electron/data进行交互，用户不需要关心，可以减少用户的ipc操作
* function initElectronMainIpcListener(): void

创建一个tray（在windows中有效，否则返回null）
imageUrl: 图片路径
* function createTray(imageUrl: string): Tray

创建一个窗体
routerUrl：路由url
options：窗体的选项 为了方便创建，原有的一些默认选项被调整 被调整的选项如下
```json
{
    "hasShadow": true,
    "frame": false,
    "transparent": true,
    "show": false
}
```
* function createWindow(routerUrl: string, options: BrowserWindowConstructorOptions = {}, key = routerUrl): BrowserWindow


## 例子
main.ts

```typescript
import {app, BrowserWindow, Tray} from 'electron';
import {createTray, createWindow, initElectronMainIpcListener, isMac} from '@ngx-electron/main';

let loginWin: BrowserWindow, tray: Tray;

// 初始化监听
initElectronMainIpcListener();


function init() {
    console.log(process.platform);
    tray = createTray('icon/icon.ico');

    loginWin = createWindow('auth', {
        width: 439,
        height: 340,
        alwaysOnTop: true,
        skipTaskbar: true,
        resizable: false,
        fullscreenable: false,
        maximizable: false,
        title: 'moon'
    });
    loginWin.on('close', () => app.quit());
}

```

