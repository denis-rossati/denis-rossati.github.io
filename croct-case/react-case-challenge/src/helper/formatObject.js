// The API send some key object empty, this function will remove it.

const formatObject = (obj) => Object.keys(obj).reduce((acc, el) => {
  if (obj[el] === '' || obj[el] === ' ' || !!(obj[el]) === false) {
    return acc;
  }
  acc[el] = obj[el];
  return acc;
}, {});

export default formatObject;
