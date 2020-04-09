import React from 'react';

export const Countries = (props) => {
	return (
		<div className="dropdownCountriesMenu" id="country">
			<label for="dropdown-menu"> Country:</label>
			<select>{props.children}</select>
		</div>
	);
};

export const CountryResult = (props) => {
	return (
		<div className="countryFigures">
			<span id="cases"> Total Cases: {props.countryCases}</span>
			<span id="recovered"> Recovered: {props.countryRecovered}</span>
			<span id="critical"> Critcal Condition: {props.countryCritical}</span>
			<span id="deaths"> Deaths: {props.countryDeaths}</span>
		</div>
	);
};
