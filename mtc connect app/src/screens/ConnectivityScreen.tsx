import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { RootState } from '@store/index';
import Button from '@components/Button';
import CustomTextInput from '@components/TextInput';
import { Colors, Spacing, Typography } from '@constants/theme';
import autorickshawService from '@services/autorickshawService';
import apiService from '@services/apiService';

const ConnectivityScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const { nearbyAutorickshaws, activeRide } = useSelector((state: RootState) => state.autorickshaw);

  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropLocation, setDropLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [tab, setTab] = useState<'auto' | 'firstMile'>('auto');

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } catch (error) {
      console.error('Error requesting location:', error);
    }
  };

  const handleFindAutorickshaws = async () => {
    if (!userLocation) {
      alert('Unable to get your location');
      return;
    }

    setLoading(true);
    try {
      // Mock nearby autorickshaws
      const mockAutorickshaws = [
        {
          id: '1',
          driverName: 'Raj Kumar',
          rating: 4.8,
          vehicleNumber: 'TN-01-AA-1234',
          currentLocation: {
            latitude: userLocation.latitude + 0.01,
            longitude: userLocation.longitude + 0.01,
          },
          estimatedFare: 45,
          distance: 2.5,
        },
        {
          id: '2',
          driverName: 'Priya Singh',
          rating: 4.5,
          vehicleNumber: 'TN-01-BB-5678',
          currentLocation: {
            latitude: userLocation.latitude - 0.01,
            longitude: userLocation.longitude - 0.01,
          },
          estimatedFare: 50,
          distance: 3.2,
        },
      ];

      // Calculate fares
      const fares = mockAutorickshaws.map(auto => ({
        ...auto,
        calculatedFare: autorickshawService.calculateFare(
          userLocation,
          auto.currentLocation,
          15
        ),
      }));

      // dispatch(setNearbyAutorickshaws(fares));
    } catch (error) {
      console.error('Error finding autorickshaws:', error);
      alert('Error finding autorickshaws');
    } finally {
      setLoading(false);
    }
  };

  const renderAutoCard = (auto: any) => (
    <View style={styles.autoCard} key={auto.id}>
      <View style={styles.autoHeader}>
        <View style={styles.driverInfo}>
          <Text style={styles.driverName}>{auto.driverName}</Text>
          <View style={styles.rating}>
            <Ionicons name="star" size={14} color={Colors.warning} />
            <Text style={styles.ratingText}>{auto.rating}</Text>
          </View>
        </View>
        <View style={styles.vehicleInfo}>
          <Text style={styles.vehicleNumber}>{auto.vehicleNumber}</Text>
          <Text style={styles.distance}>{auto.distance.toFixed(1)} km away</Text>
        </View>
      </View>

      <View style={styles.autoDetails}>
        <View style={styles.detailItem}>
          <Ionicons name="cash" size={16} color={Colors.primary} />
          <Text style={styles.detailText}>₹{auto.estimatedFare}</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="time" size={16} color={Colors.primary} />
          <Text style={styles.detailText}>~5 min</Text>
        </View>
      </View>

      <Button
        title="Book This Auto"
        onPress={() => handleBookAuto(auto)}
        fullWidth
      />
    </View>
  );

  const handleBookAuto = (auto: any) => {
    // Handle booking
    alert(`Booking auto with ${auto.driverName}`);
  };

  const renderFirstMileOptions = () => (
    <ScrollView style={styles.optionsContainer} showsVerticalScrollIndicator={false}>
      <Text style={styles.sectionTitle}>Connect to Bus Station</Text>

      <CustomTextInput
        placeholder="Your Location"
        value={pickupLocation}
        onChangeText={setPickupLocation}
        icon="location"
      />

      <CustomTextInput
        placeholder="Bus Station/Hub"
        value={dropLocation}
        onChangeText={setDropLocation}
        icon="location"
      />

      <Button
        title="Find Autorickshaws"
        onPress={handleFindAutorickshaws}
        loading={loading}
        fullWidth
      />

      {nearbyAutorickshaws.length > 0 && (
        <View style={styles.autosContainer}>
          <Text style={styles.sectionTitle}>Available Autorickshaws</Text>
          {nearbyAutorickshaws.map(auto => renderAutoCard(auto))}
        </View>
      )}
    </ScrollView>
  );

  const renderLastMileOptions = () => (
    <ScrollView style={styles.optionsContainer} showsVerticalScrollIndicator={false}>
      <Text style={styles.sectionTitle}>Connect from Bus Station</Text>

      <CustomTextInput
        placeholder="Bus Station/Hub"
        value={pickupLocation}
        onChangeText={setPickupLocation}
        icon="location"
      />

      <CustomTextInput
        placeholder="Your Destination"
        value={dropLocation}
        onChangeText={setDropLocation}
        icon="location"
      />

      <Button
        title="Find Autorickshaws"
        onPress={handleFindAutorickshaws}
        loading={loading}
        fullWidth
      />

      {nearbyAutorickshaws.length > 0 && (
        <View style={styles.autosContainer}>
          <Text style={styles.sectionTitle}>Available Autorickshaws</Text>
          {nearbyAutorickshaws.map(auto => renderAutoCard(auto))}
        </View>
      )}
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      {/* Active Ride Banner */}
      {activeRide && (
        <View style={styles.activeBanner}>
          <Ionicons name="car" size={24} color={Colors.white} />
          <View style={styles.activeBannerContent}>
            <Text style={styles.activeBannerTitle}>Ride in Progress</Text>
            <Text style={styles.activeBannerText}>Driver: {activeRide.driverName}</Text>
          </View>
          <TouchableOpacity>
            <Ionicons name="chevron-forward" size={24} color={Colors.white} />
          </TouchableOpacity>
        </View>
      )}

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, tab === 'firstMile' && styles.activeTab]}
          onPress={() => setTab('firstMile')}
        >
          <Text style={[styles.tabText, tab === 'firstMile' && styles.activeTabText]}>
            First Mile
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, tab === 'auto' && styles.activeTab]}
          onPress={() => setTab('auto')}
        >
          <Text style={[styles.tabText, tab === 'auto' && styles.activeTabText]}>
            Autorickshaw
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {tab === 'firstMile' ? renderFirstMileOptions() : renderLastMileOptions()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  activeBanner: {
    backgroundColor: Colors.success,
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  activeBannerContent: {
    marginLeft: Spacing.lg,
    flex: 1,
  },
  activeBannerTitle: {
    color: Colors.white,
    fontSize: Typography.medium,
    fontWeight: '600',
  },
  activeBannerText: {
    color: Colors.white,
    fontSize: Typography.small,
    marginTop: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.md,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    alignItems: 'center',
  },
  activeTab: {
    borderBottomColor: Colors.primary,
  },
  tabText: {
    color: Colors.gray,
    fontSize: Typography.medium,
    fontWeight: '500',
  },
  activeTabText: {
    color: Colors.primary,
    fontWeight: '600',
  },
  optionsContainer: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
  },
  sectionTitle: {
    fontSize: Typography.large,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: Spacing.lg,
  },
  autosContainer: {
    marginTop: Spacing.xl,
  },
  autoCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  autoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  driverInfo: {
    flex: 1,
  },
  driverName: {
    fontSize: Typography.medium,
    fontWeight: '600',
    color: Colors.black,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: Typography.small,
    color: Colors.warning,
    fontWeight: '600',
  },
  vehicleInfo: {
    alignItems: 'flex-end',
  },
  vehicleNumber: {
    fontSize: Typography.small,
    fontWeight: '600',
    color: Colors.black,
  },
  distance: {
    fontSize: Typography.small,
    color: Colors.gray,
    marginTop: 4,
  },
  autoDetails: {
    flexDirection: 'row',
    marginBottom: Spacing.lg,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Spacing.lg,
  },
  detailText: {
    marginLeft: Spacing.sm,
    fontSize: Typography.small,
    color: Colors.black,
    fontWeight: '600',
  },
});

export default ConnectivityScreen;
