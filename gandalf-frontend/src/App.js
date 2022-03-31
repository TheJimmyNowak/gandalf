import './App.css';
import { useState } from "react";
import axios from 'axios';

function App() {
  const API_ADDRESS="http://127.0.0.1:5000";
  const [inputs, setInputs] = useState({});
  const clients = []

  var i = 0;
  // Hardcoded clients cause clients has static ip
  for (i=0; i<18; i++){
    clients.push("172.16.110." + i);
  }

  const listClients = clients.map((client) =>
    <li key={client}>{client}</li>
  )

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleWebSubmit = (event) => {
    event.preventDefault();
    axios.post(API_ADDRESS + "/web/", {
      url: inputs.url,
      host: inputs.host
    })
    .then((response) => {
    }, (error) => {
      alert(error)
    });
  }
  
  return (
    <div id="container">
      <form onSubmit={handleWebSubmit}>
        <label>Url: </label>
        <input type="url" name="url" id="url" pattern="https://.*" onChange={handleChange} required/><br/>
        <label>Host: </label>
        <input name="host" id="host" onChange={handleChange}/><br/>
        <input type="submit" value="Open web"/><br/>
      </form>
      <div id="clients-list">
        {
          listClients
        } 
      </div>
    </div>
  );
}

export default App;
