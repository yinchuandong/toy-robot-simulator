import { Scene } from './scene'
import { Position } from './types'

export class TableTop extends Scene {
  width: number
  height: number

  constructor(width: number, height: number) {
    super()

    this.width = width
    this.height = height
  }

  /**
   * check if a target movement is valid
   * @param position
   */
  isValidMovement(position: Position): boolean {
    return (
      position.x >= 0 &&
      position.x < this.width &&
      position.y >= 0 &&
      position.y < this.height
    )
  }
}
