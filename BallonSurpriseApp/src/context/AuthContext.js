import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AuthSession from 'expo-auth-session';
import * as Facebook from 'expo-facebook';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStoredUser();
  }, []);

  const loadStoredUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error loading stored user:', error);
    } finally {
      setLoading(false);
    }
  };

  const storeUser = async (userData) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error('Error storing user:', error);
    }
  };

  const loginWithEmail = async (email, password) => {
    try {
      // Simulation d'authentification par email
      // Dans une vraie app, vous feriez un appel API
      const userData = {
        id: Date.now(),
        email: email,
        name: email.split('@')[0],
        loginMethod: 'email'
      };
      await storeUser(userData);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const loginWithGoogle = async () => {
    try {
      // Configuration Google OAuth
      const redirectUri = AuthSession.makeRedirectUri({
        useProxy: true,
      });

      const result = await AuthSession.startAsync({
        authUrl: `https://accounts.google.com/oauth/authorize?client_id=YOUR_GOOGLE_CLIENT_ID&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=openid%20profile%20email`,
      });

      if (result.type === 'success') {
        // Dans une vraie app, vous échangeriez le code contre un token
        const userData = {
          id: Date.now(),
          email: 'user@gmail.com',
          name: 'Google User',
          loginMethod: 'google'
        };
        await storeUser(userData);
        return { success: true };
      }
      return { success: false, error: 'Connexion annulée' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const loginWithFacebook = async () => {
    try {
      await Facebook.initializeAsync({
        appId: 'YOUR_FACEBOOK_APP_ID',
      });

      const result = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      });

      if (result.type === 'success') {
        // Récupérer les infos utilisateur
        const response = await fetch(`https://graph.facebook.com/me?access_token=${result.token}&fields=id,name,email`);
        const userInfo = await response.json();

        const userData = {
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.name,
          loginMethod: 'facebook'
        };
        await storeUser(userData);
        return { success: true };
      }
      return { success: false, error: 'Connexion annulée' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const value = {
    user,
    loading,
    loginWithEmail,
    loginWithGoogle,
    loginWithFacebook,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};