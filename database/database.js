import { Client } from "../deps.js";
import { config, connectionPool } from "../config/config.js";

// For local stuff 
/* 
const getClient = () => {
  return new Client(config.database);
}
 */

// For heroku

const DATABASE_URL = Deno.env.toObject().DATABASE_URL;
const client = new Client(DATABASE_URL);

// for heroku
const executeQuery = async(query, ...args) => {
  try {
      await client.connect();
      return await client.query(query, ...args);
  } catch (e) {
      console.log(e);
  } finally {
      await client.end();
  }
}

// For local
/* const executeQuery = async(query, ...params) => {
  const client = await connectionPool.connect();
  try {
      return await client.query(query, ...params);
  } catch (e) {
      console.log(e);  
  } finally {
      client.release();
  }
  
  return null;
};
 */
export { executeQuery };