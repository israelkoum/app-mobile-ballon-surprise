import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';

export default function CartScreen({ route, navigation }) {
  const { cartItems, removeFromCart, clearCart, getTotalPrice } = useCart();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  // Ajouter un nouvel item si passé depuis d'autres écrans
  useEffect(() => {
    if (route.params?.newItem) {
      // L'item sera automatiquement ajouté via le contexte
      // Nettoyer le paramètre pour éviter les re-ajouts
      navigation.setParams({ newItem: null });
    }
  }, [route.params?.newItem]);

  const paymentMethods = [
    { id: 'orange', name: 'Orange Money', icon: '📱', color: '#FF6B00' },
    { id: 'mtn', name: 'MTN Mobile Money', icon: '💳', color: '#FFD700' },
    { id: 'moov', name: 'Moov Money', icon: '💰', color: '#00A651' },
  ];

  const formatGiftDetails = (item) => {
    if (item.type === 'predefined') {
      return {
        title: item.model.name,
        description: item.model.description,
        items: item.model.items,
        category: item.category
      };
    } else if (item.type === 'custom') {
      const items = [];
      items.push('Ballons et Box de base');
      
      item.chocolates?.forEach(choc => items.push(choc.name));
      item.biscuits?.forEach(biscuit => items.push(biscuit.name));
      if (item.rose) items.push(item.rose.name);
      if (item.bear) items.push('Nounours en peluche');
      
      return {
        title: `Cadeau personnalisé - ${item.category}`,
        description: 'Composition sur mesure',
        items: items,
        category: item.category
      };
    }
    return { title: 'Cadeau', description: '', items: [], category: '' };
  };

  const handleRemoveItem = (itemId) => {
    Alert.alert(
      'Supprimer l\'article',
      'Êtes-vous sûr de vouloir retirer cet article du panier ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Supprimer', style: 'destructive', onPress: () => removeFromCart(itemId) }
      ]
    );
  };

  const handleClearCart = () => {
    Alert.alert(
      'Vider le panier',
      'Êtes-vous sûr de vouloir vider complètement votre panier ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Vider', style: 'destructive', onPress: clearCart }
      ]
    );
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert('Panier vide', 'Ajoutez des articles avant de passer commande');
      return;
    }
    setShowPaymentModal(true);
  };

  const handlePayment = () => {
    if (!selectedPaymentMethod) {
      Alert.alert('Méthode de paiement', 'Veuillez sélectionner une méthode de paiement');
      return;
    }

    if (!phoneNumber || phoneNumber.length < 8) {
      Alert.alert('Numéro de téléphone', 'Veuillez entrer un numéro de téléphone valide');
      return;
    }

    // Simulation du processus de paiement
    setShowPaymentModal(false);
    
    Alert.alert(
      'Commande confirmée !',
      `Votre commande de ${getTotalPrice().toLocaleString()} FCFA a été confirmée. Un SMS de confirmation sera envoyé au ${phoneNumber}.`,
      [
        {
          text: 'OK',
          onPress: () => {
            clearCart();
            navigation.navigate('Home');
          }
        }
      ]
    );
  };

  const renderPaymentModal = () => (
    <Modal
      visible={showPaymentModal}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowPaymentModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Paiement Mobile Money</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowPaymentModal(false)}
            >
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalBody}>
            {/* Récapitulatif de commande */}
            <View style={styles.orderSummary}>
              <Text style={styles.summaryTitle}>Récapitulatif</Text>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Total articles</Text>
                <Text style={styles.summaryValue}>{cartItems.length}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Livraison</Text>
                <Text style={styles.summaryValue}>Gratuite</Text>
              </View>
              <View style={[styles.summaryRow, styles.totalRow]}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>{getTotalPrice().toLocaleString()} FCFA</Text>
              </View>
            </View>

            {/* Sélection méthode de paiement */}
            <View style={styles.paymentMethods}>
              <Text style={styles.sectionTitle}>Choisir la méthode de paiement</Text>
              {paymentMethods.map((method) => (
                <TouchableOpacity
                  key={method.id}
                  style={[
                    styles.paymentMethod,
                    selectedPaymentMethod === method.id && styles.selectedPaymentMethod
                  ]}
                  onPress={() => setSelectedPaymentMethod(method.id)}
                >
                  <Text style={styles.paymentIcon}>{method.icon}</Text>
                  <Text style={styles.paymentName}>{method.name}</Text>
                  {selectedPaymentMethod === method.id && (
                    <Ionicons name="checkmark-circle" size={24} color="#4ECDC4" />
                  )}
                </TouchableOpacity>
              ))}
            </View>

            {/* Saisie numéro de téléphone */}
            <View style={styles.phoneSection}>
              <Text style={styles.sectionTitle}>Numéro de téléphone</Text>
              <View style={styles.phoneInputContainer}>
                <Text style={styles.countryCode}>+226</Text>
                <TextInput
                  style={styles.phoneInput}
                  placeholder="XX XX XX XX"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  keyboardType="phone-pad"
                  maxLength={8}
                />
              </View>
            </View>
          </ScrollView>

          {/* Bouton de paiement */}
          <View style={styles.modalFooter}>
            <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
              <LinearGradient
                colors={['#4ECDC4', '#44A08D']}
                style={styles.payButtonGradient}
              >
                <Text style={styles.payButtonText}>
                  Payer {getTotalPrice().toLocaleString()} FCFA
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyCart}>
          <Ionicons name="bag-outline" size={80} color="#ccc" />
          <Text style={styles.emptyCartTitle}>Votre panier est vide</Text>
          <Text style={styles.emptyCartText}>
            Découvrez nos magnifiques cadeaux et ajoutez-les à votre panier
          </Text>
          <TouchableOpacity
            style={styles.shopButton}
            onPress={() => navigation.navigate('Home')}
          >
            <LinearGradient
              colors={['#FF6B6B', '#FF8E8E']}
              style={styles.shopButtonGradient}
            >
              <Text style={styles.shopButtonText}>Découvrir nos cadeaux</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header du panier */}
        <View style={styles.cartHeader}>
          <Text style={styles.cartTitle}>Mon Panier</Text>
          <Text style={styles.itemCount}>{cartItems.length} article(s)</Text>
          {cartItems.length > 0 && (
            <TouchableOpacity style={styles.clearButton} onPress={handleClearCart}>
              <Text style={styles.clearButtonText}>Vider</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Liste des articles */}
        <View style={styles.cartItems}>
          {cartItems.map((item) => {
            const giftDetails = formatGiftDetails(item);
            return (
              <View key={item.id} style={styles.cartItem}>
                <View style={styles.itemHeader}>
                  <View style={styles.itemIcon}>
                    <Text style={styles.itemEmoji}>
                      {giftDetails.category === 'anniversaire' ? '🎉' : '👶'}
                    </Text>
                  </View>
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemTitle}>{giftDetails.title}</Text>
                    <Text style={styles.itemDescription}>{giftDetails.description}</Text>
                    <Text style={styles.itemPrice}>{item.totalPrice.toLocaleString()} FCFA</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => handleRemoveItem(item.id)}
                  >
                    <Ionicons name="trash-outline" size={20} color="#FF6B6B" />
                  </TouchableOpacity>
                </View>

                {/* Détails des items inclus */}
                <View style={styles.itemDetails}>
                  <Text style={styles.detailsTitle}>Inclus :</Text>
                  {giftDetails.items.map((detail, index) => (
                    <View key={index} style={styles.detailRow}>
                      <Ionicons name="checkmark" size={14} color="#4ECDC4" />
                      <Text style={styles.detailText}>{detail}</Text>
                    </View>
                  ))}
                </View>
              </View>
            );
          })}
        </View>

        {/* Informations de livraison */}
        <View style={styles.deliveryInfo}>
          <View style={styles.deliveryCard}>
            <Ionicons name="truck-outline" size={24} color="#4ECDC4" />
            <View style={styles.deliveryContent}>
              <Text style={styles.deliveryTitle}>Livraison gratuite</Text>
              <Text style={styles.deliveryText}>Livraison le jour même si commande avant 16h</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Barre de total et checkout */}
      <View style={styles.checkoutBar}>
        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalAmount}>{getTotalPrice().toLocaleString()} FCFA</Text>
        </View>
        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
          <LinearGradient
            colors={['#FF6B6B', '#FF8E8E']}
            style={styles.checkoutGradient}
          >
            <Ionicons name="card" size={20} color="#fff" />
            <Text style={styles.checkoutText}>Commander</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {renderPaymentModal()}
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
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyCartTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  emptyCartText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  shopButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  shopButtonGradient: {
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  shopButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  cartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  cartTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  itemCount: {
    fontSize: 16,
    color: '#666',
  },
  clearButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#ffebee',
  },
  clearButtonText: {
    fontSize: 14,
    color: '#FF6B6B',
    fontWeight: '600',
  },
  cartItems: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  cartItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  itemIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  itemEmoji: {
    fontSize: 24,
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  removeButton: {
    padding: 5,
  },
  itemDetails: {
    paddingLeft: 10,
    borderLeftWidth: 2,
    borderLeftColor: '#4ECDC4',
  },
  detailsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },
  detailText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 6,
  },
  deliveryInfo: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  deliveryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  deliveryContent: {
    flex: 1,
    marginLeft: 15,
  },
  deliveryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 3,
  },
  deliveryText: {
    fontSize: 14,
    color: '#666',
  },
  checkoutBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalSection: {
    flex: 1,
  },
  totalLabel: {
    fontSize: 14,
    color: '#666',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  checkoutButton: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  checkoutGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 12,
  },
  checkoutText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 8,
  },
  // Styles pour la modal de paiement
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 5,
  },
  modalBody: {
    flex: 1,
    paddingHorizontal: 20,
  },
  orderSummary: {
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 15,
    marginVertical: 20,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    color: '#333',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    marginTop: 10,
    paddingTop: 10,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  paymentMethods: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedPaymentMethod: {
    borderColor: '#4ECDC4',
    backgroundColor: '#f0fffe',
  },
  paymentIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  paymentName: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  phoneSection: {
    marginBottom: 20,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  countryCode: {
    fontSize: 16,
    color: '#333',
    marginRight: 10,
  },
  phoneInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  modalFooter: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  payButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  payButtonGradient: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  payButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});