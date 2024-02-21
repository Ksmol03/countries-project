import React from 'react'

const CountryTile = ({ country }) => {

    const languagesArrayToString = (languages) => typeof languages == 'object' ?  Object.getOwnPropertyNames(languages).map(prop => languages[prop]).slice(0, 3).join(', ') : '';

  return (
  <div className='country-tile'>
      <div className="flag">{country.flag}</div>
      <p className="countryName">{country.name.common}</p>
      <p className="country-data"></p>
      <p className="country-data"><b>Capital:</b> {country.capital}</p>
      <p className="country-data"><b>Languages:</b> {languagesArrayToString(country.languages)}</p>
      <p className="country-data"><b>Population:</b> {country.population.toLocaleString()}</p>
      <p className="country-data"><b>Region:</b> {country.region}</p>
  </div>
  )
}

export default CountryTile