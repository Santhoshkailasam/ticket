import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Clock } from 'lucide-react-native';
import { Showtime } from '@/mocks/showtimes';
import Colors from '@/constants/colors';
import Dimensions from '@/constants/dimensions';

interface ShowtimeCardProps {
  showtime: Showtime;
  onPress: (showtime: Showtime) => void;
  isSelected?: boolean;
}

export const ShowtimeCard: React.FC<ShowtimeCardProps> = ({ 
  showtime, 
  onPress,
  isSelected = false
}) => {
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

  // Calculate availability percentage
  const availabilityPercentage = (showtime.availableSeats / showtime.totalSeats) * 100;
  
  // Determine availability status
  let availabilityStatus = 'Almost Full';
  let statusColor = Colors.dark.warning;
  
  if (availabilityPercentage > 50) {
    availabilityStatus = 'Available';
    statusColor = Colors.dark.success;
  } else if (availabilityPercentage < 20) {
    availabilityStatus = 'Selling Fast';
    statusColor = Colors.dark.error;
  }

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isSelected && styles.selectedContainer
      ]}
      onPress={() => onPress(showtime)}
      activeOpacity={0.8}
    >
      <View style={styles.timeContainer}>
        <Clock size={16} color={isSelected ? Colors.dark.text : Colors.dark.primary} />
        <Text style={[
          styles.time,
          isSelected && styles.selectedText
        ]}>
          {formatTime(showtime.time)}
        </Text>
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={[
          styles.date,
          isSelected && styles.selectedText
        ]}>
          {formatDate(showtime.date)}
        </Text>
        
        <View style={styles.availabilityContainer}>
          <View 
            style={[
              styles.statusDot,
              { backgroundColor: statusColor }
            ]} 
          />
          <Text style={[
            styles.availabilityText,
            { color: statusColor }
          ]}>
            {availabilityStatus}
          </Text>
        </View>
      </View>
      
      <View style={styles.priceContainer}>
        <Text style={[
          styles.priceLabel,
          isSelected && styles.selectedText
        ]}>
          from
        </Text>
        <Text style={[
          styles.price,
          isSelected && styles.selectedText
        ]}>
          ${showtime.price.standard}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.dark.card,
    borderRadius: Dimensions.borderRadius.md,
    padding: Dimensions.spacing.md,
    marginBottom: Dimensions.spacing.md,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  selectedContainer: {
    backgroundColor: Colors.dark.primary,
    borderColor: Colors.dark.primary,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '30%',
  },
  time: {
    color: Colors.dark.primary,
    fontSize: Dimensions.fontSize.md,
    fontWeight: '600',
    marginLeft: Dimensions.spacing.xs,
  },
  infoContainer: {
    flex: 1,
    paddingHorizontal: Dimensions.spacing.sm,
  },
  date: {
    color: Colors.dark.text,
    fontSize: Dimensions.fontSize.sm,
    marginBottom: 4,
  },
  availabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  availabilityText: {
    fontSize: Dimensions.fontSize.xs,
    fontWeight: '500',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  priceLabel: {
    color: Colors.dark.subtext,
    fontSize: Dimensions.fontSize.xs,
  },
  price: {
    color: Colors.dark.text,
    fontSize: Dimensions.fontSize.md,
    fontWeight: '700',
  },
  selectedText: {
    color: Colors.dark.text,
  },
});