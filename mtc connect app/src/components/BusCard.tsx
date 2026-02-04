import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography } from '@constants/theme';

interface BusCardProps {
  busNumber: string;
  operatorName: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  fare: number;
  seatsAvailable: number;
  rating: number;
  onPress: () => void;
}

const BusCard: React.FC<BusCardProps> = ({
  busNumber,
  operatorName,
  departureTime,
  arrivalTime,
  duration,
  fare,
  seatsAvailable,
  rating,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.header}>
        <View>
          <Text style={styles.busNumber}>{busNumber}</Text>
          <Text style={styles.operatorName}>{operatorName}</Text>
        </View>
        <View style={styles.rating}>
          <Ionicons name="star" size={16} color={Colors.warning} />
          <Text style={styles.ratingText}>{rating}</Text>
        </View>
      </View>

      <View style={styles.timeSection}>
        <View style={styles.timeInfo}>
          <Text style={styles.time}>{departureTime}</Text>
          <Text style={styles.label}>Depart</Text>
        </View>
        <View style={styles.durationContainer}>
          <View style={styles.durationLine} />
          <Text style={styles.duration}>{duration}</Text>
          <View style={styles.durationLine} />
        </View>
        <View style={styles.timeInfo}>
          <Text style={styles.time}>{arrivalTime}</Text>
          <Text style={styles.label}>Arrival</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.priceContainer}>
          <Text style={styles.fareLabel}>From</Text>
          <Text style={styles.fare}>₹{fare}</Text>
        </View>
        <View style={styles.seatsContainer}>
          <Ionicons name="seat" size={16} color={Colors.success} />
          <Text style={styles.seatsText}>{seatsAvailable} seats</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  busNumber: {
    fontSize: Typography.large,
    fontWeight: 'bold',
    color: Colors.black,
  },
  operatorName: {
    fontSize: Typography.small,
    color: Colors.gray,
    marginTop: 4,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.lightWarning,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 6,
  },
  ratingText: {
    marginLeft: Spacing.sm,
    fontWeight: '600',
    color: Colors.black,
  },
  timeSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  timeInfo: {
    alignItems: 'center',
  },
  time: {
    fontSize: Typography.medium,
    fontWeight: '600',
    color: Colors.black,
  },
  label: {
    fontSize: Typography.small,
    color: Colors.gray,
    marginTop: 4,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: Spacing.md,
  },
  durationLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.lightGray,
  },
  duration: {
    fontSize: Typography.small,
    color: Colors.gray,
    marginHorizontal: Spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
  },
  priceContainer: {
    alignItems: 'flex-start',
  },
  fareLabel: {
    fontSize: Typography.small,
    color: Colors.gray,
  },
  fare: {
    fontSize: Typography.large,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  seatsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seatsText: {
    marginLeft: Spacing.sm,
    fontSize: Typography.small,
    color: Colors.success,
    fontWeight: '600',
  },
});

export default BusCard;
