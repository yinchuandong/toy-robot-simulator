import { Scene } from './scene'
import { Position } from './types'

export class Hole extends Scene {
  position: Position

  constructor(position: Position) {
    super()
    this.position = position
  }
}
