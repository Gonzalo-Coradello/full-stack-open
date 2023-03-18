import Person from "./Person";

const PersonList = ({ persons, showAll, search }) => {
  return (
    <ul>
      {showAll
        ? persons.map((person) => <Person key={person.id} {...person} />)
        : persons
            .filter((p) => p.name.toLowerCase().includes(search))
            .map((person) => <Person key={person.id} {...person} />)}
    </ul>
  );
};

export default PersonList;
