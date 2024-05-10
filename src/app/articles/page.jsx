"use client";

import {useApiContext} from "@/context/ApiContext";
import {useEffect} from "react";
import Header from "@/app/components/Header.jsx";
import Articlestable from "@/app/components/Articlestable.jsx";

export default function Articles() {
  const {
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
    apiCallSearch(query);
    setSearchQuery(query);
    setHeaderSearch(false);
  }, [searchQuery, headerSearch]);

  return (
    <div>
      <Header />
      <Articlestable />
    </div>
  );
}
