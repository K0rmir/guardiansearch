"use client";

import {InputText} from "primereact/inputtext";
import "primeicons/primeicons.css";
import {useRouter} from "next/navigation";
import Link from "next/link";
import "../styles/Home.css";

export default function Home() {
  const router = useRouter();

  async function handleFormSearch(formData) {
    const searchQuery = formData.get("searchQuery");
    router.push(`/articles?search=${searchQuery}`);
  }

  return (
    <div>
      <div className="logoContainer">
        <img
          src="./searchguardianlogomain.png"
          className="logo"
          alt="The Guardian Search Logo"
        />
      </div>

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
            <p>
              Want to be more specific? Try
              <a href={"/advancedsearch"}> Advanced Search</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
