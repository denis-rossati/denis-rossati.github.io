import countries from './countries';

const findCountry = (countryCode) => {
  const key = countryCode.toUpperCase();
  return countries[key];
};

export default findCountry;
