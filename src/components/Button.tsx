interface ButtonProps {
  votes: number;
  mode: "interesting" | "mindblowing" | "false";
}

function Button({ votes, mode }: ButtonProps) {
  const emoji =
    mode === "interesting" ? "👍" : mode === "mindblowing" ? "🤯" : "⛔️";

  return (
    <button>
      {emoji} {votes}
    </button>
  );
}

export default Button;
