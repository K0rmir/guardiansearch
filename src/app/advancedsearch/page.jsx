"use client";

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

export default function AdvancedSearch() {
  const router = useRouter();
  const {apiCallAdvancedSearch, bodySearch, setBodySearch, articles} =
    useApiContext();

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

  // Article Table //

  // Table Header //
  const header = (
    <div className="articleTableHeader">
      <span className="headerTitle">Search results for: </span>
    </div>
  );
  // Table Footer //
  const footer = `Returned ${
    articles ? articles.length : 0
  } articles total by relevance to search query.`;
  // Article Title Template //
  const titleBodyTemplate = (articles) => {
    return (
      <Link href={`${articles.webUrl}`} className="articleTableTitle">
        <p>{articles.webTitle}</p>
      </Link>
    );
  };
  // Article Image Template //
  const imageBodyTemplate = (articles) => {
    if (articles.elements) {
      return (
        <img
          src={articles.elements[0].assets[0].file}
          className="articleImg"></img>
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

  return (
    <div>
      <Card className="formContainer">
        <form action={handleAdvancedSearch}>
          <div className="advSearchFormGrid">
            <InputText
              className="searchInput"
              type="text"
              name="searchQuery"
              id="searchQuery"
              placeholder="Keyword, term or phrase"
            />
            <InputSwitch
              className="inputSwitch"
              checked={bodySearch}
              onChange={
                (console.log(bodySearch), (e) => setBodySearch(e.value))
              }
            />

            <InputNumber
              className="searchDate"
              name="searchDate"
              id="searchDate"
              placeholder="Year"
              useGrouping={false}
            />
            <InputText
              className="searchTag"
              type="text"
              name="searchTag"
              id="searchTag"
              placeholder="Tag"
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
          </DataTable>
        </Card>
      </div>
    </div>
  );
}
