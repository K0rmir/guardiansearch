"use client";

import "@/styles/Header.css";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {InputText} from "primereact/inputtext";
import "primeicons/primeicons.css";
import {useApiContext} from "@/context/ApiContext";
import {useEffect, useState} from "react";

export default function Header() {
  const router = useRouter();
  const {setHeaderSearch} = useApiContext();

  const [advSearchBool, setAdvSearchBool] = useState();

  let params;

  // This useeffect exists to check whether or not user is on advanced search page in order to render(or not) the search bar //
  useEffect(() => {
    params = document.location.href;
    setAdvSearchBool(params.includes("/advancedsearch"));
  }, []);

  // function to handle a generic search when the search bar is rendered on generic articles page //
  async function handleFormSearch(formData) {
    const searchQuery = formData.get("searchQuery");
    router.push(`/articles?search=${searchQuery}`);
    setHeaderSearch(true);
    console.log(advSearchBool);
  }

  console.log(advSearchBool);

  return (
    <>
      <div className="header">
        <div className="headerLogo">
          <a href="/">
            <img
              src="./guardiansearchrectangle.JPG"
              alt=""
              className="headerLogo"
            />
          </a>
        </div>

        {!advSearchBool && (
          <div className="formContainerHeader">
            <div className="searchFormHeader">
              <form action={handleFormSearch}>
                <InputText
                  className="searchInputHeader"
                  type="text"
                  name="searchQuery"
                  id="searchQuery"
                  placeholder="Search articles..."
                />
                <button type="submit" className="searchBtnHeader">
                  <i
                    className="pi pi-search"
                    style={{fontSize: "1.5rem", color: "grey"}}></i>
                </button>
                <p>
                  Want to be more specific? Try
                  <a href={"/advancedsearch"}>Advanced Search</a>
                </p>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
