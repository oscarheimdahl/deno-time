import { serve } from 'https://deno.land/std@0.166.0/http/server.ts';

const handler = (_req: Request) => {
  console.log('weeee');

  return new Response('', { status: 200 });
};

await serve(handler, { port: 3002 });
