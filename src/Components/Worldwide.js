import React from 'react';
import './styles.css';

export const WorldwideTotals = (props) => {
	return (
		<div className="worldwideresults">
			<h3 id="worldwideHeader">Worldwide Results</h3>
			<div className="figures">
				<span id="cases"> Total Cases: {props.cases}</span>
				<span id="recovered"> Recovered: {props.recovered}</span>
				<span id="critical"> Critical Condition: {props.critical}</span>
				<span id="deaths"> Deaths: {props.deaths}</span>
			</div>
		</div>
	);
};
