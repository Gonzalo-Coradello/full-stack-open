import { useEffect, useState } from "react";
import Form from "./components/Form";
import PersonList from "./components/PersonList";
import Search from "./components/Search";
import personService from "./services/persons"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    personService.getAll()
      .then(data => setPersons(data))
  }, [])

  const handleName = (e) => {
    setNewName(e.target.value);
  };

  const handleNumber = (e) => {
    setNewNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const person = {
      name: newName,
      number: newNumber,
    }

    if (!newName || !newNumber) return alert("All fields must be filled");
    const exists = persons.find((p) => p.name === newName);
    if (exists) {
      if(window.confirm(`${newName} is already added to phonebook. Replace the number with a new one?`)) {
        personService.updateOne(exists.id, person)
          .then(newPerson => setPersons(persons.map(p => p.id === newPerson.id ? newPerson : p)))
      }
    } else {
      personService.create(person)
        .then(newPerson => setPersons(persons.concat(newPerson)))
    }
    
    setNewName("");
    setNewNumber("");
  };

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
    search ? setShowAll(false) : setShowAll(true);
  };

  const handleDelete = id => {
    const person = persons.find(p => p.id === id)
    if(window.confirm(`Do you want to delete ${person.name}?`)) {
      personService.deleteOne(id)
        .then(() => setPersons(persons.filter(p => p.id !== id)))
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Search value={search} handleSearch={handleSearch} />
      <h2>Add a new contact</h2>
      <Form
        newName={newName}
        newNumber={newNumber}
        handleSubmit={handleSubmit}
        handleName={handleName}
        handleNumber={handleNumber}
      />
      <h2>Numbers</h2>
      <PersonList persons={persons} showAll={showAll} search={search} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
