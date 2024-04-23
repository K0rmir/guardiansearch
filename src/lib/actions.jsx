"use server";

import {db} from "@/lib/db";

// import {updateArticles} from "@/context/ApiContext";

// Insert article data into database to save it //
export async function saveArticle(articles) {
  // const user_id = GET THIS FROM AUTH PROVIDER //

  const article_id = articles.id;
  const article_title = articles.webTitle;
  const article_url = articles.webUrl;
  const article_category = articles.sectionName;
  const article_publishdate = new Date(
    articles.webPublicationDate
  ).toLocaleDateString();
  const is_saved = true;

  const saveNewArticle = await db.query(
    `INSERT INTO savedarticles (article_id, article_title, article_url, article_category, article_publishdate, is_saved)
    VALUES ($1, $2, $3, $4, $5, $6)`,
    [
      article_id,
      article_title,
      article_url,
      article_category,
      article_publishdate,
      is_saved,
    ]
  );

  console.log("Article saved successfully!");
}

// iterate through each article returned from api call and add new 'isSaved' property to each article object. //
//  Need to query DB and compare all articles in bookmarkedArticles table against the articles fetched in articleData variable //
// To see if they are bookmarked. This will compare the article ID's and isBookmarked value then update new article property 'isSaved' accordingly //
// Once all done, then update state. setArticles(articleData). //
export async function isArticleSavedCheck(articleData) {
  const savedArticles = await db.query(
    `SELECT article_id, is_saved FROM savedarticles`
  );

  console.table(savedArticles.rows);

  for (const savedArticle of savedArticles.rows) {
    for (const article of articleData) {
      if (article.id === savedArticle.article_id) {
        article.isSaved = savedArticle.is_saved;
        console.log("Article ID match found!");
      } else {
        console.log("No Article ID Match found...");
      }
    }
  }

  // console.log(articleData);
  // updateArticles(articleData);
}

// export async function passArticleData(articleData) {
//   set
// }
