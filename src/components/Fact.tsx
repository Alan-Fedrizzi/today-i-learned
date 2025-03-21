import { useState } from "react";
import { IFact, IToast } from "../model";
import supabase from "../supabase";
import Button from "./Button";

interface FactProps {
  fact: IFact;
  setFacts: React.Dispatch<React.SetStateAction<IFact[]>>;
  setToast: React.Dispatch<React.SetStateAction<IToast>>;
  setShowToast: React.Dispatch<React.SetStateAction<boolean>>;
}

function Fact({ fact, setFacts, setToast, setShowToast }: FactProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const {
    id,
    text,
    source,
    category,
    votesInteresting,
    votesMindblowing,
    votesFalse,
  } = fact;

  async function handleVote(
    voteType: "votesInteresting" | "votesMindblowing" | "votesFalse"
  ) {
    // console.log("handleVote");

    try {
      setIsUpdating(true);

      const { data, error } = await supabase
        .from("facts")
        .update({
          [voteType]: fact[voteType] + 1,
        })
        .eq("id", id)
        .select();

      const updatedFact = data as IFact[] | null;
      // console.log(updatedFact);

      if (error) {
        throw new Error(`Error updating vote: ${error.message}`);
      } else if (updatedFact?.length) {
        setFacts((facts) =>
          facts.map((f: IFact) => (f.id === fact.id ? updatedFact[0] : f))
        );
      }
    } catch (error) {
      handleError(error);
    } finally {
      setIsUpdating(false);
    }
  }

  function handleError(error: any) {
    if (!error) return;

    console.error(error);
    setToast({
      message: "Ops... An error occur, try again.",
      state: "error",
    });
    setShowToast(true);
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
          handleVote={() => handleVote("votesInteresting")}
          disabled={isUpdating}
        />
        <Button
          mode="mindblowing"
          votes={votesMindblowing}
          handleVote={() => handleVote("votesMindblowing")}
          disabled={isUpdating}
        />
        <Button
          mode="false"
          votes={votesFalse}
          handleVote={() => handleVote("votesFalse")}
          disabled={isUpdating}
        />
      </div>
    </li>
  );
}

export default Fact;
