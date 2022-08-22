const BASE_URL = 'https://restcountries.com/v2';
const FILTER_URL = '?fields=flags,name,capital,population,languages';

export function fetchCountries(name) {
  return fetch(`${BASE_URL}/name/${name}${FILTER_URL}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
