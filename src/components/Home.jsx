import apiCallSearch from "@/lib/apiCall";

export default function Home() {
  async function handleApiCallSearch(formData) {
    "use server";
    const searchQuery = formData.get("searchQuery");
    apiCallSearch(searchQuery);
    console.log(searchQuery);
  }

  return (
    <div>
      <p>Guardian Search</p>

      <form action={handleApiCallSearch}>
        <input type="text" name="searchQuery" id="searchQuery" />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}
