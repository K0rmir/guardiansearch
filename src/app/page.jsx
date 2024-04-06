"use client";

import {InputText} from "primereact/inputtext";
import "../styles/Home.css";
import "primeicons/primeicons.css";
import {useRouter} from "next/navigation";

export default function Home() {
  const router = useRouter();

  async function handleFormSearch(formData) {
    const searchQuery = formData.get("searchQuery");
    router.push(`/articles?search=${searchQuery}`);
  }

  return (
    <div>
      <a href="/">
        <p>Guardian Search</p>
      </a>

      <div className="formContainer">
        <div className="searchForm">
          <form action={handleFormSearch}>
            <InputText
              className="searchInput"
              type="text"
              name="searchQuery"
              id="searchQuery"
              placeholder="Search articles..."
            />
            <button type="submit" className="searchBtn">
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
