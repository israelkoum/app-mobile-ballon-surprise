#!/bin/bash

echo "🎈 Démarrage de l'application Ballon Surprise 🎈"
echo "=============================================="

# Vérifier si Node.js est installé
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé. Veuillez l'installer d'abord."
    exit 1
fi

# Vérifier si npm est installé
if ! command -v npm &> /dev/null; then
    echo "❌ npm n'est pas installé. Veuillez l'installer d'abord."
    exit 1
fi

# Installer les dépendances si nécessaire
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances..."
    npm install
fi

# Démarrer l'application
echo "🚀 Lancement de l'application..."
echo ""
echo "Instructions :"
echo "- Scannez le QR code avec l'app Expo Go sur votre téléphone"
echo "- Ou appuyez sur 'a' pour Android, 'i' pour iOS, 'w' pour Web"
echo ""

npm start