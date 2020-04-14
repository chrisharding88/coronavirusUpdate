import React, { Component } from 'react';
import { WorldwideTotals } from '../Components/Worldwide';
import API from '../Utils/API';
import { Nav } from '../Components/Nav';
import './styles.css';
import numeral from 'numeral';
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';

class WorldwideCoronaPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			cases: '',
			recovered: '',
			critical: '',
			deaths: '',
			xValues: [],
			yValues: [],
			displayWorldwide: false
		};
	}

	componentDidMount() {
		this.totalResults();
	}

	totalResults = () => {
		//Data for the worldwide results
		const pointerToThis = this;
		let xValuesFunction = [];
		let yValuesFunction = [];
		console.log(pointerToThis);
		API.getTotals()
			.then((response) => {
				const result = response.data;
				console.log(result);
				this.setState({
					displayWorldwide: true,
					cases: numeral(result[0].confirmed).format('0,0'),
					recovered: numeral(result[0].recovered).format('0,0'),
					critical: numeral(result[0].critical).format('0,0'),
					deaths: numeral(result[0].deaths).format('0,0')
				});
				for (var key in response.data[0]) {
					xValuesFunction.push(key);
					yValuesFunction.push(response.data[0][key]);
				}

				pointerToThis.setState({
					xValues: xValuesFunction.slice(1, 4),
					yValues: yValuesFunction.slice(1, 4)
				});

				console.log(xValuesFunction);
				console.log(yValuesFunction);
			})
			.catch((err) => console.log(err));
	};

	handleCountryChange = (event) => {
		const { name, value } = event.target;
		this.setState({
			[name]: value
		});
	};

	render() {
		const data = {
			labels: this.state.xValues,
			datasets: [
				{
					label: this.state.xValues,
					backgroundColor: [ '#05f505', '#090ded', '#f50509' ],
					borderColor: 'rgba(255,99,132,1)',
					borderWidth: 1,
					hoverBackgroundColor: 'rgba(255,99,132,0.4)',
					hoverBorderColor: 'rgba(255,99,132,1)',
					data: this.state.yValues
				}
			]
		};

		return (
			<div>
				<Nav />
				<div className="links">
					<Link type="button" className="btn btn-primary link1" to="/">
						Worldwide Results
					</Link>
					<Link type="button" className="btn btn-primary link2" to="/country">
						Country Results
					</Link>
				</div>
				<div className="box1">
					<WorldwideTotals
						cases={this.state.cases}
						recovered={this.state.recovered}
						critical={this.state.critical}
						deaths={this.state.deaths}
					/>

					<Bar data={data} />
				</div>
			</div>
		);
	}
}

export default WorldwideCoronaPage;
