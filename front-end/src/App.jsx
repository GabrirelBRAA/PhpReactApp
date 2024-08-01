import { useState, useEffect } from 'react'
import './App.css'
import Album from './Album.jsx'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';


import Button from '@mui/material/Button'

function changeMinutesSecondsToSeconds(minutesSeconds) {
  let numberArray = minutesSeconds.split(':');
  let minutes = parseInt(numberArray[0]);
  let seconds = parseInt(numberArray[1]);
  return (minutes * 60) + seconds;
}

function App() {

  const [updates, setUpdate] = useState(0);
  const [jsonState, setJson] = useState(Object());
  const [open, setOpen] = useState(false);


  useEffect(() => {
    async function fetchData() {
      const url = "http://127.0.0.1:8000/albumsfaixas";
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        setJson(json);

      } catch (error) {
        console.log(error.message);
      }
    }
    fetchData();
  }, [updates])

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);;
  }

  async function createNewAlbum(json) {
    const url = "http://127.0.0.1:8000/albums";
    fetch(url,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(json)
      }
    ).then(response => response.json())
      .then(response => { setUpdate(updates + 1) })
  }

  async function deleteAlbum(id) {
    const url = "http://127.0.0.1:8000/albums/" + id;
    fetch(url,
      {
        method: "DELETE"
      }
    ).then(response => response.json())
      .then(response => { console.log(response); setUpdate(updates + 1) });
  }

  async function deleteFaixa(id) {
    const url = "http://127.0.0.1:8000/faixas/" + id;
    fetch(url,
      {
        method: "DELETE"
      }
    ).then(response => response.json())
      .then(response => { console.log(response); setUpdate(updates + 1) });
  }

  async function createNewFaixa(json, id) {
    json["album_id"] = id;
    json["length"] = changeMinutesSecondsToSeconds(json["length"]);
    console.log(json);
    const url = "http://127.0.0.1:8000/faixas";
    fetch(url,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(json)
      }
    ).then(response => response.json())
      .then(response => { setUpdate(updates + 1) })
  }

  async function updateAlbum(json, id) {
    const url = "http://127.0.0.1:8000/albums/" + id;
    fetch(url,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "PUT",
        body: JSON.stringify(json)
      }
    ).then(response => response.json())
      .then(response => { setUpdate(updates + 1) })

  }

  async function searchQuery(query) {
    const url = "http://127.0.0.1:8000/search?" + new URLSearchParams({
      query: query
    }).toString();
    console.log(url);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      setJson(json);

    } catch (error) {
      console.log(error.message);
    }
  }

  function handleSearch(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const query = Object.fromEntries(data.entries()).query;
    if (query) {
      searchQuery(query);
    } else {
      setUpdate(updates + 1);
    }
  }

  var state = []
  for (let i = 0; i < jsonState.length; ++i) {
    let album = jsonState[i];
    let faixas = [];
    for (let j = 0; j < album.faixas.length; j++) {
      faixas.push(album.faixas[j].title);
    }
    state.push(<Album key={album.id} album={album} deleteAlbum={deleteAlbum} createNewFaixa={createNewFaixa}
      deleteFaixa={deleteFaixa} updateAlbum={updateAlbum} />);
  }

  return (
    <>
      <Typography variant="h1" gutterBottom>
        Tião Carreiro e Pardinho
        <Typography variant="subtitle1" gutterBottom>
          Discografia
        </Typography>
      </Typography>
    <div>

      <form onSubmit={handleSearch} >
        <TextField color="primary" id="outlined-basic" label="Pesquisa" name="query" variant="standard" />
      </form>
      <Button sx={{ marginTop: 5, marginBottom: 5, backgroundColor: "green" }} onClick={handleOpen} variant="contained">Adicionar Album</Button>
      <Dialog onSubmit={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.title;
            console.log(formJson)
            createNewAlbum(formJson);
            handleClose();
          }
        }}
        open={open} onClose={handleClose} >
        <DialogTitle  >Novo álbum</DialogTitle>
        <TextField id="outlined-basic" label="Título" name="title" variant="outlined" />
        <Button type='submit'>Criar</Button>

      </Dialog>
      {state}
    </div>
    </>
  )
}

export default App
