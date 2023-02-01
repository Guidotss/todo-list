import { createContext } from 'react';


export interface UIContextProps {
    isSidebarOpen: boolean;
    isAddingEntry: boolean;
    isDragging: boolean;

    openSideMenu: () => void;
    closeSideMenu: () => void;
    setIsAddingEntry: (isAddingEntry:boolean) => void;
    startDragging: () => void;
    endDragging: () => void;
}


export const UIContext = createContext({} as UIContextProps);