import { IFact } from "../model";
import Button from "./Button";

interface FactProps {
  fact: IFact;
}

function Fact({ fact }: FactProps) {
  const {
    text,
    source,
    category,
    votesInteresting,
    votesMindblowing,
    votesFalse,
  } = fact;

  return (
    <li className="fact">
      <p>
        {text}
        <a className="source" href={source} target="_blank" rel="noreferrer">
          (Source)
        </a>
      </p>
      <span className={`tag bg-${category}`}>{category}</span>
      <div className="vote-buttons">
        <Button mode="interesting" votes={votesInteresting} />
        <Button mode="mindblowing" votes={votesMindblowing} />
        <Button mode="false" votes={votesFalse} />
      </div>
    </li>
  );
}

export default Fact;
