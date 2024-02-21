import React, { useEffect, useState } from 'react'

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
            <input type="search" name="search" id="search" value={search} onChange={handleSearch}/>
            <div>
                <p>Sort By:</p>
                <p className="alphabetic" onClick={() => sortType == 'alphabetic' ? setSortType('alphabeticReverse') :setSortType('alphabetic') }>Alphabetic</p>
                <p className="population" onClick={() => sortType == 'population' ? setSortType('populationReverse') :setSortType('population') }>Population</p>
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
        .map(country => {
            const languages =  typeof country.languages == 'object' ?  Object.getOwnPropertyNames(country.languages).map(prop => country.languages[prop]).slice(0, 3).join(', '): '';

            return (
            <div key={country.name.common} className='country-tile'>
                <div className="flag">{country.flag}</div>
                <p className="countryName">{country.name.common}</p>
                <p className="country-data"></p>
                <p className="country-data"><b>Capital:</b> {country.capital}</p>
                <p className="country-data"><b>Languages:</b> {languages}</p>
                <p className="country-data"><b>Population:</b> {country.population}</p>
                <p className="country-data"><b>Region:</b> {country.region}</p>
            </div>
            )
        })}
        </div>
    </div>
  )
}

export default App