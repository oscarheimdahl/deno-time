import 'https://deno.land/x/dotenv@v3.2.0/load.ts';
import { Context, Status } from 'https://deno.land/x/oak@v11.1.0/mod.ts';
import { connect } from 'npm:@planetscale/database@^1.4';

const config = {
  host: Deno.env.get('HOST'),
  username: Deno.env.get('USERNAME'),
  password: Deno.env.get('PASSWORD'),
};

const db = connect(config);

export const setWaterHandler = async (ctx: Context) => {
  let time: number;
  try {
    const body = await ctx.request.body().value;
    time = body.time;
  } catch (e) {
    ctx.response.status = 400;
    ctx.response.body = { message: `Unable to parse body, ${e}` };
    return ctx;
  }

  if (!time) {
    ctx.response.status = 400;
    ctx.response.body = { message: `Please provide a unix timestamp with key 'time', for when you watered` };
    return ctx;
  }

  const results = await db.execute(`update finnsdetvatten SET last_water = ${time} WHERE id = 1;`, [1]);
  if (results.rowsAffected !== 1) {
    ctx.response.status = 500;
    ctx.response.body = { message: `Unable to set water` };
    return ctx;
  }

  ctx.response.status = 201;
};

export const getWaterHandler = async (ctx: Context) => {
  interface WaterRow {
    id: 1;
    last_water: number;
  }

  let lastWater: number;

  try {
    const results = await db.execute('select * from finnsdetvatten', [1]);
    lastWater = (results.rows[0] as WaterRow).last_water;
    console.log(results);
  } catch (e) {
    ctx.response.status = 500;
    ctx.response.body = { message: `Unable to get last water, ${e}` };
    return ctx;
  }

  console.log(lastWater);
  ctx.response.type = 'json';
  ctx.response.body = { time: lastWater };
  ctx.response.status = Status.OK;
};
