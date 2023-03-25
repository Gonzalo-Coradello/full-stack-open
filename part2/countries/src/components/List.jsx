import Country from './Country'

const List = ({ countries }) => {
  return (
    <div>
        { countries.map(country => <Country key={country.name.common+country.area} country={country } />) }  
    </div>
  )
}

export default List
