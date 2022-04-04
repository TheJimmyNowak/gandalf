import './App.css';
import { useState } from "react";
import axios from 'axios';

function App() {
  const API_ADDRESS="http://127.0.0.1:8080";
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleWebSubmit = (event) => {
    event.preventDefault();
    axios.post(API_ADDRESS + "/web/", {
      url: inputs.url 
    })
    .then((response) => {
    }, (error) => {
      alert(error)
    });
  }
  return (
    <div id="container">
      <form onSubmit={handleWebSubmit}>
        <label for="url">Url: </label><br/>
        <input type="url" name="url" id="url" pattern="https://.*" onChange={handleChange} required/><br/>
        <input type="submit" value="Open web"/><br/>
      </form>
    </div>
  );
}

export default App;
