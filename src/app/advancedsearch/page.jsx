"use client";

import "./advancedsearch.css";
import {InputText} from "primereact/inputtext";
import {InputNumber} from "primereact/inputnumber";
import {InputSwitch} from "primereact/inputswitch";
import {useApiContext} from "@/context/ApiContext";
import {useRouter} from "next/navigation";
import {useState} from "react";

export default function AdvancedSearch() {
  const router = useRouter();
  const {
    searchQuery,
    setSearchQuery,
    searchDate,
    setSearchDate,
    apiCallAdvancedSearch,
    bodySearch,
    setBodySearch,
  } = useApiContext();

  // const [checked, setChecked] = useState(false);

  function handleAdvancedSearch(formData) {
    const formQuery = formData.get("searchQuery");
    const formDate = formData.get("searchDate");
    const formTag = formData.get("searchTag");
    router.push(
      `/advancedsearch?search=${formQuery}&date=${formDate}&${formTag}`
    );
    console.log(formQuery);
    console.log(formDate);
    console.log(formTag);
    apiCallAdvancedSearch(formQuery, formDate, formTag);
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
            <InputText
              className="searchInput"
              type="text"
              name="searchTag"
              id="searchTag"
              placeholder="Tag"
            />
            <InputSwitch
              checked={bodySearch}
              onChange={
                (console.log(bodySearch), (e) => setBodySearch(e.value))
              }
            />
            <button type="submit">Search</button>
          </form>
        </div>
      </div>
    </div>
  );
}
