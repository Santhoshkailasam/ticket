import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  StatusBar,
  ScrollView
} from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { generateSeatMap, Seat } from '@/mocks/seats';
import { SeatMap } from '@/components/SeatMap';
import { Button } from '@/components/Button';
import { shows } from '@/mocks/shows';
import { theaters } from '@/mocks/theaters';
import Colors from '@/constants/colors';
import Dimensions from '@/constants/dimensions';
import { useBookingStore } from '@/store/booking-store';

export default function SeatSelectionScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { 
    currentShow, 
    currentShowtime, 
    selectedSeats, 
    addSeat, 
    removeSeat, 
    clearSelectedSeats 
  } = useBookingStore();
  
  const [seatMap, setSeatMap] = useState<any>(null);
  
  useEffect(() => {
    // Clear selected seats when component mounts
    clearSelectedSeats();
    
    // Generate seat map
    if (currentShowtime) {
      const generatedSeatMap = generateSeatMap(
        currentShowtime.theaterId,
        currentShowtime.screenId,
        currentShowtime.id
      );
      setSeatMap(generatedSeatMap);
    }
  }, [currentShowtime, clearSelectedSeats]);
  
  // Find the show and theater
  const show = currentShow || shows.find(s => s.id === id);
  const theater = currentShowtime ? theaters.find(t => t.id === currentShowtime.theaterId) : null;
  
  if (!show || !currentShowtime || !theater) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Show or showtime not found</Text>
      </SafeAreaView>
    );
  }
  
  const handleSeatPress = (seat: Seat) => {
    // Check if seat is already selected
    const isSelected = selectedSeats.some(s => s.id === seat.id);
    
    if (isSelected) {
      removeSeat(seat.id);
    } else {
      addSeat(seat);
    }
  };
  
  const calculateTotal = () => {
    return selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
  };
  
  const handleContinue = () => {
    router.push('/checkout');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.dark.background} />
      
      <Stack.Screen 
        options={{
          title: 'Select Seats',
          headerStyle: {
            backgroundColor: Colors.dark.background,
          },
          headerTintColor: Colors.dark.text,
        }}
      />
      
      <View style={styles.header}>
        <Text style={styles.showTitle}>{show.title}</Text>
        <Text style={styles.theaterName}>{theater.name}</Text>
      </View>
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {seatMap && (
          <SeatMap
            rows={seatMap.rows}
            selectedSeats={selectedSeats}
            onSeatPress={handleSeatPress}
          />
        )}
      </ScrollView>
      
      <View style={styles.footer}>
        <View style={styles.summaryContainer}>
          <View>
            <Text style={styles.summaryLabel}>Selected</Text>
            <Text style={styles.summaryValue}>
              {selectedSeats.length} {selectedSeats.length === 1 ? 'Seat' : 'Seats'}
            </Text>
          </View>
          
          <View>
            <Text style={styles.summaryLabel}>Total</Text>
            <Text style={styles.summaryValue}>${calculateTotal()}</Text>
          </View>
        </View>
        
        <Button
          title="Continue to Checkout"
          fullWidth
          disabled={selectedSeats.length === 0}
          onPress={handleContinue}
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
  header: {
    paddingHorizontal: Dimensions.spacing.lg,
    paddingVertical: Dimensions.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
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
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: Dimensions.spacing.lg,
  },
  footer: {
    backgroundColor: Colors.dark.card,
    borderTopWidth: 1,
    borderTopColor: Colors.dark.border,
    padding: Dimensions.spacing.lg,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Dimensions.spacing.md,
  },
  summaryLabel: {
    color: Colors.dark.subtext,
    fontSize: Dimensions.fontSize.sm,
    marginBottom: 4,
  },
  summaryValue: {
    color: Colors.dark.text,
    fontSize: Dimensions.fontSize.lg,
    fontWeight: '600',
  },
  errorText: {
    color: Colors.dark.text,
    fontSize: Dimensions.fontSize.lg,
    textAlign: 'center',
    marginTop: Dimensions.spacing.xl,
  },
});