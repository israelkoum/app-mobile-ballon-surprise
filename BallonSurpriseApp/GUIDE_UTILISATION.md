# Guide d'utilisation - Ballon Surprise App 🎈

## 🚀 Comment démarrer l'application

### Option 1: Script automatique
```bash
./start.sh
```

### Option 2: Commandes manuelles
```bash
# Installer les dépendances
npm install --legacy-peer-deps

# Démarrer l'application
npm start
```

## 📱 Utilisation de l'application

### 1. **Connexion** 
L'utilisateur arrive sur l'écran de connexion avec 3 options :
- 📧 **Email/Mot de passe** : Connexion traditionnelle
- 🔴 **Google** : Connexion via compte Google  
- 🔵 **Facebook** : Connexion via compte Facebook

### 2. **Page d'accueil**
Après connexion, l'utilisateur voit :
- Un message de bienvenue personnalisé
- Deux grandes cartes pour choisir l'occasion :
  - 🎉 **Anniversaire** (fond rouge/rose)
  - 👶 **Naissance** (fond turquoise/vert)
- Informations sur les services "Surprise Embellies"

### 3. **Catalogue des cadeaux**
En sélectionnant une catégorie, l'utilisateur accède à :
- **Bouton "Composer mon propre cadeau"** (en violet)
- **Modèles prédéfinis** avec :
  - Nom et description du modèle
  - Prix en FCFA
  - Liste détaillée des éléments inclus
  - Boutons "Voir détails" et "Ajouter au panier"

### 4. **Composition personnalisée**
Interface interactive pour créer un cadeau sur mesure :

#### Chocolats (OBLIGATOIRE - au moins 1) :
- 🍫 **Patchi** : 8,000 FCFA
- 🟤 **Ferrero Rocher** : 6,000 FCFA  
- 🤎 **Raphael** : 7,000 FCFA

#### Biscuits (OPTIONNEL) :
- 🍪 **Biscuits Nutella** : 3,000 FCFA
- ⚫ **Biscuits Oreo** : 2,500 FCFA
- 🟨 **Twix** : 3,500 FCFA

#### Roses (OBLIGATOIRE - 1 choix) :
- 🤍 **Rose Blanche** : 4,000 FCFA
- ❤️ **Rose Rouge** : 4,000 FCFA

#### Nounours (OPTIONNEL) :
- 🧸 **Nounours en peluche** : 12,000 FCFA

**Prix de base** : 15,000 FCFA (ballons + box)

### 5. **Panier et commande**
Le panier affiche :
- **Récapitulatif détaillé** de chaque article
- **Total** avec livraison gratuite
- **Bouton "Commander"** pour procéder au paiement

### 6. **Paiement Mobile Money**
Modal de paiement avec :
- **Récapitulatif final** de la commande
- **Choix de la méthode** :
  - 📱 Orange Money
  - 💳 MTN Mobile Money  
  - 💰 Moov Money
- **Saisie du numéro** de téléphone (+226)
- **Confirmation** et validation

## 🎯 Fonctionnalités clés

### ✅ Validations automatiques
- Au moins un chocolat obligatoire
- Une rose obligatoire  
- Numéro de téléphone valide pour le paiement

### 🛒 Gestion du panier
- Ajout/suppression d'articles
- Calcul automatique du total
- Badge de comptage sur l'icône panier

### 🔐 Sécurité
- Authentification sécurisée
- Données utilisateur sauvegardées localement
- Déconnexion propre

### 📱 Interface responsive
- Design adapté iOS et Android
- Animations fluides avec dégradés
- Icônes expressives et couleurs attractives

## 🎨 Palette de couleurs

- **Rouge corail** (#FF6B6B) : Boutons principaux, prix
- **Turquoise** (#4ECDC4) : Accents, validations
- **Violet** (#9B59B6) : Composition personnalisée
- **Gris** : Textes secondaires et arrière-plans

## 📞 Support technique

En cas de problème :
1. Vérifier que toutes les dépendances sont installées
2. Redémarrer l'application avec `npm start`
3. Vider le cache Expo si nécessaire
4. Consulter les logs dans la console

---

**Bonne utilisation de votre application Ballon Surprise !** 🎈✨