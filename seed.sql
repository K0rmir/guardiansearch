CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS savedArticles (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  article_id VARCHAR(255),
  article_title VARCHAR(255),
  article_url VARCHAR(255),
  article_category VARCHAR(255),
  article_publishDate VARCHAR(255)
)