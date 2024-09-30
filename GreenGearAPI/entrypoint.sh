#!/bin/sh
echo "Attendre que la base de données soit prête..."
while ! pg_isready -h green_gear_db -p 5432 -q; do
  sleep 1
done

echo "Exécution du seeder..."
ts-node src/seeders/createAdminUser.ts
ts-node src/seeders/createFirstHub.ts
ts-node src/seeders/createFirstSensor.ts

echo "Démarrage de l'API..."
npm run dev