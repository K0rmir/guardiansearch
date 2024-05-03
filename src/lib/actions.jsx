"use server";

import {auth} from "@clerk/nextjs/server";
import {db} from "./db";

// Insert article data into database to save it //
export async function handleSaveArticle(articles) {
  // const user_id = GET THIS FROM AUTH PROVIDER //

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
    `INSERT INTO savedarticles (article_id, article_title, article_url, article_category, article_publishdate, is_saved, article_img_url)
    VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [
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
  await db.query(
    `INSERT INTO articleauthors (article_id, first_name, last_name) VALUES ($1, $2, $3)`,
    [authorInfo.article_id, authorInfo.first_name, authorInfo.last_name]
  );
}

// Remove article from database from article table. Either generic or advanced search //
export async function handleRemoveArticle(articles) {
  const article_id = articles.id;
  await db.query(`DELETE FROM savedarticles WHERE article_id = $1`, [
    article_id,
  ]);
  await db.query(`DELETE from articleauthors WHERE article_id = $1`, [
    article_id,
  ]);
}

// Remove saved article from database from bookmarks page //
export async function handleRemoveSavedArticle(savedArticles) {
  const article_id = savedArticles.article_id;
  await db.query(`DELETE FROM savedarticles WHERE article_id = $1`, [
    article_id,
  ]);
  await db.query(`DELETE from articleauthors WHERE article_id = $1`, [
    article_id,
  ]);
}

// Function to check whether or not articles returned from API are saved in database. //
// Call DB to fetch all saved articles //
// Create new array (updatedArticleData) with the .map method. This iterates through each article element in the articleData array //
// Finds articles from both sources which have matching IDs, then returns a new article object with the spread operator. (This is a copy of article elements from API array) //
// Then adds the isSaved property to that new object and sets the value to true or false if it is saved or not. //

export async function checkSavedArticles(articleData) {
  const savedArticles = await db.query(
    `SELECT article_id, is_saved FROM savedarticles`
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
  const savedArticles = await db.query(
    `
    SELECT * from savedarticles`
  );

  return savedArticles.rows;
}

export async function fetchUniqueArticleData(uniqueArticleId) {
  const uniqueArticleData = await db.query(
    `SELECT * FROM savedarticles WHERE article_id = $1`,
    [uniqueArticleId]
  );
  return uniqueArticleData.rows[0];
}

// -------------------- //

// export async function insertUserInSupabase(email, username = {}) {
//   const supabase = createSupabaseClient(); // Replace with your Supabase initialization

//   const {data, error} = await supabase
//     .from("users") // Replace with your table name
//     .insert([{email, username}]);

//   if (error) {
//     console.error("Error inserting user data:", error);
//     // Handle any insertion errors here (optional)
//   } else {
//     console.log("User data inserted successfully!");
//   }
// }

// ---------------------------- //
