import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { RootState } from '@store/index';
import { logout } from '@store/slices/authSlice';
import Button from '@components/Button';
import CustomTextInput from '@components/TextInput';
import { Colors, Spacing, Typography } from '@constants/theme';
import apiService from '@services/apiService';

const ProfileScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const { userEmail, userId } = useSelector((state: RootState) => state.auth);
  const { currentLanguage } = useSelector((state: RootState) => state.localization);

  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState('John Doe');
  const [phone, setPhone] = useState('+91-98765-43210');
  const [savedPlaces, setSavedPlaces] = useState([
    { id: '1', name: 'Home', address: '123 Main Street' },
    { id: '2', name: 'Office', address: '456 Business Park' },
  ]);

  const handleLogout = () => {
    dispatch(logout());
    alert('Logged out successfully');
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    alert('Profile updated successfully');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={60} color={Colors.white} />
        </View>
        <Text style={styles.profileName}>{fullName}</Text>
        <Text style={styles.profileEmail}>{userEmail}</Text>
      </View>

      {/* Edit Profile */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
            <Ionicons name={isEditing ? 'close' : 'pencil'} size={20} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        {isEditing ? (
          <>
            <CustomTextInput
              placeholder="Full Name"
              value={fullName}
              onChangeText={setFullName}
              icon="person"
            />
            <CustomTextInput
              placeholder="Phone Number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              icon="call"
            />
            <Button
              title="Save Changes"
              onPress={handleSaveProfile}
              fullWidth
            />
          </>
        ) : (
          <>
            <View style={styles.infoCard}>
              <Ionicons name="person" size={20} color={Colors.primary} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Full Name</Text>
                <Text style={styles.infoValue}>{fullName}</Text>
              </View>
            </View>
            <View style={styles.infoCard}>
              <Ionicons name="call" size={20} color={Colors.primary} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Phone</Text>
                <Text style={styles.infoValue}>{phone}</Text>
              </View>
            </View>
            <View style={styles.infoCard}>
              <Ionicons name="mail" size={20} color={Colors.primary} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Email</Text>
                <Text style={styles.infoValue}>{userEmail}</Text>
              </View>
            </View>
          </>
        )}
      </View>

      {/* Saved Places */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Saved Places</Text>
          <TouchableOpacity>
            <Ionicons name="add" size={24} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        {savedPlaces.map(place => (
          <View key={place.id} style={styles.placeCard}>
            <Ionicons name="location" size={20} color={Colors.primary} />
            <View style={styles.placeContent}>
              <Text style={styles.placeName}>{place.name}</Text>
              <Text style={styles.placeAddress}>{place.address}</Text>
            </View>
            <TouchableOpacity>
              <Ionicons name="close" size={20} color={Colors.gray} />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Preferences */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>

        <TouchableOpacity
          style={styles.preferenceItem}
          onPress={() => navigation.navigate('Settings')}
        >
          <Ionicons name="language" size={20} color={Colors.primary} />
          <Text style={styles.preferenceText}>Language</Text>
          <Text style={styles.preferenceValue}>{currentLanguage === 'en' ? 'English' : 'हिंदी'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.preferenceItem}
          onPress={() => {}}
        >
          <Ionicons name="notifications" size={20} color={Colors.primary} />
          <Text style={styles.preferenceText}>Notifications</Text>
          <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.preferenceItem}
          onPress={() => {}}
        >
          <Ionicons name="lock-closed" size={20} color={Colors.primary} />
          <Text style={styles.preferenceText}>Privacy & Security</Text>
          <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
        </TouchableOpacity>
      </View>

      {/* Support & About */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.preferenceItem}>
          <Ionicons name="help-circle" size={20} color={Colors.primary} />
          <Text style={styles.preferenceText}>Help & Support</Text>
          <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.preferenceItem}>
          <Ionicons name="information-circle" size={20} color={Colors.primary} />
          <Text style={styles.preferenceText}>About MTC Connect</Text>
          <Text style={styles.preferenceValue}>v1.0.0</Text>
        </TouchableOpacity>
      </View>

      {/* Logout */}
      <View style={styles.section}>
        <Button
          title="Logout"
          onPress={handleLogout}
          variant="outline"
          fullWidth
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileName: {
    marginTop: Spacing.lg,
    fontSize: Typography.extraLarge,
    fontWeight: 'bold',
    color: Colors.black,
  },
  profileEmail: {
    marginTop: Spacing.sm,
    fontSize: Typography.small,
    color: Colors.gray,
  },
  section: {
    backgroundColor: Colors.white,
    marginHorizontal: Spacing.lg,
    marginVertical: Spacing.md,
    borderRadius: 12,
    padding: Spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: Typography.large,
    fontWeight: '600',
    color: Colors.black,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  infoContent: {
    marginLeft: Spacing.lg,
    flex: 1,
  },
  infoLabel: {
    fontSize: Typography.small,
    color: Colors.gray,
  },
  infoValue: {
    fontSize: Typography.medium,
    fontWeight: '600',
    color: Colors.black,
    marginTop: 4,
  },
  placeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  placeContent: {
    marginLeft: Spacing.lg,
    flex: 1,
  },
  placeName: {
    fontSize: Typography.medium,
    fontWeight: '600',
    color: Colors.black,
  },
  placeAddress: {
    fontSize: Typography.small,
    color: Colors.gray,
    marginTop: 4,
  },
  preferenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  preferenceText: {
    marginLeft: Spacing.lg,
    flex: 1,
    fontSize: Typography.medium,
    color: Colors.black,
  },
  preferenceValue: {
    fontSize: Typography.small,
    color: Colors.gray,
    marginLeft: Spacing.md,
  },
});

export default ProfileScreen;
