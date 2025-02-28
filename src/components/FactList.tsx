import { INITIAL_FACTS } from "../App";
import Fact from "./Fact";

function FactList() {
  const facts = INITIAL_FACTS;

  return (
    <section>
      <ul className="facts-list">
        {facts.map((fact) => (
          <Fact fact={fact} key={fact.id} />
        ))}
      </ul>

      <p>There are {facts.length} facts in the database. Add your own!</p>
    </section>
  );
}

export default FactList;
