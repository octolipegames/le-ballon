export class Generator {
  
  constructor (width, height) {
    this.width = width;
    this.height = height;
    this.length = width * height;
    this.tiles = [];
    this.enemies = [];
    this.availableSprites = ['sol1', 'sol2', 'sol3', 'sol4', 'sol5', 'sol6', 'montagne'];
    this.offsets = [280, 120, 120, 120, 120, 150, 180];
  }
  
  randomWind(level = 1) {
    return {
      strength: (1 + Math.random()) * level * 10,
      timeout: (2 - Math.random()) * 2000 / level
    };
  }
  
  randomChoice(index) {
    let limit = (index + 2 < this.availableSprites.length ? this.availableSprites.length : this.availableSprites.length-1);
    return Math.floor( limit * Math.random() );
  }
  
  getEnemies(density = 1) {
    for(let x = 0; x < this.width; x++) {
      if( Math.random() <= density ) {
        this.enemies.push({
          x: x + (1 - Math.random() * 0.9),
          y: 0 - (1 - Math.random() * 0.5),
          sprite: 'grue'
        });
      }
    }
    return this.enemies;
  }

  getTiles() {
    // sky => y = -1
    for (let x = 0; x < this.width; x++) {
      this.tiles.push({
        x: x,
        y: -1,
        sprite: 'nuages',
        offset: -280
      });
    }
    
    // ground => y = 1
    for (let x = 0; x < this.width; x++) {
      let randomChoice = this.randomChoice(x);
      let offset = 0;
      if (randomChoice == this.availableSprites.length-1) {
        offset = 1;
      }
      this.tiles.push({
        x: x + offset,
        y: 1,
        sprite: this.availableSprites[ randomChoice ],
        offset: this.offsets[ randomChoice ]
      });
      if (randomChoice == this.availableSprites.length-1) {
        x += 2;
      }
    }
    return this.tiles;
  }
}