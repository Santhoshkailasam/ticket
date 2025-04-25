import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  StatusBar,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { 
  User, 
  CreditCard, 
  Settings, 
  Bell, 
  HelpCircle, 
  LogOut,
  ChevronRight
} from 'lucide-react-native';
import { useAuthStore } from '@/store/auth-store';
import Colors from '@/constants/colors';
import Dimensions from '@/constants/dimensions';

export default function ProfileScreen() {
  const { user, isAuthenticated, logout, login } = useAuthStore();
  
  const handleLogin = () => {
    // For demo purposes, we'll just log in with mock credentials
    login('demo@example.com', 'password');
  };
  
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: logout,
          style: 'destructive',
        },
      ]
    );
  };
  
  if (!isAuthenticated) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={Colors.dark.background} />
        
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>
        
        <View style={styles.loginContainer}>
          <User size={64} color={Colors.dark.subtext} />
          <Text style={styles.loginTitle}>Not Logged In</Text>
          <Text style={styles.loginSubtitle}>
            Log in to view your profile and manage your bookings
          </Text>
          
          <TouchableOpacity 
            style={styles.loginButton}
            onPress={handleLogin}
          >
            <Text style={styles.loginButtonText}>Log In</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.dark.background} />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profileHeader}>
          {user?.avatar ? (
            <Image
              source={{ uri: user.avatar }}
              style={styles.avatar}
              contentFit="cover"
            />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <User size={40} color={Colors.dark.text} />
            </View>
          )}
          
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user?.name}</Text>
            <Text style={styles.profileEmail}>{user?.email}</Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <User size={20} color={Colors.dark.text} />
            <Text style={styles.menuItemText}>Personal Information</Text>
            <ChevronRight size={20} color={Colors.dark.subtext} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <CreditCard size={20} color={Colors.dark.text} />
            <Text style={styles.menuItemText}>Payment Methods</Text>
            <ChevronRight size={20} color={Colors.dark.subtext} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <Bell size={20} color={Colors.dark.text} />
            <Text style={styles.menuItemText}>Notifications</Text>
            <ChevronRight size={20} color={Colors.dark.subtext} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Settings size={20} color={Colors.dark.text} />
            <Text style={styles.menuItemText}>Settings</Text>
            <ChevronRight size={20} color={Colors.dark.subtext} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <HelpCircle size={20} color={Colors.dark.text} />
            <Text style={styles.menuItemText}>Help & Support</Text>
            <ChevronRight size={20} color={Colors.dark.subtext} />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <LogOut size={20} color={Colors.dark.error} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
        
        <Text style={styles.versionText}>Version 1.0.0</Text>
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
    paddingHorizontal: Dimensions.spacing.lg,
    paddingVertical: Dimensions.spacing.md,
  },
  headerTitle: {
    color: Colors.dark.text,
    fontSize: Dimensions.fontSize.xl,
    fontWeight: '700',
  },
  content: {
    paddingBottom: Dimensions.spacing.xxl,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Dimensions.spacing.lg,
    paddingVertical: Dimensions.spacing.lg,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.dark.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    marginLeft: Dimensions.spacing.lg,
  },
  profileName: {
    color: Colors.dark.text,
    fontSize: Dimensions.fontSize.lg,
    fontWeight: '600',
    marginBottom: 4,
  },
  profileEmail: {
    color: Colors.dark.subtext,
    fontSize: Dimensions.fontSize.md,
  },
  section: {
    marginTop: Dimensions.spacing.lg,
  },
  sectionTitle: {
    color: Colors.dark.subtext,
    fontSize: Dimensions.fontSize.sm,
    fontWeight: '600',
    marginBottom: Dimensions.spacing.sm,
    paddingHorizontal: Dimensions.spacing.lg,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.card,
    paddingVertical: Dimensions.spacing.md,
    paddingHorizontal: Dimensions.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
  },
  menuItemText: {
    flex: 1,
    color: Colors.dark.text,
    fontSize: Dimensions.fontSize.md,
    marginLeft: Dimensions.spacing.md,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Dimensions.spacing.xl,
    paddingVertical: Dimensions.spacing.md,
  },
  logoutText: {
    color: Colors.dark.error,
    fontSize: Dimensions.fontSize.md,
    fontWeight: '600',
    marginLeft: Dimensions.spacing.sm,
  },
  versionText: {
    color: Colors.dark.subtext,
    fontSize: Dimensions.fontSize.sm,
    textAlign: 'center',
    marginTop: Dimensions.spacing.lg,
  },
  loginContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Dimensions.spacing.xl,
  },
  loginTitle: {
    color: Colors.dark.text,
    fontSize: Dimensions.fontSize.xl,
    fontWeight: '600',
    marginTop: Dimensions.spacing.md,
    marginBottom: Dimensions.spacing.sm,
  },
  loginSubtitle: {
    color: Colors.dark.subtext,
    fontSize: Dimensions.fontSize.md,
    textAlign: 'center',
    marginBottom: Dimensions.spacing.xl,
  },
  loginButton: {
    backgroundColor: Colors.dark.primary,
    paddingVertical: Dimensions.spacing.md,
    paddingHorizontal: Dimensions.spacing.xl,
    borderRadius: Dimensions.borderRadius.md,
  },
  loginButtonText: {
    color: Colors.dark.text,
    fontSize: Dimensions.fontSize.md,
    fontWeight: '600',
  },
});