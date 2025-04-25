import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList,
  StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { TicketOff } from 'lucide-react-native';
import { TicketCard } from '@/components/TicketCard';
import { useBookingStore, Booking } from '@/store/booking-store';
import Colors from '@/constants/colors';
import Dimensions from '@/constants/dimensions';

export default function TicketsScreen() {
  const router = useRouter();
  const { bookings } = useBookingStore();
  
  const activeBookings = bookings.filter(booking => booking.status === 'confirmed');
  
  const handleTicketPress = (booking: Booking) => {
    router.push(`/ticket/${booking.id}`);
  };
  
  const renderTicketItem = ({ item }: { item: Booking }) => (
    <TicketCard booking={item} onPress={handleTicketPress} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.dark.background} />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Tickets</Text>
      </View>
      
      <FlatList
        data={activeBookings}
        renderItem={renderTicketItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <TicketOff size={64} color={Colors.dark.subtext} />
            <Text style={styles.emptyText}>No tickets yet</Text>
            <Text style={styles.emptySubtext}>
              Your purchased tickets will appear here
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  header: {
    paddingHorizontal: Dimensions.spacing.lg,
    paddingVertical: Dimensions.spacing.md,
  },
  headerTitle: {
    color: Colors.dark.text,
    fontSize: Dimensions.fontSize.xl,
    fontWeight: '700',
  },
  listContent: {
    paddingHorizontal: Dimensions.spacing.lg,
    paddingBottom: Dimensions.spacing.xl,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Dimensions.spacing.xxl,
  },
  emptyText: {
    color: Colors.dark.text,
    fontSize: Dimensions.fontSize.lg,
    fontWeight: '600',
    marginTop: Dimensions.spacing.md,
    marginBottom: 8,
  },
  emptySubtext: {
    color: Colors.dark.subtext,
    fontSize: Dimensions.fontSize.md,
    textAlign: 'center',
  },
});