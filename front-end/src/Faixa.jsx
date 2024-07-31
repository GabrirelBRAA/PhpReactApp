
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

function Faixa(props){
    return <ListItem>
       <ListItemText primary={props.faixa.title} secondary={props.faixa.length}/> 
        </ListItem>;
}

export default Faixa;