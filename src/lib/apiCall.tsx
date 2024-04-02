// Get api key from environment variables. //
// API Key is needed in every request. //
const api_key: string = process.env.API_KEY!;

// Content API endpoint - This search is generic & returns all pieces of content in API with that keyword. //
export default async function apiCallSearch(searchQuery: string) {
    const data = await fetch (`https://content.guardianapis.com/search?q=${searchQuery}&api-key=${api_key}`)
    const res = await data.json();
    return console.log(res.response.results)
} 










