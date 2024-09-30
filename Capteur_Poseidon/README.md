# Poseidon : Capteur d'Humidité Intelligent ![version](https://img.shields.io/badge/Version-0.2-green)

Poseidon est un capteur d'humidité conçu pour s'intégrer parfaitement à votre système domotique Zeus. Utilisant la technologie WiFi pour communiquer via MQTT, Poseidon envoie des mesures d'humidité précises à Zeus pour une gestion optimale de votre environnement domestique. Ce document détaille les étapes pour configurer et déployer Poseidon dans votre système domotique.

# Prérequis

* Carte compatible Arduino avec WiFi (par exemple, ESP32 ou ESP8266)
* Environnement de développement Arduino IDE installé
* Accès à un réseau WiFi configuré via RaspAP sur le Raspberry Pi
* Connaissances de base en C++ et programmation Arduino

# Installation

1. **Préparation de l'environnement Arduino :** Assurez-vous que l'IDE Arduino est installé sur votre ordinateur et que vous avez accès à une carte compatible Arduino avec support WiFi.
2. **Installation des bibliothèques nécessaires :** Installez les bibliothèques WiFiNINA et PubSubClient via le gestionnaire de bibliothèques de l'IDE Arduino.

# Configuration de Poseidon

1. **Paramètres WiFi :** Dans le code de Poseidon, remplacez ssid et password par les identifiants de votre réseau WiFi local créé par RaspAP.
2. **Adresse du serveur MQTT :** Assurez-vous que mqtt_server correspond à l'adresse IP de votre hub Zeus.

# Téléversement du Code

* Connectez votre carte Arduino à votre ordinateur.
* Ouvrez le code source de Poseidon dans l'IDE Arduino.
* Sélectionnez le bon type de carte et le port série.
* Téléversez le code sur votre carte.

# Fonctionnement

* **Connexion au WiFi :** Poseidon se connecte automatiquement à votre réseau WiFi à son démarrage.
* **Connexion au serveur MQTT :** Une fois connecté au WiFi, Poseidon tente de se connecter à Zeus via MQTT.
* **Envoi des données d'humidité :** Poseidon mesure l'humidité et envoie les données au topic capteur/humidite toutes les minutes.
