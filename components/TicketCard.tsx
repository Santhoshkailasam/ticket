import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity 
} from 'react-native';
import { Image } from 'expo-image';
import { Calendar, Clock, MapPin, Ticket } from 'lucide-react-native';
import { Booking } from '@/store/booking-store';
import { shows } from '@/mocks/shows';
import { theaters } from '@/mocks/theaters';
import { showtimes } from '@/mocks/showtimes';
import Colors from '@/constants/colors';
import Dimensions from '@/constants/dimensions';

interface TicketCardProps {
  booking: Booking;
  onPress: (booking: Booking) => void;
}

export const TicketCard: React.FC<TicketCardProps> = ({ booking, onPress }) => {
  // Find related data
  const show = shows.find(s => s.id === booking.showId);
  const theater = theaters.find(t => t.id === booking.theaterId);
  const showtime = showtimes.find(s => s.id === booking.showtimeId);
  
  if (!show || !theater || !showtime) {
    return null;
  }
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Format time
  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => onPress(booking)}
      activeOpacity={0.9}
    >
      <View style={styles.header}>
        <Image
          source={{ uri: show.poster }}
          style={styles.poster}
          contentFit="cover"
        />
        <View style={styles.headerContent}>
          <Text style={styles.title} numberOfLines={1}>{show.title}</Text>
          <Text style={styles.genre}>{show.genre.slice(0, 2).join(' • ')}</Text>
          
          <View style={styles.statusContainer}>
            <View 
              style={[
                styles.statusDot, 
                { backgroundColor: booking.status === 'confirmed' ? Colors.dark.success : Colors.dark.error }
              ]} 
            />
            <Text 
              style={[
                styles.statusText,
                { color: booking.status === 'confirmed' ? Colors.dark.success : Colors.dark.error }
              ]}
            >
              {booking.status === 'confirmed' ? 'Confirmed' : 'Cancelled'}
            </Text>
          </View>
        </View>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.details}>
        <View style={styles.detailRow}>
          <Calendar size={16} color={Colors.dark.subtext} />
          <Text style={styles.detailText}>{formatDate(showtime.date)}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Clock size={16} color={Colors.dark.subtext} />
          <Text style={styles.detailText}>{formatTime(showtime.time)}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <MapPin size={16} color={Colors.dark.subtext} />
          <Text style={styles.detailText} numberOfLines={1}>
            {theater.name}, {theater.location.city}
          </Text>
        </View>
        
        <View style={styles.detailRow}>
          <Ticket size={16} color={Colors.dark.subtext} />
          <Text style={styles.detailText}>
            {booking.seats.length} {booking.seats.length === 1 ? 'Seat' : 'Seats'} • ${booking.totalPrice}
          </Text>
        </View>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.viewText}>View Ticket</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.card,
    borderRadius: Dimensions.borderRadius.lg,
    overflow: 'hidden',
    marginBottom: Dimensions.spacing.lg,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  header: {
    flexDirection: 'row',
    padding: Dimensions.spacing.md,
  },
  poster: {
    width: 60,
    height: 90,
    borderRadius: Dimensions.borderRadius.sm,
  },
  headerContent: {
    flex: 1,
    marginLeft: Dimensions.spacing.md,
    justifyContent: 'center',
  },
  title: {
    color: Colors.dark.text,
    fontSize: Dimensions.fontSize.lg,
    fontWeight: '600',
    marginBottom: 4,
  },
  genre: {
    color: Colors.dark.subtext,
    fontSize: Dimensions.fontSize.sm,
    marginBottom: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: Dimensions.fontSize.sm,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.dark.border,
    marginHorizontal: Dimensions.spacing.md,
  },
  details: {
    padding: Dimensions.spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Dimensions.spacing.sm,
  },
  detailText: {
    color: Colors.dark.text,
    fontSize: Dimensions.fontSize.sm,
    marginLeft: Dimensions.spacing.sm,
  },
  footer: {
    backgroundColor: Colors.dark.primary,
    padding: Dimensions.spacing.sm,
    alignItems: 'center',
  },
  viewText: {
    color: Colors.dark.text,
    fontSize: Dimensions.fontSize.sm,
    fontWeight: '600',
  },
});