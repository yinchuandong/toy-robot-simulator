import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { Home } from './view'

describe('view', () => {
  it('should render a default view', () => {
    render(<Home />)
    const sendButton = screen.getByTestId(/cmd-button/i)
    expect(sendButton).toBeInTheDocument()

    const cmdInput = screen.getByTestId(/cmd-input/)
    expect(cmdInput).toBeInTheDocument()

    const logsPanel = screen.getByTestId(/logs-panel/)
    expect(logsPanel).toBeInTheDocument()
  })

  it('should show logs after executing valid commands', async () => {
    render(<Home />)
    const cmdInput = screen.getByTestId(/cmd-input/) as HTMLInputElement
    const sendButton = screen.getByTestId(/cmd-button/i)

    // PLACE
    fireEvent.change(cmdInput, { target: { value: 'PLACE 0,0,NORTH' } })
    expect(cmdInput.value).toBe('PLACE 0,0,NORTH')
    fireEvent.click(sendButton)
    expect(cmdInput.value).toBe('')
    expect(screen.getByText('PLACE 0,0,NORTH')).toBeInTheDocument()

    // MOVE
    fireEvent.change(cmdInput, { target: { value: 'MOVE' } })
    expect(cmdInput.value).toBe('MOVE')
    fireEvent.click(sendButton)
    expect(cmdInput.value).toBe('')
    expect(screen.getByText('MOVE')).toBeInTheDocument()

    // REPORT
    fireEvent.change(cmdInput, { target: { value: 'REPORT' } })
    expect(cmdInput.value).toBe('REPORT')
    fireEvent.click(sendButton)
    expect(cmdInput.value).toBe('')
    expect(screen.getByText('REPORT')).toBeInTheDocument()
    expect(screen.getByText('Output: 0,1,NORTH')).toBeInTheDocument()
  })

  it('should show logs and alert error after executing invalid command', async () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {})

    render(<Home />)
    const cmdInput = screen.getByTestId(/cmd-input/) as HTMLInputElement
    const sendButton = screen.getByTestId(/cmd-button/i)

    // invalid cmd
    fireEvent.change(cmdInput, { target: { value: 'WRONG 0,0,SOUTH' } })
    expect(cmdInput.value).toBe('WRONG 0,0,SOUTH')
    fireEvent.click(sendButton)
    expect(cmdInput.value).toBe('')
    expect(window.alert).toBeCalled()
  })
})
