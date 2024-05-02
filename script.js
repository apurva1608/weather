let coordinates;
let weatherData;

// Get the user's location
async function getLocation() {
	try {
		const position = await new Promise((resolve, reject) => {
			navigator.geolocation.getCurrentPosition(resolve, reject);
		});
		coordinates = `${position.coords.latitude.toFixed(2)},${position.coords.longitude.toFixed(2)}`;
	} catch (error) {
		console.error(error);
	}
}

async function getWeather() {
	const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${coordinates}&days=3`;
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': 'dc6b49d683mshb495ab1aca3f98ap10e525jsn76a949f3126c',
			'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
		}
	};

	try {
		const response = await fetch(url, options);
		const result = await response.json();
		weatherData = result;
		console.log(weatherData);
	} catch (error) {
		console.error(error);
	}
}

function displayWeather() {
	const body = document.querySelector('body');
	const navbar = document.querySelector('.navbar');
	const tiles = document.querySelectorAll('.tile');
	const healineElement = document.querySelector('.headline');
	const conditionIconElement = document.querySelector('.condition-icon');
	const descriptionElement = document.querySelector('.description');
	const timeElement = document.querySelector('.time');
	const timezoneElement = document.querySelector('.timezone');
	const temperatureElement = document.querySelector('.temperature');
	const precipitationElement = document.querySelector('.precipitation');
	const humidityElement = document.querySelector('.humidity');
	const windElement = document.querySelector('.wind');
	const footerElement = document.querySelector('footer');

	healineElement.textContent = weatherData.location.name + ', ' + weatherData.location.region + ', ' + weatherData.location.country;
	conditionIconElement.src = weatherData.current.condition.icon;
	timeElement.textContent = weatherData.location.localtime;
	timezoneElement.textContent = weatherData.location.tz_id;
	temperatureElement.textContent = weatherData.current.temp_c + '°C';
	precipitationElement.textContent = weatherData.current.precip_mm + 'mm';
	humidityElement.textContent = weatherData.current.humidity + '%';
	windElement.textContent = weatherData.current.wind_kph + 'km/h';


	if (weatherData.current.condition.text === 'Clear') {
		descriptionElement.textContent = 'It is a clear day. Enjoy the sun!';

	}
	if (weatherData.current.condition.text === 'Sunny') {
		descriptionElement.textContent = 'It is a sunny day. Enjoy the sun!';

	}
	if (weatherData.current.condition.text === 'Partly cloudy') {
		descriptionElement.textContent = 'It is a partly cloudy day. Enjoy the sun!';

	}
	if (weatherData.current.condition.text === 'Cloudy') {
		descriptionElement.textContent = 'It is a cloudy day. Enjoy the sun!';

	}
	if (weatherData.current.condition.text === 'Overcast') {
		descriptionElement.textContent = 'It is an overcast day. Enjoy the sun!';

	}
	if (weatherData.current.condition.text === 'Mist') {
		descriptionElement.textContent = 'It is a misty day. Enjoy the sun!';

	}
	if (weatherData.current.condition.text === 'Patchy rain possible') {
		descriptionElement.textContent = 'It is a rainy day. Enjoy the sun!';

	}
	if (weatherData.current.condition.text === 'Patchy light rain') {
		descriptionElement.textContent = 'It is a rainy day. Enjoy the sun!';

	}
	if (weatherData.current.condition.text === 'Light rain') {
		descriptionElement.textContent = 'It is a rainy day. Enjoy the sun!';

	}
	if (weatherData.current.condition.text === 'Moderate or heavy rain shower') {
		descriptionElement.textContent = 'It is a rainy day. Enjoy the sun!';

	}
	if (weatherData.current.condition.text === 'Moderate rain') {
		descriptionElement.textContent = 'It is a rainy day. Enjoy the sun!';

	}
	if (weatherData.current.condition.text === 'Heavy rain') {
		descriptionElement.textContent = 'It is a rainy day. Enjoy the sun!';

	}
	if (weatherData.current.condition.text === 'Light rain shower') {
		descriptionElement.textContent = 'It is a rainy day. Enjoy the sun!';

	}
	if (weatherData.current.condition.text === 'Moderate rain at times') {
		descriptionElement.textContent = 'It is a rainy day. Enjoy the sun!';

	}
	if (weatherData.current.condition.text === 'Moderate rain shower') {
		descriptionElement.textContent = 'It is a rainy day. Enjoy the sun!';

	}
	if (weatherData.current.condition.text === 'Patchy light drizzle') {
		descriptionElement.textContent = 'It is a rainy day. Enjoy the sun!';

	}
	if (weatherData.current.condition.text === 'Light drizzle') {
		descriptionElement.textContent = 'It is a rainy day. Enjoy the sun!';

	}
	if (weatherData.current.condition.text === 'Patchy light drizzle') {
		descriptionElement.textContent = 'It is a rainy day. Enjoy the sun!';

	}
	if (weatherData.current.condition.text === 'Moderate or heavy rain with thunder') {
		descriptionElement.textContent = 'It is a rainy day. Enjoy the sun!';

	}

	if (weatherData.current.is_day === 0) {
		body.style.background = 'linear-gradient(to bottom, #141e30, #243b55)';
		document.querySelectorAll('div').forEach(div => {
			div.classList.add('night');
			div.style.color = 'white';
		});
		navbar.classList.add('navbar-dark');
		navbar.style.background = '#243b55';
		tiles.forEach(tile => tile.style.background = 'linear-gradient(to bottom, #141e30, #243b55)');

	} else {
		navbar.classList.add('bg-light');
		footerElement.classList.add('bg-light');
	}

}

function displayForecast() {
	const forecastElement = document.querySelector('.forecast');
	const forecastData = weatherData.forecast.forecastday;

	forecastData.forEach(day => {
		const forecastTile = document.createElement('div');
		forecastTile.classList.add('forecast-tile');
		forecastTile.innerHTML = `
		<img src="${day.day.condition.icon}" alt="${day.day.condition.text}">
		<h3>${day.date}</h3>
		<span>${day.day.avgtemp_c}°C - </span>
		<span>${day.day.condition.text}</span>
		<div>Precipitation: ${day.day.totalprecip_mm}mm</div>
		<div>Humidity: ${day.day.avghumidity}%</div>
		<div>Wind: ${day.day.maxwind_kph}km/h</div>
		`;
		forecastElement.appendChild(forecastTile);
	});
}

function showLoader() {
	const loader = document.querySelector('.loader');
	loader.style.display = 'flex';
}

function hideLoader() {
	const loader = document.querySelector('.loader');
	loader.style.display = 'none';
}



async function main() {
	showLoader();
	await getLocation();
	await getWeather();
	hideLoader();
	displayWeather();
	displayForecast();
}

main();