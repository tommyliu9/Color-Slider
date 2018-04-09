const electron = require('electron');
const url = require('url');
const path = require('path');
let mainWindow;
const {app, BrowserWindow, Menu, ipcMain} = electron;

app.on('ready', function(){
    mainWindow = new BrowserWindow({});
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocal: 'file-',
        slashes: true
    }));
    mainWindow.on('closed', function(){
        app.quit();
    });
    const mainMenu = Menu.buildFromTemplate(mainMenuWindow);
    Menu.setApplicationMenu(mainMenu);
});

const mainMenuWindow = [{
    label: 'File',
    submenu: [{
        label: "Quit",
        accelerator: process.platform == 'darwin' ? 'Command+Q' :
            'Ctrl+Q',
        click(){
            app.quit();
        }
    }]
}]
if(process.env.NODE_ENV !== 'production'){
    mainMenuWindow.push({
        label: 'Developer Tools',
        submenu:  [
            {
                label: 'Toggle DevTools',
                accelerator:
                    'Ctrl+F11',

                click(item, focusedWindow){
                    focusedWindow.toggleDevTools()
                }
            }
        ]

    });
}