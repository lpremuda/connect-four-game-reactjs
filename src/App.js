import React from 'react';
import './App.css';

import ConnectFourBoard from './ConnectFourBoard';
import PlayerIcon from './PlayerIcon';

function App() {

  class ConnectFourGame extends React.Component {
    constructor (props) {
      super(props);
      this.state = {
        xPlaysNext: true,
        winnerPresent: false,
        cellArray: new Array(this.props.height).fill('-').map(x => new Array(this.props.width).fill('-'))
      };
      this.togglePlayerTurn = this.togglePlayerTurn.bind(this);
      this.handleReset = this.handleReset.bind(this);
      this.setCellArray = this.setCellArray.bind(this);
    }

    togglePlayerTurn() {
      this.setState(prevState => ({ xPlaysNext: !prevState.xPlaysNext }));
    }

    setCellArray(newCellArray) {
      this.setState({ cellArray: newCellArray });
    }

    handleReset() {
      this.setState({
        xPlaysNext: true,
        winnerPresent: false,
        cellArray: new Array(this.props.height).fill('-').map(x => new Array(this.props.width).fill('-'))
      });
    }

    render() {
      const height = this.props.height;
      const width = this.props.width;
      const winnerDisplay = this.state.winnerPresent ? 'visible' : 'hidden';
      return (
        <>
          <h1>Connect Four Game</h1>
          <h3 style={{ display: 'inline'}}>Turn: </h3>
          <PlayerIcon xPlaysNext={this.state.xPlaysNext} />
          <button style={{ position: 'relative', left: '10px' }} onClick={this.handleReset}>Reset Game</button>
          <br />
          <br />
          <div style={{ visibility: winnerDisplay }}>
            <span >Game Over! Winner is: </span>
            <PlayerIcon xPlaysNext={!this.state.xPlaysNext} />
          </div>
          <ConnectFourBoard
            height={height}
            width={width}
            xPlaysNext={this.state.xPlaysNext}
            togglePlayerTurn={this.togglePlayerTurn}
            winnerPresent={this.state.winnerPresent}
            setWinnerPresent={() => this.setState({ winnerPresent: true })}
            cellArray={this.state.cellArray}
            setCellArray={this.setCellArray}
          />
        </>
      )
    }
  }

  return (
    <div className="App">
      <ConnectFourGame height={6} width={7} />
    </div>
  );
}

export default App;
