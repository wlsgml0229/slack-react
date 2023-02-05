import React from "react";
import { CreateMenu } from "@components/Menu/styles";
import { CSSProperties, FC } from "react";

//타입설정
interface Props {
    show: boolean;
    onCloseModal: () => void;
    style: CSSProperties;
    closeButton?: boolean;
}
const Menu: FC<Props> = ({children, style, show, onCloseModal }) => {
    return (
        <CreateMenu onClick={onCloseModal}>
            <div style={style}>menu</div>
            {children}
        </CreateMenu>
    )
}

export default Menu;