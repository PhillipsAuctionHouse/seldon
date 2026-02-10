import React from 'react';

export const viewingDetailsProps = {
  label: 'Sessions and Viewings',
  sessionTimesLabel: 'Session Times',
  sessionTimes: [
    {
      sessionLabel: 'Session I, lots 1-103',
      sessionTime: 'Saturday, 10 May, 2025, 2pm',
    },
    {
      sessionLabel: 'Session II, lots 104-199',
      sessionTime: 'Saturday, 11 May, 2025, 3pm',
    },
  ],
  viewingTimes: [
    '7-11 May, 2025',
    'Wednesday - Friday, 10:00AM - 7PM',
    'Saturday, 09:00AM - 10:00PM',
    'Sunday, 09:00AM - 1:00PM',
  ],
  viewingTimesLabel: 'Viewing Times',

  location: '30 Berkeley Square, London, United Kingdom, W1J 6EX',
  mapLink: 'https://www.google.com/maps/place/30+Berkeley+Square,+London,+United+Kingdom/@51.509865,-0.14189,17z',
};

export const viewingDetailsWithChildrenProps = {
  id: 'WithChildrenId',
  title: 'Viewing Details with Children',
  label: 'Sessions and Viewings',
  sessionTimesLabel: 'Session Times',
  children: React.createElement('img', { src: '/static/test-image-512x288.jpg', alt: 'viewing-details-img' }),
  sessionTimes: [
    {
      sessionLabel: 'Session I, lots 1-103',
      sessionTime: 'Saturday, 10 May, 2025, 2pm',
    },
    {
      sessionLabel: 'Session II, lots 104-199',
      sessionTime: 'Saturday, 11 May, 2025, 3pm',
    },
  ],
  viewingTimes: [
    '7-11 May, 2025',
    'Wednesday - Friday, 10:00AM - 7PM',
    'Saturday, 09:00AM - 10:00PM',
    'Sunday, 09:00AM - 1:00PM',
  ],
  viewingTimesLabel: 'Viewing Times',
  location: '30 Berkeley Square, London, United Kingdom, W1J 6EX',
  mapLink: 'https://www.google.com/maps/place/30+Berkeley+Square,+London,+United+Kingdom/@51.509865,-0.14189,17z',
};
