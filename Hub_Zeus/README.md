# Zeus : Hub Domotique Personnel ![version](https://img.shields.io/badge/Version-1.2-green)

Zeus est un hub domotique innovant conçu pour centraliser la gestion de vos appareils et capteurs domestiques. Basé sur le Raspberry Pi 3B et utilisant RaspAP pour créer un réseau local sécurisé, Zeus facilite la communication avec vos capteurs via MQTT et sert d'intermédiaire pour envoyer des données à une API externe. Ce document vous guidera à travers l'installation, la configuration et l'utilisation de Zeus.

# Prérequis

* Raspberry Pi 3B avec Raspbian installé
* Connexion Internet
* Connaissances de base en Python et MQTT
* Accès au Raspberry Pi via SSH ou directement

pour les besoins de notre application nous utilisons
- username:`gear`
- password:`green`

# Installation

1. **Configuration du Raspberry Pi :** Assurez-vous que votre Raspberry Pi est à jour et configuré avec RaspAP pour créer votre réseau local fermé.
2. **Installation des dépendances :** Installez Paho MQTT et Requests en exécutant pip install paho-mqtt requests dans le terminal de votre Raspberry Pi.

# Configuration de Zeus

1. **Configurer l'adresse de l'API :** Dans le script principal de Zeus, remplacez la variable Api par l'URL de votre API externe.
2. **Lancement de Zeus :** Exécutez le script principal pour démarrer le hub. Assurez-vous que le Raspberry Pi est connecté à votre réseau local fermé créé par RaspAP.

# Fonctionnalités

* **Abonnement aux données des capteurs :** Zeus s'abonne automatiquement au topic capteur/humidite pour recevoir les données des capteurs d'humidité.
* **Alertes d'humidité :** Si l'humidité dépasse 50.0%, Zeus envoie une alerte à l'API externe avec les données d'humidité.
