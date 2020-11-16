import { Scene } from './scene'
import { Direction, Position } from './types'

// A lookup table for rotating
export const rotateDirectionLookupTable: Direction[] = [
  'NORTH',
  'EAST',
  'SOUTH',
  'WEST',
  'NORTH',
]

export class Robot extends Scene {
  position: Position
  facing: Direction

  constructor(position: Position, facing: Direction) {
    super()
    this.position = position
    this.facing = facing
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
      case 'NORTH':
        nextPosition.y += 1
        break
      case 'SOUTH':
        nextPosition.y -= 1
        break
      case 'WEST':
        nextPosition.x -= 1
        break
      case 'EAST':
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
    return `${this.position.x},${this.position.y},${this.facing}`
  }
}
