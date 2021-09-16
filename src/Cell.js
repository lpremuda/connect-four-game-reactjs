import React from 'react'

export default function Cell(props) {
  const cellSize = 70;
  let cellColor;
  switch (props.value) {
    case '-': 
      cellColor = 'azure'
      break;
    case 'X':
      cellColor = 'black'
      break;
    case 'O':
      cellColor = 'red'
      break;
    default:
      cellColor = 'magenta'
  }

  return (
    <div 
      style={{
        display: 'inline-block',
        height: cellSize,
        width: cellSize,
        borderRadius: cellSize/2,
        backgroundColor: cellColor,
        margin: '3px'
      }}
      onClick={props.handleClick}
    >
    </div>
  )
}