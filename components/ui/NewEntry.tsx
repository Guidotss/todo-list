import { ChangeEvent, useContext, useState } from 'react'; 
import { Box, Button, TextField } from '@mui/material';
import { SaveAltOutlined,AddCircleOutline } from '@mui/icons-material';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';

export const NewEntry = () => {

    const { isAddingEntry,setIsAddingEntry } = useContext(UIContext);
    const [inputValue, setInputValue] = useState('');
    const [touched, setTouched] = useState(false);
    const { addNewEntry } = useContext(EntriesContext);

    const onTextFieldChange = (event:ChangeEvent<HTMLInputElement> ) => {
        setInputValue(event.target.value);
    }   

    const onSave = () => {
        if(inputValue.length === 0) return;
        addNewEntry(inputValue);
        setInputValue('');
        setIsAddingEntry(false);
        setTouched(false);
    }

  return (
    <Box sx={{marginBottom:2,paddingX:2}}>  

        {
            isAddingEntry ?(
                <>

                    <TextField
                        fullWidth
                        sx={{marginTop:2,marginBottom:1}}
                        autoFocus
                        multiline
                        label="Nueva entrada"
                        value={inputValue}
                        onChange={onTextFieldChange}
                        error={inputValue.length <= 0 && touched }
                        helperText={inputValue.length <= 0 && touched && 'El campo no puede estar vacío'}
                        onBlur={()=>setTouched(true)}
                        
                    />
                    <Box display='flex' justifyContent='space-between'>
                        <Button 
                            variant="outlined" 
                            color="secondary"
                            endIcon={<SaveAltOutlined/>}
                            onClick={onSave}
                        >
                            Guardar
                        </Button>
                        <Button 
                            variant="text"
                            onClick={()=>setIsAddingEntry(false)}
                            >
                            Cancelar
                        </Button>
                    </Box>
                </>
            )
            :(

                <Button
                    startIcon={<AddCircleOutline/>}
                    fullWidth
                    variant="outlined"
                    onClick={()=>setIsAddingEntry(true)}

                >
                    Agregar tarea
                </Button>
            )
        }


    </Box>
  )
}