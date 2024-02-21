import React, { useEffect, useState } from 'react'
import CountryTile from './components/TileCountry';


const App = () => {
    const[data, setData] = useState([]);
    const[search, setSearch] = useState('');
    const[sortType, setSortType] = useState('alphabetic');

    useEffect(() => {
        const url = 'https://restcountries.com/v3.1/all';
        fetch(url)
            .then(response => response.json())
            .then(data => setData(data))
            .then(() => {console.log("Fetched succesfully!")})
            .catch(error => console.log(error));
    }, []);
    
    const handleSearch = (e) => {
        setSearch(e.target.value);
    }

  return (
    <div className='container'>
        <h1>Countries</h1>
        <div className="search">
            <input type="search" name="searchBar" id="searchBar" value={search} onChange={handleSearch} placeholder='Search...'/>
            <div className='sort-options'>
                <p>Sort By:</p>
                <p className={`sort-option ${sortType == 'alphabetic' || sortType == 'alphabeticReverse' ? 'activeSort' : ''}`} onClick={() => sortType == 'alphabetic' ? setSortType('alphabeticReverse') : setSortType('alphabetic') }>Alphabetic {sortType != 'alphabeticReverse'? '➡️' : '⬅️'}</p>
                <p className={`sort-option ${sortType == 'population' || sortType == 'populationReverse' ? 'activeSort' : ''}`} onClick={() => sortType == 'population' ? setSortType('populationReverse') : setSortType('population') }>Population {sortType != 'populationReverse'? '⬇️' : '⬆️'}</p>
            </div>
        </div>
        <div className='countries-container'>
        {data
        .filter(country => {
            const nameMatch = country.name.common.toUpperCase().includes(search.toUpperCase());
            const regionMatch = country.region.toUpperCase().includes(search.toUpperCase());

            const capitalMatch = () => (typeof country.capital == 'object') && (country.capital[0].toUpperCase().includes(search.toUpperCase()));

            const languageMatch = () => (typeof country.languages == 'object') && (Object.getOwnPropertyNames(country.languages).filter(lang => country.languages[lang].toUpperCase().includes(search.toUpperCase())).length != 0);

            return (
                nameMatch || regionMatch || capitalMatch() || languageMatch()
            )
        })
        .sort((a, b) => {
            if (sortType == 'alphabetic') {
                if (a.name.common < b.name.common) {
                    return -1;
                } else {
                    return 1;
                }
            } else if (sortType == 'alphabeticReverse') {
                if (a.name.common < b.name.common) {
                    return 1;
                } else {
                    return -1;
                }
            } else if (sortType == 'population') {
                if (a.population < b.population) {
                    return 1;
                } else {
                    return -1;
                }
            } else if (sortType == 'populationReverse') {
                if (a.population < b.population) {
                    return -1;
                } else {
                    return 1;
                }
            } 
        })
        .map(country => <CountryTile key={country.cca2} country={country} />)}
        </div>
    </div>
  )
}

export default App