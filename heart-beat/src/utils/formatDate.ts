export const formatDate = (dateStr: string) => {
  const [year, month, day] = dateStr.split('T')[0].split('-');
  return `${month}/${day}/${year}`;
}