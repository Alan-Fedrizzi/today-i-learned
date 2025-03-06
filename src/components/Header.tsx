interface HeaderProps {
  showForm: boolean;
  handleToggleForm: () => void;
}

function Header({ showForm, handleToggleForm }: HeaderProps) {
  return (
    <header className="header">
      <div className="logo">
        {/* assets estão na pasta public */}
        <img src="logo.png" height="68" width="68" alt="Today I Learned Logo" />
        <h1>Today I Learned</h1>
      </div>

      <button className="btn btn-large btn-open" onClick={handleToggleForm}>
        {showForm ? "Close" : "Share a fact"}
      </button>
    </header>
  );
}

export default Header;
