CREATE TABLE IF NOT EXISTS
users (id SERIAL PRIMARY KEY,
      user_name VARCHAR NOT NULL,
      password VARCHAR NOT NULL);

CREATE TABLE IF NOT EXISTS
planet_votes (id serial PRIMARY KEY NOT NULL,
              planet_id INTEGER NOT NULL,
              planet_name VARCHAR,
              submission_time TIMESTAMP DEFAULT NOW(),
              user_id INTEGER NOT NULL);

ALTER TABLE ONLY planet_votes
ADD CONSTRAINT fk_user
FOREIGN KEY (user_id)
REFERENCES users(id);

