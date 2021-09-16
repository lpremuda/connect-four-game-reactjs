import React, { Component } from 'react'

import Cell from './Cell'

export default class ConnectFourBoard extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   cellArray: new Array(this.props.height).fill('-').map(x => new Array(this.props.width).fill('-'))
    // };
    this.checkForWinner = this.checkForWinner.bind(this);
  }

  checkForWinner(cellArray, row, col, token) {
    const fourInARow = new Array(4).fill(false);

    // Check row
    fourInARow[0] = this.checkLine(cellArray, row, col, 'row', token);

    // Check column
    fourInARow[1] = this.checkLine(cellArray, row, col, 'col', token);

    // Check right diagonal line
    fourInARow[2] = this.checkLine(cellArray, row, col, 'rightDiag', token);

    // Check left diagonal line
    fourInARow[3] = this.checkLine(cellArray, row, col, 'leftDiag', token);


    // Declare a winner if any of the fourInARow array elements is true
    const winnerPresent = fourInARow.includes(true);

    if (winnerPresent) {
      this.props.setWinnerPresent();
    }
  }

  checkLine(cellArray, row, col, lineType, token) {
    let line;
    if (lineType === 'row') {
      line = cellArray[row];
    } else if (lineType === 'col') {
      line = cellArray.map(row2 => row2[col]);
    } else if (lineType === 'rightDiag') {
      line = this.getDiagLine(cellArray, row, col, 'right');
    } else if (lineType === 'leftDiag') {
      line = this.getDiagLine(cellArray, row, col, 'left');
    }

    // Return indices where line[idx] === token
    const indexMatches = line.reduce((accum,currentVal,i) => {
      if (currentVal === token) {
        accum.push(i);
      }
      return accum;
    }, []);

    let isFourInARow
    if (indexMatches.length < 4) {
      isFourInARow = false;
    } else {
      isFourInARow = this.checkInARow(indexMatches);
    }

    return isFourInARow
  }

  checkInARow(indexMatches) {
    let diff = [];
    for (let i=0; i<indexMatches.length-2; i++) {
      diff.push(Math.abs( indexMatches[i+1]-indexMatches[i] ));
    }
    const isInARow = diff.every(el => el === 1);
    return isInARow;
  }

  getDiagLine(cellArray, row, col, direction) {
    const bottomCoord = this.getBottomCorner(row, col, direction);

    let incRow, incCol;
    if (direction === 'right') {
      incRow = -1;
      incCol = 1;
    } else {
      // 'left'
      incRow = -1;
      incCol = -1;
    }


    // Initialize row and col to the bottom coordinate
    let tempRow = bottomCoord[0];
    let tempCol = bottomCoord[1];
    let line = []

    // If valid coordinate, push value ('X', 'O', or '-') to line array and increment
    while (this.isValidCoord(tempRow,tempCol)) {
      line.push(cellArray[tempRow][tempCol]);
      tempRow += incRow;
      tempCol += incCol;
    }
    return line;
  }

  getBottomCorner(row, col, direction) {
    let incRow, incCol;
    if (direction === 'right') {
      incRow = 1;
      incCol = -1;
    } else {
      // 'left'
      incRow = 1;
      incCol = 1;
    }


    let tempRow = row;
    let tempCol = col;
    let validCoord;
    while (this.isValidCoord(tempRow,tempCol)) {
      validCoord = [tempRow, tempCol];
      tempRow += incRow;
      tempCol += incCol;
    }
    return validCoord;
  }

  isValidCoord(row, col) {
    let isValid = false;
    if (row >= 0 && row < this.props.height) {
      if (col >= 0 && row < this.props.width) {
        isValid = true;
      }
    }
    return isValid;
  }

  handleClick(r,c) {
    // If winner present, do not run handleClick function
    if (this.props.winnerPresent) {
      return;
    }
    const column = this.props.cellArray.map(row => row[c]);
    const iNotEmpty = column.findIndex(cell => cell !== '-');
    if (iNotEmpty === 0) {
      // full column because it found that the  first index (0) was not equal to '-'
      return;
    }

    let rowToSet;
    if (iNotEmpty === -1) {
      rowToSet = column.length - 1;
    } else {
      rowToSet = iNotEmpty - 1;
    }
  
    // Create copy of this.props.cellArray
    let cellArrayNew = this.props.cellArray;
    const token = this.props.xPlaysNext ? 'X' : 'O';
    cellArrayNew[rowToSet][c] = token;

    // Apply new cellArray using setState, toggle xPlaysNext
    // this.setState({
    //   cellArray: cellArrayNew,
    // });
    this.props.setCellArray(cellArrayNew);

    this.props.togglePlayerTurn();

    this.checkForWinner(cellArrayNew, rowToSet, c, token);
  }

  renderCell(val, r, c) {
    return (
      <Cell value={val} handleClick={() => this.handleClick(r,c)} />
    );
  }

  render() {
    const cellArray = this.props.cellArray; 

    return (
      <div style={{
        backgroundColor: 'gold',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        width: '650px',
        margin: 'auto',
        paddingTop: '10px',
        paddingBottom: '10px',
        }}
      >
        {cellArray.map((row,iRow) => (
          <div style={{ margin: 'auto' }}>
            {row.map((col,iCol) => (
              this.renderCell(cellArray[iRow][iCol], iRow, iCol)
            ))}
          </div>
        ))}
      </div>
    )
  }
}