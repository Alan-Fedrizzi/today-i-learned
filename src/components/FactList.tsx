import { IFact, IToast } from "../model";
import Fact from "./Fact";

interface FactListProps {
  facts: IFact[];
  setFacts: React.Dispatch<React.SetStateAction<IFact[]>>;
  setToast: React.Dispatch<React.SetStateAction<IToast>>;
  setShowToast: React.Dispatch<React.SetStateAction<boolean>>;
}

function FactList({ facts, setFacts, setToast, setShowToast }: FactListProps) {
  return (
    <section>
      {facts.length ? (
        <>
          <ul className="facts-list">
            {facts.map((fact) => (
              <Fact
                fact={fact}
                setFacts={setFacts}
                setToast={setToast}
                setShowToast={setShowToast}
                key={fact.id}
              />
            ))}
          </ul>

          <p>There are {facts.length} facts in the database. Add your own!</p>
        </>
      ) : (
        <p>There no facts registered in this category. Create the first one!</p>
      )}
    </section>
  );
}

export default FactList;
