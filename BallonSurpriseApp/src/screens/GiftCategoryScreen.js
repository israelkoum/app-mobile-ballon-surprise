import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function GiftCategoryScreen({ route, navigation }) {
  const { category } = route.params;
  const [selectedModel, setSelectedModel] = useState(null);

  // Modèles de cadeaux prédéfinis
  const giftModels = {
    anniversaire: [
      {
        id: 1,
        name: 'Box Anniversaire Classique',
        description: 'Ballons colorés, chocolats Ferrero et rose rouge',
        price: 25000,
        image: '🎈',
        items: ['Ballons multicolores', 'Chocolats Ferrero', 'Rose rouge', 'Carte personnalisée']
      },
      {
        id: 2,
        name: 'Box Anniversaire Premium',
        description: 'Collection complète avec nounours et chocolats Patchi',
        price: 45000,
        image: '🎁',
        items: ['Ballons premium', 'Chocolats Patchi', 'Rose blanche', 'Nounours', 'Biscuits Nutella']
      },
      {
        id: 3,
        name: 'Box Anniversaire Deluxe',
        description: 'La box ultime pour un anniversaire inoubliable',
        price: 65000,
        image: '🌟',
        items: ['Ballons métalliques', 'Chocolats Patchi & Ferrero', 'Bouquet de roses', 'Grand nounours', 'Assortiment biscuits']
      }
    ],
    naissance: [
      {
        id: 4,
        name: 'Box Naissance Tendre',
        description: 'Douceur et tendresse pour accueillir bébé',
        price: 30000,
        image: '👶',
        items: ['Ballons pastel', 'Chocolats Raphael', 'Rose blanche', 'Petit nounours']
      },
      {
        id: 5,
        name: 'Box Naissance Complète',
        description: 'Tout pour célébrer l\'arrivée du nouveau-né',
        price: 50000,
        image: '🍼',
        items: ['Ballons bébé', 'Chocolats Patchi', 'Roses blanches', 'Nounours premium', 'Biscuits Oreo']
      },
      {
        id: 6,
        name: 'Box Naissance Royale',
        description: 'Une célébration royale pour le petit prince/princesse',
        price: 70000,
        image: '👑',
        items: ['Ballons dorés', 'Collection chocolats', 'Bouquet roses blanches', 'Nounours géant', 'Coffret biscuits']
      }
    ]
  };

  const currentModels = giftModels[category] || [];

  const handleModelSelect = (model) => {
    setSelectedModel(model);
  };

  const handleAddToCart = (model) => {
    // Navigation vers le panier avec le modèle sélectionné
    navigation.navigate('Cart', { 
      newItem: {
        type: 'predefined',
        category: category,
        model: model,
        totalPrice: model.price
      }
    });
  };

  const handleCustomGift = () => {
    navigation.navigate('CustomGift', { category });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header de catégorie */}
        <View style={styles.categoryHeader}>
          <LinearGradient
            colors={category === 'anniversaire' ? ['#FF6B6B', '#FF8E8E'] : ['#4ECDC4', '#44A08D']}
            style={styles.categoryHeaderGradient}
          >
            <Text style={styles.categoryTitle}>
              {category === 'anniversaire' ? '🎉 Anniversaire' : '👶 Naissance'}
            </Text>
            <Text style={styles.categorySubtitle}>
              Découvrez nos modèles spécialement conçus pour cette occasion
            </Text>
          </LinearGradient>
        </View>

        {/* Bouton composer son cadeau */}
        <View style={styles.customSection}>
          <TouchableOpacity style={styles.customButton} onPress={handleCustomGift}>
            <LinearGradient
              colors={['#9B59B6', '#8E44AD']}
              style={styles.customButtonGradient}
            >
              <Ionicons name="create" size={24} color="#fff" />
              <Text style={styles.customButtonText}>Composer mon propre cadeau</Text>
              <Ionicons name="arrow-forward" size={20} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Modèles prédéfinis */}
        <View style={styles.modelsSection}>
          <Text style={styles.sectionTitle}>Nos modèles prêts à offrir</Text>
          
          {currentModels.map((model) => (
            <View key={model.id} style={styles.modelCard}>
              <View style={styles.modelHeader}>
                <View style={styles.modelImageContainer}>
                  <Text style={styles.modelEmoji}>{model.image}</Text>
                </View>
                <View style={styles.modelInfo}>
                  <Text style={styles.modelName}>{model.name}</Text>
                  <Text style={styles.modelDescription}>{model.description}</Text>
                  <Text style={styles.modelPrice}>{model.price.toLocaleString()} FCFA</Text>
                </View>
              </View>

              {/* Liste des items inclus */}
              <View style={styles.modelItems}>
                <Text style={styles.itemsTitle}>Inclus dans cette box :</Text>
                {model.items.map((item, index) => (
                  <View key={index} style={styles.itemRow}>
                    <Ionicons name="checkmark-circle" size={16} color="#4ECDC4" />
                    <Text style={styles.itemText}>{item}</Text>
                  </View>
                ))}
              </View>

              {/* Boutons d'action */}
              <View style={styles.modelActions}>
                <TouchableOpacity
                  style={[styles.actionButton, styles.detailsButton]}
                  onPress={() => handleModelSelect(model)}
                >
                  <Text style={styles.detailsButtonText}>Voir détails</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, styles.addButton]}
                  onPress={() => handleAddToCart(model)}
                >
                  <Ionicons name="bag-add" size={18} color="#fff" />
                  <Text style={styles.addButtonText}>Ajouter</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Section informative */}
        <View style={styles.infoSection}>
          <View style={styles.infoCard}>
            <Ionicons name="time" size={24} color="#FF6B6B" />
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Livraison rapide</Text>
              <Text style={styles.infoText}>Commandez avant 16h, livré le jour même</Text>
            </View>
          </View>
          
          <View style={styles.infoCard}>
            <Ionicons name="shield-checkmark" size={24} color="#4ECDC4" />
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Qualité garantie</Text>
              <Text style={styles.infoText}>Produits frais et ballons de qualité premium</Text>
            </View>
          </View>
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
  categoryHeader: {
    marginBottom: 20,
  },
  categoryHeaderGradient: {
    padding: 30,
    alignItems: 'center',
  },
  categoryTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  categorySubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  customSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  customButton: {
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  customButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  customButtonText: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 15,
  },
  modelsSection: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  modelCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  modelHeader: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  modelImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  modelEmoji: {
    fontSize: 30,
  },
  modelInfo: {
    flex: 1,
  },
  modelName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  modelDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  modelPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  modelItems: {
    marginBottom: 20,
  },
  itemsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  itemText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  modelActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  detailsButton: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  detailsButtonText: {
    fontSize: 16,
    color: '#666',
  },
  addButton: {
    backgroundColor: '#FF6B6B',
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 5,
  },
  infoSection: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  infoContent: {
    flex: 1,
    marginLeft: 15,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 3,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
  },
});