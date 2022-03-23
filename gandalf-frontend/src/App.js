import './App.css';
import { useState } from "react";
import axios from 'axios';

function App() {
  const API_ADDRESS="http://127.0.0.1:5000";
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
    <div className="App">
      <form onSubmit={handleWebSubmit}>
        <label for="url">Url: </label>
        <input type="url" name="url" id="url" pattern="https://.*" onChange={handleChange} required/>
        <input type="submit" value="Open web"/>
      </form>
    </div>
  );
}

export default App;
