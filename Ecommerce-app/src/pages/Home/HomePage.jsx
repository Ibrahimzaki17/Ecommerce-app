import Header from "../../components/Header";
import "./HomePage.css";
import axios from "axios";
import { useEffect ,useState} from "react";
import ProductsGrid from "./ProductsGrid";

function HomePage({cart, setCart, products, setProducts}) {

  useEffect(() => {
    axios.get("/api/products")
      .then((response) => {
        setProducts(response.data);
    });
  }, []);

  return (
    <>
      <title>Eccomerce</title>
      <Header cart={cart} />

      <div className="home-page">
        <ProductsGrid products={products} />
      </div>
    </>
  );
}

export default HomePage;


