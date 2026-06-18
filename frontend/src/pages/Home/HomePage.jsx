import Header from "../../components/Header";
import "./HomePage.css";
import axios from "axios";
import { useEffect ,useState} from "react";
import ProductsGrid from "./ProductsGrid";
import { useSearchParams } from "react-router";

function HomePage({cart, setCart, products, setProducts, loadCart}) {

  const [searchParams] = useSearchParams();
  const search = searchParams.get('search');

  useEffect(() => {
    const fetchProductsData = async () => {
      const urlPath = search ? `/api/products/?search=${search}` : '/api/products';
      const response = await axios.get(urlPath);
      setProducts(response.data)
    }

    fetchProductsData();
  },[search]);

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
      <Header cart={cart} loadCart={loadCart} />

      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart} />
      </div>
    </>
  );
}

export default HomePage;


