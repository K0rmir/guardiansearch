"use client";

import {createContext, useState, useContext, useEffect} from "react";

// Get api key from environment variables. //
// API Key is needed in every request. //
const api_key = process.env.GU_API_KEY;

const ApiContext = createContext();

export default function ApiProvider({children}) {
  const [articles, setArticles] = useState([]);

  // Content API endpoint - This search is generic & returns all pieces of content in API with that keyword. //
  async function apiCallSearch(query) {
    console.log("this is the api key", api_key);
    const data = await fetch(
      `https://content.guardianapis.com/search?q=${query}&api-key=${api_key}`
    );
    const res = await data.json();
    const articleData = res.response.results;
    setArticles(articleData);
    console.log("this is the article data", articleData);
    console.log({query});
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
