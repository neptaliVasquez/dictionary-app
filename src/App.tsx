import AppHeader from "./components/AppHeader/AppHeader";
import SearchBar from "./components/SearchBar/SearchBar";
import "./App.css";

function App() {
  return (
    <>
      <div className="container">
        <AppHeader />
        <SearchBar />
      </div>
    </>
  );
}

export default App;
