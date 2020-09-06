import Phaser from "phaser";
import { Generator } from "../generator.js";
import { Player } from "../player.js";

export class Scene extends Phaser.Scene {
  
  constructor() {
    super({ key: 'scene' });
    this.endBurnTimeout = null;
    
    this.generator = new Generator(20, 3);
    this.player = new Player();
  }
  
  createWind() {
    let wind = this.generator.randomWind();
    console.log('New wind:', wind);
    this.balloon.setVelocityX(wind.strength);
    setTimeout(() => this.createWind(), wind.timeout, this);
  }
  
  preload() {
    this.load.image('balloon', 'sprites/LeBallon-02.png');
    
    this.load.image('sol1', 'sprites/sol1.png');
    this.load.image('sol2', 'sprites/sol2.png');
    this.load.image('sol3', 'sprites/sol3.png');
    this.load.image('sol4', 'sprites/sol4.png');
    this.load.image('sol5', 'sprites/sol5.png');
    this.load.image('sol6', 'sprites/sol6.png');
    this.load.image('montagne', 'sprites/montagne.png');
    
    this.load.image('nuages', 'sprites/nuages.png');
    this.load.image('grue', 'sprites/grue.png');
    
    // this.load.audio('theme', 'sounds/Ailes_Oiseaux_Battements_Wings.mp3');
    // this.load.audio('broken_tree', 'sounds/Arbre_craque.wav');
    
    this.load.json('shapes', 'sprites/shapes/shapes.json');
  }
  
  burnFuel() {    
    this.balloon.setVelocityY(-5);
    this.balloon.setVelocityX(10);
  }
  
  create() {
    // this.themeSound = this.sound.add('theme');
    // this.themeSound.play();
          
    let shapes = this.cache.json.get('shapes');
    
    this.obstacles = this.matter.world.nextGroup();
    this.cameras.main.centerOn(0, 0);
    this.cameras.main.setBounds(-600, -900, 11400, 900);
    
    this.cameras.main.setBackgroundColor('#fefefe');
    
    this.tileBodies = [];
    
    this.tiles = this.generator.getTiles();
    this.tiles.forEach((item) => {
      let tile = this.matter.add.image(item.x * 600, item.y * 600 + item.offset, item.sprite, null, {shape: shapes[item.sprite], isStatic: true, ignoreGravity: true}).setStatic(true);
      // console.log('center of mass for', item.sprite, ':', tile.centerOfMass.y * 600);
      this.tileBodies.push(tile.body);
    }, this);
    
    this.enemies = this.generator.getEnemies();
    this.enemies.forEach( (item) => {
      let enemy = this.matter.add.image(item.x * 600, item.y * 600, item.sprite, null, {shape: shapes[item.sprite]}).setIgnoreGravity(true).setFixedRotation(true);
      enemy.setVelocityX(-10);
    }, this);
    
    this.balloon = this.matter.add.image(0, -100, 'balloon', null, {shape: shapes['LeBallon-02']}).setFixedRotation(true);
        
    this.cameras.main.startFollow(this.balloon);
    
    this.cameras.main.followOffset.set(-300, 0);
    
    this.createWind();
    
    this.input.on('pointerdown', () => {
      this.burnFuel();
    }, this);

    this.matterCollision.addOnCollideStart({
      objectA: this.balloon,
      callback: eventData => {
        const { bodyB, gameObjectB } = eventData;
        console.log("Player touched something.", bodyB);
        // bodyB will be the matter body that the player touched
        // gameObjectB will be the game object that owns bodyB, or undefined if there's no game object
      }
    });

    this.balloon.setOnCollide(pair => {
      console.log('Collision:', pair.bodyA, pair.bodyB);
      this.player.dies();
    }, this);
  }
  
  destroy() {
    
  }
}
