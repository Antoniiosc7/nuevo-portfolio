---
title: Empaquetado y distribución
sidebar_label: Empaquetado
sidebar: electronSidebar
---

# Empaquetar y distribuir aplicaciones Electron

Una vez integrada la aplicación Angular, el siguiente paso es generar instaladores y configurar actualizaciones automáticas. Esta guía se centra en `electron-builder`, aunque los conceptos aplican a Forge o Flow.

---

## 1. Configuración base de electron-builder

`package.json`:

```json
"build": {
  "appId": "es.antoniosaborido.angular.desktop",
  "productName": "Angular Desktop",
  "files": [
    "dist/browser/**/*",
    "dist/electron/**/*"
  ],
  "directories": {
    "output": "release",
    "buildResources": "electron/resources"
  },
  "mac": {
    "category": "public.app-category.productivity",
    "target": ["dmg", "zip"]
  },
  "win": {
    "target": [
      {
        "target": "nsis",
        "arch": ["x64"]
      }
    ]
  },
  "linux": {
    "target": ["AppImage", "deb"]
  }
}
```

Scripts:

```json
{
  "scripts": {
    "build": "ng build",
    "electron:build": "npm run build && electron-builder"
  }
}
```

---

## 2. Empaquetado multiplataforma

- Ejecuta `electron-builder -mwl` para generar artefactos para macOS, Windows y Linux (requiere ejecutar en cada SO o usar contenedores con Wine/Mono).
- Usa GitHub Actions o Azure Pipelines con matrices (`matrix.os`) para generar instaladores en paralelo.
- Firma binarios:
  - Windows: certificación `.pfx` + `CSC_LINK`, `CSC_KEY_PASSWORD`.
  - macOS: `APPLE_ID`, `APPLE_APP_SPECIFIC_PASSWORD` + notarización.

---

## 3. Estructura final de archivos

```
release/
├── Angular Desktop Setup 1.0.0.exe
├── Angular Desktop-1.0.0.AppImage
├── Angular Desktop-1.0.0.dmg
└── latest.yml
```

`latest.yml` se usa para auto-update (Squirrel/NSIS).

---

## 4. Auto-actualizaciones

- `electron-updater` simplifica el proceso:

```ts
import {autoUpdater} from 'electron-updater';

autoUpdater.on('update-available', () => mainWindow?.webContents.send('update:available'));
autoUpdater.on('update-downloaded', () => autoUpdater.quitAndInstall());

app.whenReady().then(() => {
  autoUpdater.checkForUpdatesAndNotify();
});
```

- Requiere publicar artefactos en GitHub Releases, Azure Blob Storage, S3 o servidor propio.
- Asegúrate de servir `latest.yml` y los instaladores con HTTPS.

---

## 5. Estrategia de despliegue

1. `npm version patch` (o `minor`, `major`).
2. `npm run electron:build`.
3. Subir `release/` al repositorio de artefactos (GitHub Release, Artifactory, Azure DevOps).
4. Publicar notas de la release y comunicar a los usuarios.
5. Monitorizar métricas (Sentry, AppCenter) y logs para detectar errores.

---

## 6. Integración CI/CD

Ejemplo GitHub Actions (`.github/workflows/release.yml`):

```yaml
name: build-desktop
on:
  push:
    tags:
      - 'v*'

jobs:
  release:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [windows-latest, macos-latest, ubuntu-latest]
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - run: npx electron-builder --publish always
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

- Configura secretos (certificados, contraseñas) en el proveedor CI.
- Publica únicamente la versión firmada; evita almacenar certificados en el repositorio.

---

## 7. Consideraciones de seguridad

- Habilita `contextIsolation`, `sandbox` y `contentSecurityPolicy` en Electron.
- Firma binarios para evitar advertencias de SmartScreen/Gatekeeper.
- Mantén dependencias actualizadas (`npm audit`, Renovate).
- Usa herramientas como `electron-builder install-app-deps` para reconstruir módulos nativos.

Con este proceso podrás distribuir tu aplicación Angular+Electron de forma profesional, con actualizaciones automáticas y soporte multiplataforma.


