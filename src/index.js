import Phaser from "phaser";
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
import PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin";
import DebugObjects from './plugins/debugObjects.js';
import './style.scss';

import { Scene } from "./scenes/scene.js";

const plugins = [{
  key: 'rexUI',
  plugin: RexUIPlugin,
  mapping: 'rexUI'
},
{
  plugin: PhaserMatterCollisionPlugin,
  key: "matterCollision",
  mapping: "matterCollision"
}];

const OBJECT_DEBUG = true;

if(OBJECT_DEBUG === true) {
  console.log('push…');
  plugins.push({
    key: 'debugObjects',
    plugin: DebugObjects,
    mapping: 'debugObjects'
  });
}


// Game Config reference: https://photonstorm.github.io/phaser3-docs/Phaser.Types.Core.html#.GameConfig
const config = {
  type: Phaser.WEBGL,
  width: 1200,
  height: 1800,
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
    default: 'matter',
    matter: {
      debug: true,
      fps: 30,
      gravity: { y: 0.3 }
    }
  }
};

export const game = new Phaser.Game(config);