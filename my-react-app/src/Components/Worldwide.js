import React from 'react';

export const WorldwideTotals = (props) => {
	return (
		<div className="worldwideresults">
			<h1>Worldwide Results</h1>
			<div className="figures">
				<span id="cases"> Total Cases: {props.cases}</span>
				<span id="recovered"> # Recovered: {props.recovered}</span>
				<span id="critical"> # Critcal Condition: {props.critical}</span>
				<span id="deaths"> # Deaths: {props.deaths}</span>
			</div>
		</div>
	);
};
