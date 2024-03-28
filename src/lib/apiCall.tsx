import Guardian from 'guardian-js'

// Get api key from environment variables //
const api_key: string = process.env.API_KEY!;


const guardian = new Guardian(api_key, true);

export default async function apiCallSearch() {
    // const res = await api.content.search('technology');
}

