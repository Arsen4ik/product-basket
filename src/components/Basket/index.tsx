import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import Modal from "../Modal";
import AddItemForm from "../AddItemForm";
import ProductList from "../ProductList";
import { changeShowModal } from "../../store/showModal";
import style from './Basket.module.scss'

const Basket = () => {
    const showModal = useAppSelector(store => store.showModal.showModal)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [showModal]);

    return (
        <>
            {
                showModal &&
                <Modal>
                    <AddItemForm />
                </Modal>
            }
            <h1 className={style.title}>Продуктовая корзина</h1>
            <button className={style.button} onClick={() => dispatch(changeShowModal({}))}>добавить новый товар</button>
            <ProductList />
        </>
    );
}

export default Basket;