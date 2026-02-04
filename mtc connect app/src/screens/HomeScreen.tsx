import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { RootState } from '@store/index';
import Button from '@components/Button';
import BusCard from '@components/BusCard';
import CustomTextInput from '@components/TextInput';
import { Colors, Spacing, Typography } from '@constants/theme';
import apiService from '@services/apiService';

const HomeScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const { currentLanguage } = useSelector((state: RootState) => state.localization);
  const { isAuthenticated, userEmail } = useSelector((state: RootState) => state.auth);

  const [pickupLocation, setPickupLocation] = useState('');
  const [dropLocation, setDropLocation] = useState('');
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recentRoutes, setRecentRoutes] = useState<any[]>([]);

  useEffect(() => {
    if (isAuthenticated) {
      loadRecentRoutes();
    }
  }, [isAuthenticated]);

  const loadRecentRoutes = async () => {
    try {
      // In production, fetch from API
      setRecentRoutes([
        { id: '1', from: 'Central Bus Station', to: 'Airport', date: 'Today' },
        { id: '2', from: 'City Center', to: 'Railway Station', date: 'Yesterday' },
      ]);
    } catch (error) {
      console.error('Error loading recent routes:', error);
    }
  };

  const handleSearchBuses = async () => {
    if (!pickupLocation || !dropLocation) {
      alert('Please enter both locations');
      return;
    }

    setLoading(true);
    try {
      const response = await apiService.searchBuses(pickupLocation, dropLocation, new Date().toISOString());
      // Mock response
      setBuses([
        {
          id: '1',
          busNumber: 'MTC-401',
          operatorName: 'MTC Express',
          departureTime: '08:00 AM',
          arrivalTime: '10:30 AM',
          duration: '2h 30m',
          fare: 45,
          seatsAvailable: 12,
          rating: 4.5,
        },
        {
          id: '2',
          busNumber: 'MTC-402',
          operatorName: 'MTC City',
          departureTime: '09:15 AM',
          arrivalTime: '11:45 AM',
          duration: '2h 30m',
          fare: 50,
          seatsAvailable: 8,
          rating: 4.2,
        },
      ]);
    } catch (error) {
      console.error('Error searching buses:', error);
      alert('Error searching buses');
    } finally {
      setLoading(false);
    }
  };

  const handleBusSelection = (bus: any) => {
    navigation.navigate('BusDetails', {
      bus,
      pickupLocation,
      dropLocation,
    });
  };

  const handleRecentRoute = (route: any) => {
    setPickupLocation(route.from);
    setDropLocation(route.to);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome</Text>
          <Text style={styles.email}>{userEmail || 'Guest'}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Ionicons name="person-circle" size={40} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Search Section */}
      <View style={styles.searchCard}>
        <Text style={styles.sectionTitle}>Search Buses</Text>

        <CustomTextInput
          placeholder="Pickup Location"
          value={pickupLocation}
          onChangeText={setPickupLocation}
          icon="location"
        />

        <CustomTextInput
          placeholder="Drop Location"
          value={dropLocation}
          onChangeText={setDropLocation}
          icon="location"
          multiline={false}
        />

        <Button
          title="Search Buses"
          onPress={handleSearchBuses}
          loading={loading}
          fullWidth
        />
      </View>

      {/* Recent Routes */}
      {recentRoutes.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Routes</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>

          {recentRoutes.map(route => (
            <TouchableOpacity
              key={route.id}
              style={styles.recentRouteCard}
              onPress={() => handleRecentRoute(route)}
            >
              <View style={styles.routeInfo}>
                <View style={styles.location}>
                  <Ionicons name="location" size={16} color={Colors.primary} />
                  <Text style={styles.locationText}>{route.from}</Text>
                </View>
                <Ionicons name="arrow-down" size={16} color={Colors.gray} style={styles.arrow} />
                <View style={styles.location}>
                  <Ionicons name="location" size={16} color={Colors.primary} />
                  <Text style={styles.locationText}>{route.to}</Text>
                </View>
              </View>
              <Text style={styles.routeDate}>{route.date}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Bus Results */}
      {buses.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Buses</Text>
          {buses.map(bus => (
            <BusCard
              key={bus.id}
              busNumber={bus.busNumber}
              operatorName={bus.operatorName}
              departureTime={bus.departureTime}
              arrivalTime={bus.arrivalTime}
              duration={bus.duration}
              fare={bus.fare}
              seatsAvailable={bus.seatsAvailable}
              rating={bus.rating}
              onPress={() => handleBusSelection(bus)}
            />
          ))}
        </View>
      )}

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionGrid}>
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('Tracking')}
          >
            <Ionicons name="location-sharp" size={32} color={Colors.primary} />
            <Text style={styles.actionTitle}>Track Bus</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('Tickets')}
          >
            <Ionicons name="ticket" size={32} color={Colors.primary} />
            <Text style={styles.actionTitle}>My Tickets</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('Connectivity')}
          >
            <Ionicons name="car" size={32} color={Colors.primary} />
            <Text style={styles.actionTitle}>Auto/Ride</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('Settings')}
          >
            <Ionicons name="settings" size={32} color={Colors.primary} />
            <Text style={styles.actionTitle}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: Typography.extraLarge,
    fontWeight: 'bold',
    color: Colors.black,
  },
  email: {
    fontSize: Typography.small,
    color: Colors.gray,
    marginTop: 4,
  },
  searchCard: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: Spacing.lg,
  },
  sectionTitle: {
    fontSize: Typography.large,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: Spacing.md,
  },
  section: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  seeAll: {
    color: Colors.primary,
    fontWeight: '600',
    fontSize: Typography.small,
  },
  recentRouteCard: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  routeInfo: {
    flex: 1,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  locationText: {
    marginLeft: Spacing.sm,
    color: Colors.black,
    fontSize: Typography.small,
  },
  arrow: {
    marginVertical: Spacing.sm,
  },
  routeDate: {
    color: Colors.gray,
    fontSize: Typography.small,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: Spacing.lg,
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  actionTitle: {
    marginTop: Spacing.md,
    fontSize: Typography.small,
    fontWeight: '600',
    color: Colors.black,
    textAlign: 'center',
  },
});

export default HomeScreen;
