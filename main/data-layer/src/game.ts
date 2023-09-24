import { Grid } from './grid';
import { createMachine, interpret } from 'xstate';

class Game {
  grid: Grid;
  constructor(grid: Grid) {
    this.grid = grid;
  }
}

export class SimonSaysGame extends Game {
  name = 'Simon Says';
  description = 'Simon says game blah blah blah blah';

  gameMachine = createMachine(
    {
      /** @xstate-layout N4IgpgJg5mDOIC5QBUCWAbOA6ASmAhhAJ4AEALgPYmwAWFA7gMQAesZ+ZYW+AZpwE4AKAIwAGcQEpGaTLFwFi5KrQYBtUQF1EoAA4VYqMqgoA7bSGaIATADZhWUQGZhVgKwB2G1YCcj7wBZXRwAaECJrIKxXcXFvd3dXYTt3fwBfVNCZbABlOnpUEyhyDDAWNg4uXgERGKksuVyGAqKjTHUtJBA9AyNTc0sEO3tHKwAOYUDvUdFRx1dQ8IQ3RyiY0TiEpOEU9MySuXqSCh4eRnbzbsNjM06BoawR8cnp2fmwxHGsf28fqfXbRJzXYgepYQ7HU6qYQdXT6K59W4fOIPfyOeLrF5zBaICZWL5JGzuUa2OKifxJYGggCCAGMaWAdEZCiQCjoAK5kRgASRM7LI506l16N1AAxcniwo1Rnm8oncjn8oxsIXeS1ceNmjgVVmErkVVjlaQyIP2WFp9MZzRZvI53Jt-OhFzhwv6OKsEqlaJssvliuV2IQwgCDy1zm8thsyvcusppvNDKZRVZtp5fNUVhhXWd11dgcNWF9fn8coVSpViyD9nJkalAT1VlRo3SxpMFAgcHM9SdPRziKWNgLo1lysCjkJqKSAYAtAO1mTPLNo64h7HZPJCKRKNQ8t34SKLIgUoPhwqguORgGG-58TWo65fMvXKucnkra0wLuXX3UXjCaT3cuRLDpe6pfL8fzhjYgLuM+Bz7EcJyfr2oofLqWBWAqfj3pibyLA2A7eASZYJA+oxPsa1J0gmVrJmQSEIihebBl40TbASwhou4l7+ARRF3qR5F7GuAAy+h0YK2YMQegaJNeniuFBriJAkRLCCBKyhnMZI-P40awVgADqUlCsh0m6hMBZQYpykeOMAZBtempjAENgTrpNjNqkQA */
      id: 'Tiles',
      initial: 'Ready to show',
      states: {
        'Ready to show': {
          after: {
            '1000': {
              target: '#Tiles.Showing tile',
              actions: [],
              meta: {},
            },
          },
        },
        'Showing tile': {
          after: {
            '1000': {
              target: '#Tiles.Tiles off',
              actions: [],
            },
          },
        },
        'Tiles off': {
          always: [
            {
              target: 'Ready to show',
              cond: 'More tiles to show',
            },
            {
              target: 'Accepting input',
            },
          ],
        },
        'Accepting input': {
          on: {
            Input: [
              {
                target: 'Lost',
                cond: 'Incorrect input',
              },
              {
                target: 'Won',
                cond: 'All correct',
              },
              {
                target: 'Accepting input',
                internal: false,
              },
            ],
          },
        },
        Lost: {},
        Won: {},
      },
      schema: { events: {} as { type: 'Input' } },
      predictableActionArguments: true,
      preserveActionOrder: true,
    },
    {
      actions: {},
      services: {},
      guards: {
        'More tiles to show': (context, event) => false,

        'Incorrect input': (context, event) => false,

        'All correct': (context, event) => false,
      },
      delays: {},
    }
  );
  actor = interpret(this.gameMachine);

  constructor(grid: Grid) {
    super(grid);
  }

  sequence = [
    { tile: { x: 0, y: 0 }, color: [255, 255, 255] },
    { tile: { x: 0, y: 1 }, color: [255, 255, 255] },
    { tile: { x: 1, y: 1 }, color: [255, 255, 255] },
    { tile: { x: 1, y: 0 }, color: [255, 255, 255] },
    { tile: { x: 0, y: 1 }, color: [255, 255, 255] },
    { tile: { x: 1, y: 1 }, color: [255, 255, 255] },
  ];
  sequenceLength = 1;
  showi = 0;

  reset() {
    this.actor.stop();
  }

  start() {}
}

export class Game1Game extends Game {
  name = 'Game 1';
  description = 'arocebkraocedcraoedridorlucdaoe';
}

export class Game2Game extends Game {
  name = 'Game 2';
  description = 'arocebkraocedcraoedridorlucdaoe';
}

export class Game3Game extends Game {
  name = 'Game 3';
  description = 'arocebkraocedcraoedridorlucdaoe';
}

export const availableGames = [SimonSaysGame, Game1Game, Game2Game, Game3Game] as const;
export const availableGameInstances = [
  new SimonSaysGame(new Grid(0, 0)),
  new Game1Game(new Grid(0, 0)),
  new Game2Game(new Grid(0, 0)),
  new Game3Game(new Grid(0, 0)),
] as const;
