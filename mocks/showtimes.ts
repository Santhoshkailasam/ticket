export interface Showtime {
  id: string;
  showId: string;
  theaterId: string;
  screenId: string;
  date: string; // ISO date string
  time: string; // 24-hour format
  price: {
    standard: number;
    premium?: number;
    vip?: number;
  };
  availableSeats: number;
  totalSeats: number;
}

export const showtimes: Showtime[] = [
  // Phantom of the Opera
  {
    id: 'st1',
    showId: '1',
    theaterId: '1',
    screenId: 'screen1',
    date: '2023-12-15',
    time: '19:30',
    price: {
      standard: 75,
      premium: 120,
      vip: 200
    },
    availableSeats: 980,
    totalSeats: 1200
  },
  {
    id: 'st2',
    showId: '1',
    theaterId: '1',
    screenId: 'screen1',
    date: '2023-12-16',
    time: '14:00',
    price: {
      standard: 65,
      premium: 110,
      vip: 180
    },
    availableSeats: 1050,
    totalSeats: 1200
  },
  {
    id: 'st3',
    showId: '1',
    theaterId: '1',
    screenId: 'screen1',
    date: '2023-12-16',
    time: '19:30',
    price: {
      standard: 75,
      premium: 120,
      vip: 200
    },
    availableSeats: 890,
    totalSeats: 1200
  },
  
  // Hamilton
  {
    id: 'st4',
    showId: '2',
    theaterId: '2',
    screenId: 'screen1',
    date: '2023-12-15',
    time: '20:00',
    price: {
      standard: 80,
      premium: 150,
      vip: 250
    },
    availableSeats: 750,
    totalSeats: 900
  },
  {
    id: 'st5',
    showId: '2',
    theaterId: '2',
    screenId: 'screen1',
    date: '2023-12-16',
    time: '14:30',
    price: {
      standard: 70,
      premium: 130,
      vip: 220
    },
    availableSeats: 820,
    totalSeats: 900
  },
  {
    id: 'st6',
    showId: '2',
    theaterId: '2',
    screenId: 'screen1',
    date: '2023-12-16',
    time: '20:00',
    price: {
      standard: 80,
      premium: 150,
      vip: 250
    },
    availableSeats: 680,
    totalSeats: 900
  },
  
  // Swan Lake
  {
    id: 'st7',
    showId: '5',
    theaterId: '3',
    screenId: 'screen1',
    date: '2023-12-15',
    time: '19:00',
    price: {
      standard: 90,
      premium: 140,
      vip: 220
    },
    availableSeats: 1200,
    totalSeats: 1500
  },
  {
    id: 'st8',
    showId: '5',
    theaterId: '3',
    screenId: 'screen1',
    date: '2023-12-16',
    time: '15:00',
    price: {
      standard: 80,
      premium: 130,
      vip: 200
    },
    availableSeats: 1350,
    totalSeats: 1500
  },
  {
    id: 'st9',
    showId: '5',
    theaterId: '3',
    screenId: 'screen1',
    date: '2023-12-17',
    time: '19:00',
    price: {
      standard: 90,
      premium: 140,
      vip: 220
    },
    availableSeats: 1100,
    totalSeats: 1500
  },
  
  // The Lion King
  {
    id: 'st10',
    showId: '3',
    theaterId: '1',
    screenId: 'screen1',
    date: '2023-12-18',
    time: '19:30',
    price: {
      standard: 70,
      premium: 110,
      vip: 180
    },
    availableSeats: 1050,
    totalSeats: 1200
  },
  
  // Wicked
  {
    id: 'st11',
    showId: '4',
    theaterId: '2',
    screenId: 'screen1',
    date: '2023-12-19',
    time: '20:00',
    price: {
      standard: 65,
      premium: 100,
      vip: 170
    },
    availableSeats: 850,
    totalSeats: 900
  },
  
  // Les Misérables
  {
    id: 'st12',
    showId: '6',
    theaterId: '3',
    screenId: 'screen1',
    date: '2023-12-20',
    time: '19:00',
    price: {
      standard: 75,
      premium: 120,
      vip: 190
    },
    availableSeats: 1400,
    totalSeats: 1500
  }
];