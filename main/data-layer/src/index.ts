import { Elysia, t } from 'elysia';
import { cors } from '@elysiajs/cors';
import { Grid } from './grid';
import { Room } from './room';

const room = new Room([2, 2]);

const app = new Elysia();

app.onError((error) => {
  console.log('error', error);
  return new Response(error.toString());
});

app.use(cors());

app.get('/gameList', () => room.listGames());

app.post(
  '/setGame',
  ({ body }) => {
    room.setGameId(body.gameId);
    return { status: 'success' };
  },
  {
    body: t.Object(
      {
        gameId: t.Number(),
      },
      { description: 'body wrong' }
    ),
  }
);

app.post(
  '/setGameState',
  ({ body }) => {
    room.setState(body.state);
    return { status: 'success' };
  },
  {
    body: t.Object(
      {
        state: t.Union([t.Literal('Playing'), t.Literal('Stopped'), t.Literal('Paused')]),
      },
      { description: 'body wrong' }
    ),
  }
);

app.get('/currentGame', () => ({
  gameState: room.state,
  currentGame: room.game.name,
}));

app.get('/', () => 'Health Check');

app.get('/full', () => room.grid.fullGrid);

app.get(
  '/tile/:x/:y/color/:color',
  ({ params }) => {
    const x = Number(params.x);
    const y = Number(params.y);
    const color: number[] = JSON.parse(params.color);
    room.grid.updateTileColor(x, y, color);
  },
  {
    params: t.Object({
      x: t.String(),
      y: t.String(),
      color: t.String(),
    }),
  }
);

app.get(
  '/tile/:x/:y/weight/:weight',
  ({ params }) => {
    const x = Number(params.x);
    const y = Number(params.y);
    const weight = Number(params.weight);
    room.grid.updateTileWeight(x, y, weight);
  },
  {
    params: t.Object({
      x: t.String(),
      y: t.String(),
      weight: t.String(),
    }),
  }
);

app.listen({ port: 3000, hostname: '0.0.0.0' });

console.log(`🦊 Data layer running at ${app.server?.hostname}:${app.server?.port}`);
