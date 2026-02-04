import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography } from '@constants/theme';

interface Seat {
  id: string;
  number: string;
  isAvailable: boolean;
  isSelected: boolean;
}

interface SeatSelectionProps {
  totalSeats: number;
  occupiedSeats: string[];
  selectedSeats: string[];
  onSeatsSelect: (seats: string[]) => void;
}

const SeatSelection: React.FC<SeatSelectionProps> = ({
  totalSeats,
  occupiedSeats,
  selectedSeats,
  onSeatsSelect,
}) => {
  const generateSeats = (): Seat[] => {
    const seats: Seat[] = [];
    for (let i = 1; i <= totalSeats; i++) {
      const seatNumber = i.toString();
      seats.push({
        id: `seat_${i}`,
        number: seatNumber,
        isAvailable: !occupiedSeats.includes(seatNumber),
        isSelected: selectedSeats.includes(seatNumber),
      });
    }
    return seats;
  };

  const seats = generateSeats();
  const seatsPerRow = 4;
  const seatRows = Math.ceil(seats.length / seatsPerRow);

  const toggleSeat = (seatNumber: string) => {
    if (selectedSeats.includes(seatNumber)) {
      onSeatsSelect(selectedSeats.filter(s => s !== seatNumber));
    } else {
      onSeatsSelect([...selectedSeats, seatNumber]);
    }
  };

  const renderSeat = (seat: Seat) => {
    let seatStyle = styles.seat;
    let seatContent = seat.number;

    if (!seat.isAvailable) {
      seatStyle = [styles.seat, styles.occupiedSeat];
    } else if (seat.isSelected) {
      seatStyle = [styles.seat, styles.selectedSeat];
    }

    return (
      <TouchableOpacity
        key={seat.id}
        style={seatStyle}
        onPress={() => seat.isAvailable && toggleSeat(seat.number)}
        disabled={!seat.isAvailable}
      >
        <Ionicons
          name="square"
          size={32}
          color={
            !seat.isAvailable
              ? Colors.lightGray
              : seat.isSelected
              ? Colors.primary
              : Colors.gray
          }
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <Ionicons name="square" size={20} color={Colors.gray} />
          <Text style={styles.legendText}>Available</Text>
        </View>
        <View style={styles.legendItem}>
          <Ionicons name="square" size={20} color={Colors.primary} />
          <Text style={styles.legendText}>Selected</Text>
        </View>
        <View style={styles.legendItem}>
          <Ionicons name="square" size={20} color={Colors.lightGray} />
          <Text style={styles.legendText}>Occupied</Text>
        </View>
      </View>

      <View style={styles.seatsGrid}>
        <View style={styles.screenLabel}>
          <Text style={styles.screenText}>SCREEN →</Text>
        </View>

        <View style={styles.seatsContainer}>
          {Array.from({ length: seatRows }).map((_, rowIndex) => (
            <View key={`row_${rowIndex}`} style={styles.seatRow}>
              {seats
                .slice(rowIndex * seatsPerRow, (rowIndex + 1) * seatsPerRow)
                .map(seat => renderSeat(seat))}
            </View>
          ))}
        </View>
      </View>

      <View style={styles.selectedSeatsInfo}>
        <Text style={styles.selectedLabel}>Selected Seats:</Text>
        <Text style={styles.selectedSeats}>
          {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'No seats selected'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: Spacing.lg,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: Spacing.lg,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendText: {
    marginLeft: Spacing.sm,
    fontSize: Typography.small,
    color: Colors.gray,
  },
  seatsGrid: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  screenLabel: {
    marginBottom: Spacing.md,
  },
  screenText: {
    fontSize: Typography.small,
    fontWeight: '600',
    color: Colors.gray,
  },
  seatsContainer: {
    alignItems: 'center',
  },
  seatRow: {
    flexDirection: 'row',
    marginBottom: Spacing.md,
    justifyContent: 'center',
  },
  seat: {
    margin: Spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedSeat: {
    opacity: 1,
  },
  occupiedSeat: {
    opacity: 0.5,
  },
  selectedSeatsInfo: {
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
  },
  selectedLabel: {
    fontSize: Typography.small,
    color: Colors.gray,
    marginBottom: Spacing.sm,
  },
  selectedSeats: {
    fontSize: Typography.medium,
    fontWeight: '600',
    color: Colors.primary,
  },
});

export default SeatSelection;
