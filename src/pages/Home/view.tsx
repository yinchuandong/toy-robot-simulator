import React, { useMemo, useState } from 'react'
import { CmdPlaceType, CmdReportType } from '../../game'
import { useGame } from './gameHook'

export const Home: React.FC = () => {
  const [cmdText, setCmdText] = useState('')
  const [logs, setLogs] = useState<string[]>([])

  const { game } = useGame(
    { width: 5, height: 5 },
    { x: 0, y: 0, facing: 'NORTH' }
  )

  const handleCmdTextInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value
    setCmdText(value)
  }

  const reportCmdCallback = (info: string) => {
    setLogs((logs) => [...logs, `Output: ${info}`])
  }

  const renderLogs = useMemo(() => {
    return logs.map((log, i) => {
      return <p key={i}>{log}</p>
    })
  }, [logs])

  const handleExecute = (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault()
    try {
      const [cmd, paramText] = cmdText.split(' ')
      setLogs((logs) => [...logs, cmdText])
      setCmdText('')
      if (cmd === 'PLACE' && paramText) {
        const argArr = paramText.split(',')
        const facing = argArr[2].trim()
        game?.step(cmd, {
          x: parseInt(argArr[0]),
          y: parseInt(argArr[1]),
          facing: facing,
        } as CmdPlaceType)
      } else if (cmd === 'REPORT') {
        game?.step(cmd, { callback: reportCmdCallback } as CmdReportType)
      } else {
        game?.step(cmd)
      }
    } catch (error) {
      alert(error)
    }
  }
  return (
    <form onSubmit={handleExecute}>
      <input
        type="text"
        style={{ width: '200px' }}
        value={cmdText}
        onChange={handleCmdTextInputChange}
        data-testid="cmd-input"
      />
      <button onClick={handleExecute} type="submit" data-testid="cmd-button">
        Send
      </button>
      <div data-testid="logs-panel">{renderLogs}</div>
    </form>
  )
}
