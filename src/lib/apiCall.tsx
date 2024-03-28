// import Guardian from 'guardian-js'

// Get api key from environment variables //
const api_key: string = process.env.API_KEY!;


// const guardian = new Guardian(api_key, true);

export default async function apiCallSearch() {
    const data = await fetch (`https://content.guardianapis.com/search?q=technology&api-key=${api_key}`)
    const response = await data.json();
    return console.log(response.response.results)
} 










