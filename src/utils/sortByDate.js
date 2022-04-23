export const sortByDate = (arr) => {
  return arr.slice().sort((a, b) => {
    let startDate1 = new Date(a.start_date);
    let startDate2 = new Date(b.start_date);
    return startDate2 - startDate1;
  });
};

export const sortByDateCollab = (arr) => {
  return arr.slice().sort((a, b) => {
    let startDate1 = new Date(a.created_at);
    let startDate2 = new Date(b.created_at);
    return startDate2 - startDate1;
  });
};
