interface ButtonProps {
  votes: number;
  mode: "interesting" | "mindblowing" | "false";
  handleVote: () => void;
  disabled: boolean;
}

function Button({ votes, mode, handleVote, disabled }: ButtonProps) {
  const emoji =
    mode === "interesting" ? "👍" : mode === "mindblowing" ? "🤯" : "⛔️";

  return (
    <button onClick={handleVote} disabled={disabled}>
      {emoji} {votes}
    </button>
  );
}

export default Button;
