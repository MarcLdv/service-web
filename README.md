# service-web
Création d'une API restfull, implémentant un système de réservation de terrains de badminton. Utilisation d'un ORM, spécification Openai et Swagger

## Lancement du projet : 

npm install
docker-compose up -d

Dans le dossier src effectuer les commandes suivantes :
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all

npm run dev

TODO :
- Ajouter systeme de compte et connexion
- Ajouter systeme de reservation avec le compte connecte (pas possible si pas connecte)
- Afficher les données interessante style reservation en fonction du compte ect.