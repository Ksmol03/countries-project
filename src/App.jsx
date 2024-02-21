import React, { useEffect, useState } from 'react'

const App = () => {
    const[data, setData] = useState([]);

    useEffect(() => {
        const url = 'https://restcountries.com/v3.1/all';
        fetch(url)
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.log(error));
    }, []);
    console.log(data);

  return (
    <div className='container'>
        <h1>Countries</h1>
        <div className='flag-container'>
        {data.map(country => {
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