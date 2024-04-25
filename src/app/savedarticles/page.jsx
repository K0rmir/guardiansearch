import {useApiContext} from "@/context/ApiContext";

export default function savedArticles() {
  const {
    articles,
    apiCallSearch,
    searchQuery,
    setSearchQuery,
    headerSearch,
    setHeaderSearch,
  } = useApiContext();
}
