import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
    id: number;
    title: string;
    count: number;
}

interface ProductListState {
    productList: Product[];
}

const defaultState: Product[] = [
    { id: 1, title: 'Велосипед', count: 5 },
    { id: 2, title: 'Самокат', count: 4 },
    { id: 3, title: 'Гантели', count: 7 },
    { id: 4, title: 'Ракетки', count: 1 }
];

const getProductListFromLocalStorage = (): Product[] | null => {
    const productListString = localStorage.getItem('productList');
    return productListString ? JSON.parse(productListString) : null;
};

const productListSlice = createSlice({
    name: 'productList',
    initialState: { productList: getProductListFromLocalStorage() ?? defaultState } as ProductListState,
    reducers: {
        increaseCount: (state, action: PayloadAction<{ id: number }>) => {
            const product = state.productList.find((p) => p.id === action.payload.id);
            if (product) {
                product.count++;
            }
        },
        decreaseCount: (state, action: PayloadAction<{ id: number }>) => {
            const productIndex = state.productList.findIndex((p) => p.id === action.payload.id);
            if (productIndex !== -1) {
                const product = state.productList[productIndex];
                if (product.count > 1) {
                    product.count--;
                } else {
                    state.productList.splice(productIndex, 1);
                }
            }
        },
        addProduct: (state, action: PayloadAction<{ title: string; count: number }>) => {
            state.productList.push({ id: new Date().getTime(), title: action.payload.title, count: action.payload.count });
        }
    }
});

export const { increaseCount, decreaseCount, addProduct } = productListSlice.actions;

export default productListSlice.reducer;
