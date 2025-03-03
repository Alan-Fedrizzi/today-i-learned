import React from "react";
import "./App.css";
import CategoryFilter from "./components/CategoryFilter";
import NewFactForm from "./components/NewFactForm";
import FactList from "./components/FactList";

function App() {
  return (
    <>
      {/* header */}
      <header className="header">
        <div className="logo">
          {/* assets estão na pasta public */}
          <img
            src="logo.png"
            height="68"
            width="68"
            alt="Today I Learned Logo"
          />
          <h1>Today I Learned</h1>
        </div>

        <button className="btn btn-large btn-open">Share a fact</button>
      </header>

      <NewFactForm />

      <main className="main">
        <CategoryFilter />
        <FactList />
      </main>
    </>
  );
}

export default App;
