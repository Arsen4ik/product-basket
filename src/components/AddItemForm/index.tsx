import style from './AddItemForm.module.scss';
import { SubmitHandler, useForm } from "react-hook-form";
import { FC, useState } from 'react';
import { addProduct } from '../../store/productListSlice';
import { useAppDispatch } from '../../hooks/hooks';
import { changeShowModal } from '../../store/showModal';

const AddItemForm: FC = () => {
    const dispatch = useAppDispatch()
    const [counter, setCounter] = useState(1);

    interface Values {
        title: string
    }

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Values>({ mode: 'onChange' })

    const onSubmit: SubmitHandler<Values> = data => {
        dispatch(addProduct({ title: data.title, count: counter }))
        reset()
        dispatch(changeShowModal({}))
    }

    const inputTitle = {
        ...register('title', {
            required: 'обязательно к заполнению',
            minLength: {
                value: 2,
                message: 'не менее 2 символов'
            },
            maxLength: {
                value: 15,
                message: 'не более 15 символов'
            },
            pattern: {
                value: /^[a-zA-Zа-яА-Я]+$/,
                message: 'только латинские и кириллические символы',
            },
        })
    }

    const decreaseCounter = () => setCounter(prev => prev - 1)
    const increaseCounter = () => setCounter(prev => prev + 1)

    return (
        <form className={style.content} onSubmit={handleSubmit(onSubmit)} onClick={(e) => e.stopPropagation()}>
            <p onClick={() => dispatch(changeShowModal({}))} className={style.close}>❌</p>
            <h2>Новый продукт</h2>
            <input {...inputTitle} type="text" placeholder='название продукта' />
            {errors.title && <p className={style['error-message']}>{errors.title.message}</p>}
            <div className={style.counter}>
                <button onClick={(e) => { e.preventDefault(); decreaseCounter() }} disabled={counter === 1}>-</button>
                <p>Кол-во: <span>{counter}</span></p>
                <button onClick={(e) => { e.preventDefault(); increaseCounter() }} disabled={counter === 25}>+</button>
            </div>
            <button onClick={() => handleSubmit(onSubmit)} type="submit" className={style.submit}>Добавить продукт</button>
        </form>
    );
}

export default AddItemForm;