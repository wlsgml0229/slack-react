import React, {CSSProperties, useCallback} from "react"
import { FC } from "react"
import {CloseModalButton, CreateMenu} from "./styles"
interface Props {
    show: boolean;
    onCloseModal: (e:any) => void;
    style: CSSProperties;
    closeButton?: boolean;
}

//Generic으로 사용 - 타입에 대한 변수느낌
const Menu:FC<Props> = ({children, style, show, onCloseModal, closeButton}) => {
 const stopPropagation = useCallback((e) => {
     //click 이벤트의 버블링을 막아서 부모에게 이벤트가 전달 되지 않도록 만듬
     e.stopPropagation();
 },[])
  return (
    <CreateMenu onClick={onCloseModal}>
        <div style={style} onClick={stopPropagation}>
        {closeButton && <CloseModalButton onClick={onCloseModal}>x</CloseModalButton>}
        {children}
        </div>
    </CreateMenu>
  )
}

//props의 기본값 설정
Menu.defaultProps = {
    closeButton: true,
}

export default Menu;