import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity 
} from 'react-native';
import { Seat, SeatType } from '@/mocks/seats';
import Colors from '@/constants/colors';
import Dimensions from '@/constants/dimensions';

interface SeatMapProps {
  rows: {
    id: string;
    seats: Seat[];
  }[];
  selectedSeats: Seat[];
  onSeatPress: (seat: Seat) => void;
}

export const SeatMap: React.FC<SeatMapProps> = ({ 
  rows, 
  selectedSeats, 
  onSeatPress 
}) => {
  const isSeatSelected = (seatId: string) => {
    return selectedSeats.some(seat => seat.id === seatId);
  };

  const getSeatColor = (seat: Seat) => {
    if (isSeatSelected(seat.id)) {
      return Colors.dark.seatSelected;
    }
    
    if (seat.isReserved) {
      return Colors.dark.seatReserved;
    }
    
    switch (seat.type) {
      case 'premium':
        return Colors.dark.secondary;
      case 'vip':
        return Colors.dark.seatVIP;
      case 'wheelchair':
        return Colors.dark.info;
      default:
        return Colors.dark.seatAvailable;
    }
  };

  const getSeatLabel = (type: SeatType) => {
    switch (type) {
      case 'standard':
        return 'Standard';
      case 'premium':
        return 'Premium';
      case 'vip':
        return 'VIP';
      case 'wheelchair':
        return 'Wheelchair';
      default:
        return '';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.screen}>
        <Text style={styles.screenText}>SCREEN</Text>
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.mapContainer}
      >
        <View>
          {rows.map((row) => (
            <View key={row.id} style={styles.row}>
              <Text style={styles.rowLabel}>{row.id}</Text>
              <View style={styles.seats}>
                {row.seats.map((seat) => (
                  <TouchableOpacity
                    key={seat.id}
                    style={[
                      styles.seat,
                      { backgroundColor: getSeatColor(seat) },
                      seat.isReserved && styles.reservedSeat
                    ]}
                    onPress={() => !seat.isReserved && onSeatPress(seat)}
                    disabled={seat.isReserved}
                    activeOpacity={seat.isReserved ? 1 : 0.7}
                  >
                    <Text 
                      style={[
                        styles.seatNumber,
                        isSeatSelected(seat.id) && styles.selectedSeatNumber
                      ]}
                    >
                      {seat.number}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: Colors.dark.seatAvailable }]} />
          <Text style={styles.legendText}>Available</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: Colors.dark.seatSelected }]} />
          <Text style={styles.legendText}>Selected</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: Colors.dark.seatReserved }]} />
          <Text style={styles.legendText}>Reserved</Text>
        </View>
      </View>
      
      <View style={styles.seatTypes}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: Colors.dark.seatAvailable }]} />
          <Text style={styles.legendText}>Standard</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: Colors.dark.secondary }]} />
          <Text style={styles.legendText}>Premium</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: Colors.dark.seatVIP }]} />
          <Text style={styles.legendText}>VIP</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  screen: {
    width: '80%',
    height: 30,
    backgroundColor: Colors.dark.border,
    borderRadius: Dimensions.borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Dimensions.spacing.xl,
    transform: [{ perspective: 500 }, { rotateX: '-30deg' }],
  },
  screenText: {
    color: Colors.dark.text,
    fontSize: Dimensions.fontSize.xs,
    fontWeight: '500',
  },
  mapContainer: {
    paddingHorizontal: Dimensions.spacing.md,
    paddingBottom: Dimensions.spacing.lg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Dimensions.spacing.sm,
  },
  rowLabel: {
    width: 20,
    color: Colors.dark.subtext,
    fontSize: Dimensions.fontSize.sm,
    fontWeight: '600',
    textAlign: 'center',
  },
  seats: {
    flexDirection: 'row',
  },
  seat: {
    width: 28,
    height: 28,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 3,
  },
  seatNumber: {
    fontSize: Dimensions.fontSize.xs,
    color: Colors.dark.subtext,
    fontWeight: '500',
  },
  selectedSeatNumber: {
    color: Colors.dark.text,
  },
  reservedSeat: {
    opacity: 0.5,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: Dimensions.spacing.lg,
    marginBottom: Dimensions.spacing.md,
  },
  seatTypes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: Dimensions.spacing.lg,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: Dimensions.spacing.xs,
  },
  legendText: {
    color: Colors.dark.subtext,
    fontSize: Dimensions.fontSize.xs,
  },
});