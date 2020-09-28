
const formCity = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

// updating the ui

const updateUI = data => {
    const cityDetails = data.cityDetails;
    const weather = data.weather;

    //update details template

    details.innerHTML = `
    <h5 class="my-3">${cityDetails.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>
    `;

    // update the day/night img and icon
    let timeSrc = null;
    if (weather.isDayTime) {
        timeSrc = 'img/day.svg';
    } else {
        timeSrc = 'img/night.svg';
    }
    time.setAttribute('src', timeSrc);

    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    // removing the d-none class
    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    };
};
const updateCity = async city => {

    const cityDetails = await getCity(city);
    const weather = await getWeather(cityDetails.Key);

    // // destructure property
    // const { cityDetails, weather } = data;

    return { cityDetails, weather };
};
formCity.addEventListener('submit', e => {
    // prevent the form to reload
    e.preventDefault();

    //getting a city value
    const city = formCity.city.value.trim();
    formCity.reset();

    // update the ui new with new city
    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));

});