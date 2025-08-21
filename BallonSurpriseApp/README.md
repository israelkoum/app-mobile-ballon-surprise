# Ballon Surprise App 🎈

Une application mobile interactive pour l'entreprise **Ballon Surprise**, spécialisée dans les box cadeaux avec ballons et le service "Surprise Embellies".

## 🌟 Fonctionnalités

### Authentification
- Connexion via Email/Mot de passe
- Connexion via Google
- Connexion via Facebook
- Système de déconnexion

### Page d'accueil
- Interface utilisateur moderne et intuitive
- Choix entre deux catégories principales :
  - 🎉 **Anniversaire**
  - 👶 **Naissance**

### Catalogue de cadeaux
- **Modèles prédéfinis** : Box cadeaux prêtes à offrir
- **Composition personnalisée** avec options :
  - **Chocolats** (obligatoire) : Patchi, Ferrero, Raphael
  - **Biscuits** (optionnel) : Nutella, Oreo, Twix
  - **Roses** (obligatoire) : Blanche ou Rouge
  - **Nounours** (optionnel)

### Panier et Paiement
- Gestion complète du panier
- Récapitulatif détaillé des commandes
- **Paiement Mobile Money** :
  - Orange Money
  - MTN Mobile Money
  - Moov Money

## 🚀 Installation et Lancement

### Prérequis
- Node.js (version 16 ou supérieure)
- npm ou yarn
- Expo CLI

### Installation
```bash
# Cloner le projet
cd BallonSurpriseApp

# Installer les dépendances
npm install

# Lancer l'application
npm start
```

### Lancement sur différentes plateformes
```bash
# Android
npm run android

# iOS (nécessite macOS)
npm run ios

# Web
npm run web
```

## 📱 Plateformes supportées
- ✅ iOS
- ✅ Android
- ✅ Web (pour les tests)

## 🛠 Technologies utilisées

- **React Native** avec **Expo**
- **React Navigation** pour la navigation
- **Expo Linear Gradient** pour les dégradés
- **AsyncStorage** pour la persistance des données
- **Expo Vector Icons** pour les icônes
- **Expo Auth Session** pour l'authentification OAuth

## 📋 Structure du projet

```
src/
├── screens/           # Écrans de l'application
│   ├── LoginScreen.js     # Écran de connexion
│   ├── HomeScreen.js      # Page d'accueil
│   ├── GiftCategoryScreen.js  # Catalogue des cadeaux
│   ├── CustomGiftScreen.js    # Composition personnalisée
│   └── CartScreen.js      # Panier et paiement
├── context/           # Contextes React
│   ├── AuthContext.js     # Gestion de l'authentification
│   └── CartContext.js     # Gestion du panier
└── components/        # Composants réutilisables
```

## 🎨 Design

L'application utilise une palette de couleurs moderne :
- **Principal** : #FF6B6B (Rouge corail)
- **Secondaire** : #4ECDC4 (Turquoise)
- **Accent** : #9B59B6 (Violet)

## 🔧 Configuration

### Authentification OAuth
Pour activer l'authentification Google et Facebook, vous devez :

1. **Google OAuth** :
   - Remplacer `YOUR_GOOGLE_CLIENT_ID` dans `AuthContext.js`
   - Configurer votre projet dans Google Cloud Console

2. **Facebook Login** :
   - Remplacer `YOUR_FACEBOOK_APP_ID` dans `AuthContext.js`
   - Configurer votre app dans Facebook Developers

## 📦 Déploiement

### Build pour production
```bash
# Android APK
expo build:android

# iOS IPA
expo build:ios
```

### Publication sur les stores
```bash
# Publication automatique
expo publish
```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche pour votre fonctionnalité
3. Commit vos changements
4. Push vers la branche
5. Ouvrir une Pull Request

## 📞 Support

Pour toute question ou support technique, contactez l'équipe de développement.

## 📄 Licence

Ce projet est développé pour l'entreprise Ballon Surprise. Tous droits réservés.

---

**Ballon Surprise** - *Créez des moments magiques* ✨