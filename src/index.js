import Phaser from "phaser"
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js'
// import DebugObjects from './plugins/debugObjects.js'
import './style.scss'

import { Scene } from "./scenes/scene.js"

const plugins = [{
  key: 'rexUI',
  plugin: RexUIPlugin,
  mapping: 'rexUI'
}]

// Game Config reference: https://photonstorm.github.io/phaser3-docs/Phaser.Types.Core.html#.GameConfig
const config = {
  type: Phaser.WEBGL,
  width: 800,
  height: 600,
  resolution: 1, // we could use 2 for Retina
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  parent: 'container',
  dom: {
    createContainer: true
  },
  plugins: {
    scene: plugins
  },
  scene: [
    Scene,
  ],
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: { y: 150 }
    }
  }
}

export const game = new Phaser.Game(config)