import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { NextPage,GetServerSideProps } from "next"
import { Button, capitalize, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, IconButton, Radio, RadioGroup, TextField } from "@mui/material";
import{ DeleteOutlined, SaveOutlined } from "@mui/icons-material";
import { Layout } from "../../components/layouts";
import { Entry, EntryStatus } from "../../interfaces";
import { dbEntries } from "../../dataBase";
import { EntriesContext } from "../../context/entries";
import { dateFunctions } from "../../utils";


const validStatus:EntryStatus[] = ['pending','in-progress', 'finished'];


interface Props {
    entry:Entry
}

export const EntryPage:NextPage<Props> = ({ entry }) => {

    const { updateEntry,deleteEntry } = useContext(EntriesContext); 
    const [ inputValue,setInputValue ] = useState(entry.description);
    const [ status, setStatus ] = useState<EntryStatus>(entry.status);
    const [ touched, setTouched ] = useState(false);

    const onInputChange = (event:ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    const onStatusChange = (event:ChangeEvent<HTMLInputElement>) => {
        setStatus(event.target.value as EntryStatus);
    }

    const onSave = (event:FormEvent) => {
        event.preventDefault();

        if(!inputValue){
            setTouched(true);
            return;
        }

        const newEntry:Entry = {
            ...entry,
            description:inputValue,
            status
        }
        updateEntry(newEntry,true);
        setInputValue('');
    }

  return (
    <Layout title={inputValue.substring(0,20) + '....'}>
        <Grid
            container
            justifyContent="center"
            sx={{marginTop:2}}
        >
            <Grid item xs={12} sm={8} md={6}>
                <Card>
                    <CardHeader 
                        title={`Entrada:`} 
                        subheader={`Creada ${dateFunctions.getFomartDistanceToNow(entry.createdAt)}`}
                    />
                    <CardContent>
                        <TextField
                            sx={{marginTop:2, marginBottom:1}}
                            fullWidth
                            placeholder="Nueva entrada"
                            multiline
                            label="Nueva entrada"
                            value={ inputValue }
                            onChange={ onInputChange }
                            helperText={ touched && !inputValue ? 'Campo requerido' : '' }
                            error={ touched && !inputValue }
                            onBlur={ () => setTouched(true) }
                        />
                       <FormControl>
                            <FormLabel>Estado:</FormLabel>
                            <RadioGroup 
                                row
                                value={ status }
                                onChange={ onStatusChange }
                            >
                                {
                                    validStatus.map((option:EntryStatus) => (
                                        <FormControlLabel
                                            key={ option }
                                            value={ option }
                                            control={ <Radio/> }
                                            label={ capitalize(option) }
                                        />
                                    ))
                                }
                            </RadioGroup>
                       </FormControl>
                    </CardContent>
                    <CardActions>
                        <Button
                            startIcon={ <SaveOutlined/> }
                            variant="contained"
                            fullWidth
                            onClick={ onSave }
                            type="submit"
                            disabled={ !inputValue }
                        >
                            Save
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>

        <IconButton sx={{position:'fixed', bottom:30,right:30,backgroundColor:'error.dark'}} onClick={() => deleteEntry(entry._id)}>
            <DeleteOutlined/>
        </IconButton>

    </Layout>
  );
}








export const getServerSideProps: GetServerSideProps = async ({params}) => {
   
    const { id } = params as {id:string}

    const entry = await dbEntries.getEntriesById(id);

    if(!entry){
        return {
            redirect:{
                destination: '/',
                permanent:false
            }
                
        }
    }

    return {
        props: {
            entry
        }
    }
}




export default EntryPage; 