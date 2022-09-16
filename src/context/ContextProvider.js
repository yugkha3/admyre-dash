import React, { createContext, useContext, useState } from "react";

const StateContext = createContext();

const initialNavState = {
    userProfile: false,
    notification: false,
}

export const ContextProvider = ({children}) => {
    const [activeMenu, setActiveMenu] = useState(true);
    const [isClicked, setIsClicked] = useState(initialNavState)
    const [screenSize, setScreenSize] = useState(undefined)
    const handleClick = (clickedEvent) => {
        setIsClicked({...initialNavState, [clickedEvent] : true});
    }
    return (
        <StateContext.Provider value={{
            activeMenu,
            setActiveMenu,
            isClicked,
            setIsClicked,
            handleClick,
            screenSize,
            setScreenSize,
            }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)