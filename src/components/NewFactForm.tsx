import { useState } from "react";
import { CATEGORIES, ICategory } from "../model";

interface NewFactFormProps {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

// se usar em mais lugares, criar uma util
function isValidURL(str: string): boolean {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}

function NewFactForm({ setShowForm }: NewFactFormProps) {
  const [text, setText] = useState("");
  const [source, setSource] = useState("http://example.com");
  const [category, setCategory] = useState("");
  const [showFormInvalidMessage, setShowFormInvalidMessage] = useState(false);
  const categories = CATEGORIES;
  const maxLength = 200;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value.length <= maxLength) {
      setText(e.target.value);
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setShowFormInvalidMessage(false);

    // is source a valid url?

    // check if data is valid
    if (!text || !source || !category || !isValidURL(source)) {
      setShowFormInvalidMessage(true);
      return;
    }

    // create new fact
    const newFact = {
      id: Math.round(Math.random() * 10000),
      text,
      source,
      category,
      votesInteresting: 0,
      votesMindblowing: 0,
      votesFalse: 0,
      createdIn: new Date().getFullYear(),
    };

    // add to list
    console.log(newFact.id);

    // reset fields
    setText("");
    setSource("");
    setCategory("");

    // close form
    setShowForm(false);
  }

  return (
    <form className="fact-form" onSubmit={handleSubmit}>
      <div className="fact-form-container">
        <input
          type="text"
          placeholder="Share a fact with the world..."
          value={text}
          onChange={handleChange}
        />
        <span>{maxLength - text.length}</span>
        <input
          type="text"
          placeholder="Trustworthy source..."
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Choose category:</option>

          {categories.map((category: ICategory) => (
            <option
              className="fact-form-option"
              value={category.name}
              key={category.name}
            >
              {category.name}
            </option>
          ))}
        </select>
        <button className="btn btn-large">Post</button>
      </div>

      {showFormInvalidMessage && (
        <p className="fact-form-message">
          Please fill all the fields of the form (source must be an url).
        </p>
      )}
    </form>
  );
}

export default NewFactForm;
