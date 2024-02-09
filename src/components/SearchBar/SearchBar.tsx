import "./searchBar.css";
import Results from "../Results/Results";
import { useState } from "react";

const SearchBar = () => {
  const [data, setData] = useState<Array<object> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const handleSearchWord = async (e: React.FormEvent<HTMLFormElement>) => {
    setError(null);
    e.preventDefault();
    const searchWord = e.currentTarget[0].value;
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`
      );
      if (!response.ok) {
        throw new Error("Word not found. Try another word.");
      }
      const data = await response.json();
      setData(data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearchWord}>
        <input type="text" placeholder="Search..." />
      </form>
      <Results data={data} isLoading={isLoading} error={error} />
    </div>
  );
};

export default SearchBar;
