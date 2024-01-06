import React, { FC, ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import style from './Modal.module.scss'
import { changeShowModal } from "../../store/showModal";
import { useAppDispatch } from "../../hooks/hooks";

interface ModalProps {
    children: ReactNode;
}

const Modal: FC<ModalProps> = ({ children }) => {
    const dispatch = useAppDispatch()

    const elRef = useRef<HTMLDivElement | null>(null);
    if (!elRef.current) {
        elRef.current = document.createElement("div");
    }

    useEffect(() => {
        const modalRoot = document.getElementById("modal") as HTMLElement;
        if (modalRoot) {
            modalRoot.appendChild(elRef.current!);
        }
        return () => {
            if (modalRoot) {
                modalRoot.removeChild(elRef.current!);
            }
        };
    }, []);

    return createPortal(<div onClick={() => dispatch(changeShowModal({}))} className={style.portal}>{children}</div>, elRef.current);
};

export default Modal;