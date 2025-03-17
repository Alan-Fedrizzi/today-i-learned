import { IFact } from "../model";
import Fact from "./Fact";

interface FactListProps {
  facts: IFact[];
}

function FactList({ facts }: FactListProps) {
  return (
    <section>
      {facts.length ? (
        <>
          <ul className="facts-list">
            {facts.map((fact) => (
              <Fact fact={fact} key={fact.id} />
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
