"use client";

import Header from "@/app/components/Header.jsx";
import "./advancedsearch.css";
import "../../styles/Articlestable.css";
import {InputText} from "primereact/inputtext";
import {InputNumber} from "primereact/inputnumber";
import {InputSwitch} from "primereact/inputswitch";
import {Card} from "primereact/card";
import {Button} from "primereact/button";
import {useApiContext} from "@/context/ApiContext";
import {useRouter} from "next/navigation";
import {Dropdown} from "primereact/dropdown";
import {useState} from "react";

import Articlestable from "@/app/components/Articlestable.jsx";

export default function AdvancedSearch() {
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState("");

  const {
    apiCallAdvancedSearch,
    bodySearch,
    setBodySearch,
    setSearchQuery,
    categoriesArr,
  } = useApiContext();

  function handleAdvancedSearch(formData) {
    const formQuery = formData.get("searchQuery");
    const formDateInput = formData.get("searchDateInput");
    const formSectionInput = selectedCategory;
    router.push(
      `/advancedsearch?search=${formQuery}&date=${formDateInput}&${formSectionInput}`
    );
    setSearchQuery(formQuery);
    apiCallAdvancedSearch(formQuery, formDateInput, formSectionInput);
  }

  // Category template for options in category dropdown in advsearch form //
  const selectedCategoryTemplate = (option, props) => {
    if (option) {
      return (
        <div>
          <div>{option}</div>
        </div>
      );
    }
    return <span>{props.placeholder}</span>;
  };
  // Category option template for options in category dropdown in advsearch form //
  const categoryOptionTemplate = (option) => {
    return (
      <div>
        <div>{option}</div>
      </div>
    );
  };

  return (
    <>
      <Header />
      <div>
        <Card className="formContainer">
          <form action={handleAdvancedSearch}>
            <div className="advSearchForm">
              <InputText
                className="advSearchInput"
                type="text"
                name="searchQuery"
                id="searchQuery"
                placeholder="Keyword, term or phrase"
                required
              />
              <InputText
                className="advSearchDate"
                type="text"
                name="searchDateInput"
                id="searchDateInput"
                placeholder="Year"
              />

              <Dropdown
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.value)}
                options={categoriesArr}
                optionLabel="category"
                placeholder="Select a Category"
                filter
                valueTemplate={selectedCategoryTemplate}
                itemTemplate={categoryOptionTemplate}
                className="categoryOptions"
              />
              <Card className="inputSwitchContainer">
                <span>Search Article Content:</span>
                <InputSwitch
                  className="inputSwitch"
                  checked={bodySearch}
                  onChange={(e) => setBodySearch(e.value)}
                />
              </Card>

              <Button type="submit" className="searchBtn">
                Search
              </Button>
            </div>
          </form>
        </Card>

        <Articlestable />
      </div>
    </>
  );
}
