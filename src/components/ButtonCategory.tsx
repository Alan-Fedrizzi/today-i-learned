import { CategoryName } from "../model";

interface ButtonCategoryProps {
  name: CategoryName;
  handleButtonClick: () => void;
}

function ButtonCategory({ name, handleButtonClick }: ButtonCategoryProps) {
  const cssClassNames =
    name === "all" ? `btn btn-all-categories` : `btn btn-category bg-${name}`;

  return (
    <button className={cssClassNames} onClick={handleButtonClick}>
      {name}
    </button>
  );
}

export default ButtonCategory;
