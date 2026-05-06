export const currency = (value = 0, code = 'USD') =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: code,
    maximumFractionDigits: 0
  }).format(value);

export const shortDate = (date) =>
  new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(date));
