import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';
import getRefs from './js/get-refs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;
const refs = getRefs();

refs.searchInput.addEventListener(
  'input',
  debounce(onSearchInput, DEBOUNCE_DELAY)
);

function onSearchInput(e) {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
  const inputValue = e.target.value.trim();

  if (inputValue) {
    fetchCountries(inputValue).then(renderCountryInfo).catch(onError);
  }
}

function renderCountryInfo(countries) {
  if (countries.length > 10) {
    return Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }

  if (countries.length === 1) {
    renderCountryCard(countries);
  } else {
    renderCountryList(countries);
  }
}

function onError(error) {
  return Notify.failure('Oops, there is no country with that name');
}

function renderCountryCard(countries) {
  const markup = `<img src="${
    countries[0].flags.svg
  }" alt="" class="country__img" width="30px">
<h2 class="country__name">${countries[0].name}</h2>
<p class="counry__specs">Capital: <span class="country__info">${
    countries[0].capital
  }</span></p>
<p class="counry__specs">Population: <span class="country__info">${
    countries[0].population
  }</span></p>
<p class="counry__specs">Languages: <span class="country__info">${getLanguages(
    countries[0].languages
  )}</span></p>`;
  refs.countryInfo.innerHTML = markup;
}

function getLanguages(languages) {
  return languages.map(({ name }) => name).join(', ');
}
