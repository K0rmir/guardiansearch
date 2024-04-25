"use client";

import "./savedarticles.css";
import Header from "@/app/components/Header.jsx";
import {fetchSavedArticles} from "../../lib/actions";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Card} from "primereact/card";
import {useState, useEffect} from "react";

export default function savedArticlesPage() {
  const [savedArticles, setSavedArticles] = useState();

  //   Get saved articles from database on component mount //
  useEffect(() => {
    const getArticles = async () => {
      const savedArticleData = await fetchSavedArticles();
      setSavedArticles(savedArticleData);
    };
    getArticles();
  }, []);

  // Saved Articles Table //

  // Table Header //
  const header = (
    <div className="savedArticleTableHeader">
      <span className="headerTitle">Bookmarked Articles</span>
    </div>
  );

  // Table Footer //
  const footer = `Returned ${
    savedArticles ? savedArticles.length : 0
  } bookmarked articles.`;

  // Article Title Template //
  const titleBodyTemplate = (savedArticles) => {
    return (
      <a
        href={`${savedArticles.article_url}`}
        rel="noopener noreferrer"
        target="_blank"
        className="SavedArticleTableTitle">
        <p>{savedArticles.article_title}</p>
      </a>
    );
  };

  // Article Image Template //
  const imageBodyTemplate = (savedArticles) => {
    const articleImgUrl = `${savedArticles.article_img_url}`;
    if (articleImgUrl.includes("No Image Available.")) {
      return <p>No Image Available.</p>;
    } else
      return (
        <img src={savedArticles.article_img_url} className="articleImg"></img>
      );
  };

  // Article Published Date Template //
  const publishedBodyTemplate = (savedArticles) => {
    return (
      <p>{new Date(savedArticles.article_publishdate).toLocaleDateString()}</p>
    );
  };

  // Article Category Template //
  const categoryBodyTemplate = (savedArticles) => {
    return <p>{savedArticles.article_category}</p>;
  };

  const savedArticlesActionsTemplate = (savedArticles) => {
    // Preview article //
    // Reference article //
    // Share article //
    // Remove article from bookmarks //
    return;
  };

  return (
    <>
      <Header />

      <div className="SavedArticleTableContainer">
        <Card className="SavedArticleTableCard">
          <DataTable
            value={savedArticles}
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 20, 30]}
            scrollable
            scrollHeight="750px"
            header={header}
            footer={footer}
            className="SavedArticleTable">
            <Column
              header="Title"
              body={titleBodyTemplate}
              style={{width: "45%"}}></Column>
            <Column
              header="Image"
              body={imageBodyTemplate}
              style={{width: "15%"}}></Column>
            <Column
              header="Category"
              body={categoryBodyTemplate}
              className="column"
              style={{width: "15%"}}></Column>
            <Column
              header="Published"
              body={publishedBodyTemplate}
              className="column"
              style={{width: "15%"}}></Column>
            <Column
              header="Actions"
              body={savedArticlesActionsTemplate}
              className="colimn"></Column>
          </DataTable>
        </Card>
      </div>
    </>
  );
}
