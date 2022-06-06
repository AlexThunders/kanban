export const setMinDateInCalendar = () => {
  let resultDate = '';
  const today = new Date();
  let dd = today.getDate().toString();
  let mm = (today.getMonth() + 1).toString();
  const yyyy = today.getFullYear().toString();
  if (parseFloat(dd) < 10) {
    dd = `0${dd}`;
  }
  if (parseFloat(mm) < 10) {
    mm = `0${mm}`;
  }

  resultDate = `${yyyy}-${mm}-${dd}`;
  return resultDate;
};

export const trimString = (str: string) => {
  return str.replace(/ +/g, ' ').trim();
};
