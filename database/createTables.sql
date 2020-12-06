/* Users */
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(320) NOT NULL,
    password CHAR(60) NOT NULL
  ); 

CREATE UNIQUE INDEX ON users((lower(email)));

/* Morning */ 
CREATE TABLE morning (
  id SERIAL PRIMARY KEY,
  user_id SMALLINT,
  sleep_duration REAL,
  sleep_quality SMALLINT,
  morning_mood SMALLINT,
  date DATE
);

/* Evening */

CREATE TABLE evening (
  id SERIAL PRIMARY KEY,
  user_id SMALLINT,
  sport_time REAL,
  study_time REAL,
  eating SMALLINT,
  evening_mood SMALLINT,
  date DATE
);