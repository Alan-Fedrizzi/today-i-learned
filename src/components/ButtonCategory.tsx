import { CategoyName } from "../model";

interface ButtonCategoryProps {
  name: CategoyName;
}

function ButtonCategory({ name }: ButtonCategoryProps) {
  const cssClassNames =
    name === "all" ? `btn btn-all-categories` : `btn btn-category bg-${name}`;

  return <button className={cssClassNames}>{name}</button>;
}

export default ButtonCategory;
