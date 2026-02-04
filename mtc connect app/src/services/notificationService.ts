import * as Notifications from 'expo-notifications';

export async function setupNotifications() {
  // Request permissions
  const { status } = await Notifications.requestPermissionsAsync();

  if (status !== 'granted') {
    console.log('Notification permissions not granted');
    return;
  }

  // Set notification handler
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });
}

export async function sendBusArrivalNotification(busNumber: string, timeInMinutes: number) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Bus Arriving Soon',
      body: `Bus ${busNumber} will arrive in ${timeInMinutes} minutes`,
      badge: 1,
      sound: true,
    },
    trigger: { seconds: 1 },
  });
}

export async function sendTicketConfirmationNotification(ticketNumber: string) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Ticket Booked',
      body: `Your ticket ${ticketNumber} has been confirmed`,
      badge: 1,
      sound: true,
    },
    trigger: { seconds: 1 },
  });
}

export async function sendAutorickshawNotification(driverName: string, rating: number) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Autorickshaw Booked',
      body: `${driverName} (Rating: ${rating}⭐) is on the way`,
      badge: 1,
      sound: true,
    },
    trigger: { seconds: 1 },
  });
}

export async function sendPaymentFailureNotification(error: string) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Payment Failed',
      body: error,
      badge: 1,
      sound: true,
    },
    trigger: { seconds: 1 },
  });
}
