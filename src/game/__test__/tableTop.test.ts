import { Hole } from '../hole'
import { TableTop } from '../tableTop'

describe('TableTop Class', () => {
  describe('constructor', () => {
    it('should initialize TableTop with proper arguments', () => {
      const tableTop = new TableTop(5, 6)
      expect(tableTop.width).toBe(5)
      expect(tableTop.height).toBe(6)
    })
  })

  describe('isHole', () => {
    it('should return true when meeting a hole', () => {
      const tableTop = new TableTop(5, 6)
      tableTop.addHole(new Hole({ x: 2, y: 3 }))
      expect(tableTop.isHole({ x: 2, y: 3 })).toBeTruthy()
    })

    it('should return false when no meeting a hole', () => {
      const tableTop = new TableTop(5, 6)
      tableTop.addHole(new Hole({ x: 2, y: 3 }))
      expect(tableTop.isHole({ x: 2, y: 2 })).toBeFalsy()
    })
  })

  describe('isOutside', () => {
    it('should return true when the position is outside', () => {
      const tableTop = new TableTop(5, 5)
      expect(tableTop.isOutside({ x: -1, y: 0 })).toBeTruthy()
      expect(tableTop.isOutside({ x: 0, y: 5 })).toBeTruthy()
      expect(tableTop.isOutside({ x: 5, y: 0 })).toBeTruthy()
      expect(tableTop.isOutside({ x: 5, y: 5 })).toBeTruthy()
      expect(tableTop.isOutside({ x: 0, y: -1 })).toBeTruthy()
    })

    it('should return false when the position is inside', () => {
      const tableTop = new TableTop(5, 5)
      expect(tableTop.isOutside({ x: 0, y: 0 })).toBeFalsy()
      expect(tableTop.isOutside({ x: 0, y: 4 })).toBeFalsy()
      expect(tableTop.isOutside({ x: 4, y: 0 })).toBeFalsy()
      expect(tableTop.isOutside({ x: 4, y: 4 })).toBeFalsy()
      expect(tableTop.isOutside({ x: 2, y: 2 })).toBeFalsy()
    })
  })

  describe('isValidMovement', () => {
    it('should return true when the position is valid', () => {
      const tableTop = new TableTop(5, 5)
      expect(tableTop.isValidMovement({ x: 0, y: 0 })).toBeTruthy()
      expect(tableTop.isValidMovement({ x: 0, y: 4 })).toBeTruthy()
      expect(tableTop.isValidMovement({ x: 4, y: 0 })).toBeTruthy()
      expect(tableTop.isValidMovement({ x: 4, y: 4 })).toBeTruthy()
      expect(tableTop.isValidMovement({ x: 2, y: 2 })).toBeTruthy()
    })

    it('should return false when the position is invalid', () => {
      const tableTop = new TableTop(5, 5)
      expect(tableTop.isValidMovement({ x: -1, y: 0 })).toBeFalsy()
      expect(tableTop.isValidMovement({ x: 0, y: 5 })).toBeFalsy()
      expect(tableTop.isValidMovement({ x: 5, y: 0 })).toBeFalsy()
      expect(tableTop.isValidMovement({ x: 5, y: 5 })).toBeFalsy()
      expect(tableTop.isValidMovement({ x: 0, y: -1 })).toBeFalsy()
    })
  })

})
