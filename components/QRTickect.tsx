import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Dimensions as RNDimensions 
} from 'react-native';
import { Image } from 'expo-image';
import { Calendar, Clock, MapPin, Ticket, Users } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Booking } from '@/store/booking-store';
import { shows } from '@/mocks/shows';
import { theaters } from '@/mocks/theaters';
import { showtimes } from '@/mocks/showtimes';
import Colors from '@/constants/colors';
import Dimensions from '@/constants/dimensions';

interface QRTicketProps {
  booking: Booking;
}

export const QRTicket: React.FC<QRTicketProps> = ({ booking }) => {
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
      weekday: 'long', 
      month: 'long', 
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

  // Generate a QR code URL (using a placeholder service)
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(booking.qrCode || 'TICKET-' + booking.id)}`;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.dark.primary, Colors.dark.secondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>{show.title}</Text>
        <Text style={styles.headerSubtitle}>{theater.name}</Text>
      </LinearGradient>
      
      <View style={styles.content}>
        <View style={styles.qrContainer}>
          <Image
            source={{ uri: qrCodeUrl }}
            style={styles.qrCode}
            contentFit="contain"
          />
          <Text style={styles.ticketId}>#{booking.id}</Text>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.details}>
          <View style={styles.detailRow}>
            <Calendar size={18} color={Colors.dark.primary} />
            <View style={styles.detailTextContainer}>
              <Text style={styles.detailLabel}>Date</Text>
              <Text style={styles.detailValue}>{formatDate(showtime.date)}</Text>
            </View>
          </View>
          
          <View style={styles.detailRow}>
            <Clock size={18} color={Colors.dark.primary} />
            <View style={styles.detailTextContainer}>
              <Text style={styles.detailLabel}>Time</Text>
              <Text style={styles.detailValue}>{formatTime(showtime.time)}</Text>
            </View>
          </View>
          
          <View style={styles.detailRow}>
            <MapPin size={18} color={Colors.dark.primary} />
            <View style={styles.detailTextContainer}>
              <Text style={styles.detailLabel}>Venue</Text>
              <Text style={styles.detailValue}>
                {theater.name}, {theater.location.city}
              </Text>
            </View>
          </View>
          
          <View style={styles.detailRow}>
            <Ticket size={18} color={Colors.dark.primary} />
            <View style={styles.detailTextContainer}>
              <Text style={styles.detailLabel}>Seats</Text>
              <Text style={styles.detailValue}>
                {booking.seats.map(seat => `${seat.row}${seat.number}`).join(', ')}
              </Text>
            </View>
          </View>
          
          <View style={styles.detailRow}>
            <Users size={18} color={Colors.dark.primary} />
            <View style={styles.detailTextContainer}>
              <Text style={styles.detailLabel}>Attendees</Text>
              <Text style={styles.detailValue}>
                {booking.seats.length} {booking.seats.length === 1 ? 'Person' : 'People'}
              </Text>
            </View>
          </View>
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Present this QR code at the venue entrance
          </Text>
        </View>
      </View>
    </View>
  );
};

const { width } = RNDimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width - 40,
    backgroundColor: Colors.dark.card,
    borderRadius: Dimensions.borderRadius.lg,
    overflow: 'hidden',
    marginHorizontal: 20,
    marginVertical: Dimensions.spacing.lg,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  header: {
    padding: Dimensions.spacing.lg,
    alignItems: 'center',
  },
  headerTitle: {
    color: Colors.dark.text,
    fontSize: Dimensions.fontSize.xl,
    fontWeight: '700',
    textAlign: 'center',
  },
  headerSubtitle: {
    color: Colors.dark.text,
    fontSize: Dimensions.fontSize.md,
    opacity: 0.8,
    marginTop: 4,
  },
  content: {
    padding: Dimensions.spacing.lg,
  },
  qrContainer: {
    alignItems: 'center',
    marginBottom: Dimensions.spacing.lg,
  },
  qrCode: {
    width: 200,
    height: 200,
    backgroundColor: '#fff',
    padding: Dimensions.spacing.sm,
    borderRadius: Dimensions.borderRadius.sm,
  },
  ticketId: {
    color: Colors.dark.subtext,
    fontSize: Dimensions.fontSize.sm,
    marginTop: Dimensions.spacing.sm,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.dark.border,
    marginVertical: Dimensions.spacing.md,
  },
  details: {
    marginBottom: Dimensions.spacing.lg,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Dimensions.spacing.md,
  },
  detailTextContainer: {
    marginLeft: Dimensions.spacing.md,
    flex: 1,
  },
  detailLabel: {
    color: Colors.dark.subtext,
    fontSize: Dimensions.fontSize.sm,
    marginBottom: 2,
  },
  detailValue: {
    color: Colors.dark.text,
    fontSize: Dimensions.fontSize.md,
    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
    marginTop: Dimensions.spacing.md,
  },
  footerText: {
    color: Colors.dark.subtext,
    fontSize: Dimensions.fontSize.sm,
    textAlign: 'center',
  },
});