"use client";

import "../../styles/Articlestable.css";
import {useApiContext} from "@/context/ApiContext";
import {useState} from "react";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Card} from "primereact/card";
import {Button} from "primereact/button";

import {handleSaveArticle, handleRemoveArticle} from "../../lib/actions";
import Image from "next/image";
import {useUser} from "@clerk/nextjs";

export default function ArticlesTable() {
  const {articles, searchQuery} = useApiContext();
  const {isSignedIn} = useUser();

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
    if (articles.elements.length > 0) {
      return (
        <Image
          src={articles.elements[0].assets[0].file}
          width={150}
          height={100}
          alt={articles.elements[0].assets[0].typeData.altText}
          className="articleImg"></Image>
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

  const useBookmarkArticleBodyTemplate = (articles) => {
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
          useBookmarkArticleBodyTemplate;
        }}
      />
    ) : (
      <Button
        icon="pi pi-bookmark"
        rounded
        text
        severity="secondary"
        aria-label="Bookmark"
        tooltip={!isSignedIn ? "Sign in to save this article" : ""}
        tooltipOptions={{position: "bottom"}}
        onClick={() => {
          if (isSignedIn) {
            articles.isSaved = true;
            setIsClicked(articles.isSaved);
            handleSaveArticle(articles);
            useBookmarkArticleBodyTemplate;
          }
        }}
      />
    );
  };

  return (
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
            body={useBookmarkArticleBodyTemplate}></Column>
        </DataTable>
      </Card>
    </div>
  );
}
