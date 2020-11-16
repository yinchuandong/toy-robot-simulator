import { useState } from 'react'
import useDeepCompareEffect from 'use-deep-compare-effect'
import { Game, Direction } from '../../game'

/**
 * A hook to quick initialize game when some settings change
 * @param tableTopParams 
 * @param robotParams 
 */
export const useGame = (
  tableTopParams: { width: number; height: number },
  robotParams: { x: number; y: number; facing: Direction }
) => {
  const [game, setGame] = useState<Game>()

  useDeepCompareEffect(() => {
    setGame(new Game(tableTopParams, robotParams))
  }, [tableTopParams, robotParams])

  return { game }
}
