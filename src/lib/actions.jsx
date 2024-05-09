"use server";

import {db} from "./db";
import {auth} from "@clerk/nextjs/server";

// Insert article data into database to save it //
export async function handleSaveArticle(articles) {
  // Get clerkuserid
  const {userId} = auth();
  const clerkUserId = userId;
  // Get user_Id from database where it matches clerkuserid
  const usersRes = await db.query(`SELECT * from users WHERE user_id = $1`, [
    clerkUserId,
  ]);
  const user_id = usersRes.rows[0].id;

  const article_id = articles.id;
  const article_title = articles.webTitle;
  const article_url = articles.webUrl;
  const article_category = articles.sectionName;
  const article_publishdate = new Date(
    articles.webPublicationDate
  ).toLocaleDateString();
  let article_img_url;
  if (articles.elements.length < 1) {
    article_img_url = "No Image Available.";
  } else {
    article_img_url = articles.elements[0].assets[0].file;
  }
  const is_saved = articles.isSaved;

  const saveNewArticle = await db.query(
    `INSERT INTO savedarticles (user_id, article_id, article_title, article_url, article_category, article_publishdate, is_saved, article_img_url)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
    [
      user_id,
      article_id,
      article_title,
      article_url,
      article_category,
      article_publishdate,
      is_saved,
      article_img_url,
    ]
  );

  handleArticleAuthors(articles); // Separate function for handling article authors
}

export async function handleArticleAuthors(articles) {
  const articleAuthorNum = articles.tags.length; // find how many authors per articles

  let authorInfo = {};
  if (articleAuthorNum === 0) {
    // if no authors attributed to article in api, set names to null and insert
    authorInfo = {
      article_id: articles.id,
      first_name: "null",
      last_name: "null",
    };
    insertAuthor(authorInfo);
  } else {
    // else if one or more, loop through tags array containing authors, set article id, names and insert
    for (const author of articles.tags) {
      authorInfo = {
        article_id: articles.id,
        first_name: author.firstName,
        last_name: author.lastName,
      };
      insertAuthor(authorInfo);
    }
  }
}

async function insertAuthor(authorInfo) {
  const {userId} = auth();
  const clerkUserId = userId;
  // Get user_Id from database where it matches clerkuserid
  const usersRes = await db.query(`SELECT * from users WHERE user_id = $1`, [
    clerkUserId,
  ]);
  const user_id = usersRes.rows[0].id;

  await db.query(
    `INSERT INTO articleauthors (article_id, first_name, last_name, user_id) VALUES ($1, $2, $3, $4)`,
    [
      authorInfo.article_id,
      authorInfo.first_name,
      authorInfo.last_name,
      user_id,
    ]
  );
}

// Remove article from database from article table. Either generic or advanced search //
export async function handleRemoveArticle(articles) {
  const {userId} = auth();
  const clerkUserId = userId;
  // Get user_Id from database where it matches clerkuserid
  const usersRes = await db.query(`SELECT * from users WHERE user_id = $1`, [
    clerkUserId,
  ]);
  const user_id = usersRes.rows[0].id;

  const article_id = articles.id;
  await db.query(
    `DELETE FROM savedarticles WHERE (article_id = $1) AND (user_id = $2)`,
    [article_id, user_id]
  );
  await db.query(
    `DELETE from articleauthors WHERE (article_id = $1) AND (user_id = $2)`,
    [article_id, user_id]
  );
}

// Remove saved article from database from bookmarks page //
export async function handleRemoveSavedArticle(savedArticles) {
  const {userId} = auth();
  const clerkUserId = userId;
  // Get user_Id from database where it matches clerkuserid
  const usersRes = await db.query(`SELECT * from users WHERE user_id = $1`, [
    clerkUserId,
  ]);
  const user_id = usersRes.rows[0].id;
  const article_id = savedArticles.article_id;

  await db.query(
    `DELETE FROM savedarticles WHERE (article_id = $1) AND (user_id = $2)`,
    [article_id, user_id]
  );
  await db.query(
    `DELETE from articleauthors WHERE (article_id = $1) AND (user_id = $2)`,
    [article_id, user_id]
  );
}

// Function to check whether or not articles returned from API are saved in database. //
// Call DB to fetch all saved articles //
// Create new array (updatedArticleData) with the .map method. This iterates through each article element in the articleData array //
// Finds articles from both sources which have matching IDs, then returns a new article object with the spread operator. (This is a copy of article elements from API array) //
// Then adds the isSaved property to that new object and sets the value to true or false if it is saved or not. //

export async function checkSavedArticles(articleData) {
  // Get clerkuserid
  const {userId} = auth();
  const clerkUserId = userId;

  const usersRes = await db.query(`SELECT * from users WHERE user_id = $1`, [
    clerkUserId,
  ]);
  const user_id = usersRes.rows[0].id;

  const savedArticles = await db.query(
    `SELECT article_id, is_saved FROM savedarticles WHERE user_id = $1`,
    [user_id]
  );

  const updatedArticleData = articleData.map((article) => {
    const savedArticle = savedArticles.rows.find(
      (saved) => saved.article_id === article.id
    );

    return {
      ...article,
      isSaved: savedArticle ? savedArticle.is_saved : false,
    };
  });
  return updatedArticleData;
}

// Fetch all saved article data //
export async function fetchSavedArticles() {
  // Get clerkuserid
  const {userId} = auth();
  const clerkUserId = userId;

  const usersRes = await db.query(`SELECT * from users WHERE user_id = $1`, [
    clerkUserId,
  ]);
  const user_id = usersRes.rows[0].id;

  const savedArticles = await db.query(
    `
    SELECT * from savedarticles WHERE user_id = $1`,
    [user_id]
  );

  return savedArticles.rows;
}

// add aliases to columns names where column names are duplicated across tables (article_id) to avoid ambiguous error.
// aliases are sa (savedarticles) & aa (articleauthors). aa first & last name is joined to sa.
// query was initially returning 3 separate objects for each author in an article.
// Solved this by using json_agg & json_build_object to create array of objects each with first and last name properties.
// Use 'group by' to ensure those columns are included in the single object

export async function fetchUniqueArticleData(uniqueArticleId) {
  const uniqueArticleData = await db.query(
    `SELECT sa.*, json_agg(json_build_object('first_name', aa.first_name, 'last_name', aa.last_name)) AS authors
    FROM savedarticles sa
    INNER JOIN articleauthors aa ON sa.article_id = aa.article_id
    WHERE sa.article_id = $1
    GROUP BY sa.id, sa.user_id, sa.article_id, sa.article_title, sa.article_url, sa.article_category, sa.article_publishdate, sa.is_saved, sa.article_img_url`,
    [uniqueArticleId]
  );

  return uniqueArticleData.rows[0];
}
