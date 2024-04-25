"use client";

import Header from "@/app/components/Header.jsx";
import "./advancedsearch.css";
import {InputText} from "primereact/inputtext";
import {InputNumber} from "primereact/inputnumber";
import {InputSwitch} from "primereact/inputswitch";
import {Card} from "primereact/card";
import {Button} from "primereact/button";
import {useApiContext} from "@/context/ApiContext";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Dropdown} from "primereact/dropdown";
import {useState} from "react";
import {handleRemoveArticle, handleSaveArticle} from "../../lib/actions";
import Image from "next/image";

export default function AdvancedSearch() {
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState("");

  const {
    apiCallAdvancedSearch,
    bodySearch,
    setBodySearch,
    articles,
    searchQuery,
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

  // Article Table //

  // Table Header //
  const header = (
    <div className="articleTableHeader">
      <span className="headerTitle">Search results for: {searchQuery}</span>
    </div>
  );
  // Table Footer //
  const footer = `Returned ${articles ? articles.length : 0} articles total.`;
  // Article Title Template //
  const titleBodyTemplate = (articles) => {
    return (
      <Link
        href={`${articles.webUrl}`}
        rel="noopener noreferrer"
        target="_blank"
        className="articleTableTitle">
        <p>{articles.webTitle}</p>
      </Link>
    );
  };
  // Article Image Template //
  const imageBodyTemplate = (articles) => {
    if (articles.elements) {
      return (
        <Image
          src={articles.elements[0].assets[0].file}
          width={150}
          height={100}
          alt="temp"
          className="articleImg"></Image>
      );
    } else return <p>No image available.</p>;
  };
  // Article Published Date Template //
  const publishedBodyTemplate = (articles) => {
    return <p>{new Date(articles.webPublicationDate).toLocaleDateString()}</p>;
  };
  // Article Category Template //
  const categoryBodyTemplate = (articles) => {
    return <p>{articles.sectionName}</p>;
  };

  const usebookmarkArticleBodyTemplate = (articles) => {
    const [isClicked, setIsClicked] = useState(articles.isSaved);
    return articles.isSaved ? (
      <Button
        icon="pi pi-bookmark-fill"
        rounded
        text
        severity="secondary"
        aria-label="Bookmark"
        onClick={() => {
          articles.isSaved = false;
          setIsClicked(articles.isSaved);
          handleRemoveArticle(articles);
          usebookmarkArticleBodyTemplate;
        }}
      />
    ) : (
      <Button
        icon="pi pi-bookmark"
        rounded
        text
        severity="secondary"
        aria-label="Bookmark"
        onClick={() => {
          articles.isSaved = true;
          setIsClicked(articles.isSaved);
          handleSaveArticle(articles);
          usebookmarkArticleBodyTemplate;
        }}
      />
    );
  };

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
              <Card className="inputSwitchContainer">
                <span>Search Article Content:</span>
                <InputSwitch
                  className="inputSwitch"
                  checked={bodySearch}
                  onChange={(e) => setBodySearch(e.value)}
                />
              </Card>

              <InputNumber
                className="advSearchDate"
                name="searchDateInput"
                id="searchDateInput"
                placeholder="Year"
                useGrouping={false}
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

              <Button type="submit" className="searchBtn">
                Search
              </Button>
            </div>
          </form>
        </Card>
        {/* Article Table */}
        <div className="articleTableContainer">
          <Card className="articleTableCard">
            <DataTable
              value={articles}
              paginator
              rows={5}
              rowsPerPageOptions={[5, 10, 20, 30]}
              scrollable
              scrollHeight="750px"
              header={header}
              footer={footer}
              className="articleTable">
              <Column
                header="Title"
                body={titleBodyTemplate}
                style={{width: "45%"}}></Column>
              <Column
                header="Image"
                body={imageBodyTemplate}
                style={{width: "15%"}}></Column>
              <Column
                header="Category"
                body={categoryBodyTemplate}
                className="column"
                style={{width: "15%"}}></Column>
              <Column
                header="Published"
                body={publishedBodyTemplate}
                className="column"
                style={{width: "15%"}}></Column>
              <Column
                header="Bookmark"
                body={usebookmarkArticleBodyTemplate}></Column>
            </DataTable>
          </Card>
        </div>
      </div>
    </>
  );
}
