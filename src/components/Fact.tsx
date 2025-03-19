import { IFact } from "../model";
import supabase from "../supabase";
import Button from "./Button";

interface FactProps {
  fact: IFact;
}

function Fact({ fact }: FactProps) {
  const {
    id,
    text,
    source,
    category,
    votesInteresting,
    votesMindblowing,
    votesFalse,
  } = fact;

  async function handleVote() {
    console.log("handleVote");

    const { data: updatedFact, error } = await supabase
      .from("facts")
      .update({
        votesInteresting: votesInteresting + 1,
      })
      .eq("id", id)
      .select();

    console.log(updatedFact);
  }

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
        <Button
          mode="interesting"
          votes={votesInteresting}
          handleVote={handleVote}
        />
        <Button
          mode="mindblowing"
          votes={votesMindblowing}
          handleVote={handleVote}
        />
        <Button mode="false" votes={votesFalse} handleVote={handleVote} />
      </div>
    </li>
  );
}

export default Fact;
