import { createContext } from 'react';
import { Entry } from '../../interfaces';


export interface UIContextProps {
    entries: Entry[];


    //methods

    addNewEntry:(description:string) => void
    updateEntry:(entry:Entry, showSnackBar?:boolean) => void
    deleteEntry:(_id:string) => void
}


export const EntriesContext = createContext({} as UIContextProps);