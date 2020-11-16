import { Robot } from './robot'
import { TableTop } from './tableTop'
import { Direction } from './types'

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

  step(cmdText: string) {
    const [cmd, paramText] = cmdText.split(' ')

    let result = undefined
    switch (cmd) {
      case 'PLACE':
        const paramsArr = paramText.split(',')
        const x = parseInt(paramsArr[0])
        const y = parseInt(paramsArr[1])
        const argArr = paramText.split(',')
        const facing = argArr[2].trim() as Direction
        if(['NORTH', 'SOUTH', 'EAST', 'WEST'].indexOf(facing) < 0) {
          throw Error(`Invalid params: ${paramText}`)
        }
        if (this.tableTop.isValidMovement({ x, y })) {
          result =  this.robot.place({ x, y }, facing)
        }
        break

      case 'MOVE':
        const targetPosition = this.robot.getNextTargetPosition()
        if (this.tableTop.isValidMovement(targetPosition)) {
          result = this.robot.move(targetPosition)
        }
        break

      case 'LEFT':
        result = this.robot.rotateLeft()
        break

      case 'RIGHT':
        result = this.robot.rotateRight()
        break
      case 'REPORT':
        result = this.robot.report()
        break

      default:
        throw Error(`Invalid command: ${cmd}`)
    }

    return {
      cmd,
      paramText,
      result
    }
  }

}
