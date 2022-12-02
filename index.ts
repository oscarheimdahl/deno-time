import 'https://deno.land/x/dotenv@v3.2.0/load.ts';
import { Application, Router } from 'https://deno.land/x/oak@v11.1.0/mod.ts';
import { getWaterHandler, setWaterHandler } from './handlers.ts';

const app = new Application();
const router = new Router();

router.get('/', getWaterHandler);
router.post('/water', setWaterHandler);

app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 3000 });
