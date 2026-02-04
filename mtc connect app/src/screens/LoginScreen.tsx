import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { loginSuccess } from '@store/slices/authSlice';
import Button from '@components/Button';
import CustomTextInput from '@components/TextInput';
import { Colors, Spacing, Typography } from '@constants/theme';
import apiService from '@services/apiService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      // Mock login
      const userId = 'user_' + Date.now();
      const token = 'token_' + Date.now();

      // Save token
      await AsyncStorage.setItem('authToken', token);

      dispatch(
        loginSuccess({
          userId,
          token,
          email,
        })
      );

      // Navigate to home
      alert('Login successful!');
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword || !fullName || !phone) {
      alert('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      // Mock signup
      const userId = 'user_' + Date.now();
      const token = 'token_' + Date.now();

      // Save token
      await AsyncStorage.setItem('authToken', token);

      dispatch(
        loginSuccess({
          userId,
          token,
          email,
        })
      );

      alert('Signup successful!');
    } catch (error) {
      console.error('Signup error:', error);
      alert('Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Ionicons name="bus" size={64} color={Colors.primary} />
        <Text style={styles.title}>MTC Connect</Text>
        <Text style={styles.subtitle}>Real-time Bus Tracking & Digital Ticketing</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.modeTab, mode === 'login' && styles.activeMode]}
          onPress={() => setMode('login')}
        >
          <Text style={[styles.modeTabText, mode === 'login' && styles.activeModeText]}>
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.modeTab, mode === 'signup' && styles.activeMode]}
          onPress={() => setMode('signup')}
        >
          <Text style={[styles.modeTabText, mode === 'signup' && styles.activeModeText]}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>

      {/* Form */}
      <View style={styles.form}>
        {mode === 'signup' && (
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
          </>
        )}

        <CustomTextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          icon="mail"
        />

        <CustomTextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          icon="lock-closed"
          onIconPress={() => setShowPassword(!showPassword)}
        />

        {mode === 'signup' && (
          <CustomTextInput
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showPassword}
            icon="lock-closed"
          />
        )}

        {mode === 'login' && (
          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
        )}

        <Button
          title={mode === 'login' ? 'Login' : 'Create Account'}
          onPress={mode === 'login' ? handleLogin : handleSignup}
          loading={loading}
          fullWidth
        />

        {mode === 'login' && (
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.dividerLine} />
          </View>
        )}

        {mode === 'login' && (
          <View style={styles.socialButtons}>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-google" size={24} color={Colors.danger} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-apple" size={24} color={Colors.black} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-facebook" size={24} color={Colors.secondary} />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Terms */}
      <View style={styles.termsContainer}>
        <Text style={styles.termsText}>
          By continuing, you agree to our{' '}
          <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
          <Text style={styles.termsLink}>Privacy Policy</Text>
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: Spacing.lg,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.primary,
    marginTop: Spacing.lg,
  },
  subtitle: {
    fontSize: Typography.small,
    color: Colors.gray,
    marginTop: Spacing.md,
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  modeTab: {
    flex: 1,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeMode: {
    borderBottomColor: Colors.primary,
  },
  modeTabText: {
    fontSize: Typography.medium,
    fontWeight: '600',
    color: Colors.gray,
  },
  activeModeText: {
    color: Colors.primary,
  },
  form: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
    gap: Spacing.md,
  },
  forgotPassword: {
    color: Colors.primary,
    fontWeight: '600',
    fontSize: Typography.small,
    textAlign: 'right',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.lightGray,
  },
  dividerText: {
    marginHorizontal: Spacing.md,
    color: Colors.gray,
    fontSize: Typography.small,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.lg,
  },
  socialButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  termsContainer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  termsText: {
    fontSize: Typography.small,
    color: Colors.gray,
    textAlign: 'center',
    lineHeight: 20,
  },
  termsLink: {
    color: Colors.primary,
    fontWeight: '600',
  },
});

export default LoginScreen;
