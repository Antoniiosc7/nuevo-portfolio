---
title: Integrar Angular con Electron
sidebar_label: Angular + Electron
sidebar: electronSidebar
---

# Integrar una app Angular en Electron

Esta guía describe cómo convertir una aplicación Angular existente en un ejecutable de escritorio usando Electron, manteniendo un flujo de trabajo eficiente para desarrollo y producción.

---

## 1. Instalar dependencias

```bash
npm install electron @electron/remote electron-builder concurrently --save-dev
```

Estructura recomendada:

```
project/
├── angular.json
├── src/ (app Angular)
├── electron/
│   ├── main.ts
│   ├── preload.ts
│   └── typings/
└── package.json
```

---

## 2. Configurar el proceso principal

`electron/main.ts`:

```ts
import {app, BrowserWindow} from 'electron';
import * as path from 'node:path';

let mainWindow: BrowserWindow | null = null;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
    },
  });

  if (process.env['ELECTRON_START_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_START_URL']);
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/browser/index.html'));
  }

  mainWindow.on('closed', () => (mainWindow = null));
};

app.whenReady().then(createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
```

---

## 3. Preload y context bridge

`electron/preload.ts`:

```ts
import {contextBridge, ipcRenderer} from 'electron';

contextBridge.exposeInMainWorld('desktopAPI', {
  version: () => ipcRenderer.invoke('version:get'),
  openDialog: () => ipcRenderer.invoke('dialog:open'),
});
```

En Angular, define un tipo global:

```ts
declare global {
  interface Window {
    desktopAPI: {
      version: () => Promise<string>;
      openDialog: () => Promise<string[]>;
    };
  }
}
```

Uso dentro de un servicio Angular:

```ts
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class DesktopService {
  getVersion() {
    return window.desktopAPI.version();
  }
}
```

---

## 4. Scripts de desarrollo

`package.json`:

```json
{
  "scripts": {
    "start": "ng serve",
    "electron:start": "ng build --watch & cross-env ELECTRON_START_URL=http://localhost:4200 electron .",
    "electron:dev": "concurrently \"npm run start\" \"npm run electron:start\"",
    "electron:build": "ng build && electron-builder"
  }
}
```

- `ELECTRON_START_URL` permite recargar Angular y Electron en caliente.
- En Nx puedes crear ejecutores personalizados (`nx g @nrwl/workspace:run-commands`).

---

## 5. Manejar rutas Angular

- Configura el router con `useHash: true` para evitar 404 cuando Electron carga `index.html`.
- Alternativa: interceptar `will-navigate` y redirigir a Angular.

```ts
provideRouter(routes, withHashLocation());
```

---

## 6. Acceso a APIs nativas

- Usa `ipcMain.handle('canal', handler)` para exponer funciones.
- Evita exponer Node.js completo en el renderizador (`contextIsolation: true`).
- Si necesitas módulos nativos (por ejemplo, serialport) compílalos con `electron-rebuild`.

---

## 7. Empaquetado básico (overview)

- Añade en `package.json`:

```json
"build": {
  "appId": "es.antoniosaborido.angular.electron",
  "files": [
    "dist/browser/**/*",
    "dist/electron/**/*"
  ],
  "directories": {
    "buildResources": "electron/resources"
  }
}
```

La guía de empaquetado y actualizaciones continuas se detalla en `Empaquetado y distribución`.


