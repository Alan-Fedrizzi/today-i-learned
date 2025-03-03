import { CATEGORIES, ICategory } from "../model";
import ButtonCategory from "./ButtonCategory";

function CategoryFilter() {
  const categories = CATEGORIES;

  return (
    <aside>
      <ul>
        <li className="category">
          <ButtonCategory name="all" />
        </li>

        {categories.map((category: ICategory) => (
          <li className="category" key={category.name}>
            <ButtonCategory name={category.name} />
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default CategoryFilter;
