#!/bin/bash

GREEN='\033[0;32m'
NC='\033[0m'

# Fonction pour afficher un message de succès
success_message() {
    echo -e "${GREEN}✔${NC} $1"
}

# Met à jour les listes de paquets
apt-get update > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "Erreur lors de l'exécution de apt-get update"
    exit 1
else
    success_message "Mise à jour des listes de paquets"
fi

# Met à niveau les paquets
apt-get upgrade -y > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "Erreur lors de l'exécution de apt-get upgrade"
    exit 1
else
    success_message "Mise à niveau des paquets"
fi

# Installe DHCPCD
apt-get  install dhcpcd5 dnsmasq hostapd -y > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "Erreur lors de l'exécution de apt-get install dhcpcd"
    exit 1
else
    success_message "Installation de dhcpcd"
fi

# Télécharge le script d'installation de Docker
curl -fsSL https://get.docker.com -o get-docker.sh > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "Erreur lors du téléchargement de get-docker.sh"
    exit 1
else
    success_message "Téléchargement du script d'installation de Docker"
fi

# Exécute le script d'installation de Docker
sh get-docker.sh > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "Erreur lors de l'installation de Docker"
    exit 1
else
    success_message "Installation de Docker"
fi

# Ajoute l'utilisateur au groupe Docker
usermod -aG docker [user_name] > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "Erreur lors de l'ajout de l'utilisateur au groupe Docker"
    exit 1
else
    success_message "Ajout de l'utilisateur au groupe Docker"
fi

# Lance Docker Compose
docker compose up -d > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "Erreur lors de l'exécution de docker compose up"
    exit 1
else
    success_message "Démarrage de Docker Compose"
fi

# Liste les conteneurs Docker en cours d'exécution
echo "Conteneurs Docker actifs :"
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

echo -e "${GREEN}Toutes les commandes ont été exécutées avec succès.${NC}"
