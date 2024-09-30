#!/bin/sh

# S'assurer que le script est exécuté depuis le répertoire contenant config.yaml et Zeus.py
cd /app

# Exécuter le script Python
exec python Zeus.py
