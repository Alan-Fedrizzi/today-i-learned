import React, { useState } from "react";
import "./App.css";
import CategoryFilter from "./components/CategoryFilter";
import NewFactForm from "./components/NewFactForm";
import FactList from "./components/FactList";
import Header from "./components/Header";

function App() {
  const [showForm, setShowForm] = useState(false);

  function handleToggleForm() {
    setShowForm((previousValue) => !previousValue);
  }

  return (
    <>
      <Header showForm={showForm} handleToggleForm={handleToggleForm} />

      {showForm && <NewFactForm setShowForm={setShowForm} />}

      <main className="main">
        <CategoryFilter />
        <FactList />
      </main>
    </>
  );
}

export default App;
