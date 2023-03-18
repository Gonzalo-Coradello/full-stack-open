import { useState } from "react";
import Form from "./components/Form";
import PersonList from "./components/PersonList";
import Search from "./components/Search";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [filter, setFilter] = useState("");

  const handleName = (e) => {
    setNewName(e.target.value);
  };

  const handleNumber = (e) => {
    setNewNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newName || !newNumber) return alert("All fields must be filled");
    const exists = persons.find((p) => p.name === newName);
    if (exists) return alert(`${newName} is already added to phonebook`);
    setPersons((prev) => [
      ...prev,
      { name: newName, number: newNumber, id: prev.length + 1 },
    ]);
    setNewName("");
    setNewNumber("");
  };

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
    search ? setShowAll(false) : setShowAll(true);
  };

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
      <PersonList persons={persons} showAll={showAll} search={search} />
    </div>
  );
};

export default App;
