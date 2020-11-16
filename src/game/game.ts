import { Robot } from './robot'
import { TableTop } from './tableTop'
import { Direction } from './types'

export type CmdPlaceType = { x: number; y: number; facing: Direction }
export type CmdMoveType = undefined
export type CmdLeftType = undefined
export type CmdRightType = undefined
export type CmdReportType = { callback: (info: string) => void }
export type CmdType =
  | CmdPlaceType
  | CmdMoveType
  | CmdLeftType
  | CmdRightType
  | CmdReportType

export class Game {
  robot: Robot
  tableTop: TableTop

  constructor(
    tableTopParams: { width: number; height: number },
    robotParams: { x: number; y: number; facing: Direction }
  ) {
    this.tableTop = new TableTop(tableTopParams.width, tableTopParams.height)
    this.robot = new Robot(
      { x: robotParams.x, y: robotParams.y },
      robotParams.facing
    )
  }

  step(cmd: string, params?: CmdType) {
    switch (cmd) {
      case 'PLACE':
        const { x, y, facing } = params as CmdPlaceType
        if(['NORTH', 'SOUTH', 'EAST', 'WEST'].indexOf(facing) < 0) {
          throw Error(`Invalid args facing: ${facing}`)
        }
        if (this.tableTop.isValidMovement({ x, y })) {
          this.robot.place({ x, y }, facing)
        }
        break

      case 'MOVE':
        const targetPosition = this.robot.getNextTargetPosition()
        if (this.tableTop.isValidMovement(targetPosition)) {
          this.robot.move(targetPosition)
        }
        break

      case 'LEFT':
        this.robot.rotateLeft()
        break

      case 'RIGHT':
        this.robot.rotateRight()
        break

      case 'REPORT':
        const { callback } = params as CmdReportType
        const info = this.robot.report()
        callback(info)
        break

      default:
        throw Error(`Invalid command: ${cmd}`)
    }
  }
}
