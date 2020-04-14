import React from 'react';
import './styles.css';

export const CountryResult = (props) => {
	return (
		<div className="countryFigures">
			<span id="cases" className="displayCountryFigures" onChange={(event) => props.onChange(event)}>
				Total Cases: {props.countryCases}
			</span>
			<span id="recovered" className="displayCountryFigures" onChange={(event) => props.onChange(event)}>
				Recovered: {props.countryRecovered}
			</span>
			<span id="critical" className="displayCountryFigures" onChange={(event) => props.onChange(event)}>
				Critical Condition: {props.countryCritical}
			</span>
			<span id="deaths" className="displayCountryFigures" onChange={(event) => props.onChange(event)}>
				Deaths: {props.countryDeaths}
			</span>
		</div>
	);
};
