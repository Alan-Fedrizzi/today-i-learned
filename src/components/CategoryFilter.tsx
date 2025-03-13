import { CATEGORIES, ICategory, CategoryName } from "../model";
import ButtonCategory from "./ButtonCategory";

interface CategoryFilterProps {
  filter: CategoryName;
  setFilter: React.Dispatch<React.SetStateAction<CategoryName>>;
}

function CategoryFilter({ filter, setFilter }: CategoryFilterProps) {
  const categories = CATEGORIES;

  return (
    <aside>
      <ul>
        <li className="category">
          <ButtonCategory
            name="all"
            handleButtonClick={() => setFilter("all")}
          />
        </li>

        {categories.map((category: ICategory) => (
          <li className="category" key={category.name}>
            <ButtonCategory
              name={category.name}
              handleButtonClick={() => setFilter(category.name)}
            />
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default CategoryFilter;
