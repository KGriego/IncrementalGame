export const delay = duration =>
  new Promise(r => setTimeout(() => r(), duration));

export const round = (value = 0, precision = 1) => {
  const multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
};

export const isDisabled = (valueOne, valueTwo) => valueOne < valueTwo;
