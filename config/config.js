import { Pool } from "../deps.js";


let config = {};
let connectionPool = null;

if (Deno.env.get('TEST_ENVIRONMENT')) {
  config.database = {};
} else {
  
  config.database = {

  };
  
  const CONCURRENT_CONNECTIONS = 5;
  connectionPool = new Pool({

  }, CONCURRENT_CONNECTIONS);
  
}

export { config, connectionPool }; 