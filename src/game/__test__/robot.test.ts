import { Robot, rotateDirectionLookupTable } from '../robot'

describe('rotatedDirectionLookupTable', () => {
  it('should be the pre-defined order', () => {
    expect(rotateDirectionLookupTable).toEqual([
      'North',
      'East',
      'South',
      'West',
      'North',
    ])
  })
})

describe('Robot class', () => {
  describe('constructor', () => {
    it('should initialize Robot with proper arguments', () => {
      let robot = new Robot({ x: 1, y: 2 }, 'North')
      expect(robot.position).toEqual({ x: 1, y: 2 })
      expect(robot.facing).toBe('North')
    })
  })

  describe('place', () => {
    it('should set the position and facing of the robot', () => {
      let robot = new Robot({ x: 1, y: 2 }, 'North')
      robot.place({ x: 3, y: 3 }, 'East')
      expect(robot.position).toEqual({ x: 3, y: 3 })
      expect(robot.facing).toBe('East')
    })
  })

  describe('getNextTargetPosition', () => {

    it('should move to next position when facing South', () => {
      let robot = new Robot({ x: 2, y: 2 }, 'South')
      const targetPosition = robot.getNextTargetPosition()
      expect(targetPosition).toEqual({x: 2, y: 3})
    })

    it('should move to next position when facing North', () => {
      let robot = new Robot({ x: 2, y: 2 }, 'North')
      const targetPosition = robot.getNextTargetPosition()
      expect(targetPosition).toEqual({x: 2, y: 1})
    })

    it('should move to next position when facing East', () => {
      let robot = new Robot({ x: 2, y: 2 }, 'East')
      const targetPosition = robot.getNextTargetPosition()
      expect(targetPosition).toEqual({x: 3, y: 2})
    })

    it('should move to next position when facing West', () => {
      let robot = new Robot({ x: 2, y: 2 }, 'West')
      const targetPosition = robot.getNextTargetPosition()
      expect(targetPosition).toEqual({x: 1, y: 2})
    })
  })

  describe('move', () => {
    it('should move to given target position', () => {
      let robot = new Robot({ x: 2, y: 2 }, 'North')
      robot.move({x: 2, y: 1})
      expect(robot.position).toEqual({x: 2, y: 1})
      expect(robot.facing).toBe('North')
    })
  })

  describe('rotateLeft', () => {
    it('should rotate left', () => {
      let robot = new Robot({ x: 2, y: 2 }, 'North')
      robot.rotateLeft()
      expect(robot.facing).toBe('West')

      robot.rotateLeft()
      expect(robot.facing).toBe('South')

      robot.rotateLeft()
      expect(robot.facing).toBe('East')

      robot.rotateLeft()
      expect(robot.facing).toBe('North')
    })
  })

  describe('rotateRight', () => {
    it('should rotate right', () => {
      let robot = new Robot({ x: 2, y: 2 }, 'North')
      robot.rotateRight()
      expect(robot.facing).toBe('East')

      robot.rotateRight()
      expect(robot.facing).toBe('South')

      robot.rotateRight()
      expect(robot.facing).toBe('West')

      robot.rotateRight()
      expect(robot.facing).toBe('North')
    })
  })
})
