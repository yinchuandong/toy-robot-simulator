import { Game } from '../game'
import { Robot } from '../robot'
import { TableTop } from '../tableTop'

jest.mock('../tableTop')
jest.mock('../robot')

describe('Game Class', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  describe('constructor', () => {
    it('should initialize Game with proper arguments', () => {
      const game = new Game(
        { width: 5, height: 5 },
        { x: 0, y: 0, facing: 'South' }
      )

      expect(game.tableTop).not.toBeNull()
      expect(game.robot).not.toBeNull()

      expect(TableTop).toBeCalledWith(5, 5)
      expect(Robot).toBeCalledWith({ x: 0, y: 0 }, 'South')
    })
  })

  describe('step', () => {
    it('should execute PLACE cmd with x, y, facing', () => {
      const game = new Game(
        { width: 5, height: 5 },
        { x: 0, y: 0, facing: 'South' }
      )

      // isValidMovement is true
      game.tableTop.isValidMovement = jest.fn().mockImplementation(() => true)
      game.step('PLACE', { x: 2, y: 2, facing: 'North' })
      expect(game.tableTop.isValidMovement).toBeCalledWith({ x: 2, y: 2 })
      expect(game.robot.place).toBeCalledWith({ x: 2, y: 2 }, 'North')

      // isValidMovement is false
      game.tableTop.isValidMovement = jest.fn().mockImplementation(() => false)
      game.step('PLACE', { x: -1, y: 2, facing: 'North' })
      expect(game.tableTop.isValidMovement).toBeCalledWith({ x: -1, y: 2 })
      expect(game.robot.place).toBeCalledTimes(1)
    })

    it('should execute MOVE cmd', () => {
      Robot.prototype.getNextTargetPosition = jest
        .fn()
        .mockImplementation(() => {
          return { x: 0, y: 1 }
        })

      const game = new Game(
        { width: 5, height: 5 },
        { x: 0, y: 0, facing: 'South' }
      )
      // isValidMovement is true
      game.tableTop.isValidMovement = jest.fn().mockImplementation(() => true)
      game.step('MOVE')
      expect(game.tableTop.isValidMovement).toBeCalledWith({ x: 0, y: 1 })
      expect(game.robot.move).toBeCalledWith({ x: 0, y: 1 })

      // isValidMovement is false
      game.tableTop.isValidMovement = jest.fn().mockImplementation(() => false)
      game.step('MOVE')
      expect(game.tableTop.isValidMovement).toBeCalledWith({ x: 0, y: 1 })
      expect(game.robot.move).toBeCalledTimes(1)
    })

    it('should execute LEFT cmd', () => {
      const game = new Game(
        { width: 5, height: 5 },
        { x: 0, y: 0, facing: 'South' }
      )

      game.step('LEFT')
      expect(game.robot.rotateLeft).toBeCalled()
    })

    it('should execute RIGHT cmd', () => {
      const game = new Game(
        { width: 5, height: 5 },
        { x: 0, y: 0, facing: 'South' }
      )

      game.step('RIGHT')
      expect(game.robot.rotateRight).toBeCalled()
    })

    it('should execute REPORT cmd with callback', () => {
      Robot.prototype.report = jest.fn().mockImplementation(() => '0,0,South')
      const game = new Game(
        { width: 5, height: 5 },
        { x: 0, y: 0, facing: 'South' }
      )

      const callback = jest.fn()

      game.step('REPORT', { callback })
      expect(game.robot.report).toBeCalled()
      expect(callback).toBeCalledWith('0,0,South')
    })

    it('should raise error with error message when a invalid cmd is given', () => {
      const game = new Game(
        { width: 5, height: 5 },
        { x: 0, y: 0, facing: 'South' }
      )
      expect(() => {
        game.step('invalid cmd')
      }).toThrowError(/Invalid command: invalid cmd/)
    })
  })
})
