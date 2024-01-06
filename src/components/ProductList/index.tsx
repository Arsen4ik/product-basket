import ProductItem from '../ProductItem';
import { useEffect } from 'react';
import { useAppSelector } from '../../hooks/hooks';

const ProductList = () => {
  const productList = useAppSelector(store => store.productList.productList)

  useEffect(() => {
    localStorage.setItem('productList', JSON.stringify(productList))
  }, [productList]);

  return <>{productList.map((productItem: { id: number, title: string, count: number }) => <ProductItem key={productItem.id} productItem={productItem} />)}</>
}

export default ProductList;