"use client";

import {createContext, useState, useContext, useEffect} from "react";

// Get api key from environment variables. //
// API Key is needed in every request. //

const ApiContext = createContext();

export default function ApiProvider({children}) {
  const api_key = process.env.NEXT_PUBLIC_API_KEY;

  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [headerSearch, setHeaderSearch] = useState(false);
  const [bodySearch, setBodySearch] = useState(false);

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

  // Advanced Search //
  async function apiCallAdvancedSearch(
    formQuery,
    formDateInput,
    formSectionInput
  ) {
    // Conditional to check if user wants to search body of articles or just headlines //
    let queryFields;
    let section = "";
    let date = "";
    if (bodySearch) {
      queryFields = "headline,body";
    } else {
      queryFields = "headline";
    }
    if (formSectionInput != "") {
      section = `&section=${formSectionInput.toLowerCase()}`;
    }
    if (formDateInput != "") {
      date = `&from-date=${formDateInput}`;
    }

    // &section=${formSection}

    const data = await fetch(
      `https://content.guardianapis.com/search?q="${formQuery}"&query-fields=${queryFields}${date}${section}&order-by=oldest&page-size=30&show-elements=image&show-fields=body&api-key=${api_key}`
    );
    const res = await data.json();
    const articleData = res.response.results;
    setArticles(articleData);
    console.log("This is the advanced article search data", articleData);
  }

  // ------------------------------ //

  const [categoriesArr, setCategoriesArr] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const categories = [];
      const data = await fetch(
        "https://content.guardianapis.com/sections?&api-key=9a8955f1-f212-46ab-afbf-9374065b9440"
      );
      const res = await data.json();
      const articleCategories = res.response.results;

      articleCategories.forEach((category) => {
        const categoryTitle = category.webTitle;
        if (!categoryTitle.includes("Wellness (Do NOT use)")) {
          categories.push(categoryTitle);
        }
      });
      setCategoriesArr(categories);
    };

    getCategories();
  }, []);

  return (
    <ApiContext.Provider
      value={{
        articles,
        apiCallSearch,
        searchQuery,
        setSearchQuery,
        headerSearch,
        setHeaderSearch,
        searchDate,
        setSearchDate,
        apiCallAdvancedSearch,
        bodySearch,
        setBodySearch,
        categoriesArr,
      }}>
      {children}
    </ApiContext.Provider>
  );
}

export function useApiContext() {
  return useContext(ApiContext);
}
