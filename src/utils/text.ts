// this function will return the first 3 letters of the name
export const getInitials = (name: string): string => {
  if (!name || typeof name !== 'string') return '';
  const items = name.split(' ').slice(0, 3);
  return items.map((item) => item[0]).join('');
};
