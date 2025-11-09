---
slug: juego-serpiente
title: Juego de la Serpiente en Haskell
description: Reinventando el clásico Snake con generación procedural y dos modos de dificultad.
authors: [antonio]
tags: [haskell, functional-programming, game-dev]
---

## Visión general

Este proyecto es una recreación del clásico **juego de la serpiente**, desarrollada en Haskell. El jugador debe comer manzanas evitando chocar contra los bordes o los obstáculos repartidos por el tablero.

<!-- truncate -->

Cada pulsación de tecla genera un nuevo estado del tablero. Una función central valida si el siguiente movimiento impacta contra un bloque prohibido (bordes u obstáculos), continúa por una casilla libre o come la manzana.

## Modos de juego

- **Fácil**: control con flechas del teclado, obstáculos fijos.
- **Difícil**: control mediante las teclas `1`, `5`, `3`, `2`; los obstáculos cambian de posición en cada movimiento.

Si la serpiente choca contra un bloque prohibido queda encerrada en una "cárcel". Para reiniciar basta con recargar la página. Al conseguir 10 manzanas consecutivas la serpiente queda en una cárcel dorada que representa la victoria.


