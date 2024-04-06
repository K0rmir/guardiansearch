"use client";

import {useApiContext} from "@/context/ApiContext";
import {useEffect, useState} from "react";
import Link from "next/link";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";

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
      <span className="headerTitle">Search results</span>
    </div>
  );
  // Table Footer //
  const footer = `Returned ${articles ? articles.length : 0} articles total.`;
  // Article Title Template //
  const titleBodyTemplate = (articles) => {
    return (
      <Link href={`${articles.webUrl}`}>
        <p>{articles.webUrl}</p>
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

      <div className="card">
        <DataTable
          value={articles}
          header={header}
          footer={footer}
          tableStyle={{minWidth: "20rem"}}>
          <Column header="Title" body={titleBodyTemplate}></Column>
          <Column header="Image" body={imageBodyTemplate}></Column>
          <Column header="Category" body={categoryBodyTemplate}></Column>
          <Column header="Date Published" body={publishedBodyTemplate}></Column>
        </DataTable>
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
