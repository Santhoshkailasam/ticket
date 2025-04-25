import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Show } from '@/mocks/shows';
import { Showtime } from '@/mocks/showtimes';
import { Seat } from '@/mocks/seats';

export interface Booking {
  id: string;
  userId: string;
  showId: string;
  showtimeId: string;
  theaterId: string;
  screenId: string;
  seats: Seat[];
  totalPrice: number;
  bookingDate: string;
  paymentMethod: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  qrCode?: string;
}

interface BookingState {
  // Current booking in progress
  currentShow: Show | null;
  currentShowtime: Showtime | null;
  selectedSeats: Seat[];
  
  // User's bookings history
  bookings: Booking[];
  
  // Actions
  setCurrentShow: (show: Show | null) => void;
  setCurrentShowtime: (showtime: Showtime | null) => void;
  addSeat: (seat: Seat) => void;
  removeSeat: (seatId: string) => void;
  clearSelectedSeats: () => void;
  resetBooking: () => void;
  confirmBooking: (paymentMethod: string) => Promise<Booking>;
  cancelBooking: (bookingId: string) => void;
}

export const useBookingStore = create<BookingState>()(
  persist(
    (set, get) => ({
      currentShow: null,
      currentShowtime: null,
      selectedSeats: [],
      bookings: [],
      
      setCurrentShow: (show) => {
        set({ currentShow: show });
      },
      
      setCurrentShowtime: (showtime) => {
        set({ currentShowtime: showtime });
      },
      
      addSeat: (seat) => {
        set((state) => {
          // Check if seat is already selected
          if (state.selectedSeats.some(s => s.id === seat.id)) {
            return state;
          }
          
          return {
            selectedSeats: [...state.selectedSeats, seat]
          };
        });
      },
      
      removeSeat: (seatId) => {
        set((state) => ({
          selectedSeats: state.selectedSeats.filter(seat => seat.id !== seatId)
        }));
      },
      
      clearSelectedSeats: () => {
        set({ selectedSeats: [] });
      },
      
      resetBooking: () => {
        set({
          currentShow: null,
          currentShowtime: null,
          selectedSeats: []
        });
      },
      
      confirmBooking: async (paymentMethod) => {
        const { currentShow, currentShowtime, selectedSeats } = get();
        
        if (!currentShow || !currentShowtime || selectedSeats.length === 0) {
          throw new Error('Incomplete booking information');
        }
        
        // Calculate total price
        const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
        
        // Generate a random booking ID
        const bookingId = Math.random().toString(36).substring(2, 15);
        
        // Create a new booking
        const newBooking: Booking = {
          id: bookingId,
          userId: '1', // Assuming the logged-in user
          showId: currentShow.id,
          showtimeId: currentShowtime.id,
          theaterId: currentShowtime.theaterId,
          screenId: currentShowtime.screenId,
          seats: selectedSeats,
          totalPrice,
          bookingDate: new Date().toISOString(),
          paymentMethod,
          status: 'confirmed',
          qrCode: `TICKET-${bookingId}`
        };
        
        // Add the booking to the user's history
        set((state) => ({
          bookings: [newBooking, ...state.bookings]
        }));
        
        // Reset the current booking
        get().resetBooking();
        
        return newBooking;
      },
      
      cancelBooking: (bookingId) => {
        set((state) => ({
          bookings: state.bookings.map(booking => 
            booking.id === bookingId 
              ? { ...booking, status: 'cancelled' } 
              : booking
          )
        }));
      }
    }),
    {
      name: 'booking-storage',
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);