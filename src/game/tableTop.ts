import { Robot } from './robot'
import { Scene } from './scene'

export class TableTop extends Scene {
  width: number
  height: number

  constructor(width: number, height: number) {
    super()

    this.width = width
    this.height = height
  }

  /**
   * check if a robot movement is valid
   * @param robot
   */
  canRobotMove(robot: Robot): boolean {
    return false
  }
}
