"use client";

import {createContext, useState, useContext} from "react";

// Get api key from environment variables. //
// API Key is needed in every request. //

const ApiContext = createContext();

export default function ApiProvider({children}) {
  const api_key = process.env.API_KEY;

  const [articles, setArticles] = useState([]);

  // Content API endpoint - This search is generic & returns pieces of content in API with that keyword. //
  async function apiCallSearch(query) {
    const data = await fetch(
      `https://content.guardianapis.com/search?q=${query}&page-size=30&show-elements=image&show-fields=body&api-key=${api_key}`
    );
    const res = await data.json();
    const articleData = res.response.results;
    setArticles(articleData);
    console.log("this is the article data", articleData);
  }

  return (
    <ApiContext.Provider value={{articles, apiCallSearch}}>
      {children}
    </ApiContext.Provider>
  );
}

export function useApiContext() {
  return useContext(ApiContext);
}
