import style from './ProductItem.module.scss'
import { decreaseCount, increaseCount } from '../../store/productListSlice';
import { useAppDispatch } from '../../hooks/hooks';
import { FC } from 'react';

interface ProductItemI {
    productItem: {
        id: number;
        title: string;
        count: number;
    }
}

const ProductItem: FC<ProductItemI> = ({ productItem }) => {
    const dispatch = useAppDispatch()

    return (
        <div className={style.productItem}>
            <h2>{productItem.title}</h2>
            <button className={`${style.minus} ${style.button} ${productItem.count === 1 && style.red}`} onClick={() => dispatch(decreaseCount({ id: productItem.id }))}> - </button>
            <p>Кол-во:&nbsp;<span>{productItem.count}</span></p>
            <button className={`${style.plus} ${style.button}`} onClick={() => dispatch(increaseCount({ id: productItem.id }))} disabled={productItem.count >= 25}> + </button>
        </div>
    );
}

export default ProductItem;