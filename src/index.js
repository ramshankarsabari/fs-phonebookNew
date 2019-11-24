import React, {useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import './index.css';

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')

  const handleNameChange = (e) =>{
      console.log(e.target.value);
      setNewName(e.target.value);
  }

  const handlePhoneChange = (e) =>{
    console.log(e.target.value);
    setNewPhone(e.target.value);
  }

useEffect(() => {
  console.log('effect')
  axios
    .get('http://localhost:3002/persons')
    .then(response => {
      console.log('promise fulfilled')
      setPersons(response.data)
    })
}, [persons])

console.log('render', persons.length, 'persons')

const clearData = () =>{
  setNewName('');
  setNewPhone('');
  //setPersons([]);
}

const addName = (e) =>{
  e.preventDefault()
  const personObject = {
    name: newName,
    number: newPhone
  }
  axios.post('http://localhost:3002/persons',personObject);
  //setPersons(persons.concat(personObject))
  setNewName('')
  setNewPhone('')
}

const rows = () =>
persons.map(person => <li>{person.name}  {person.number}</li>)

  return (
    <div>
        
    <div>debug: {newName}</div>
      <h2>Phonebook</h2>
      <form onSubmit = {addName}>
        <div>
          Name: <input value={newName} onChange = {handleNameChange} />
          <br/>
          Phone: <input value={newPhone} onChange = {handlePhoneChange}/>
        </div>
        <div>
          <button type="submit">Add</button>
          <br/>
          <button type="clear" onClick = {clearData}>Reset Form</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
          {rows()}
      </ul>
    </div>
  )
}


ReactDOM.render(<App />, document.getElementById('root'));
