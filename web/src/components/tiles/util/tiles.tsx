export const nCols = 3;
export const nRows = 3;

export const tileSize = 100;

const colsDigits = Math.floor(Math.log10(nCols)) + 1;
const rowsDigits = Math.floor(Math.log10(nRows)) + 1;
const baseCoordCode = Math.pow(10, colsDigits + rowsDigits);
const colsCoordCodeFormat = Math.pow(10, colsDigits);

export class Coordinate {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  getCode() {
    return baseCoordCode + colsCoordCodeFormat * this.x + this.y;
  }
}

export class Tile {
  coordinate: Coordinate;
  colour: string;
  weight: number;

  constructor(coordinate: Coordinate) {
    this.coordinate = coordinate;
    this.colour = 'eeeeee';
    this.weight = 0;
  }
}

export const grid = new Map<number, Tile>();

export const initGrid = (rows: number, cols: number) => {
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < rows; y++) {
      const newCoord = new Coordinate(x, y);
      grid.set(newCoord.getCode(), new Tile(newCoord));
    }
  }
};
