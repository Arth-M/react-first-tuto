function ProductRow ({product}) {
  const name = product.stocked ? product.name :
  <span style ={{color: 'red'}}>
    {product.name}
  </span>
  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
    // <p>{name}</p><p>{price}</p>
  );
}

function ProductCategoryRow({category}) {
  return (
    <tr>
      <th colSpan="2">{category}</th>
    </tr>
  );
}

function ProductTable({products, filterText, inStockOnly}) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (
      product.name.toLowerCase().indexOf(
        filterText.toLowerCase()
      ) === -1
    ) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }

    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow category={product.category} key={product.category}
        />
      );
    }
    rows.push(
      <ProductRow product={product} key={product.name}
      />
    );
    lastCategory = product.category;
  });
  return (
    <table>
      <thead>
        <tr>
          <td>Name</td>
          <td>Price</td>
        </tr>
      </thead>
        <tbody>
          {rows}
        </tbody>
    </table>
  );
}

function SearchBar({filterText, inStockOnly}) {
  return (

    <form>
      <input type="text" placeholder="Search..." value={filterText}/>
      <label>
      <input type="checkbox" checked={inStockOnly}/>{' '}Only show products in stocked</label>
    </form>
  );
}

function FilterableProductTable({products}) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setinStockOnly] = useState(false)
  return (
    <div>
      <SearchBar filterText={filterText} inStockOnly={inStockOnly} />
      <ProductTable products={products} filterText={filterText} inStockOnly={inStockOnly}/>
    </div>
  );
}

const PRODUCTS = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}
