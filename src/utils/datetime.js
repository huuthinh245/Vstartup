export const generateTimeString = date => {
  const month = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth();
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  return `${date.getFullYear()}-${month}-${day}`;
};
export const generateDateString = date => {
  const month = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth();
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  return `${day}/${month}/${date.getFullYear()}`;
};

export const generateFullTimeString = date => {
  const month = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth();
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();

  const hh = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const mm = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  const ss = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();

  return `${date.getFullYear()}-${month}-${day} ${hh}:${mm}:${ss}`;
};
