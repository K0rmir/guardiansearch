"use client";

import "./articles.css";
import {useApiContext} from "@/context/ApiContext";
import {useEffect, useState} from "react";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Card} from "primereact/card";
import Header from "@/app/components/Header.jsx";
import {Button} from "primereact/button";
import {handleSaveArticle, handleRemoveArticle} from "../../lib/actions";

export default function Articles() {
  const {
    articles,
    apiCallSearch,
    searchQuery,
    setSearchQuery,
    headerSearch,
    setHeaderSearch,
  } = useApiContext();

  // Get & set search query from URL then call API from context on page load or search query change //
  useEffect(() => {
    const params = new URLSearchParams(document.location.search);
    const query = params.get("search");
    setSearchQuery(query);
    apiCallSearch(query);
    setHeaderSearch(false);
  }, [searchQuery, headerSearch]);

  // Article Table //

  // Table Header //
  const header = (
    <div className="articleTableHeader">
      <span className="headerTitle">Search results for: {searchQuery}</span>
    </div>
  );
  // Table Footer //
  const footer = `Returned ${
    articles ? articles.length : 0
  } articles total by relevance to search query.`;
  // Article Title Template //
  const titleBodyTemplate = (articles) => {
    return (
      <a
        href={`${articles.webUrl}`}
        rel="noopener noreferrer"
        target="_blank"
        className="articleTableTitle">
        <p>{articles.webTitle}</p>
      </a>
    );
  };
  // Article Image Template //
  const imageBodyTemplate = (articles) => {
    if (articles.elements) {
      return (
        <img
          src={articles.elements[0].assets[0].file}
          className="articleImg"></img>
      );
    } else return <p>No image available.</p>;
  };
  // Article Published Date Template //
  const publishedBodyTemplate = (articles) => {
    return <p>{new Date(articles.webPublicationDate).toLocaleDateString()}</p>;
  };
  // Article Category Template //
  const categoryBodyTemplate = (articles) => {
    return <p>{articles.sectionName}</p>;
  };

  const bookmarkArticleBodyTemplate = (articles) => {
    const [isClicked, setIsClicked] = useState(articles.isSaved);
    return articles.isSaved ? (
      <Button
        icon="pi pi-bookmark-fill"
        rounded
        text
        severity="secondary"
        aria-label="Bookmark"
        onClick={() => {
          articles.isSaved = false;
          setIsClicked(articles.isSaved);
          handleRemoveArticle(articles);
          bookmarkArticleBodyTemplate;
        }}
      />
    ) : (
      <Button
        icon="pi pi-bookmark"
        rounded
        text
        severity="secondary"
        aria-label="Bookmark"
        onClick={() => {
          articles.isSaved = true;
          setIsClicked(articles.isSaved);
          handleSaveArticle(articles);
          bookmarkArticleBodyTemplate;
        }}
      />
    );
  };

  return (
    <div>
      <Header />

      <div className="articleTableContainer">
        <Card className="articleTableCard">
          <DataTable
            value={articles}
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 20, 30]}
            scrollable
            scrollHeight="750px"
            header={header}
            footer={footer}
            className="articleTable">
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
              header="Bookmark"
              body={bookmarkArticleBodyTemplate}></Column>
          </DataTable>
        </Card>
      </div>
    </div>
  );
}

{
  /* <p
dangerouslySetInnerHTML={{
  __html: htmlContent.slice(0, 500) + "...",
}}></p> */
}
