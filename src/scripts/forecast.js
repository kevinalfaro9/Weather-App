const key = 'kKGHJ37HsbnhYKdpGL8SXNNEVjumGKNR';

// Get Weather Information
const getWeatherForCity = async (locationID) => {

const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
const query = `${locationID}?apikey=${key}`;

const response = await fetch(base+query);
const data = await response.json();

return data[0];
}


// Get City Information (Get's the key we need that will be passed to other function to get
// that cities weather)
const getCity = async (city) => {
  const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
  const query = `?apikey=${key}&q=${city}`

  const response = await fetch(base+query);
  const data = await response.json();
  return data[0];
};



