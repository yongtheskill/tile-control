import { Elysia, t } from 'elysia';
import { Grid } from './grid';

const grid = new Grid(40, 50);

const app = new Elysia();

app.get('/', () => 'Hello Elysia');

app.get('/full', () => grid.fullGrid);

app.get(
  '/tile/:x/:y/color/:color',
  ({ params }) => {
    const x = Number(params.x);
    const y = Number(params.y);
    const color: number[] = JSON.parse(params.color);
    grid.updateTileColor(x, y, color);
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
    grid.updateTileWeight(x, y, weight);
  },
  {
    params: t.Object({
      x: t.String(),
      y: t.String(),
      weight: t.String(),
    }),
  }
);

app.listen(3000);

console.log(`🦊 Data layer running at ${app.server?.hostname}:${app.server?.port}`);
