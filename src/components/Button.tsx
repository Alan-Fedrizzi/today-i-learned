interface ButtonProps {
  votes: number;
  mode: "interesting" | "mindblowing" | "false";
  handleVote: () => void;
}

function Button({ votes, mode, handleVote }: ButtonProps) {
  const emoji =
    mode === "interesting" ? "👍" : mode === "mindblowing" ? "🤯" : "⛔️";

  return (
    <button onClick={handleVote}>
      {emoji} {votes}
    </button>
  );
}

export default Button;
