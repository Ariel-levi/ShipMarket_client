import { useState } from "react";

// Date By Ariel_Levi 🚀
// fullDate == 2022-3-11
// month == 3
// day == 11
// year == 2022
// date == Fri Mar 11 2022 15:25:17 GMT+0200 (שעון ישראל (חורף))

export const useDate = () => {
  const [date, setDate] = useState(new Date());

  const [month, day, year] = [
    date.getMonth() + 1,
    date.getDate(),
    date.getFullYear(),
  ];
  let fullDate = year + "-" + month + "-" + day;

  return [fullDate, month, day, year, date];
};
