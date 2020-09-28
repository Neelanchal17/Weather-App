const key = 'pSGgOZC3R58p5V2rF5pBNIm6N6yHh46y';

//getting weather info
const getWeather = async id => {
    base = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${id}?apikey=${key}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];
}
// getting the city info
// getting the city data
const getCity = async (city) => {
    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];

};
getCity('Bhilai')
    .then(data => getWeather(data.Key))
    .then(data => console.log(data))
    .catch(err => console.log(err));


