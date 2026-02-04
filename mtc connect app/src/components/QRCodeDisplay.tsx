import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing, Typography } from '@constants/theme';

interface QRCodeDisplayProps {
  qrData: string;
  ticketNumber: string;
  busNumber: string;
  date: string;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({
  qrData,
  ticketNumber,
  busNumber,
  date,
}) => {
  // In a real app, you would use a library like 'react-native-qrcode-svg' to render the actual QR
  // For now, we'll display a placeholder
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Ticket QR Code</Text>

      <View style={styles.qrContainer}>
        <View style={styles.qrPlaceholder}>
          <Text style={styles.placeholderText}>🔲 QR CODE</Text>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Ticket Number:</Text>
          <Text style={styles.value}>{ticketNumber}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Bus Number:</Text>
          <Text style={styles.value}>{busNumber}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Travel Date:</Text>
          <Text style={styles.value}>{date}</Text>
        </View>
      </View>

      <Text style={styles.instructionText}>
        Please show this QR code to the conductor during boarding
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: Spacing.lg,
    alignItems: 'center',
  },
  title: {
    fontSize: Typography.large,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: Spacing.lg,
  },
  qrContainer: {
    marginBottom: Spacing.xl,
  },
  qrPlaceholder: {
    width: 250,
    height: 250,
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  placeholderText: {
    fontSize: 60,
    color: Colors.gray,
  },
  detailsContainer: {
    width: '100%',
    paddingVertical: Spacing.lg,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.lightGray,
    marginBottom: Spacing.lg,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  label: {
    fontSize: Typography.small,
    color: Colors.gray,
  },
  value: {
    fontSize: Typography.small,
    fontWeight: '600',
    color: Colors.black,
  },
  instructionText: {
    fontSize: Typography.small,
    color: Colors.gray,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default QRCodeDisplay;
