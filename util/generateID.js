import dayjs from 'dayjs';

export const generateID = () => {
  // console.log(dayjs.utc().second());
  return (dayjs.utc().second())
}