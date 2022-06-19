const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const timeImage = document.querySelector('.time')
const icon = document.querySelector('.icon img')

const updateUI = (data) => {

  console.log(data);

  // Destructure Properties From Data Object
  const {cityDetails, weatherDetails} = data;

  // Update Details Template
  // Note: Could have also done with by selecting the elements
  // then just modifying content using textContent directly.
  details.innerHTML = `
      <h5 class="my-3 text-sm font-bold">${cityDetails.EnglishName}</h5>
      <div class="my-3 text-sm">${weatherDetails.WeatherText}</div>
      <div class="my-4 text-3xl">
        <span>${weatherDetails.Temperature.Imperial.Value}</span>
        <span>&deg;F</span>
      </div>
      `;

  // Remove hidden class if present
  if(card.classList.contains('hidden')) {
    card.classList.remove('hidden');
  }

  // Update the night/day & icon images

  const iconSrc = `img/icons/${weatherDetails.WeatherIcon}.svg`;
  icon.setAttribute('src', iconSrc);

  let timeSrc = weatherDetails.IsDayTime ? 'img/day.svg' : 'img/night.svg';
  timeImage.setAttribute('src', timeSrc);
};

const updateCity = async (city) => {
  const cityDetails = await getCity(city);
  const weatherDetails = await getWeatherForCity(cityDetails.Key);

  return {
    cityDetails: cityDetails,
    weatherDetails: weatherDetails
  };
}
cityForm.addEventListener('submit', e => {
  // Prevent form from refreshing when submitting
    e.preventDefault();
  // Get Form Value
    const city = cityForm.city.value.trim();
    cityForm.reset();

  // Update UI With New City
  // Note: We must tack on .then because updateCity is an async function
    updateCity(city)
      .then(data => updateUI(data))
      .catch(err => console.log(err));
})