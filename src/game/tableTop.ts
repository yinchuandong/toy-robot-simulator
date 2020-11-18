import { Hole } from './hole'
import { Scene } from './scene'
import { Position } from './types'

export class TableTop extends Scene {
  width: number
  height: number

  holes: Hole[] = []

  constructor(width: number, height: number) {
    super()

    this.width = width
    this.height = height
  }

  addHole(hole: Hole) {
    this.holes.push(hole)
  }

  /**
   * check if a target movement is valid
   * @param position
   */
  isValidMovement(position: Position): boolean {
    return !this.isOutside(position) && !this.isHole(position)
  }

  isOutside(position: Position): boolean {
    return !(
      position.x >= 0 &&
      position.x < this.width &&
      position.y >= 0 &&
      position.y < this.height
    )
  }

  isHole(position: Position): boolean {
    let isHole = false
    
    this.holes.forEach((hole: Hole) => {
      if(hole.position.x === position.x && hole.position.y === position.y) {
        isHole = true
        //break
      }
    })
    return isHole
  }
}
