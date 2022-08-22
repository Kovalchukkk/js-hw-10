export function fetchCountries(name) {
  return fetch(`https://restcountries.com/v2/name/${name}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
