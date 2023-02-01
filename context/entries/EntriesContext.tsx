import { createContext } from 'react';
import { Entry } from '../../interfaces';


export interface UIContextProps {
    entries: Entry[];


    //methods

    addNewEntry:(description:string) => void
    updateEntry:(entry:Entry) => void
}


export const EntriesContext = createContext({} as UIContextProps);