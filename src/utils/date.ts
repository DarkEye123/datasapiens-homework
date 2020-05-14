const dtf = new Intl.DateTimeFormat('cs', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

function formatDate(d: Date): string {
  console.log(d);
  const [
    { value: day },
    ,
    { value: month },
    ,
    { value: year },
    ,
  ] = dtf.formatToParts(d);
  return `${year}-${month}-${day}`;
}

export { formatDate };
