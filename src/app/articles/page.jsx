import {useApiContext} from "@/context/ApiContext";

export default function Articles() {
  const {articles} = useApiContext();

  return (
    <div>
      <a href="/">
        <p>Guardian Search</p>
      </a>
      <p>Hello from the articles page</p>
      <p>Articles = {articles}</p>
      <p>{console.log(articles)}</p>
    </div>
  );
}
