import { useEffect, useState } from "react";
import "./App.css";
import CategoryFilter from "./components/CategoryFilter";
import NewFactForm from "./components/NewFactForm";
import FactList from "./components/FactList";
import Header from "./components/Header";
import supabase from "./supabase";
import { IFact } from "./model";
import Loader from "./components/Loader";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [facts, setFacts] = useState<IFact[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  // queremos pegar os dados qd carrega o componente, não em casa render
  useEffect(function () {
    async function getFacts() {
      try {
        setLoading(true);
        setError(false);

        const { data: facts, error } = await supabase
          .from("facts")
          .select("*")
          .order("votesInteresting", { ascending: false })
          .limit(100);

        if (!error && facts) {
          setFacts(facts as IFact[]);
        } else {
          console.error(error);
          setError(true);
        }
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    getFacts();
  }, []);

  function handleToggleForm() {
    setShowForm((previousValue) => !previousValue);
  }

  return (
    <>
      <Header showForm={showForm} handleToggleForm={handleToggleForm} />

      {showForm && (
        <NewFactForm setShowForm={setShowForm} setFacts={setFacts} />
      )}

      <main className="main">
        <CategoryFilter />

        {error ? (
          <p>Ops... An error occur, try again.</p>
        ) : loading ? (
          <Loader />
        ) : (
          <FactList facts={facts} />
        )}
      </main>
    </>
  );
}

export default App;
