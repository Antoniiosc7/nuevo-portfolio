---
slug: reconocimiento-imagenes
title: Reconocimiento de imágenes para identificar jugadores de fútbol
description: Sistema en Python que reconoce camisetas y enlaza con la base de datos de EA Sports FC 24.
authors: [antonio]
tags: [python, computer-vision, ocr]
---

## Resumen del proyecto

Este proyecto desarrolla un sistema de reconocimiento de jugadores de fútbol utilizando imágenes de sus camisetas. El flujo de trabajo extrae texto (nombre y número) mediante OCR, identifica al jugador y consulta la base de datos del videojuego **EA Sports FC 24** para recuperar sus estadísticas.

<!-- truncate -->

## Objetivos

1. **Reconocimiento de jugadores**: identificar camisetas y extraer el texto clave.
2. **Integración con EA Sports FC 24**: obtener posición, habilidades e historial del jugador.
3. **Interfaz en terminal**: permitir a cualquier usuario cargar una imagen y recibir estadísticas de forma sencilla.

## Instalación rápida

En Windows basta con ejecutar `scriptInstalacion.bat`. Para instalaciones manuales:

```bash
pip install pandas
pip install torch   # Sólo en Windows
pip install easyocr
pip install pillow
pip install pytesseract
pip install os-sys
```

Después, ejecuta `mainFile.py` o el script `arranque.bat`.

## Arquitectura del código

- **mainFile.py**: orquesta el flujo principal.
- **menus.py**: define los menús interactivos en consola.
- **filtros.py**: aplica filtros a las imágenes para mejorar la lectura.
- **comparacionDB.py**: compara el texto extraído con los registros de la base de datos.
- **comparativaGlobal.py**: evalúa qué combinación de librerías y filtros ofrece mejores resultados.

## Uso de nuevas imágenes

Para probar nuevas camisetas, solo hay que copiar las imágenes a los directorios `facil`, `intermedio` o `dificil`. El sistema las detectará automáticamente en la siguiente ejecución.

---

- **Fecha**: 4 de diciembre de 2024  
- **Visitas originales**: 20

