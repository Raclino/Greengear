#!/bin/bash
# Cette ligne semble être un placeholder et pourrait être supprimée si vous n'avez pas besoin de règles spécifiques ici.
# iptables -I DOCKER-USER -i src_if -o dst_if -j ACCEPT

# Permet le NAT pour les sorties sur eth0
iptables -t nat -C POSTROUTING -o eth0 -j MASQUERADE || iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE

# Permet les connexions établies et liées de eth0 à wlan0
iptables -C FORWARD -i eth0 -o wlan0 -m state --state RELATED,ESTABLISHED -j ACCEPT || iptables -A FORWARD -i eth0 -o wlan0 -m state --state RELATED,ESTABLISHED -j ACCEPT

# Permet tout le trafic de wlan0 à eth0
iptables -C FORWARD -i wlan0 -o eth0 -j ACCEPT || iptables -A FORWARD -i wlan0 -o eth0 -j ACCEPT

# Enregistre les règles iptables
iptables-save
