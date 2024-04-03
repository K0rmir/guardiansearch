import {InputText} from "primereact/inputtext";
import apiCallSearch from "@/lib/apiCall";
import "../styles/Home.css";
import "primeicons/primeicons.css";

export default function Home() {
  async function handleApiCallSearch(formData) {
    "use server";
    const searchQuery = formData.get("searchQuery");
    apiCallSearch(searchQuery);
  }

  return (
    <div>
      <p>Guardian Search</p>

      <div className="formContainer">
        <div className="searchForm">
          <form action={handleApiCallSearch}>
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
