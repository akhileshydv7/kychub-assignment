import ProductTable from "../components/ProductTable";


const ProductDetails = () => {
  return (
    <div style={{ padding: 20, display:"flex", flexDirection:"column", gap:25 }}>
      <div style={{ display:"flex", color: "#000", fontSize: 50, fontWeight: 700 }} ><div>Products</div></div>
      <ProductTable />
    </div>
  );
};

export default ProductDetails;


