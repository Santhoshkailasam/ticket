import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Bell, Search } from 'lucide-react-native';
import { ShowCard } from '@/components/ShowCard';
import { shows, Show } from '@/mocks/shows';
import Colors from '@/constants/colors';
import Dimensions from '@/constants/dimensions';
import { useBookingStore } from '@/store/booking-store';

export default function HomeScreen() {
  const router = useRouter();
  const { setCurrentShow } = useBookingStore();
  
  // Filter shows by type
  const featuredShows = shows.filter(show => show.featured);
  const plays = shows.filter(show => show.type === 'play');
  const operas = shows.filter(show => show.type === 'opera');
  
  const handleShowPress = (show: Show) => {
    setCurrentShow(show);
    router.push(`/show/${show.id}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.dark.background} />
      
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, Theater Fan!</Text>
          <Text style={styles.subtitle}>Find your perfect show</Text>
        </View>
        
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton}>
            <Bell size={24} color={Colors.dark.text} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => router.push('/search')}
          >
            <Search size={24} color={Colors.dark.text} />
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Featured Shows */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Shows</Text>
          
          {featuredShows.map(show => (
            <ShowCard 
              key={show.id} 
              show={show} 
              onPress={handleShowPress}
              featured
            />
          ))}
        </View>
        
        {/* Plays */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Plays</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          >
            {plays.map(show => (
              <ShowCard 
                key={show.id} 
                show={show} 
                onPress={handleShowPress}
              />
            ))}
          </ScrollView>
        </View>
        
        {/* Operas & Ballets */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Operas & Ballets</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          >
            {operas.map(show => (
              <ShowCard 
                key={show.id} 
                show={show} 
                onPress={handleShowPress}
              />
            ))}
          </ScrollView>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Dimensions.spacing.lg,
    paddingVertical: Dimensions.spacing.md,
  },
  greeting: {
    color: Colors.dark.text,
    fontSize: Dimensions.fontSize.xl,
    fontWeight: '700',
  },
  subtitle: {
    color: Colors.dark.subtext,
    fontSize: Dimensions.fontSize.md,
    marginTop: 4,
  },
  headerActions: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.dark.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: Dimensions.spacing.sm,
  },
  content: {
    paddingBottom: Dimensions.spacing.xl,
  },
  section: {
    marginBottom: Dimensions.spacing.xl,
    paddingHorizontal: Dimensions.spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Dimensions.spacing.md,
  },
  sectionTitle: {
    color: Colors.dark.text,
    fontSize: Dimensions.fontSize.lg,
    fontWeight: '600',
  },
  seeAllText: {
    color: Colors.dark.primary,
    fontSize: Dimensions.fontSize.sm,
  },
  horizontalList: {
    paddingRight: Dimensions.spacing.lg,
  },
});