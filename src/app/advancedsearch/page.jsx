"use client";

import "./advancedsearch.css";
import {InputText} from "primereact/inputtext";
import {InputNumber} from "primereact/inputnumber";
import {useApiContext} from "@/context/ApiContext";
import {useRouter} from "next/navigation";

export default function AdvancedSearch() {
  const router = useRouter();
  const {
    searchQuery,
    setSearchQuery,
    searchDate,
    setSearchDate,
    apiCallAdvancedSearch,
  } = useApiContext();

  async function handleAdvancedSearch(formData) {
    const formQuery = formData.get("searchQuery");
    const formDate = formData.get("searchDate");
    router.push(`/advancedsearch?search=${formQuery}&date=${formDate}`);
    setSearchQuery(formQuery);
    setSearchDate(formDate);
    console.log(searchQuery);
    console.log(searchDate);
    apiCallAdvancedSearch(searchQuery, searchDate);
  }
  return (
    <div>
      <div className="advSearchFormContainer">
        <div className="advSearchForm">
          <form action={handleAdvancedSearch}>
            <InputText
              className="searchInput"
              type="text"
              name="searchQuery"
              id="searchQuery"
              placeholder="Keyword, term or phrase"
            />
            <InputNumber
              className="searchDate"
              name="searchDate"
              id="searchDate"
              placeholder="Year"
              useGrouping={false}
            />
            <button type="submit">Search</button>
          </form>
        </div>
      </div>
    </div>
  );
}
