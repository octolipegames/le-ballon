export class Generator {
  
  constructor (width, height) {
    this.width = width
    this.height = height
    this.length = width * height
    this.tiles = []
    this.availableSprites = ['s1', 's2', 's3', 's4', 's5']
  }
  
  randomChoice() {
    return Math.floor( this.availableSprites.length * Math.random() )
  }

  getTiles() {
    for (let x = 0; x < this.width; x++) {
      for (let y = 1; y > 0; y--) {
        this.tiles.push({
          x: x,
          y: y,
          sprite: this.availableSprites[ this.randomChoice() ]
        })
      }
    }
    return this.tiles;
  }
}