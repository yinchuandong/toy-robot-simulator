import { Scene } from './scene'
import { Direction, Position } from './types'

export class Robot extends Scene {
  position: Position = { x: 0, y: 0 }
  facing: Direction = 'South'

  constructor(position: Position, facing: Direction) {
    super()
    this.place(position, facing)
  }

  place(position: Position, facing: Direction) {
    this.position = position
    this.facing = facing
  }

  move() {
    switch (this.facing) {
      case 'North':
        break
      case 'South':
        break

      case 'East':
        break

      case 'West':
        break

      default:
        break
    }
  }

  turnLeft() {}

  turnRight() {}

  report() {}
}
