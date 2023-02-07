import { FC, useEffect, useReducer } from 'react';
import { useSnackbar } from 'notistack';
import { Entry } from '../../interfaces';
import { EntriesContext,entriesReducer } from './';
import { entriesApi } from '../../apis'; 


export interface EntriesState{
    entries: Entry[];
}

export const Entries_INITIAL_STATE: EntriesState = {
    entries:[]
}


interface EntriesProviderProps{
    children: React.ReactNode;
}

export const EntriesProvider:FC<EntriesProviderProps> = ({ children }) => {

    const [state, dispatch] = useReducer(entriesReducer,Entries_INITIAL_STATE);
    const { enqueueSnackbar } = useSnackbar();
    
    const addNewEntry = async(description:string) => {
    
        try{
            const { data } = await entriesApi.post<Entry>('/entries',{ description });
            dispatch({ type:'[Entry] Add-Entry', payload:data });

        }catch(err){
            console.log(err);
        }

    }


    const updateEntry = async({_id, description,status}:Entry, showSnackBar=false) => {
        try{

            const { data } = await entriesApi.put<Entry>(`/entries/${_id}`,{description,status});
        
            dispatch({ type:'[Entry] Entry-Updated', payload:data });
            if(showSnackBar){
                enqueueSnackbar('Entrada actualizada',{ variant:'success', autoHideDuration:1500 });
            }

        }catch(err){
            console.log(err);
        }
    }


    const deleteEntry = async(_id:string) => {
        const { data } = await entriesApi.delete<Entry>(`/entries/${_id}`);
        dispatch({ type:'[Entry] Delete-Entry', payload:data });
        enqueueSnackbar('Entrada eliminada',{ variant:'error', autoHideDuration:1500 });
    }



    const refreshEntries = async() => {
        const { data } = await entriesApi.get<Entry[]>('/entries');
        dispatch({ type:'[Entry] Get-Entries', payload:data });
    }

    useEffect(() => {
        refreshEntries();
    },[]);

    return (
        <EntriesContext.Provider value={{
            ...state,

            addNewEntry,
            updateEntry,
            deleteEntry
        }}>
            {children}
        </EntriesContext.Provider>  
    )
}