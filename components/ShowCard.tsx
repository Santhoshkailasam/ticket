import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ImageBackground 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import { Star, Clock } from 'lucide-react-native';
import { Show } from '@/mocks/shows';
import Colors from '@/constants/colors';
import Dimensions from '@/constants/dimensions';

interface ShowCardProps {
  show: Show;
  onPress: (show: Show) => void;
  featured?: boolean;
}

export const ShowCard: React.FC<ShowCardProps> = ({ 
  show, 
  onPress,
  featured = false
}) => {
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  if (featured) {
    return (
      <TouchableOpacity 
        style={styles.featuredContainer}
        onPress={() => onPress(show)}
        activeOpacity={0.9}
      >
        <ImageBackground
          source={{ uri: show.backdrop }}
          style={styles.featuredImage}
          imageStyle={{ borderRadius: Dimensions.borderRadius.lg }}
        >
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={styles.featuredGradient}
          >
            <View style={styles.featuredContent}>
              <View style={styles.featuredBadge}>
                <Text style={styles.featuredBadgeText}>{show.type.toUpperCase()}</Text>
              </View>
              <Text style={styles.featuredTitle}>{show.title}</Text>
              <View style={styles.featuredMeta}>
                <View style={styles.ratingContainer}>
                  <Star size={16} color={Colors.dark.accent} fill={Colors.dark.accent} />
                  <Text style={styles.ratingText}>{show.rating}</Text>
                </View>
                <View style={styles.durationContainer}>
                  <Clock size={16} color={Colors.dark.subtext} />
                  <Text style={styles.durationText}>{formatDuration(show.duration)}</Text>
                </View>
              </View>
              <Text style={styles.featuredGenre}>
                {show.genre.slice(0, 3).join(' • ')}
              </Text>
            </View>
          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => onPress(show)}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: show.poster }}
        style={styles.poster}
        contentFit="cover"
        transition={300}
      />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>{show.title}</Text>
        <Text style={styles.genre} numberOfLines={1}>
          {show.genre.slice(0, 2).join(' • ')}
        </Text>
        <View style={styles.metaContainer}>
          <View style={styles.ratingContainer}>
            <Star size={14} color={Colors.dark.accent} fill={Colors.dark.accent} />
            <Text style={styles.ratingText}>{show.rating}</Text>
          </View>
          <View style={styles.durationContainer}>
            <Clock size={14} color={Colors.dark.subtext} />
            <Text style={styles.durationText}>{formatDuration(show.duration)}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 160,
    backgroundColor: Colors.dark.card,
    borderRadius: Dimensions.borderRadius.md,
    overflow: 'hidden',
    marginRight: Dimensions.spacing.md,
  },
  poster: {
    width: '100%',
    height: 220,
    borderTopLeftRadius: Dimensions.borderRadius.md,
    borderTopRightRadius: Dimensions.borderRadius.md,
  },
  content: {
    padding: Dimensions.spacing.sm,
  },
  title: {
    color: Colors.dark.text,
    fontSize: Dimensions.fontSize.md,
    fontWeight: '600',
    marginBottom: 2,
  },
  genre: {
    color: Colors.dark.subtext,
    fontSize: Dimensions.fontSize.xs,
    marginBottom: Dimensions.spacing.xs,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: Colors.dark.accent,
    fontSize: Dimensions.fontSize.xs,
    fontWeight: '600',
    marginLeft: 4,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationText: {
    color: Colors.dark.subtext,
    fontSize: Dimensions.fontSize.xs,
    marginLeft: 4,
  },
  // Featured styles
  featuredContainer: {
    height: 200,
    width: '100%',
    borderRadius: Dimensions.borderRadius.lg,
    marginBottom: Dimensions.spacing.lg,
    overflow: 'hidden',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredGradient: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: Dimensions.spacing.md,
  },
  featuredContent: {
    width: '100%',
  },
  featuredBadge: {
    backgroundColor: Colors.dark.primary,
    paddingHorizontal: Dimensions.spacing.sm,
    paddingVertical: 2,
    borderRadius: Dimensions.borderRadius.pill,
    alignSelf: 'flex-start',
    marginBottom: Dimensions.spacing.xs,
  },
  featuredBadgeText: {
    color: Colors.dark.text,
    fontSize: Dimensions.fontSize.xs,
    fontWeight: '600',
  },
  featuredTitle: {
    color: Colors.dark.text,
    fontSize: Dimensions.fontSize.xl,
    fontWeight: '700',
    marginBottom: 4,
  },
  featuredMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  featuredGenre: {
    color: Colors.dark.subtext,
    fontSize: Dimensions.fontSize.sm,
  },
});