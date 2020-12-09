import { Pool } from "../deps.js";


const CONCURRENT_CONNECTIONS = 5;
const connectionPool = new Pool({
  hostname: "hattie.db.elephantsql.com",
  database: "yprdlqyj",
  user: "yprdlqyj",
  password: "fIK0cuuYrYo0W84ljQYAA9h0ZmBpoD2s",
  port: 5432
}, CONCURRENT_CONNECTIONS);
  

export { connectionPool }; 