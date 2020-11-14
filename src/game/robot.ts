import { Scene } from './scene'
import { Direction, Position } from './types'

// A lookup table for rotating
export const rotateDirectionLookupTable: Direction[] = [
  'North',
  'East',
  'South',
  'West',
  'North',
]

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

  /**
   * Get the next target position.
   * I separate this method from `move` because it is better to validate the
   * movement in `Game` class. For example, assuming there are multiple robots,
   * it is very challenging for a robot to get other robots' position in the
   * Robot class, but very easy to communicate in `Game`
   */
  getNextTargetPosition() {
    const nextPosition: Position = {
      ...this.position,
    }
    switch (this.facing) {
      case 'North':
        nextPosition.y -= 1
        break
      case 'South':
        nextPosition.y += 1
        break
      case 'West':
        nextPosition.x -= 1
        break
      case 'East':
        nextPosition.x += 1
        break
    }
    return nextPosition
  }

  move(position: Position) {
    this.position = position
  }

  rotateLeft() {
    // anti-clockwise
    const index = rotateDirectionLookupTable.lastIndexOf(this.facing)
    this.facing = rotateDirectionLookupTable[index - 1]
  }

  rotateRight() {
    // clockwise
    const index = rotateDirectionLookupTable.indexOf(this.facing)
    this.facing = rotateDirectionLookupTable[index + 1]
  }

  report() {
    return `${this.position.x},${this.position.y}, ${this.facing}`
  }
}
