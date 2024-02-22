import React, { useEffect, useState } from 'react'
import CountryTile from './components/TileCountry';


const App = () => {
    const[fetchedData, setFetchedData] = useState([]);
    const[search, setSearch] = useState('');
    const[sortType, setSortType] = useState('alphabetic');

    useEffect(() => {
        const url = 'https://restcountries.com/v3.1/all';
        fetch(url)
            .then(response => response.json())
            .then(data => setFetchedData(data.map(country => ({
                cca2: country.cca2,
                name: country.name.common,
                capital: country.capital,
                languages: country.languages,
                population: country.population,
                region: country.region,
                flag: country.flag,
            }))))
            .catch(error => console.log(error));
    }, []);

    const data = fetchedData
    /* Filter only countries that match the search */
    .filter(country => { 
        const nameMatch = country.name.toUpperCase().includes(search.toUpperCase());
        const regionMatch = country.region.toUpperCase().includes(search.toUpperCase());
        const capitalMatch = () => (typeof country.capital == 'object') && (country.capital[0].toUpperCase().includes(search.toUpperCase()));
        const languageMatch = () => (typeof country.languages == 'object') && (Object.getOwnPropertyNames(country.languages).filter(lang => country.languages[lang].toUpperCase().includes(search.toUpperCase())).length != 0);

        return nameMatch || regionMatch || capitalMatch() || languageMatch();
    })
    /* Sort according to the sortType */
    .sort((a, b) => {
        if (sortType == 'alphabetic') {
            if (a.name < b.name) {
                return -1;
            } else {
                return 1;
            }
        } else if (sortType == 'alphabeticReverse') {
            if (a.name < b.name) {
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

  return (
    <div className='container'>
        <h1>Countries</h1>
        <h2>Matches: {data.length} countries</h2>
        <div className="search">
            <input type="search" name="searchBar" id="searchBar" value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search...'/>
            <div className='sort-options'>
                <p>Sort By:</p>
                <p className={`sort-option ${sortType == 'alphabetic' || sortType == 'alphabeticReverse' ? 'activeSort' : ''}`} onClick={() => sortType == 'alphabetic' ? setSortType('alphabeticReverse') : setSortType('alphabetic') }>
                    Alphabetic {sortType == 'alphabeticReverse' ? '⬅️' : '➡️'}
                </p>
                <p className={`sort-option ${sortType == 'population' || sortType == 'populationReverse' ? 'activeSort' : ''}`} onClick={() => sortType == 'population' ? setSortType('populationReverse') : setSortType('population') }>
                    Population {sortType == 'populationReverse' ? '⬆️' : '⬇️'}
                </p>
            </div>
        </div>
        <div className='countries-container'>
        {data.map(country => <CountryTile key={country.cca2} country={country} />)}
        </div>
    </div>
  )
}

export default App