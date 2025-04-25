import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  StatusBar
} from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  ArrowLeft, 
  Star, 
  Clock, 
  Calendar, 
  Users, 
  ChevronDown, 
  ChevronUp 
} from 'lucide-react-native';
import { shows } from '@/mocks/shows';
import { showtimes, Showtime } from '@/mocks/showtimes';
import { ShowtimeCard } from '@/components/ShowtimeCard';
import { Button } from '@/components/Button';
import Colors from '@/constants/colors';
import Dimensions from '@/constants/dimensions';
import { useBookingStore } from '@/store/booking-store';

export default function ShowDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { setCurrentShowtime } = useBookingStore();
  
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [selectedShowtime, setSelectedShowtime] = useState<Showtime | null>(null);
  
  // Find the show by ID
  const show = shows.find(s => s.id === id);
  
  if (!show) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Show not found</Text>
      </SafeAreaView>
    );
  }
  
  // Get showtimes for this show
  const showShowtimes = showtimes.filter(s => s.showId === show.id);
  
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };
  
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };
  
  const handleShowtimeSelect = (showtime: Showtime) => {
    setSelectedShowtime(showtime);
  };
  
  const handleContinue = () => {
    if (selectedShowtime) {
      setCurrentShowtime(selectedShowtime);
      router.push(`/seats/${show.id}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      <Stack.Screen 
        options={{
          headerShown: false,
        }}
      />
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: show.backdrop }}
            style={styles.backdropImage}
            contentFit="cover"
          />
          
          <LinearGradient
            colors={['transparent', Colors.dark.background]}
            style={styles.gradient}
          />
          
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color={Colors.dark.text} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.posterContainer}>
              <Image
                source={{ uri: show.poster }}
                style={styles.poster}
                contentFit="cover"
              />
            </View>
            
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{show.title}</Text>
              
              <View style={styles.metaContainer}>
                <View style={styles.ratingContainer}>
                  <Star size={16} color={Colors.dark.accent} fill={Colors.dark.accent} />
                  <Text style={styles.ratingText}>{show.rating}</Text>
                </View>
                
                <View style={styles.durationContainer}>
                  <Clock size={16} color={Colors.dark.subtext} />
                  <Text style={styles.durationText}>{formatDuration(show.duration)}</Text>
                </View>
              </View>
              
              <Text style={styles.genre}>{show.genre.join(' • ')}</Text>
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text 
              style={styles.description}
              numberOfLines={showFullDescription ? undefined : 3}
            >
              {show.description}
            </Text>
            
            <TouchableOpacity 
              style={styles.readMoreButton}
              onPress={toggleDescription}
            >
              <Text style={styles.readMoreText}>
                {showFullDescription ? 'Read Less' : 'Read More'}
              </Text>
              {showFullDescription ? (
                <ChevronUp size={16} color={Colors.dark.primary} />
              ) : (
                <ChevronDown size={16} color={Colors.dark.primary} />
              )}
            </TouchableOpacity>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Cast</Text>
            <Text style={styles.castText}>{show.cast.join(', ')}</Text>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Details</Text>
            
            <View style={styles.detailsContainer}>
              <View style={styles.detailItem}>
                <Calendar size={20} color={Colors.dark.primary} />
                <View style={styles.detailTextContainer}>
                  <Text style={styles.detailLabel}>Release Date</Text>
                  <Text style={styles.detailValue}>{show.releaseDate}</Text>
                </View>
              </View>
              
              <View style={styles.detailItem}>
                <Clock size={20} color={Colors.dark.primary} />
                <View style={styles.detailTextContainer}>
                  <Text style={styles.detailLabel}>Duration</Text>
                  <Text style={styles.detailValue}>{formatDuration(show.duration)}</Text>
                </View>
              </View>
              
              <View style={styles.detailItem}>
                <Users size={20} color={Colors.dark.primary} />
                <View style={styles.detailTextContainer}>
                  <Text style={styles.detailLabel}>Director</Text>
                  <Text style={styles.detailValue}>{show.director || 'N/A'}</Text>
                </View>
              </View>
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select Showtime</Text>
            
            {showShowtimes.length > 0 ? (
              showShowtimes.map(showtime => (
                <ShowtimeCard
                  key={showtime.id}
                  showtime={showtime}
                  onPress={handleShowtimeSelect}
                  isSelected={selectedShowtime?.id === showtime.id}
                />
              ))
            ) : (
              <Text style={styles.noShowtimesText}>No showtimes available</Text>
            )}
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <Button
          title="Continue"
          fullWidth
          disabled={!selectedShowtime}
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
  scrollContent: {
    paddingBottom: 100, // Space for the footer
  },
  imageContainer: {
    height: 250,
    width: '100%',
    position: 'relative',
  },
  backdropImage: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    paddingHorizontal: Dimensions.spacing.lg,
  },
  header: {
    flexDirection: 'row',
    marginTop: -50,
    marginBottom: Dimensions.spacing.lg,
  },
  posterContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: Dimensions.borderRadius.md,
  },
  titleContainer: {
    flex: 1,
    marginLeft: Dimensions.spacing.md,
    justifyContent: 'flex-end',
  },
  title: {
    color: Colors.dark.text,
    fontSize: Dimensions.fontSize.xl,
    fontWeight: '700',
    marginBottom: 8,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Dimensions.spacing.md,
  },
  ratingText: {
    color: Colors.dark.accent,
    fontSize: Dimensions.fontSize.sm,
    fontWeight: '600',
    marginLeft: 4,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationText: {
    color: Colors.dark.subtext,
    fontSize: Dimensions.fontSize.sm,
    marginLeft: 4,
  },
  genre: {
    color: Colors.dark.subtext,
    fontSize: Dimensions.fontSize.sm,
  },
  section: {
    marginBottom: Dimensions.spacing.lg,
  },
  sectionTitle: {
    color: Colors.dark.text,
    fontSize: Dimensions.fontSize.lg,
    fontWeight: '600',
    marginBottom: Dimensions.spacing.sm,
  },
  description: {
    color: Colors.dark.text,
    fontSize: Dimensions.fontSize.md,
    lineHeight: 22,
  },
  readMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  readMoreText: {
    color: Colors.dark.primary,
    fontSize: Dimensions.fontSize.sm,
    fontWeight: '500',
    marginRight: 4,
  },
  castText: {
    color: Colors.dark.text,
    fontSize: Dimensions.fontSize.md,
  },
  detailsContainer: {
    backgroundColor: Colors.dark.card,
    borderRadius: Dimensions.borderRadius.md,
    padding: Dimensions.spacing.md,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Dimensions.spacing.sm,
  },
  detailTextContainer: {
    marginLeft: Dimensions.spacing.md,
  },
  detailLabel: {
    color: Colors.dark.subtext,
    fontSize: Dimensions.fontSize.sm,
  },
  detailValue: {
    color: Colors.dark.text,
    fontSize: Dimensions.fontSize.md,
    fontWeight: '500',
  },
  noShowtimesText: {
    color: Colors.dark.subtext,
    fontSize: Dimensions.fontSize.md,
    textAlign: 'center',
    marginTop: Dimensions.spacing.md,
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