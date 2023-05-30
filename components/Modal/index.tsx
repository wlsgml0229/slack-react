import React, {useCallback} from "react";
import { CreateMenu } from "@components/Menu/styles";
import { CSSProperties, FC } from "react";
import {CloseModalButton} from "@components/Modal/styles";

//타입설정
interface Props {
    show: boolean;
    onCloseModal: () => void;
}
const Menu: FC<Props> = ({children, show, onCloseModal }) => {
    const stopPropagation = useCallback((e) => {
        e.stopPropagation();
    },[])

    if(!show) {
        return null;
    }

    return (
        <CreateMenu onClick={onCloseModal}>
          <div onClick={stopPropagation}>
              <CloseModalButton onClick={onCloseModal}></CloseModalButton>
              {children}
          </div>
        </CreateMenu>
    )
}

export default Menu;