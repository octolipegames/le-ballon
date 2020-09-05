import Phaser from "phaser"
import { Generator } from "../generator.js";

export class Scene extends Phaser.Scene {
  
  constructor() {
    super({ key: 'scene' })
    this.endBurnTimeout = null
    
    this.generator = new Generator(10, 3);
    
    this.bodies = {
      's1': {width: 600, height: 50},
      's2': {width: 600, height: 50}
    }
  }
  
  preload() {
    this.load.image('balloon', 'sprites/LeBallon-02.png')
    
    this.load.image('s1', 'sprites/sol1.png')
    this.load.image('s2', 'sprites/sol2.png')
    this.load.image('s3', 'sprites/sol3.png')
    this.load.image('s4', 'sprites/sol4.png')
    this.load.image('s5', 'sprites/sol5.png')
  }
  
  burnFuel() {
    // this.balloon.body.setAccelerationY(-100)
    
    this.balloon.setVelocityY(-5)
    this.balloon.setVelocityX(10)
    // this.balloon.thrust(10)
    
    clearTimeout(this.endBurnTimeout)
    
    this.endBurnTimeout = setTimeout(() => {
      // this.balloon.body.setAcceleration(0, 0)
    }, 1500, this)
    
    // this.cameras.main.scrollX += 100
  }
  
  create() {
    // this.physics.world.gravity.y = 30
    // this.physics.world.setBounds(-600, -900, 5400, 900)
    this.obstacles = this.matter.world.nextGroup()
    this.cameras.main.centerOn(0, 0)
    this.cameras.main.setBounds(-600, -900, 5400, 900);

    this.cameras.main.setBackgroundColor('#fefefe')
    
    this.tileBodies = []
    
    this.tiles = this.generator.getTiles()
    this.tiles.forEach((item) => {
      // console.log(x, y)
      let tile = this.matter.add.image(item.x * 600, item.y * 600, item.sprite).setStatic(true)
      // tile.body.setSize(600, 50, -300)
      // tile.body.setAllowGravity(false)
      //  this.physics.add.collider(tile.body, this.obstacles);
      this.tileBodies.push(tile.body)
    }, this)
    
    this.balloon = this.matter.add.image(0, 0, 'balloon')
    // this.balloon.body.setDragY(20)
    // this.balloon.body.setAccelerationX(50)
    this.balloon.setVelocityX(10)
    
    // this.physics.add.collider(this.balloon.body, this.tileBodies, () => console.log('collider'));
    
    this.cameras.main.startFollow(this.balloon)

    this.cameras.main.followOffset.set(-300, 0)


    this.input.on('pointerdown', () => {
      console.log('touch')
      this.burnFuel();
    }, this)
  }
  
  destroy() {
    
  }
}
