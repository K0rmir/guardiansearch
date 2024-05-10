CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR (255)
);

CREATE TABLE IF NOT EXISTS savedArticles (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  article_id VARCHAR(255),
  article_title VARCHAR(255),
  article_url VARCHAR(255),
  article_category VARCHAR(255),
  article_publishDate VARCHAR(255),
  is_saved bool,
  article_img_url VARCHAR(255)
)

CREATE TABLE IF NOT EXISTS articleauthors (
  id SERIAL PRIMARY KEY,
  article_id VARCHAR(255),
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  user_id INTEGER
)