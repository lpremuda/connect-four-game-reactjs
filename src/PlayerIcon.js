import React from 'react'

export default function PlayerIcon(props) {
  const smallIconSize = 20;
  const playerTurn = props.xPlaysNext ? 'black' : 'red';

  return (
    <div style={{
      display: 'inline-block',
      height: smallIconSize,
      width: smallIconSize,
      borderRadius: smallIconSize/2,
      backgroundColor: playerTurn
      }}
    />  
  )
}
