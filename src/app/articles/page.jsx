"use client";

import {useApiContext} from "@/context/ApiContext";
import {useEffect, useState} from "react";
import Link from "next/link";

export default function Articles() {
  const {articles, apiCallSearch} = useApiContext();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let params = new URLSearchParams(document.location.search);
    let query = params.get("search");
    apiCallSearch(query);

    setSearchQuery(query);
  }, [searchQuery]);

  return (
    <div>
      <a href="/">
        <p>Guardian Search</p>
        {/* <p>{console.log(articles[0].webTitle)}</p> */}
      </a>
      <div className="articlesContainer">
        {articles.map((article) => {
          return (
            <div className="articleCard" key={article.id}>
              <Link href={`${article.webUrl}`}>
                <p>{article.webTitle}</p>
              </Link>
              <p>{article.sectionName}</p>
              <p>
                Published:{" "}
                {new Date(article.webPublicationDate).toLocaleDateString()}
              </p>
              <img
                className="articleImg"
                src={article.elements[0].assets[0].file}
                alt={article.elements[0].assets[0].typeData.altText}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
