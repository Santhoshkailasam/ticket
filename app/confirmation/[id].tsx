import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  StatusBar,
  ScrollView
} from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CheckCircle } from 'lucide-react-native';
import { Button } from '@/components/Button';
import Colors from '@/constants/colors';
import Dimensions from '@/constants/dimensions';
import { useBookingStore } from '@/store/booking-store';

export default function ConfirmationScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { bookings } = useBookingStore();
  
  // Find the booking by ID
  const booking = bookings.find(b => b.id === id);
  
  useEffect(() => {
    // If booking not found, redirect to tickets
    if (!booking) {
      router.replace('/tickets');
    }
  }, [booking, router]);
  
  if (!booking) {
    return null;
  }
  
  const handleViewTicket = () => {
    router.replace(`/ticket/${booking.id}`);
  };
  
  const handleBackToHome = () => {
    router.replace('/');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.dark.background} />
      
      <Stack.Screen 
        options={{
          title: 'Booking Confirmed',
          headerStyle: {
            backgroundColor: Colors.dark.background,
          },
          headerTintColor: Colors.dark.text,
          headerBackVisible: false,
        }}
      />
      
      <ScrollView 
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.successContainer}>
          <View style={styles.iconContainer}>
            <CheckCircle size={64} color={Colors.dark.success} />
          </View>
          
          <Text style={styles.successTitle}>Booking Confirmed!</Text>
          <Text style={styles.successMessage}>
            Your booking has been confirmed. You can view your ticket in the tickets section.
          </Text>
          
          <View style={styles.bookingIdContainer}>
            <Text style={styles.bookingIdLabel}>Booking ID</Text>
            <Text style={styles.bookingId}>{booking.id}</Text>
          </View>
        </View>
        
        <View style={styles.actionsContainer}>
          <Button
            title="View Ticket"
            fullWidth
            onPress={handleViewTicket}
            style={styles.viewTicketButton}
          />
          
          <Button
            title="Back to Home"
            variant="outline"
            fullWidth
            onPress={handleBackToHome}
            style={styles.homeButton}
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
    padding: Dimensions.spacing.lg,
    justifyContent: 'space-between',
  },
  successContainer: {
    alignItems: 'center',
    marginTop: Dimensions.spacing.xxl,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Dimensions.spacing.lg,
  },
  successTitle: {
    color: Colors.dark.text,
    fontSize: Dimensions.fontSize.xxl,
    fontWeight: '700',
    marginBottom: Dimensions.spacing.md,
    textAlign: 'center',
  },
  successMessage: {
    color: Colors.dark.subtext,
    fontSize: Dimensions.fontSize.md,
    textAlign: 'center',
    marginBottom: Dimensions.spacing.xl,
    paddingHorizontal: Dimensions.spacing.md,
  },
  bookingIdContainer: {
    backgroundColor: Colors.dark.card,
    borderRadius: Dimensions.borderRadius.md,
    padding: Dimensions.spacing.md,
    width: '100%',
    alignItems: 'center',
  },
  bookingIdLabel: {
    color: Colors.dark.subtext,
    fontSize: Dimensions.fontSize.sm,
    marginBottom: 4,
  },
  bookingId: {
    color: Colors.dark.text,
    fontSize: Dimensions.fontSize.lg,
    fontWeight: '600',
  },
  actionsContainer: {
    marginTop: Dimensions.spacing.xxl,
  },
  viewTicketButton: {
    marginBottom: Dimensions.spacing.md,
  },
  homeButton: {
    marginBottom: Dimensions.spacing.lg,
  },
});