import { List, Paper } from "@mui/material"
import { DragEvent, FC, useContext, useMemo } from "react";
import { EntriesContext } from "../../context/entries";
import { UIContext } from "../../context/ui";
import { EntryStatus } from "../../interfaces";
import { EntryCard } from "./EntryCard"
import styles from './EntryList.module.css'

interface Props {
  status:EntryStatus;
}

export const EntryList:FC<Props> = ({ status }) => {

  const { entries,updateEntry } = useContext( EntriesContext );
  const { isDragging,endDragging } = useContext( UIContext );
  const entriesByStatus = useMemo(() => entries.filter( entry => entry.status === status ),[ entries ]);
  

  const onDropEntry = ( event:DragEvent<HTMLDivElement> ) => {
    event.preventDefault();
    const entryId = event.dataTransfer.getData('text'); 
    const entry = entries.find(entry => entry._id === entryId)!;
    updateEntry({ ...entry, status });
    endDragging();
  }
  
  const allowDrop = (event:DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }

  return (
    <div 
        onDrop={ onDropEntry }
        onDragOver={allowDrop}
        className={isDragging ? styles.dragging : ''}
     >
        <Paper sx={{height:'calc(100vh - 250px)',overflow:'auto',backgroundColor:'transparent',padding:'1px 5px'}}>
            <List sx={{opacity: isDragging ? 0.5 : 1, transition:'all .3s'}}>
                {entriesByStatus.map(entry => (
                    <EntryCard key={entry._id} entry={ entry }/>
                ))}
            </List>
        </Paper>
    </div>
  )
}