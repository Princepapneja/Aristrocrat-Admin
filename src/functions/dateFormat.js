export const dateFormat = (isoDateString) => {
  if (!isoDateString) return "";

  const date = new Date(isoDateString);

  if (isNaN(date.getTime())) return "";

  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();

  return `${dd}-${mm}-${yyyy}`;
};
