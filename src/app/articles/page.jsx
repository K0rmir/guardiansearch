"use client";

import {useApiContext} from "@/context/ApiContext";
import {useEffect, useState} from "react";
import Link from "next/link";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Card} from "primereact/card";
import "./articles.css";

export default function Articles() {
  const {articles, apiCallSearch} = useApiContext();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let params = new URLSearchParams(document.location.search);
    let query = params.get("search");
    setSearchQuery(query);
    apiCallSearch(query);
  }, [searchQuery]);

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
      <Link href={`${articles.webUrl}`} className="articleTableTitle">
        <p>{articles.webTitle}</p>
      </Link>
    );
  };
  // Article Image Template //
  const imageBodyTemplate = (articles) => {
    return (
      <img
        src={articles.elements[0].assets[0].file}
        className="articleImg"></img>
    );
  };
  // Article Published Date Template //
  const publishedBodyTemplate = (articles) => {
    return <p>{new Date(articles.webPublicationDate).toLocaleDateString()}</p>;
  };
  // Article Category Template //
  const categoryBodyTemplate = (articles) => {
    return <p>{articles.sectionName}</p>;
  };

  return (
    <div>
      <a href="/">
        <p>Guardian Search</p>
      </a>

      <div className="articleTableContainer">
        <Card className="articleTableCard">
          <DataTable
            value={articles}
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 20, 30]}
            header={header}
            footer={footer}
            className="articleTable">
            <Column header="Title" body={titleBodyTemplate}></Column>
            <Column header="Image" body={imageBodyTemplate}></Column>
            <Column
              header="Category"
              body={categoryBodyTemplate}
              className="column"></Column>
            <Column
              header="Published"
              body={publishedBodyTemplate}
              className="column"></Column>
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
