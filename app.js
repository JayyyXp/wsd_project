import { Application } from "./deps.js";
import { router } from "./routes/routes.js";
import * as middleware from './middlewares/middlewares.js';
import { viewEngine, engineFactory, adapterFactory } from "./deps.js";
import { Session } from "./deps.js";
import { oakCors  } from "./deps.js";



const app = new Application();

const ejsEngine = engineFactory.getEjsEngine();
const oakAdapter = adapterFactory.getOakAdapter();
app.use(viewEngine(oakAdapter, ejsEngine, {
    viewRoot: "./views"
}));

const session = new Session({ framework: "oak" });
await session.init();
app.use(session.use()(session));

app.use(middleware.errorMiddleware);
app.use(middleware.accessControlsMiddleware);
app.use(middleware.requestTimingMiddleware);
app.use(middleware.serveStaticFilesMiddleware);

app.use(oakCors());
app.use(router.routes());

let port = 7777;
app.listen({ port: port });
  
export default app;