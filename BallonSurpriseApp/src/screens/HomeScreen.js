import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function HomeScreen({ navigation }) {
  const { user, logout } = useAuth();
  const { getItemCount } = useCart();

  const handleCategorySelect = (category) => {
    navigation.navigate('GiftCategory', { category });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header avec profil utilisateur */}
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={24} color="#FF6B6B" />
            </View>
            <View>
              <Text style={styles.greeting}>Bonjour,</Text>
              <Text style={styles.userName}>{user?.name || 'Utilisateur'}</Text>
            </View>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity 
              style={styles.cartButton}
              onPress={() => navigation.navigate('Cart')}
            >
              <Ionicons name="bag-outline" size={24} color="#333" />
              {getItemCount() > 0 && (
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>{getItemCount()}</Text>
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoutButton} onPress={logout}>
              <Ionicons name="log-out-outline" size={24} color="#333" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Section principale */}
        <View style={styles.mainSection}>
          <Text style={styles.mainTitle}>Choisissez votre occasion</Text>
          <Text style={styles.mainSubtitle}>
            Sélectionnez le type de cadeau que vous souhaitez offrir
          </Text>

          {/* Cartes de catégories */}
          <View style={styles.categoriesContainer}>
            {/* Carte Anniversaire */}
            <TouchableOpacity
              style={styles.categoryCard}
              onPress={() => handleCategorySelect('anniversaire')}
            >
              <LinearGradient
                colors={['#FF6B6B', '#FF8E8E']}
                style={styles.categoryGradient}
              >
                <View style={styles.categoryIconContainer}>
                  <Ionicons name="gift" size={40} color="#fff" />
                </View>
                <Text style={styles.categoryTitle}>Anniversaire</Text>
                <Text style={styles.categoryDescription}>
                  Célébrez un anniversaire avec nos box spéciales
                </Text>
                <View style={styles.categoryArrow}>
                  <Ionicons name="arrow-forward" size={20} color="#fff" />
                </View>
              </LinearGradient>
            </TouchableOpacity>

            {/* Carte Naissance */}
            <TouchableOpacity
              style={styles.categoryCard}
              onPress={() => handleCategorySelect('naissance')}
            >
              <LinearGradient
                colors={['#4ECDC4', '#44A08D']}
                style={styles.categoryGradient}
              >
                <View style={styles.categoryIconContainer}>
                  <Ionicons name="heart" size={40} color="#fff" />
                </View>
                <Text style={styles.categoryTitle}>Naissance</Text>
                <Text style={styles.categoryDescription}>
                  Accueillez un nouveau-né avec tendresse
                </Text>
                <View style={styles.categoryArrow}>
                  <Ionicons name="arrow-forward" size={20} color="#fff" />
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {/* Section services */}
        <View style={styles.servicesSection}>
          <Text style={styles.sectionTitle}>Nos Services</Text>
          
          <View style={styles.serviceCard}>
            <View style={styles.serviceIcon}>
              <Ionicons name="sparkles" size={30} color="#FF6B6B" />
            </View>
            <View style={styles.serviceContent}>
              <Text style={styles.serviceTitle}>Surprise Embellies</Text>
              <Text style={styles.serviceDescription}>
                Laissez-nous créer une surprise unique et personnalisée
              </Text>
            </View>
          </View>

          <View style={styles.serviceCard}>
            <View style={styles.serviceIcon}>
              <Ionicons name="balloon" size={30} color="#4ECDC4" />
            </View>
            <View style={styles.serviceContent}>
              <Text style={styles.serviceTitle}>Box Cadeau Premium</Text>
              <Text style={styles.serviceDescription}>
                Des box soigneusement préparées avec amour
              </Text>
            </View>
          </View>
        </View>

        {/* Section à propos */}
        <View style={styles.aboutSection}>
          <Text style={styles.sectionTitle}>À Propos</Text>
          <Text style={styles.aboutText}>
            Ballon Surprise est spécialisée dans la création de moments magiques. 
            Nous concevons des box cadeaux uniques avec des ballons colorés et 
            des surprises personnalisées pour toutes vos occasions spéciales.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  greeting: {
    fontSize: 14,
    color: '#666',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartButton: {
    position: 'relative',
    marginRight: 15,
    padding: 5,
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FF6B6B',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  logoutButton: {
    padding: 5,
  },
  mainSection: {
    padding: 20,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  mainSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  categoriesContainer: {
    gap: 20,
  },
  categoryCard: {
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  categoryGradient: {
    padding: 25,
    minHeight: 160,
    justifyContent: 'space-between',
  },
  categoryIconContainer: {
    alignSelf: 'flex-start',
    marginBottom: 15,
  },
  categoryTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  categoryDescription: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 15,
  },
  categoryArrow: {
    alignSelf: 'flex-end',
  },
  servicesSection: {
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  serviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    marginBottom: 15,
  },
  serviceIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  serviceContent: {
    flex: 1,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  aboutSection: {
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 10,
  },
  aboutText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
});