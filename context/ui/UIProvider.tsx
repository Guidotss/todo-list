import { FC, useReducer } from 'react';
import { UIContext,UIReducer } from './';

export interface UIState{
    isSidebarOpen: boolean;
    isAddingEntry: boolean;
    isDragging: boolean;
}



export const UI_INITIAL_STATE: UIState = {
    isSidebarOpen: false,
    isAddingEntry: false,
    isDragging: false
}


interface UIProviderProps{
    children: React.ReactNode;
}

export const UIProvider:FC<UIProviderProps> = ({ children }) => {

    const [state, dispatch] = useReducer(UIReducer,UI_INITIAL_STATE);

    const openSideMenu = () => {
        dispatch({type:'UI - open Sidebar'});
    }

    const closeSideMenu = () => {
        dispatch({type:'UI - close Sidebar'});
    }

    const setIsAddingEntry = (isAddingEntry:boolean) => {
        dispatch({type:'UI - Set isAddingEntry', payload:isAddingEntry});
    }

    const startDragging = () => {
        dispatch({type:'UI - Start Dragging'});
    }

    const endDragging = () => {
        dispatch({type:'UI - End Dragging'});
    }


  return (
    <UIContext.Provider value={{
        ...state,

        openSideMenu,
        closeSideMenu,

        setIsAddingEntry,
        
        startDragging,
        endDragging
    }}>
        {children}
    </UIContext.Provider>  
  )
}