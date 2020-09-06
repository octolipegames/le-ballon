import Phaser from "phaser";
import { Generator } from "../generator.js";
import { Player } from "../player.js";

export class Scene extends Phaser.Scene {
  
  constructor() {
    super({ key: 'scene' });
    this.endBurnTimeout = null;
    
    this.generator = new Generator(20, 3);
    this.player = new Player();
    this.enemyDensity = 0.2;
  }
  
  createWind() {
    let wind = this.generator.randomWind();
    console.log('New wind:', wind);
    this.balloon.setVelocityX(wind.strength);
    // setTimeout(() => this.createWind(), wind.timeout, this);
  }
  
  addEnemies() {
    this.enemies = this.generator.getEnemies(this.enemyDensity);
    this.enemies.forEach( (item) => {
      let enemy = this.matter.add.image(this.balloon.x + 800 + item.x * 600, item.y * 600, item.sprite, null, {shape: this.shapes[item.sprite]}).setIgnoreGravity(true).setFixedRotation(true);
      enemy.setVelocityX(-10);
    }, this);
    this.birdSounds[ this.generator.randomChoice(2) ].play();
    if (this.enemyDensity < 1) {
      this.enemyDensity += 0.1;
    }
    setTimeout( () => this.addEnemies(), 12000, this);
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
    
    this.load.audio('theme', 'sounds/LE_BALLON_THEME.mp3');
    this.load.audio('wind', 'sounds/VENT.wav');
    this.load.audio('crash', 'sounds/CHOC.wav');
    this.load.audio('bird_1', 'sounds/CHANT_GRUE_1.wav');
    this.load.audio('bird_2', 'sounds/CHANT_GRUE_2.wav');
    this.load.audio('bird_3', 'sounds/CHANT_GRUE_3.wav');
    this.load.audio('burn', 'sounds/AIR_CHAUD.wav');
    
    this.load.json('shapes', 'sprites/shapes/shapes.json');
  }
  
  burnFuel() {
    this.burnSound.play();
    this.balloon.setVelocityY(-5);
    this.balloon.setVelocityX(10);
  }
  
  create() {
    this.themeSound = this.sound.add('theme');
    this.themeSound.play();
    
    this.burnSound = this.sound.add('burn');
    this.crashSound = this.sound.add('crash');
    let bird1 = this.sound.add('bird_1');
    let bird2 = this.sound.add('bird_2');
    let bird3 = this.sound.add('bird_3');
    this.birdSounds = [bird1, bird2, bird3];
    
          
    this.shapes = this.cache.json.get('shapes');
    
    this.obstacles = this.matter.world.nextGroup();
    this.cameras.main.centerOn(0, 0);
    this.cameras.main.setBounds(-600, -900, 11400, 900);
    
    this.cameras.main.setBackgroundColor('#fefefe');
    
    this.tileBodies = [];
    
    this.tiles = this.generator.getTiles();
    this.tiles.forEach((item) => {
      let tile = this.matter.add.image(item.x * 600, item.y * 600 + item.yOffset, item.sprite, null, {shape: this.shapes[item.sprite], isStatic: true, ignoreGravity: true}).setStatic(true);
      // console.log('center of mass for', item.sprite, ':', tile.centerOfMass.y * 600);
      this.tileBodies.push(tile.body);
      
      // debug
      
      
    }, this);
    
    // setTimeout(() => this.addEnemies(), 5000, this);
    
    this.balloon = this.matter.add.image(0, -100, 'balloon', null, {shape: this.shapes['LeBallon-02']}).setFixedRotation(true);
        
    this.cameras.main.startFollow(this.balloon);
    
    this.cameras.main.followOffset.set(-300, 0);
    
    // this.createWind();
    
    this.input.on('pointerdown', () => {
      if ( this.player.isAlive() ) {
        this.burnFuel();
      } else {
        //  new game
      }
    }, this);

    this.matterCollision.addOnCollideStart({
      objectA: this.balloon,
      callback: eventData => {
        const { bodyB, gameObjectB } = eventData;
        this.crashSound.play();
        this.player.dies();
        
        // console.log("Player touched something.", bodyB);
        // bodyB will be the matter body that the player touched
        // gameObjectB will be the game object that owns bodyB, or undefined if there's no game object
      }
    });

    
  }
  
  destroy() {
    
  }
}
