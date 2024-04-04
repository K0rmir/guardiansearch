"use client";

import {useApiContext} from "@/context/ApiContext";
import {useEffect, useState} from "react";

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
      </a>
      <p>Hello from the articles page</p>
      <p>
        Articles = {articles.length} using search query: {searchQuery}
      </p>
      <p>{console.log(articles)}</p>
    </div>
  );
}
