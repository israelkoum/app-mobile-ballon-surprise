import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';

export default function CustomGiftScreen({ route, navigation }) {
  const { category } = route.params;
  const { addToCart } = useCart();

  // États pour les sélections
  const [selectedChocolates, setSelectedChocolates] = useState([]);
  const [selectedBiscuits, setSelectedBiscuits] = useState([]);
  const [selectedRose, setSelectedRose] = useState(null);
  const [selectedBear, setSelectedBear] = useState(false);

  // Options disponibles avec prix
  const chocolateOptions = [
    { id: 'patchi', name: 'Patchi', price: 8000, emoji: '🍫' },
    { id: 'ferrero', name: 'Ferrero Rocher', price: 6000, emoji: '🟤' },
    { id: 'raphael', name: 'Raphael', price: 7000, emoji: '🤎' },
  ];

  const biscuitOptions = [
    { id: 'nutella', name: 'Biscuits Nutella', price: 3000, emoji: '🍪' },
    { id: 'oreo', name: 'Biscuits Oreo', price: 2500, emoji: '⚫' },
    { id: 'twix', name: 'Twix', price: 3500, emoji: '🟨' },
  ];

  const roseOptions = [
    { id: 'white', name: 'Rose Blanche', price: 4000, emoji: '🤍' },
    { id: 'red', name: 'Rose Rouge', price: 4000, emoji: '❤️' },
  ];

  const bearPrice = 12000;
  const basePrice = 15000; // Prix de base pour les ballons et la box

  // Fonctions de sélection
  const toggleChocolate = (chocolate) => {
    setSelectedChocolates(prev => {
      const exists = prev.find(item => item.id === chocolate.id);
      if (exists) {
        return prev.filter(item => item.id !== chocolate.id);
      } else {
        return [...prev, chocolate];
      }
    });
  };

  const toggleBiscuit = (biscuit) => {
    setSelectedBiscuits(prev => {
      const exists = prev.find(item => item.id === biscuit.id);
      if (exists) {
        return prev.filter(item => item.id !== biscuit.id);
      } else {
        return [...prev, biscuit];
      }
    });
  };

  const selectRose = (rose) => {
    setSelectedRose(selectedRose?.id === rose.id ? null : rose);
  };

  const toggleBear = () => {
    setSelectedBear(!selectedBear);
  };

  // Calcul du prix total
  const calculateTotal = () => {
    let total = basePrice;
    
    selectedChocolates.forEach(choc => {
      total += choc.price;
    });
    
    selectedBiscuits.forEach(biscuit => {
      total += biscuit.price;
    });
    
    if (selectedRose) {
      total += selectedRose.price;
    }
    
    if (selectedBear) {
      total += bearPrice;
    }
    
    return total;
  };

  // Validation et ajout au panier
  const handleAddToCart = () => {
    // Validation : au moins une rose et si chocolats sélectionnés, au moins un
    if (!selectedRose) {
      Alert.alert('Sélection requise', 'Veuillez choisir une rose (blanche ou rouge)');
      return;
    }

    if (selectedChocolates.length === 0) {
      Alert.alert(
        'Chocolats requis', 
        'Veuillez sélectionner au moins un type de chocolat',
        [
          { text: 'OK', style: 'default' }
        ]
      );
      return;
    }

    // Créer l'objet cadeau personnalisé
    const customGift = {
      type: 'custom',
      category: category,
      chocolates: selectedChocolates,
      biscuits: selectedBiscuits,
      rose: selectedRose,
      bear: selectedBear,
      totalPrice: calculateTotal(),
      createdAt: new Date().toISOString(),
    };

    // Ajouter au panier
    addToCart(customGift);

    // Confirmation et navigation
    Alert.alert(
      'Cadeau ajouté !',
      'Votre cadeau personnalisé a été ajouté au panier',
      [
        { text: 'Continuer mes achats', style: 'cancel' },
        { text: 'Voir le panier', onPress: () => navigation.navigate('Cart') }
      ]
    );
  };

  const isFormValid = () => {
    return selectedRose && selectedChocolates.length > 0;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <LinearGradient
            colors={category === 'anniversaire' ? ['#FF6B6B', '#FF8E8E'] : ['#4ECDC4', '#44A08D']}
            style={styles.headerGradient}
          >
            <Text style={styles.headerTitle}>Composer votre cadeau</Text>
            <Text style={styles.headerSubtitle}>
              Créez un cadeau unique pour {category === 'anniversaire' ? 'un anniversaire' : 'une naissance'}
            </Text>
          </LinearGradient>
        </View>

        {/* Section Chocolats */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Chocolats *</Text>
            <Text style={styles.requiredText}>Au moins un requis</Text>
          </View>
          <View style={styles.optionsGrid}>
            {chocolateOptions.map((chocolate) => {
              const isSelected = selectedChocolates.find(item => item.id === chocolate.id);
              return (
                <TouchableOpacity
                  key={chocolate.id}
                  style={[styles.optionCard, isSelected && styles.selectedCard]}
                  onPress={() => toggleChocolate(chocolate)}
                >
                  <Text style={styles.optionEmoji}>{chocolate.emoji}</Text>
                  <Text style={styles.optionName}>{chocolate.name}</Text>
                  <Text style={styles.optionPrice}>+{chocolate.price.toLocaleString()} FCFA</Text>
                  {isSelected && (
                    <View style={styles.selectedIndicator}>
                      <Ionicons name="checkmark" size={20} color="#fff" />
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Section Biscuits */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Biscuits</Text>
            <Text style={styles.optionalText}>Optionnel</Text>
          </View>
          <View style={styles.optionsGrid}>
            {biscuitOptions.map((biscuit) => {
              const isSelected = selectedBiscuits.find(item => item.id === biscuit.id);
              return (
                <TouchableOpacity
                  key={biscuit.id}
                  style={[styles.optionCard, isSelected && styles.selectedCard]}
                  onPress={() => toggleBiscuit(biscuit)}
                >
                  <Text style={styles.optionEmoji}>{biscuit.emoji}</Text>
                  <Text style={styles.optionName}>{biscuit.name}</Text>
                  <Text style={styles.optionPrice}>+{biscuit.price.toLocaleString()} FCFA</Text>
                  {isSelected && (
                    <View style={styles.selectedIndicator}>
                      <Ionicons name="checkmark" size={20} color="#fff" />
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Section Roses */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Rose *</Text>
            <Text style={styles.requiredText}>Requis</Text>
          </View>
          <View style={styles.roseOptions}>
            {roseOptions.map((rose) => (
              <TouchableOpacity
                key={rose.id}
                style={[styles.roseCard, selectedRose?.id === rose.id && styles.selectedCard]}
                onPress={() => selectRose(rose)}
              >
                <Text style={styles.roseEmoji}>{rose.emoji}</Text>
                <View style={styles.roseInfo}>
                  <Text style={styles.roseName}>{rose.name}</Text>
                  <Text style={styles.rosePrice}>+{rose.price.toLocaleString()} FCFA</Text>
                </View>
                {selectedRose?.id === rose.id && (
                  <View style={styles.selectedIndicator}>
                    <Ionicons name="checkmark" size={20} color="#fff" />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Section Nounours */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Nounours</Text>
            <Text style={styles.optionalText}>Optionnel</Text>
          </View>
          <TouchableOpacity
            style={[styles.bearCard, selectedBear && styles.selectedCard]}
            onPress={toggleBear}
          >
            <Text style={styles.bearEmoji}>🧸</Text>
            <View style={styles.bearInfo}>
              <Text style={styles.bearName}>Nounours en peluche</Text>
              <Text style={styles.bearDescription}>Doux et câlin pour accompagner votre cadeau</Text>
              <Text style={styles.bearPrice}>+{bearPrice.toLocaleString()} FCFA</Text>
            </View>
            {selectedBear && (
              <View style={styles.selectedIndicator}>
                <Ionicons name="checkmark" size={20} color="#fff" />
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Récapitulatif */}
        <View style={styles.summarySection}>
          <Text style={styles.summaryTitle}>Récapitulatif</Text>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Base (Ballons + Box)</Text>
            <Text style={styles.summaryPrice}>{basePrice.toLocaleString()} FCFA</Text>
          </View>
          
          {selectedChocolates.map((choc, index) => (
            <View key={index} style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>{choc.name}</Text>
              <Text style={styles.summaryPrice}>+{choc.price.toLocaleString()} FCFA</Text>
            </View>
          ))}
          
          {selectedBiscuits.map((biscuit, index) => (
            <View key={index} style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>{biscuit.name}</Text>
              <Text style={styles.summaryPrice}>+{biscuit.price.toLocaleString()} FCFA</Text>
            </View>
          ))}
          
          {selectedRose && (
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>{selectedRose.name}</Text>
              <Text style={styles.summaryPrice}>+{selectedRose.price.toLocaleString()} FCFA</Text>
            </View>
          )}
          
          {selectedBear && (
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Nounours</Text>
              <Text style={styles.summaryPrice}>+{bearPrice.toLocaleString()} FCFA</Text>
            </View>
          )}
          
          <View style={styles.summaryTotal}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalPrice}>{calculateTotal().toLocaleString()} FCFA</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bouton d'ajout au panier */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[styles.addToCartButton, !isFormValid() && styles.disabledButton]}
          onPress={handleAddToCart}
          disabled={!isFormValid()}
        >
          <LinearGradient
            colors={isFormValid() ? ['#FF6B6B', '#FF8E8E'] : ['#ccc', '#999']}
            style={styles.addToCartGradient}
          >
            <Ionicons name="bag-add" size={24} color="#fff" />
            <Text style={styles.addToCartText}>
              Ajouter au panier • {calculateTotal().toLocaleString()} FCFA
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
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
    marginBottom: 20,
  },
  headerGradient: {
    padding: 25,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#fff',
    marginBottom: 15,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  requiredText: {
    fontSize: 12,
    color: '#FF6B6B',
    fontWeight: '600',
  },
  optionalText: {
    fontSize: 12,
    color: '#4ECDC4',
    fontWeight: '600',
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  optionCard: {
    width: '48%',
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
    position: 'relative',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedCard: {
    borderColor: '#FF6B6B',
    backgroundColor: '#fff5f5',
  },
  optionEmoji: {
    fontSize: 30,
    marginBottom: 8,
  },
  optionName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 5,
  },
  optionPrice: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  selectedIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FF6B6B',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roseOptions: {
    gap: 10,
  },
  roseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 15,
    position: 'relative',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  roseEmoji: {
    fontSize: 30,
    marginRight: 15,
  },
  roseInfo: {
    flex: 1,
  },
  roseName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 3,
  },
  rosePrice: {
    fontSize: 14,
    color: '#666',
  },
  bearCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 15,
    position: 'relative',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  bearEmoji: {
    fontSize: 40,
    marginRight: 15,
  },
  bearInfo: {
    flex: 1,
  },
  bearName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 3,
  },
  bearDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  bearPrice: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  summarySection: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryPrice: {
    fontSize: 14,
    color: '#333',
  },
  summaryTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
    marginTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  bottomBar: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  addToCartButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  disabledButton: {
    opacity: 0.6,
  },
  addToCartGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  addToCartText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
});