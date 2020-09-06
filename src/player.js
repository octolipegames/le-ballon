export class Player {
  
  constructor () {
    this.alive = true;
    this.score = 0;
  }
  
  isAlive () {
    return this.alive;
  }
  
  dies () {
    console.log('Player is dead');
    this.alive = false;
  }
}