import { Game } from '../game'

describe('Game end to end test', () => {
  describe('test example a)', () => {
    // PLACE 0,0,NORTH
    // MOVE
    // REPORT
    // Output: 0,1,NORTH

    it('should show exactly', () => {
      const game = new Game(
        { width: 5, height: 5 },
        { x: 0, y: 1, facing: 'NORTH' }
      )
      game.step('PLACE 0,0,NORTH')
      game.step('MOVE')
      const { result } = game.step('REPORT')
      expect(result).toBe('0,1,NORTH')
    })
  })

  describe('test example b)', () => {
    // PLACE 0,0,NORTH
    // LEFT
    // REPORT
    // Output: 0,0,WEST

    it('should show exactly', () => {
      const game = new Game(
        { width: 5, height: 5 },
        { x: 0, y: 0, facing: 'NORTH' }
      )
      game.step('PLACE 0,0,NORTH')
      game.step('LEFT')
      const { result } = game.step('REPORT')
      expect(result).toBe('0,0,WEST')
    })
  })

  describe('test preventing failing', () => {
    it('should prevent failing when moving to borders', () => {
      const game = new Game(
        { width: 5, height: 5 },
        { x: 0, y: 0, facing: 'NORTH' }
      )
      let ret
      // MOVE towards SOUTH at 0,0
      game.step('PLACE 0,0,SOUTH')
      game.step('MOVE')
      ret = game.step('REPORT')
      expect(ret.result).toBe('0,0,SOUTH')

      // MOVE towards NORTH at 0,4
      game.step('PLACE 0,4,NORTH')
      game.step('MOVE')
      ret = game.step('REPORT')
      expect(ret.result).toBe('0,4,NORTH')

      // MOVE towards WEST at 0,0
      game.step('PLACE 0,0,WEST')
      game.step('MOVE')
      ret = game.step('REPORT')
      expect(ret.result).toBe('0,0,WEST')

      // MOVE towards EAST at 4,0
      game.step('PLACE 4,0,EAST')
      game.step('MOVE')
      ret = game.step('REPORT')
      expect(ret.result).toBe('4,0,EAST')
    })
  })

  describe('test preventing entering a hole', () => {
    it('should prevent failing when moving to a hole', () => {
      const game = new Game(
        { width: 5, height: 5 },
        { x: 2, y: 1, facing: 'NORTH' }
      )

      let ret
      // MOVE towards SOUTH at 0,0
      game.step('PLACE 2,1,NORTH')
      game.step('MOVE')
      ret = game.step('REPORT')
      expect(ret.result).toBe('2,1,NORTH')

    })
  })
})
