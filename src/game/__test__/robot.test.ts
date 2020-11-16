import { Robot, rotateDirectionLookupTable } from '../robot'

describe('rotatedDirectionLookupTable', () => {
  it('should be the pre-defined order', () => {
    expect(rotateDirectionLookupTable).toEqual([
      'NORTH',
      'EAST',
      'SOUTH',
      'WEST',
      'NORTH',
    ])
  })
})

describe('Robot class', () => {
  describe('constructor', () => {
    it('should initialize Robot with proper arguments', () => {
      let robot = new Robot({ x: 1, y: 2 }, 'NORTH')
      expect(robot.position).toEqual({ x: 1, y: 2 })
      expect(robot.facing).toBe('NORTH')
    })
  })

  describe('place', () => {
    it('should set the position and facing of the robot', () => {
      let robot = new Robot({ x: 1, y: 2 }, 'NORTH')
      robot.place({ x: 3, y: 3 }, 'EAST')
      expect(robot.position).toEqual({ x: 3, y: 3 })
      expect(robot.facing).toBe('EAST')
    })
  })

  describe('getNextTargetPosition', () => {
    it('should move to next position when facing SOUTH', () => {
      let robot = new Robot({ x: 2, y: 2 }, 'SOUTH')
      const targetPosition = robot.getNextTargetPosition()
      expect(targetPosition).toEqual({ x: 2, y: 1 })
    })

    it('should move to next position when facing NORTH', () => {
      let robot = new Robot({ x: 2, y: 2 }, 'NORTH')
      const targetPosition = robot.getNextTargetPosition()
      expect(targetPosition).toEqual({ x: 2, y: 3 })
    })

    it('should move to next position when facing EAST', () => {
      let robot = new Robot({ x: 2, y: 2 }, 'EAST')
      const targetPosition = robot.getNextTargetPosition()
      expect(targetPosition).toEqual({ x: 3, y: 2 })
    })

    it('should move to next position when facing WEST', () => {
      let robot = new Robot({ x: 2, y: 2 }, 'WEST')
      const targetPosition = robot.getNextTargetPosition()
      expect(targetPosition).toEqual({ x: 1, y: 2 })
    })
  })

  describe('move', () => {
    it('should move to given target position', () => {
      let robot = new Robot({ x: 2, y: 2 }, 'NORTH')
      robot.move({ x: 2, y: 1 })
      expect(robot.position).toEqual({ x: 2, y: 1 })
      expect(robot.facing).toBe('NORTH')
    })
  })

  describe('rotateLeft', () => {
    it('should rotate left', () => {
      let robot = new Robot({ x: 2, y: 2 }, 'NORTH')
      robot.rotateLeft()
      expect(robot.facing).toBe('WEST')

      robot.rotateLeft()
      expect(robot.facing).toBe('SOUTH')

      robot.rotateLeft()
      expect(robot.facing).toBe('EAST')

      robot.rotateLeft()
      expect(robot.facing).toBe('NORTH')
    })
  })

  describe('rotateRight', () => {
    it('should rotate right', () => {
      let robot = new Robot({ x: 2, y: 2 }, 'NORTH')
      robot.rotateRight()
      expect(robot.facing).toBe('EAST')

      robot.rotateRight()
      expect(robot.facing).toBe('SOUTH')

      robot.rotateRight()
      expect(robot.facing).toBe('WEST')

      robot.rotateRight()
      expect(robot.facing).toBe('NORTH')
    })
  })

  describe('report', () => {
    it('should report x,y,facing', () => {
      let robot = new Robot({ x: 2, y: 3 }, 'NORTH')
      expect(robot.report()).toEqual('2,3,NORTH')
    })
  })
})
