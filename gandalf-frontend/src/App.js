import './App.css';
import { useState } from "react";
import axios from 'axios';

function App() {
  const API_ADDRESS="http://szafa.zse.rzeszow.pl:5556/api";
  const [inputs, setInputs] = useState({});
  const clients = []

  var i = 0;
  
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
        <input type="url" name="url" id="url" onChange={handleChange} required/><br/>
        <label>Host: </label>
        <input name="host" id="host" onChange={handleChange}/><br/>
        <input type="submit" value="Open web"/><br/>
      </form>
    </div>
  );
}

export default App;
