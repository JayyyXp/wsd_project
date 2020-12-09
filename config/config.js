import { Pool } from "../deps.js";


const CONCURRENT_CONNECTIONS = 5;
const connectionPool = new Pool({
  hostname: Deno.env.get('PGHOST'),
  database: Deno.env.get('PGDATABASE'),
  user: Deno.env.get('PGDATABASE'),
  password: Deno.env.get('PGPASSWORD'),
  port: 5432
}, CONCURRENT_CONNECTIONS);
  

export { connectionPool }; 