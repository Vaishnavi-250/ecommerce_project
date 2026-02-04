import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { RootState } from '@store/index';
import { setLanguage } from '@store/slices/localizationSlice';
import Button from '@components/Button';
import { Colors, Spacing, Typography } from '@constants/theme';

const SettingsScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const { currentLanguage } = useSelector((state: RootState) => state.localization);

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
  ];

  const handleLanguageChange = (code: string) => {
    dispatch(setLanguage(code as 'en' | 'hi'));
    setShowLanguageModal(false);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* General Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>General</Text>

        <View style={styles.settingItem}>
          <Ionicons name="language" size={20} color={Colors.primary} />
          <View style={styles.settingContent}>
            <Text style={styles.settingLabel}>Language</Text>
            <Text style={styles.settingDescription}>
              {languages.find(l => l.code === currentLanguage)?.name}
            </Text>
          </View>
          <TouchableOpacity onPress={() => setShowLanguageModal(true)}>
            <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Language Modal */}
      {showLanguageModal && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Language</Text>
          {languages.map(lang => (
            <TouchableOpacity
              key={lang.code}
              style={[
                styles.languageOption,
                currentLanguage === lang.code && styles.activeLanguageOption,
              ]}
              onPress={() => handleLanguageChange(lang.code)}
            >
              <Text style={styles.languageFlag}>{lang.flag}</Text>
              <View style={styles.languageInfo}>
                <Text style={styles.languageName}>{lang.name}</Text>
              </View>
              {currentLanguage === lang.code && (
                <Ionicons name="checkmark-circle" size={24} color={Colors.success} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Notifications */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>

        <View style={styles.settingItem}>
          <Ionicons name="notifications" size={20} color={Colors.primary} />
          <View style={styles.settingContent}>
            <Text style={styles.settingLabel}>Push Notifications</Text>
            <Text style={styles.settingDescription}>Receive travel & booking alerts</Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: Colors.lightGray, true: Colors.primary }}
            thumbColor={Colors.white}
          />
        </View>

        <View style={styles.settingItem}>
          <Ionicons name="location" size={20} color={Colors.primary} />
          <View style={styles.settingContent}>
            <Text style={styles.settingLabel}>Location Sharing</Text>
            <Text style={styles.settingDescription}>Allow real-time bus tracking</Text>
          </View>
          <Switch
            value={locationEnabled}
            onValueChange={setLocationEnabled}
            trackColor={{ false: Colors.lightGray, true: Colors.primary }}
            thumbColor={Colors.white}
          />
        </View>
      </View>

      {/* Account Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>

        <TouchableOpacity style={styles.settingItem}>
          <Ionicons name="key" size={20} color={Colors.primary} />
          <View style={styles.settingContent}>
            <Text style={styles.settingLabel}>Change Password</Text>
            <Text style={styles.settingDescription}>Update your security</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <Ionicons name="card" size={20} color={Colors.primary} />
          <View style={styles.settingContent}>
            <Text style={styles.settingLabel}>Payment Methods</Text>
            <Text style={styles.settingDescription}>Manage your payment options</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
        </TouchableOpacity>
      </View>

      {/* Privacy & Security */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Privacy & Security</Text>

        <TouchableOpacity style={styles.settingItem}>
          <Ionicons name="document-text" size={20} color={Colors.primary} />
          <View style={styles.settingContent}>
            <Text style={styles.settingLabel}>Terms of Service</Text>
            <Text style={styles.settingDescription}>View our terms</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <Ionicons name="shield-checkmark" size={20} color={Colors.primary} />
          <View style={styles.settingContent}>
            <Text style={styles.settingLabel}>Privacy Policy</Text>
            <Text style={styles.settingDescription}>View our privacy policy</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
        </TouchableOpacity>
      </View>

      {/* About */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>

        <View style={styles.aboutCard}>
          <Ionicons name="information-circle" size={32} color={Colors.primary} />
          <Text style={styles.appVersion}>MTC Connect v1.0.0</Text>
          <Text style={styles.appDescription}>Real-time Bus Tracking & Digital Ticketing</Text>
          <Text style={styles.copyright}>© 2024 MTC Connect. All rights reserved.</Text>
        </View>
      </View>

      {/* Danger Zone */}
      <View style={styles.section}>
        <Button
          title="Delete Account"
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
  section: {
    backgroundColor: Colors.white,
    marginHorizontal: Spacing.lg,
    marginVertical: Spacing.md,
    borderRadius: 12,
    padding: Spacing.lg,
  },
  sectionTitle: {
    fontSize: Typography.large,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: Spacing.lg,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  settingContent: {
    marginLeft: Spacing.lg,
    flex: 1,
  },
  settingLabel: {
    fontSize: Typography.medium,
    fontWeight: '600',
    color: Colors.black,
  },
  settingDescription: {
    fontSize: Typography.small,
    color: Colors.gray,
    marginTop: 4,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  activeLanguageOption: {
    backgroundColor: '#F0F8FF',
  },
  languageFlag: {
    fontSize: 24,
    marginRight: Spacing.md,
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    fontSize: Typography.medium,
    fontWeight: '600',
    color: Colors.black,
  },
  aboutCard: {
    alignItems: 'center',
    paddingVertical: Spacing.lg,
  },
  appVersion: {
    marginTop: Spacing.md,
    fontSize: Typography.large,
    fontWeight: 'bold',
    color: Colors.black,
  },
  appDescription: {
    marginTop: Spacing.sm,
    fontSize: Typography.small,
    color: Colors.gray,
    textAlign: 'center',
  },
  copyright: {
    marginTop: Spacing.lg,
    fontSize: Typography.small,
    color: Colors.gray,
    textAlign: 'center',
  },
});

export default SettingsScreen;
