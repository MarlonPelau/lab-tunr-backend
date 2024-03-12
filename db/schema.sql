-- db/schema.sql
DROP DATABASE IF EXISTS tuner;
CREATE DATABASE tuner;

\c tuner;

CREATE TABLE tunes (
 id SERIAL PRIMARY KEY,
 name TEXT NOT NULL,
 artist TEXT NOT NULL,
 album TEXT,
 time TEXT,
 is_favorite BOOLEAN
);
