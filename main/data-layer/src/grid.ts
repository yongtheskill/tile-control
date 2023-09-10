class Tile {
  private color_r = 0;
  private color_g = 0;
  private color_b = 0;
  public weight = 0;
  constructor(private readonly coord_x: number, private readonly coord_y: number) {}

  get coords() {
    return [this.coord_x, this.coord_y];
  }

  get color() {
    return [this.color_r, this.color_g, this.color_b];
  }
  set color(newColor: number[]) {
    this.color_r = newColor[0];
    this.color_g = newColor[1];
    this.color_b = newColor[2];
  }

  toJSON() {
    return {
      coords: this.coords,
      color: this.color,
      weight: this.weight,
    };
  }
}

export class Grid {
  data: Tile[][];
  constructor(rows: number, cols: number) {
    this.data = [];
    for (let y = 0; y < rows; y++) {
      const row: Tile[] = [];
      for (let x = 0; x < cols; x++) {
        row.push(new Tile(x, y));
      }
      this.data.push(row);
    }
  }

  get fullGrid() {
    return this.data;
  }

  updateTileColor(x: number, y: number, color: number[]) {
    this.data[y][x].color = color;
  }

  updateTileWeight(x: number, y: number, weight: number) {
    this.data[y][x].weight = weight;
  }
}
