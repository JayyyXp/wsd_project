let config = {};

if (Deno.env.get('TEST_ENVIRONMENT')) {
  config.database = {};
} else {
  config.database = {
    hostname: "hattie.db.elephantsql.com",
    database: "yprdlqyj",
    user: "yprdlqyj",
    password: "fIK0cuuYrYo0W84ljQYAA9h0ZmBpoD2s",
    port: 5432
  };
}

export { config }; 