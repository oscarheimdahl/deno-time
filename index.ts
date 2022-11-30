import { serve } from 'https://deno.land/std@0.166.0/http/server.ts';

const handler = (_req: Request) => {
  return new Response('Deno is cool beans', { status: 200 });
};

await serve(handler, { port: 3002 });
