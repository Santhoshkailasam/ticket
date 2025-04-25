import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  StatusBar,
  Alert
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { 
  CreditCard, 
  Wallet, 
  DollarSign, 
  CheckCircle 
} from 'lucide-react-native';
import { Button } from '@/components/Button';
import { shows } from '@/mocks/shows';
import { theaters } from '@/mocks/theaters';
import Colors from '@/constants/colors';
import Dimensions from '@/constants/dimensions';
import { useBookingStore } from '@/store/booking-store';
import { useAuthStore } from '@/store/auth-store';

export default function CheckoutScreen() {
  const router = useRouter();
  const { currentShow, currentShowtime, selectedSeats, confirmBooking } = useBookingStore();
  const { isAuthenticated, user } = useAuthStore();
  
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('card');
  const [isLoading, setIsLoading] = useState(false);
  
  // Find the theater
  const theater = currentShowtime ? theaters.find(t => t.id === currentShowtime.theaterId) : null;
  
  if (!currentShow || !currentShowtime || !theater) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Booking information not found</Text>
      </SafeAreaView>
    );
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
  
  const calculateSubtotal = () => {
    return selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
  };
  
  const calculateFees = () => {
    // Example: 5% service fee
    return Math.round(calculateSubtotal() * 0.05);
  };
  
  const calculateTotal = () => {
    return calculateSubtotal() + calculateFees();
  };
  
  const handlePaymentMethodSelect = (method: string) => {
    setSelectedPaymentMethod(method);
  };
  
  const handleCheckout = async () => {
    if (!isAuthenticated) {
      Alert.alert(
        'Login Required',
        'Please log in to complete your booking',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Log In',
            onPress: () => router.push('/profile'),
          },
        ]
      );
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Process the booking
      const booking = await confirmBooking(selectedPaymentMethod);
      
      // Navigate to the confirmation screen
      router.replace(`/confirmation/${booking.id}`);
    } catch (error) {
      Alert.alert('Error', 'Failed to process your booking. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.dark.background} />
      
      <Stack.Screen 
        options={{
          title: 'Checkout',
          headerStyle: {
            backgroundColor: Colors.dark.background,
          },
          headerTintColor: Colors.dark.text,
        }}
      />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.bookingDetails}>
          <Image
            source={{ uri: currentShow.poster }}
            style={styles.poster}
            contentFit="cover"
          />
          
          <View style={styles.detailsContent}>
            <Text style={styles.showTitle}>{currentShow.title}</Text>
            <Text style={styles.theaterName}>{theater.name}</Text>
            <Text style={styles.datetime}>
              {formatDate(currentShowtime.date)} • {formatTime(currentShowtime.time)}
            </Text>
            <Text style={styles.seats}>
              {selectedSeats.length} {selectedSeats.length === 1 ? 'Seat' : 'Seats'}: {' '}
              {selectedSeats.map(seat => `${seat.row}${seat.number}`).join(', ')}
            </Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          
          <TouchableOpacity 
            style={[
              styles.paymentOption,
              selectedPaymentMethod === 'card' && styles.selectedPaymentOption
            ]}
            onPress={() => handlePaymentMethodSelect('card')}
          >
            <CreditCard 
              size={24} 
              color={selectedPaymentMethod === 'card' ? Colors.dark.primary : Colors.dark.text} 
            />
            <View style={styles.paymentOptionContent}>
              <Text style={[
                styles.paymentOptionTitle,
                selectedPaymentMethod === 'card' && styles.selectedPaymentText
              ]}>
                Credit / Debit Card
              </Text>
              <Text style={styles.paymentOptionSubtitle}>Visa, Mastercard, Amex</Text>
            </View>
            {selectedPaymentMethod === 'card' && (
              <CheckCircle size={20} color={Colors.dark.primary} />
            )}
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.paymentOption,
              selectedPaymentMethod === 'wallet' && styles.selectedPaymentOption
            ]}
            onPress={() => handlePaymentMethodSelect('wallet')}
          >
            <Wallet 
              size={24} 
              color={selectedPaymentMethod === 'wallet' ? Colors.dark.primary : Colors.dark.text} 
            />
            <View style={styles.paymentOptionContent}>
              <Text style={[
                styles.paymentOptionTitle,
                selectedPaymentMethod === 'wallet' && styles.selectedPaymentText
              ]}>
                Digital Wallet
              </Text>
              <Text style={styles.paymentOptionSubtitle}>Apple Pay, Google Pay</Text>
            </View>
            {selectedPaymentMethod === 'wallet' && (
              <CheckCircle size={20} color={Colors.dark.primary} />
            )}
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.paymentOption,
              selectedPaymentMethod === 'cash' && styles.selectedPaymentOption
            ]}
            onPress={() => handlePaymentMethodSelect('cash')}
          >
            <DollarSign 
              size={24} 
              color={selectedPaymentMethod === 'cash' ? Colors.dark.primary : Colors.dark.text} 
            />
            <View style={styles.paymentOptionContent}>
              <Text style={[
                styles.paymentOptionTitle,
                selectedPaymentMethod === 'cash' && styles.selectedPaymentText
              ]}>
                Pay at Venue
              </Text>
              <Text style={styles.paymentOptionSubtitle}>Cash, Card accepted</Text>
            </View>
            {selectedPaymentMethod === 'cash' && (
              <CheckCircle size={20} color={Colors.dark.primary} />
            )}
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Price Details</Text>
          
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Subtotal</Text>
            <Text style={styles.priceValue}>${calculateSubtotal()}</Text>
          </View>
          
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Service Fee</Text>
            <Text style={styles.priceValue}>${calculateFees()}</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.priceRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${calculateTotal()}</Text>
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <Button
          title={`Pay $${calculateTotal()}`}
          fullWidth
          loading={isLoading}
          onPress={handleCheckout}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  scrollContent: {
    paddingBottom: 100, // Space for the footer
  },
  bookingDetails: {
    flexDirection: 'row',
    padding: Dimensions.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
  },
  poster: {
    width: 80,
    height: 120,
    borderRadius: Dimensions.borderRadius.sm,
  },
  detailsContent: {
    flex: 1,
    marginLeft: Dimensions.spacing.md,
  },
  showTitle: {
    color: Colors.dark.text,
    fontSize: Dimensions.fontSize.lg,
    fontWeight: '600',
    marginBottom: 4,
  },
  theaterName: {
    color: Colors.dark.subtext,
    fontSize: Dimensions.fontSize.md,
    marginBottom: 4,
  },
  datetime: {
    color: Colors.dark.text,
    fontSize: Dimensions.fontSize.sm,
    marginBottom: 4,
  },
  seats: {
    color: Colors.dark.text,
    fontSize: Dimensions.fontSize.sm,
  },
  section: {
    padding: Dimensions.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
  },
  sectionTitle: {
    color: Colors.dark.text,
    fontSize: Dimensions.fontSize.lg,
    fontWeight: '600',
    marginBottom: Dimensions.spacing.md,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.card,
    borderRadius: Dimensions.borderRadius.md,
    padding: Dimensions.spacing.md,
    marginBottom: Dimensions.spacing.md,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  selectedPaymentOption: {
    borderColor: Colors.dark.primary,
  },
  paymentOptionContent: {
    flex: 1,
    marginLeft: Dimensions.spacing.md,
  },
  paymentOptionTitle: {
    color: Colors.dark.text,
    fontSize: Dimensions.fontSize.md,
    fontWeight: '500',
    marginBottom: 2,
  },
  selectedPaymentText: {
    color: Colors.dark.primary,
    fontWeight: '600',
  },
  paymentOptionSubtitle: {
    color: Colors.dark.subtext,
    fontSize: Dimensions.fontSize.sm,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Dimensions.spacing.sm,
  },
  priceLabel: {
    color: Colors.dark.text,
    fontSize: Dimensions.fontSize.md,
  },
  priceValue: {
    color: Colors.dark.text,
    fontSize: Dimensions.fontSize.md,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.dark.border,
    marginVertical: Dimensions.spacing.sm,
  },
  totalLabel: {
    color: Colors.dark.text,
    fontSize: Dimensions.fontSize.lg,
    fontWeight: '600',
  },
  totalValue: {
    color: Colors.dark.primary,
    fontSize: Dimensions.fontSize.lg,
    fontWeight: '600',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.dark.background,
    borderTopWidth: 1,
    borderTopColor: Colors.dark.border,
    padding: Dimensions.spacing.lg,
  },
  errorText: {
    color: Colors.dark.text,
    fontSize: Dimensions.fontSize.lg,
    textAlign: 'center',
    marginTop: Dimensions.spacing.xl,
  },
});