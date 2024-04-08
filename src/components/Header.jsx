"use client";

import "@/styles/Header.css";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {InputText} from "primereact/inputtext";
import "primeicons/primeicons.css";
import {useApiContext} from "@/context/ApiContext";

export default function Header() {
  const router = useRouter();
  const {setHeaderSearch} = useApiContext();

  async function handleFormSearch(formData) {
    const searchQuery = formData.get("searchQuery");
    router.push(`/articles?search=${searchQuery}`);
    setHeaderSearch(true);
  }

  return (
    <div className="header">
      <div>
        <Link href="/">
          <p>Guardian Search</p>
        </Link>
      </div>

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
          </form>
        </div>
      </div>
    </div>
  );
}
