import { useState } from 'react';
import Faixa from './Faixa.jsx'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Dialog, ListItemSecondaryAction } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function secondsToMinuteSeconds(seconds){
    if (typeof seconds === 'string' || seconds instanceof String){
        return seconds;
    }

    seconds = parseInt(seconds);
    let minutes = Math.floor(seconds/60);
    seconds = seconds - (minutes * 60);

    //Adicionando zero na frente de números que só possuem unidades
    if(minutes / 10 < 1.0){
        minutes = '0' + minutes.toString();
    } else {
        minutes = minutes.toString();
    }

    if(seconds / 10 < 1.0){
        seconds = '0' + seconds.toString();
    } else {
        seconds = seconds.toString();
    }
    return minutes + ":" + seconds;
}

function Album(props) {
    let faixas = []
    let array = props.album.faixas;

    const [open, setOpen] = useState(true);
    const [editAlbumDialog, setEdit] = useState(false);
    const [deleteAlbumDialog, setDelete] = useState(false);
    const [addFaixaDialog, setAdd] = useState(false);

    function handleDeleteAlbum() {
        setDelete(true);
    }
    function handleEditAlbum() {
        setEdit(true);
    }
    function handleAddFaixa() {
        setAdd(true);

    }
    function handleLeaveDeleteAlbum() {
        setDelete(false);
    }
    function handleLeaveEditAlbum() {
        setEdit(false);
    }
    function handleLeaveAddFaixa() {
        setAdd(false);
    }

    function deleteThisAlbum() {
        props.deleteAlbum(props.album.id);
    }

    function createNewFaixaHere(json) {
        props.createNewFaixa(json, props.album.id)
    }

    function updateThisAlbum(json){
        props.updateAlbum(json, props.album.id);
    }

    const handleClick = () => {
        setOpen(!open);
    };

    for (let i = 0; i < array.length; ++i) {
        let faixa = array[i];
        faixa['timeLength'] = secondsToMinuteSeconds(faixa['length']);
        faixas.push(<Faixa key={faixa.id} faixa={faixa} deleteFaixa={props.deleteFaixa} />)
    }

    return <>
        <List sx={{ width: '100%', minWidth: 350, bgcolor: 'background.paper', color: 'black', marginBottom: "50px", padding: "0" }}>
            <ListItem disablePadding sx={{ backgroundColor: 'purple', padding: "none" }}>
                <ListItemButton onClick={handleClick}>{props.album.title}</ListItemButton>
                <ListItemSecondaryAction>
                    <IconButton onClick={handleEditAlbum} edge="end" aria-label="delete">
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={handleDeleteAlbum} edge="end" aria-label="delete">
                        <DeleteIcon sx={{ color: "red" }} />
                    </IconButton>
                    <IconButton onClick={handleAddFaixa} edge="end" aria-label="delete">
                        <AddCircleIcon sx={{ color: "green" }} />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>{faixas}</Collapse>
        </List>
        <Dialog open={deleteAlbumDialog} onClose={handleLeaveDeleteAlbum}
            PaperProps={{
                component: 'form',
                onSubmit: (event) => {
                    event.preventDefault();
                    deleteThisAlbum();
                    handleLeaveDeleteAlbum();
                }
            }}
        >
            <DialogTitle>Deletar album?</DialogTitle>
            <Button type="submit">Deletar</Button>
        </Dialog>
        <Dialog open={editAlbumDialog} onClose={handleLeaveEditAlbum}
            PaperProps={{
                component: 'form',
                onSubmit: (event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries(formData.entries());
                    updateThisAlbum(formJson);
                    handleLeaveEditAlbum();
                }
            }}>
            <DialogTitle>Editar album</DialogTitle>
            <TextField id="outlined-basic" label="Título" name="title" variant="outlined" />
            <Button type="submit">Salvar</Button>
        </Dialog>
        <Dialog open={addFaixaDialog} onClose={handleLeaveAddFaixa}
            PaperProps={{
                component: 'form',
                onSubmit: (event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries(formData.entries());
                    createNewFaixaHere(formJson);
                    handleLeaveAddFaixa();
                }
            }}>
            <DialogTitle>Adicionar nova faixa</DialogTitle>
            <TextField id="outlined-basic" label="Título" name="title" variant="outlined" />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker label="duração" name="length" views={['minutes', 'seconds']} format="mm:ss" />
            </LocalizationProvider>
            <Button type='submit'>Adicionar</Button>
        </Dialog>
    </>
}

export default Album