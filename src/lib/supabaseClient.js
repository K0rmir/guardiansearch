import { createClient } from '@supabase/supabase-js'
// import {useAuth} from "@clerk/nextjs"; // <--
// import supabase from "../lib/supabaseClient"; // <--

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)
export default supabase


  // -------------------------------- //

 
//   export async function fetchData() {
//     const {getToken} = useAuth();
//     // TODO #1: Replace with your JWT template name
//     const token = await getToken({template: "supabase"});

//     supabase.auth.setAuth(token);

//     // TODO #2: Replace with your database table name
//     const {data, error} = await supabase.from("users").select();

//     // TODO #3: Handle the response

//     console.log(data);
//   };

  // ----------------------------------- //