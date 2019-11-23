-- SET UP SCHEMA HERE
CREATE DATABASE IF NOT EXISTS badmovies;

USE badmovies;

CREATE TABLE IF NOT EXISTS movies (
    id INTEGER NOT NULL AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    release_date VARCHAR(100) NOT NULL,
    poster_path VARCHAR(100) NOT NULL,
    vote_average DECIMAL(4, 2) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (title)
);