export const getTimeZone = (location: string): string => {
  const locations: { [key: string]: string } = {
    Geneva: 'Europe/Paris',
    'Hong Kong': 'Asia/Hong_Kong',
    London: 'Europe/London',
    'New York': 'America/New_York',
    Paris: 'Europe/Paris',
    Shanghai: 'Europe/London',
    Singapore: 'Asia/Singapore',
    Taipei: 'Europe/London',
  };
  return locations[location] || '';
};
