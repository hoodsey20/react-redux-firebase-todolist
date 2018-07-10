export const getConvertedDate = (timestamp) => {
  const a = new Date(timestamp);
  const months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
  const year = a.getFullYear();
  const month = months[a.getMonth()];
  const date = a.getDate();
  const hour = a.getHours();
  const min = a.getMinutes();
  const sec = a.getSeconds();
  const time = `${date} ${month} ${year} ${hour}:${min}:${sec}`;
  return time;
};

export const getInputFormatDate = (timestamp) => {
  const a = new Date(timestamp);
  const year = a.getFullYear();
  let month = a.getMonth() + 1;
  if (month.toString().length === 1) {
    month = `0${month}`;
  }
  let date = a.getDate();
  if (date.toString().length === 1) {
    date = `0${date}`;
  }
  const time = `${year}-${month}-${date}`;
  return time;
};
