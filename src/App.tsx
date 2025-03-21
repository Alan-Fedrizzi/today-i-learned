import { useEffect, useState } from "react";
import "./App.css";
import CategoryFilter from "./components/CategoryFilter";
import NewFactForm from "./components/NewFactForm";
import FactList from "./components/FactList";
import Header from "./components/Header";
import supabase from "./supabase";
import { CategoryName, IFact, IToast } from "./model";
import Loader from "./components/Loader";
import Toast from "./components/Toast";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [facts, setFacts] = useState<IFact[]>([]);
  const [showedFacts, setShowedFacts] = useState<IFact[]>([]);
  const [filter, setFilter] = useState<CategoryName>("all");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toast, setToast] = useState<IToast>({
    message: "",
    state: "success",
  });

  // queremos pegar os dados qd carrega o componente, não em casa render
  useEffect(() => {
    async function getFacts() {
      try {
        setLoading(true);
        setError(false);

        const { data: facts, error } = await supabase
          .from("facts")
          .select("*")
          .order("votesInteresting", { ascending: false })
          .limit(100);

        if (error) {
          throw new Error(`Error updating vote: ${error.message}`);
        } else if (facts) {
          setFacts(facts as IFact[]);
          setShowedFacts(facts as IFact[]);
        }
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    }

    getFacts();
  }, []);

  useEffect(() => {
    if (filter === "all") {
      setShowedFacts(facts);
    } else {
      const filteredFacts = facts.filter((fact) => fact.category === filter);
      setShowedFacts(filteredFacts);
    }
  }, [facts, filter]);

  function handleToggleForm() {
    setShowForm((previousValue) => !previousValue);
  }

  function handleError(error: any) {
    if (!error) return;

    console.error(error);
    setError(true);
    setToast({
      message: "Ops... An error occur, try again.",
      state: "error",
    });
    setShowToast(true);
  }

  return (
    <>
      <Header showForm={showForm} handleToggleForm={handleToggleForm} />

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
            animate={{ opacity: 1, height: "auto", marginBottom: "40px" }}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            transition={{ duration: 0.5 }}
          >
            <NewFactForm
              setShowForm={setShowForm}
              setFacts={setFacts}
              setToast={setToast}
              setShowToast={setShowToast}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <main className="main">
        <CategoryFilter setFilter={setFilter} />

        {error ? (
          <p>Ops... An error occur, try again.</p>
        ) : loading ? (
          <Loader />
        ) : (
          <FactList
            facts={showedFacts}
            setFacts={setFacts}
            setToast={setToast}
            setShowToast={setShowToast}
          />
        )}
      </main>

      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Toast
              message={toast.message}
              state={toast.state}
              setShowToast={setShowToast}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
