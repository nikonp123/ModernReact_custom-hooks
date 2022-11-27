import React, { useEffect, useState } from 'react';

import Products from './components/Products/Products';
import NewProduct from './components/NewProduct/NewProduct';
import useHTTP from './hooks/use-http';

function App() {
  const [products, setProducts] = useState([]);

  const manageProducts = (productsData) => {
    const loadedProducts = [];

    for (const productKey in productsData) {
      loadedProducts.push({
        id: productKey,
        text: productsData[productKey].text,
      });
    }
    setProducts(loadedProducts);
  };

  const dataRequest = useHTTP(
    {
      url: 'https://modernreactcustomhooks-default-rtdb.firebaseio.com/products.json',
    },
    manageProducts
  );

  const { isLoading, error, sendHttpRequest: fetchProducts } = dataRequest;

  useEffect(() => {
    fetchProducts();
  }, []);

  const productAddHandler = (product) => {
    setProducts((prevProducts) => prevProducts.concat(product));
  };

  return (
    <React.Fragment>
      <NewProduct onAddProduct={productAddHandler} />
      <Products
        items={products}
        loading={isLoading}
        error={error}
        onFetch={fetchProducts}
      />
    </React.Fragment>
  );
}

export default App;
