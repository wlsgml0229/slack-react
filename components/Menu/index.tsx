import React from "react"
import { FC } from "react"
import { CreateMenu } from "./styles"

const Menu:FC = ({children}) => {
  return (
    <CreateMenu>
        <div>menu</div>
        {children}
    </CreateMenu>
  )
}

export default Menu;