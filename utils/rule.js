export default {
  required: value => !!value || 'Required',
  requiredArray: value => value.length > 0 || 'Required at least 1',
  email: value => /.+@.+\..+/.test(value) || 'Invalid E-mail format',
  number: value => /^\d*\.?\d*$/.test(value) || 'Invalid number format',
  minPrice: (value, maxPrice) => parseFloat(value) <= parseFloat(maxPrice) || 'Value must be less than or equal to max price',
  maxPrice: (value, minPrice) => parseFloat(value) >= parseFloat(minPrice) || 'Value must be greater than or equal to min price',
};
