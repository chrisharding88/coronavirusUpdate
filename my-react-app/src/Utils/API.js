import axios from 'axios';

const URL = 'https://covid-19-data.p.rapidapi.com/totals';

const API_KEY = '4195d16db2msh6f2905f0a0f95cbp11c06ajsn2a2e672d6c67';

export default {
	getTotals: function() {
		return axios.get(`${URL}`, {
			headers: {
				'content-type': 'application/octet-stream',
				'x-rapidapi-host': 'covid-19-data.p.rapidapi.com',
				'x-rapidapi-key': `${API_KEY}`
			}
		});
	}
};
