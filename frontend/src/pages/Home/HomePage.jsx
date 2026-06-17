import Header from "../../components/Header";
import "./HomePage.css";
import axios from "axios";
import { useEffect ,useState} from "react";
import ProductsGrid from "./ProductsGrid";

function HomePage({cart, setCart, products, setProducts, loadCart}) {

  useEffect(() => {
    const fetchProductsData = async () => {
      const response = await axios.get('/api/products');
      setProducts(response.data)
    }

    fetchProductsData();
  },[]);

  /*
  useEffect(() => {
    axios.get("/api/products")
      .then((response) => {
        setProducts(response.data);
    });
  }, []);
  */

  return (
    <>
      <title>Eccomerce</title>
      <Header cart={cart} />

      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart} />
      </div>
    </>
  );
}

export default HomePage;


