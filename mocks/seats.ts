export type SeatType = 'standard' | 'premium' | 'vip' | 'wheelchair' | 'unavailable';

export interface Seat {
  id: string;
  row: string;
  number: number;
  type: SeatType;
  price: number;
  isReserved: boolean;
}

export interface SeatMap {
  theaterId: string;
  screenId: string;
  rows: {
    id: string;
    seats: Seat[];
  }[];
}

export const generateSeatMap = (
  theaterId: string,
  screenId: string,
  showtimeId: string
): SeatMap => {
  // This is a simplified example - in a real app, you'd fetch this from an API
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K'];
  const seatsPerRow = 20;
  
  const seatMap: SeatMap = {
    theaterId,
    screenId,
    rows: []
  };
  
  // Generate rows
  rows.forEach((rowId, rowIndex) => {
    const seats: Seat[] = [];
    
    // Generate seats for this row
    for (let i = 1; i <= seatsPerRow; i++) {
      // Determine seat type based on position
      let type: SeatType = 'standard';
      let price = 75;
      
      // Middle seats are premium
      if (i >= 6 && i <= 15) {
        if (rowId >= 'D' && rowId <= 'G') {
          type = 'premium';
          price = 120;
        }
      }
      
      // Back row center seats are VIP
      if ((rowId === 'J' || rowId === 'K') && i >= 8 && i <= 13) {
        type = 'vip';
        price = 200;
      }
      
      // Add wheelchair accessible seats
      if (rowId === 'A' && (i === 1 || i === 20)) {
        type = 'wheelchair';
        price = 75;
      }
      
      // Randomly mark some seats as reserved (about 20%)
      const isReserved = Math.random() < 0.2;
      
      seats.push({
        id: `${rowId}${i}`,
        row: rowId,
        number: i,
        type,
        price,
        isReserved
      });
    }
    
    seatMap.rows.push({
      id: rowId,
      seats
    });
  });
  
  return seatMap;
};