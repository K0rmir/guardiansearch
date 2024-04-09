"use client";

import "./advancedsearch.css";
import {InputText} from "primereact/inputtext";
import {InputNumber} from "primereact/inputnumber";
import {InputSwitch} from "primereact/inputswitch";
import {Card} from "primereact/card";
import {Button} from "primereact/button";
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
    </div>
  );
}
