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
    <div>
        Countries:
        <ul>
            {data.map((country, i) => (
                <li key={i}>{country.name.common}: <p style={{fontSize: '4rem', margin: '0'}}>{country.flag}</p></li>
            ))}
        </ul>
    </div>
  )
}

export default App