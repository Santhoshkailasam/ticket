import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  FlatList, 
  TouchableOpacity,
  StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Search as SearchIcon, X, Filter } from 'lucide-react-native';
import { shows, Show } from '@/mocks/shows';
import { Image } from 'expo-image';
import Colors from '@/constants/colors';
import Dimensions from '@/constants/dimensions';
import { useBookingStore } from '@/store/booking-store';

export default function SearchScreen() {
  const router = useRouter();
  const { setCurrentShow } = useBookingStore();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  // Filter shows based on search query and active filter
  const filteredShows = shows.filter(show => {
    const matchesSearch = show.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         show.genre.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter = !activeFilter || 
                         (activeFilter === 'movie' && show.type === 'movie') ||
                         (activeFilter === 'play' && show.type === 'play') ||
                         (activeFilter === 'concert' && show.type === 'concert') ||
                         (activeFilter === 'opera' && show.type === 'opera');
    
    return matchesSearch && matchesFilter;
  });
  
  const handleShowPress = (show: Show) => {
    setCurrentShow(show);
    router.push(`/show/${show.id}`);
  };
  
  const clearSearch = () => {
    setSearchQuery('');
  };
  
  const toggleFilter = (filter: string) => {
    if (activeFilter === filter) {
      setActiveFilter(null);
    } else {
      setActiveFilter(filter);
    }
  };
  
  const renderShowItem = ({ item }: { item: Show }) => (
    <TouchableOpacity 
      style={styles.showItem}
      onPress={() => handleShowPress(item)}
    >
      <Image
        source={{ uri: item.poster }}
        style={styles.poster}
        contentFit="cover"
      />
      
      <View style={styles.showInfo}>
        <Text style={styles.showTitle}>{item.title}</Text>
        <Text style={styles.showGenre}>{item.genre.join(', ')}</Text>
        <Text style={styles.showType}>{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.dark.background} />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore Shows</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <SearchIcon size={20} color={Colors.dark.subtext} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search shows, genres..."
            placeholderTextColor={Colors.dark.subtext}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={clearSearch}>
              <X size={20} color={Colors.dark.subtext} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      
      <View style={styles.filtersContainer}>
        <TouchableOpacity 
          style={[
            styles.filterChip,
            activeFilter === 'play' && styles.activeFilterChip
          ]}
          onPress={() => toggleFilter('play')}
        >
          <Text 
            style={[
              styles.filterText,
              activeFilter === 'play' && styles.activeFilterText
            ]}
          >
            Plays
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.filterChip,
            activeFilter === 'opera' && styles.activeFilterChip
          ]}
          onPress={() => toggleFilter('opera')}
        >
          <Text 
            style={[
              styles.filterText,
              activeFilter === 'opera' && styles.activeFilterText
            ]}
          >
            Opera & Ballet
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.filterChip,
            activeFilter === 'concert' && styles.activeFilterChip
          ]}
          onPress={() => toggleFilter('concert')}
        >
          <Text 
            style={[
              styles.filterText,
              activeFilter === 'concert' && styles.activeFilterText
            ]}
          >
            Concerts
          </Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={filteredShows}
        renderItem={renderShowItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No shows found</Text>
            <Text style={styles.emptySubtext}>Try a different search term or filter</Text>
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
  searchContainer: {
    paddingHorizontal: Dimensions.spacing.lg,
    marginBottom: Dimensions.spacing.md,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.card,
    borderRadius: Dimensions.borderRadius.md,
    paddingHorizontal: Dimensions.spacing.md,
    paddingVertical: Dimensions.spacing.sm,
  },
  searchInput: {
    flex: 1,
    color: Colors.dark.text,
    fontSize: Dimensions.fontSize.md,
    marginLeft: Dimensions.spacing.sm,
  },
  filtersContainer: {
    flexDirection: 'row',
    paddingHorizontal: Dimensions.spacing.lg,
    marginBottom: Dimensions.spacing.lg,
  },
  filterChip: {
    backgroundColor: Colors.dark.card,
    borderRadius: Dimensions.borderRadius.pill,
    paddingHorizontal: Dimensions.spacing.md,
    paddingVertical: Dimensions.spacing.xs,
    marginRight: Dimensions.spacing.sm,
  },
  activeFilterChip: {
    backgroundColor: Colors.dark.primary,
  },
  filterText: {
    color: Colors.dark.text,
    fontSize: Dimensions.fontSize.sm,
  },
  activeFilterText: {
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: Dimensions.spacing.lg,
    paddingBottom: Dimensions.spacing.xl,
  },
  showItem: {
    flexDirection: 'row',
    backgroundColor: Colors.dark.card,
    borderRadius: Dimensions.borderRadius.md,
    marginBottom: Dimensions.spacing.md,
    overflow: 'hidden',
  },
  poster: {
    width: 80,
    height: 120,
  },
  showInfo: {
    flex: 1,
    padding: Dimensions.spacing.md,
    justifyContent: 'center',
  },
  showTitle: {
    color: Colors.dark.text,
    fontSize: Dimensions.fontSize.lg,
    fontWeight: '600',
    marginBottom: 4,
  },
  showGenre: {
    color: Colors.dark.subtext,
    fontSize: Dimensions.fontSize.sm,
    marginBottom: 8,
  },
  showType: {
    color: Colors.dark.primary,
    fontSize: Dimensions.fontSize.sm,
    fontWeight: '500',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Dimensions.spacing.xxl,
  },
  emptyText: {
    color: Colors.dark.text,
    fontSize: Dimensions.fontSize.lg,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptySubtext: {
    color: Colors.dark.subtext,
    fontSize: Dimensions.fontSize.md,
    textAlign: 'center',
  },
});