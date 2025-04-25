import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  StatusBar,
  ScrollView,
  Share,
  TouchableOpacity
} from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Share2 } from 'lucide-react-native';
import { QRTicket } from '@/components/QRTickect';
import { Button } from '@/components/Button';
import Colors from '@/constants/colors';
import Dimensions from '@/constants/dimensions';
import { useBookingStore } from '@/store/booking-store';

export default function TicketScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { bookings } = useBookingStore();
  
  // Find the booking by ID
  const booking = bookings.find(b => b.id === id);
  
  if (!booking) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Ticket not found</Text>
      </SafeAreaView>
    );
  }
  
  const handleShare = async () => {
    try {
      await Share.share({
        message: `I'm going to see a show! My booking ID is ${booking.id}`,
      });
    } catch (error) {
      console.error('Error sharing ticket:', error);
    }
  };
  
  const handleBackToTickets = () => {
    router.replace('/tickets');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.dark.background} />
      
      <Stack.Screen 
        options={{
          title: 'Ticket',
          headerStyle: {
            backgroundColor: Colors.dark.background,
          },
          headerTintColor: Colors.dark.text,
          headerRight: () => (
            <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
              <Share2 size={24} color={Colors.dark.text} />
            </TouchableOpacity>
          ),
        }}
      />
      
      <ScrollView 
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <QRTicket booking={booking} />
        
        <View style={styles.footer}>
          <Button
            title="Back to My Tickets"
            variant="outline"
            fullWidth
            onPress={handleBackToTickets}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  content: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: Dimensions.spacing.lg,
  },
  shareButton: {
    marginRight: Dimensions.spacing.md,
  },
  footer: {
    width: '100%',
    paddingHorizontal: Dimensions.spacing.lg,
    marginTop: Dimensions.spacing.lg,
  },
  errorText: {
    color: Colors.dark.text,
    fontSize: Dimensions.fontSize.lg,
    textAlign: 'center',
    marginTop: Dimensions.spacing.xl,
  },
});