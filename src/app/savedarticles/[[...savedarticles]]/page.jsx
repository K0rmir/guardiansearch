"use client";

import "../savedarticles.css";
import Header from "@/app/components/Header.jsx";
import ArticleCitationWindow from "@/app/components/ArticleCitationWindow.jsx";
import {
  fetchSavedArticles,
  handleRemoveSavedArticle,
} from "../../../lib/actions";
import {useApiContext} from "@/context/ApiContext";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Card} from "primereact/card";
import {useState, useEffect} from "react";
import Image from "next/image";
import {Button} from "primereact/button";
import {useUser} from "@clerk/nextjs";
import {SignIn} from "@clerk/nextjs";

export default function SavedArticlesPage() {
  const {setIsCitationWindowOpen} = useApiContext();
  const [savedArticles, setSavedArticles] = useState();
  const [isRemoveBtnClicked, setIsRemoveBtnClicked] = useState(null);

  const {isSignedIn} = useUser();
  console.log(isSignedIn);

  //   Get saved articles from database on component mount //
  useEffect(() => {
    const getArticles = async () => {
      const savedArticleData = await fetchSavedArticles();
      setSavedArticles(savedArticleData);
    };
    getArticles();
  }, [isRemoveBtnClicked]);

  console.log(savedArticles);

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
  } articles.`;

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
        <Image
          src={savedArticles.article_img_url}
          width={150}
          height={100}
          alt="temp"
          className="articleImg"></Image>
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

  const useSavedArticlesActionsTemplate = (savedArticles) => {
    // Preview article //
    return (
      <div className="articleActionBtns">
        <Button
          icon="pi pi-language"
          rounded
          text
          severity="secondary"
          aria-label="Bookmark"
          tooltip="Cite article "
          tooltipOptions={{position: "bottom"}}
          onClick={() => {
            setIsCitationWindowOpen(true);
            // handleArticleCitation(savedArticles);
          }}
        />

        <Button
          icon="pi pi-link"
          rounded
          text
          severity="secondary"
          aria-label="Bookmark"
          tooltip="Copy article URL to clipboard"
          tooltipOptions={{position: "bottom"}}
          onClick={() => {
            const article_url = savedArticles.article_url;
            const copyArticleUrl = async () => {
              await navigator.clipboard.writeText(article_url);
            };
            copyArticleUrl();
          }}
        />

        <Button
          icon="pi pi-times-circle"
          rounded
          text
          severity="secondary"
          aria-label="Bookmark"
          tooltip="Remove article from bookmarks"
          tooltipOptions={{position: "bottom"}}
          onClick={() => {
            setIsRemoveBtnClicked(!isRemoveBtnClicked);
            handleRemoveSavedArticle(savedArticles);
            useSavedArticlesActionsTemplate;
          }}
        />
      </div>
    );
  };

  return (
    <>
      <Header />

      {isSignedIn && (
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
                body={useSavedArticlesActionsTemplate}
                className="colimn"></Column>
            </DataTable>
          </Card>
        </div>
      )}

      <ArticleCitationWindow />

      {!isSignedIn && <SignIn />}
    </>
  );
}
