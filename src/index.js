import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';
import getRefs from './js/get-refs';

const DEBOUNCE_DELAY = 300;
const refs = getRefs();
