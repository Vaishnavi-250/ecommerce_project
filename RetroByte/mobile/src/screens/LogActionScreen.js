import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import * as Location from 'expo-location';
import { ecoActions } from '../api';

const LogActionScreen = () => {
  const [actionType, setActionType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGetLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Location permission is required');
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
      Alert.alert('Success', 'Location captured');
    } catch (err) {
      Alert.alert('Error', 'Failed to get location');
    }
  };

  const handleSubmit = async () => {
    if (!actionType || !quantity) {
      Alert.alert('Error', 'Please fill in action type and quantity');
      return;
    }

    setLoading(true);
    try {
      await ecoActions.log({
        actionType,
        quantity: parseFloat(quantity),
        description,
        location: location ? {
          latitude: location.latitude,
          longitude: location.longitude
        } : undefined
      });

      Alert.alert('Success', 'Action logged successfully! +5 coins earned.');
      setActionType('');
      setQuantity('');
      setDescription('');
      setLocation(null);
    } catch (err) {
      Alert.alert('Error', 'Failed to log action');
    } finally {
      setLoading(false);
    }
  };

  const actionTypes = [
    { label: '🌳 Trees Planted', value: 'tree-planted' },
    { label: '♻️ Waste Segregated', value: 'waste-segregated' },
    { label: '⚡ Energy Saved', value: 'energy-saved' },
    { label: '💧 Water Saved', value: 'water-saved' },
    { label: '🌍 Pollution Reduced', value: 'pollution-reduced' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🌱 Log Eco-Action</Text>
      <Text style={styles.subtitle}>
        Document your real-world environmental contributions!
      </Text>

      <View style={styles.section}>
        <Text style={styles.label}>Action Type</Text>
        <View style={styles.buttonGroup}>
          {actionTypes.map(action => (
            <TouchableOpacity
              key={action.value}
              style={[
                styles.actionTypeBtn,
                actionType === action.value && styles.actionTypeBtnActive
              ]}
              onPress={() => setActionType(action.value)}
            >
              <Text style={[
                styles.actionTypeBtnText,
                actionType === action.value && styles.actionTypeBtnTextActive
              ]}>
                {action.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Quantity</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter quantity"
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="decimal-pad"
          editable={!loading}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Describe what you did..."
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
          editable={!loading}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Location</Text>
        <TouchableOpacity
          style={styles.locationBtn}
          onPress={handleGetLocation}
          disabled={loading}
        >
          <Text style={styles.locationBtnText}>
            📍 {location ? 'Location Set' : 'Get Current Location'}
          </Text>
        </TouchableOpacity>
        {location && (
          <Text style={styles.locationInfo}>
            ({location.latitude.toFixed(4)}, {location.longitude.toFixed(4)})
          </Text>
        )}
      </View>

      <TouchableOpacity
        style={[styles.submitBtn, loading && styles.submitBtnDisabled]}
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={styles.submitBtnText}>
          {loading ? 'Logging...' : 'Log Action'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    color: '#666',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonGroup: {
    gap: 8,
  },
  actionTypeBtn: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  actionTypeBtnActive: {
    backgroundColor: '#667eea',
    borderColor: '#667eea',
  },
  actionTypeBtnText: {
    color: '#333',
    fontWeight: '500',
  },
  actionTypeBtnTextActive: {
    color: '#fff',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    textAlignVertical: 'top',
  },
  locationBtn: {
    backgroundColor: '#2196f3',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  locationBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  locationInfo: {
    marginTop: 8,
    color: '#666',
    fontSize: 12,
  },
  submitBtn: {
    backgroundColor: '#667eea',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 30,
  },
  submitBtnDisabled: {
    opacity: 0.7,
  },
  submitBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default LogActionScreen;
