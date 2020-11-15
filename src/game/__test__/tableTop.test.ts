import { TableTop } from '../tableTop'

describe('TableTop Class', () => {
  describe('constructor', () => {
    it('should initialize Robot with proper arguments', () => {
      const tableTop = new TableTop(5, 6)
      expect(tableTop.width).toBe(5)
      expect(tableTop.height).toBe(6)
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
