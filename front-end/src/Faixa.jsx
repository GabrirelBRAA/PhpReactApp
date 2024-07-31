import { useState } from 'react';


import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import { Dialog, ListItemSecondaryAction } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';

function Faixa(props) {

    const [open, setOpen] = useState(false);

    function handleOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    var color = "white";
    if(props.faixa.selected){
        color = "yellow;"
    }

    return <><ListItem sx={{backgroundColor: color}}>
        <ListItemText primary={props.faixa.title} secondary={props.faixa.timeLength} />
        <ListItemSecondaryAction>
            <IconButton onClick={handleOpen} >
                <DeleteIcon></DeleteIcon>
            </IconButton>
        </ListItemSecondaryAction>
    </ListItem>
        <Dialog open={open} onClose={handleClose}
            PaperProps={{
                component: 'form',
                onSubmit: (event) => {
                    event.preventDefault();
                    props.deleteFaixa(props.faixa.id);
                    handleClose();
                }
            }}
        >
            <DialogTitle>Deletar faixa?</DialogTitle>
            <Button type="submit">Deletar</Button>
        </Dialog>
    </>
}

export default Faixa;