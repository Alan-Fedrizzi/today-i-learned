import { useState } from "react";
import { CATEGORIES, ICategory, IFact, IToast } from "../model";
import supabase from "../supabase";

interface NewFactFormProps {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  setFacts: React.Dispatch<React.SetStateAction<IFact[]>>;
  setToast: React.Dispatch<React.SetStateAction<IToast>>;
  setShowToast: React.Dispatch<React.SetStateAction<boolean>>;
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

function NewFactForm({
  setShowForm,
  setFacts,
  setToast,
  setShowToast,
}: NewFactFormProps) {
  const [text, setText] = useState("");
  const [source, setSource] = useState("http://example.com");
  const [category, setCategory] = useState("");
  const [showFormInvalidMessage, setShowFormInvalidMessage] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const categories = CATEGORIES;
  const maxLength = 200;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value.length <= maxLength) {
      setText(e.target.value);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setShowFormInvalidMessage(false);

    // is source a valid url?
    // check if data is valid
    if (!text || !source || !category || !isValidURL(source)) {
      setShowFormInvalidMessage(true);
      return;
    }

    /*
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
    setFacts((previousFacts) => [newFact, ...previousFacts]);
    */

    // upload fact do supabase and receive the new fact object
    try {
      setIsUploading(true);

      // renomeamos o data que recebemos para newFact
      const { data: newFact, error } = await supabase
        .from("facts")
        .insert([
          {
            text,
            source,
            category,
            // id e created in são gerados automaticamente, os votos, colocamos o default de 0
          },
        ])
        .select(); // .select recebemos o objeto de volta

      // newFact é um array com o objeto criado entro
      // console.log(newFact, error);
      if (error) {
        throw new Error(`Error updating vote: ${error.message}`);
      } else if (newFact?.length) {
        setFacts((previousFacts) => [newFact[0], ...previousFacts]);
        setToast({
          message: "Fact upload successfully",
          state: "success",
        });
        setShowToast(true);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setIsUploading(false);
    }

    // reset fields
    setText("");
    setSource("");
    setCategory("");

    // close form
    setShowForm(false);
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
    <form className="fact-form" onSubmit={handleSubmit}>
      <div className="fact-form__input-container">
        <input
          className="fact-form__input"
          type="text"
          placeholder="Share a fact with the world..."
          value={text}
          onChange={handleChange}
          disabled={isUploading}
        />
        <span>{maxLength - text.length}</span>
      </div>

      <div className="fact-form__info">
        <input
          className="fact-form__input"
          type="text"
          placeholder="Trustworthy source..."
          value={source}
          onChange={(e) => setSource(e.target.value)}
          disabled={isUploading}
        />
        <select
          className="fact-form__input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          disabled={isUploading}
        >
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
      </div>

      <div className="fact-form__button">
        <button className="btn btn-large" disabled={isUploading}>
          {isUploading ? "Uploading" : "Post"}
        </button>
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
