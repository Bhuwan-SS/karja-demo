export const dateFormater = (date) => {
  if (date) {
    return Intl.DateTimeFormat("fr-CA", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  }
};

export const getNowTimeStamp = () => {
  return Intl.DateTimeFormat("fr-CA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date());
};
