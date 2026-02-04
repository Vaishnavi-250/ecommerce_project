import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { RootState } from '@store/index';
import Button from '@components/Button';
import QRCodeDisplay from '@components/QRCodeDisplay';
import { Colors, Spacing, Typography } from '@constants/theme';

const TicketsScreen = ({ navigation }: any) => {
  const { tickets, selectedTicket } = useSelector((state: RootState) => state.ticketing);
  const [selectedTab, setSelectedTab] = useState<'upcoming' | 'history'>('upcoming');
  const [expandedTicket, setExpandedTicket] = useState<string | null>(null);

  const upcomingTickets = tickets.filter(t => t.status === 'confirmed');
  const pastTickets = tickets.filter(t => t.status === 'used' || t.status === 'expired');

  const renderTicketCard = (ticket: any) => (
    <TouchableOpacity
      key={ticket.id}
      style={[
        styles.ticketCard,
        expandedTicket === ticket.id && styles.expandedTicket,
      ]}
      onPress={() => setExpandedTicket(expandedTicket === ticket.id ? null : ticket.id)}
    >
      <View style={styles.ticketHeader}>
        <View style={styles.ticketInfo}>
          <Text style={styles.busNumber}>{ticket.busNumber}</Text>
          <Text style={styles.ticketNumber}>Ticket: {ticket.ticketNumber}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(ticket.status) }]}>
          <Text style={styles.statusText}>{ticket.status.toUpperCase()}</Text>
        </View>
      </View>

      <View style={styles.ticketRoute}>
        <View style={styles.location}>
          <Ionicons name="location" size={16} color={Colors.primary} />
          <View style={styles.locationInfo}>
            <Text style={styles.locationLabel}>From</Text>
            <Text style={styles.locationName}>{ticket.pickupPoint}</Text>
          </View>
        </View>

        <View style={styles.routeIndicator}>
          <View style={styles.routeLine} />
          <Ionicons name="arrow-forward" size={16} color={Colors.primary} />
        </View>

        <View style={styles.location}>
          <Ionicons name="location" size={16} color={Colors.primary} />
          <View style={styles.locationInfo}>
            <Text style={styles.locationLabel}>To</Text>
            <Text style={styles.locationName}>{ticket.dropPoint}</Text>
          </View>
        </View>
      </View>

      <View style={styles.ticketDetails}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Date</Text>
          <Text style={styles.detailValue}>{ticket.date}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Time</Text>
          <Text style={styles.detailValue}>{ticket.time}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Seat</Text>
          <Text style={styles.detailValue}>{ticket.seatNumber}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Fare</Text>
          <Text style={styles.detailValue}>₹{ticket.fare}</Text>
        </View>
      </View>

      {expandedTicket === ticket.id && ticket.status === 'confirmed' && (
        <View style={styles.expandedContent}>
          <Button
            title="Show QR Code"
            onPress={() => navigation.navigate('QRCode', { ticket })}
            fullWidth
          />
          <Button
            title="Cancel Ticket"
            variant="outline"
            onPress={() => {}}
            fullWidth
          />
        </View>
      )}
    </TouchableOpacity>
  );

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'confirmed':
        return Colors.success;
      case 'used':
        return Colors.gray;
      case 'expired':
        return Colors.danger;
      default:
        return Colors.gray;
    }
  };

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'upcoming' && styles.activeTab]}
          onPress={() => setSelectedTab('upcoming')}
        >
          <Text style={[styles.tabText, selectedTab === 'upcoming' && styles.activeTabText]}>
            Upcoming ({upcomingTickets.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'history' && styles.activeTab]}
          onPress={() => setSelectedTab('history')}
        >
          <Text style={[styles.tabText, selectedTab === 'history' && styles.activeTabText]}>
            History ({pastTickets.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tickets List */}
      <ScrollView style={styles.ticketsList} showsVerticalScrollIndicator={false}>
        {selectedTab === 'upcoming' ? (
          upcomingTickets.length > 0 ? (
            upcomingTickets.map(ticket => renderTicketCard(ticket))
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="ticket-outline" size={48} color={Colors.gray} />
              <Text style={styles.emptyStateText}>No upcoming tickets</Text>
              <Button
                title="Book a Ticket"
                onPress={() => navigation.navigate('Home')}
              />
            </View>
          )
        ) : pastTickets.length > 0 ? (
          pastTickets.map(ticket => renderTicketCard(ticket))
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="history" size={48} color={Colors.gray} />
            <Text style={styles.emptyStateText}>No past tickets</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: Colors.primary,
  },
  tabText: {
    textAlign: 'center',
    color: Colors.gray,
    fontSize: Typography.medium,
    fontWeight: '500',
  },
  activeTabText: {
    color: Colors.primary,
    fontWeight: '600',
  },
  ticketsList: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
  },
  ticketCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  expandedTicket: {
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  ticketInfo: {
    flex: 1,
  },
  busNumber: {
    fontSize: Typography.large,
    fontWeight: 'bold',
    color: Colors.black,
  },
  ticketNumber: {
    fontSize: Typography.small,
    color: Colors.gray,
    marginTop: 4,
  },
  statusBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 20,
  },
  statusText: {
    color: Colors.white,
    fontSize: Typography.small,
    fontWeight: '600',
  },
  ticketRoute: {
    marginBottom: Spacing.lg,
    paddingBottom: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  locationInfo: {
    marginLeft: Spacing.md,
    flex: 1,
  },
  locationLabel: {
    fontSize: Typography.small,
    color: Colors.gray,
  },
  locationName: {
    fontSize: Typography.medium,
    fontWeight: '600',
    color: Colors.black,
    marginTop: 4,
  },
  routeIndicator: {
    alignItems: 'center',
    marginVertical: Spacing.sm,
  },
  routeLine: {
    width: 2,
    height: 20,
    backgroundColor: Colors.primary,
    marginVertical: Spacing.sm,
  },
  ticketDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  detailItem: {
    width: '48%',
    marginBottom: Spacing.md,
  },
  detailLabel: {
    fontSize: Typography.small,
    color: Colors.gray,
  },
  detailValue: {
    fontSize: Typography.medium,
    fontWeight: '600',
    color: Colors.black,
    marginTop: 4,
  },
  expandedContent: {
    marginTop: Spacing.lg,
    paddingTop: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
    gap: Spacing.md,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: Typography.medium,
    color: Colors.gray,
    marginTop: Spacing.md,
    marginBottom: Spacing.lg,
  },
});

export default TicketsScreen;
