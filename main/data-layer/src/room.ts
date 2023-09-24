import { availableGameInstances, availableGames } from './game';
import { Grid } from './grid';

type RoomStates = 'Stopped' | 'Playing' | 'Paused';

export class Room {
  state: RoomStates;
  game: (typeof availableGameInstances)[number];
  grid: Grid;
  constructor(gridSize: [number, number]) {
    this.state = 'Stopped';
    this.grid = new Grid(gridSize[0], gridSize[1]);
    this.game = new availableGames[0](this.grid);
  }

  setState(state: RoomStates) {
    this.state = state;
  }

  setGameId(gameId: number) {
    this.state = 'Stopped';
    this.game = new availableGames[gameId](this.grid);
  }

  listGames() {
    return availableGameInstances.map((game, i) => ({
      name: game.name,
      description: game.description,
      id: i,
    }));
  }
}
