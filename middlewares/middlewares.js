import { send } from '../deps.js';

const errorMiddleware = async(context, next) => {
  try {
    await next();
  } catch (e) {
    console.log(e);
  }
}

const requestTimingMiddleware = async({ request, session}, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  const user = await session.get('user'); 
  const id = (user) ? user.id : 'anonymous';
  console.log(`time: ${start}, 
              method: ${request.method},
              path:  ${request.url.pathname},
              user_id: ${id},
              time: ${ms} ms`);
}

const serveStaticFilesMiddleware = async(context, next) => {
  if (context.request.url.pathname.startsWith('/static')) {
    const path = context.request.url.pathname.substring(7);
  
    await send(context, path, {
      root: `${Deno.cwd()}/static`
    });
  
  } else {
    await next();
  }
}

const accessControlsMiddleware = async({request, response, session}, next) => {
  const pathname = request.url.pathname;
  const auth_ok = (await session.get('authenticated'));
  

  // if is other than root, api, auth then auth has to be ok
  if ( pathname === '/'  ) {
    await next();
  } else if ( pathname.startsWith('/api') ) {
    await next();
  } else if ( pathname.startsWith('/auth') ){
    await next();
  } else if ( auth_ok ) {
    await next();
  } else {
    response.redirect('/auth/login');
  }
};

export { errorMiddleware, requestTimingMiddleware, serveStaticFilesMiddleware, accessControlsMiddleware };