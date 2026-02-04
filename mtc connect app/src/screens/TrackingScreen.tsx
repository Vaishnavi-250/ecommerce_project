import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { RootState } from '@store/index';
import Button from '@components/Button';
import { Colors, Spacing, Typography } from '@constants/theme';
import realtimeTrackingService from '@services/realtimeTrackingService';
import apiService from '@services/apiService';

const TrackingScreen = ({ route, navigation }: any) => {
  const dispatch = useDispatch();
  const { selectedBusId, currentLocation, nextStop, estimatedArrival, routeCoordinates } = useSelector(
    (state: RootState) => state.busTracking
  );

  const [loading, setLoading] = useState(false);
  const [isTracking, setIsTracking] = useState(false);

  React.useEffect(() => {
    if (selectedBusId) {
      startTracking();
    }
    return () => {
      stopTracking();
    };
  }, [selectedBusId]);

  const startTracking = () => {
    setLoading(true);
    try {
      realtimeTrackingService.connect();

      realtimeTrackingService.subscribe(selectedBusId!, (data) => {
        // Handle real-time location updates
        console.log('Bus location updated:', data);
      });

      setIsTracking(true);
    } catch (error) {
      console.error('Error starting tracking:', error);
    } finally {
      setLoading(false);
    }
  };

  const stopTracking = () => {
    if (selectedBusId) {
      realtimeTrackingService.unsubscribe(selectedBusId);
    }
    setIsTracking(false);
  };

  const centerMapOnBus = () => {
    // Scroll map to center on bus
  };

  if (!currentLocation) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Fetching bus location...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Map */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/* Bus Location */}
        <Marker
          coordinate={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
          }}
          title="Bus Location"
        >
          <Ionicons name="bus" size={32} color={Colors.primary} />
        </Marker>

        {/* Route Line */}
        {routeCoordinates.length > 0 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeColor={Colors.primary}
            strokeWidth={3}
          />
        )}
      </MapView>

      {/* Info Card */}
      <View style={styles.infoCard}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Real-Time Bus Tracking</Text>

          {/* Next Stop */}
          <View style={styles.infoSection}>
            <View style={styles.infoHeader}>
              <Ionicons name="flag" size={20} color={Colors.primary} />
              <Text style={styles.infoLabel}>Next Stop</Text>
            </View>
            <Text style={styles.infoValue}>{nextStop || 'Loading...'}</Text>
          </View>

          {/* Estimated Arrival */}
          <View style={styles.infoSection}>
            <View style={styles.infoHeader}>
              <Ionicons name="time" size={20} color={Colors.primary} />
              <Text style={styles.infoLabel}>Estimated Arrival</Text>
            </View>
            <Text style={styles.infoValue}>
              {estimatedArrival ? `${estimatedArrival} mins` : 'Calculating...'}
            </Text>
          </View>

          {/* Current Location */}
          <View style={styles.infoSection}>
            <View style={styles.infoHeader}>
              <Ionicons name="location" size={20} color={Colors.primary} />
              <Text style={styles.infoLabel}>Current Location</Text>
            </View>
            <Text style={styles.coordinates}>
              {currentLocation.latitude.toFixed(4)}, {currentLocation.longitude.toFixed(4)}
            </Text>
          </View>

          {/* Actions */}
          <View style={styles.actionButtons}>
            <Button
              title="Center on Bus"
              onPress={centerMapOnBus}
              variant="secondary"
              fullWidth
            />
            <Button
              title="Stop Tracking"
              onPress={stopTracking}
              variant="outline"
              fullWidth
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: Spacing.lg,
    color: Colors.gray,
    fontSize: Typography.medium,
  },
  map: {
    flex: 1,
  },
  infoCard: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    maxHeight: '40%',
  },
  title: {
    fontSize: Typography.large,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: Spacing.lg,
  },
  infoSection: {
    marginBottom: Spacing.lg,
    paddingBottom: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  infoLabel: {
    marginLeft: Spacing.md,
    fontSize: Typography.medium,
    color: Colors.gray,
  },
  infoValue: {
    fontSize: Typography.large,
    fontWeight: '600',
    color: Colors.black,
    marginLeft: 28,
  },
  coordinates: {
    fontSize: Typography.small,
    color: Colors.gray,
    fontFamily: 'monospace',
    marginLeft: 28,
  },
  actionButtons: {
    marginTop: Spacing.lg,
    gap: Spacing.md,
  },
});

export default TrackingScreen;
