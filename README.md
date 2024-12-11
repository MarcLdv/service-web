# API WEB - Conception et implémentation d'un service de gestion  

Création d'une API restfull, implémentant un système de réservation de terrains de badminton. Utilisation d'un ORM, spécification Openai et Swagger

## Lancement du projet

- Créer votre fichier d'environnement local

```Bash
cp .env.dist .env
```

- Installer les dépendances

```Bash
npm install
```

- Générer la clé de secret pour les tokens JWT

```Bash
node gensecrekey.js
```


docker-compose up -d

Dans le dossier src effectuer les commandes suivantes :
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all

npm run dev

Démarrer le serveur GraphQL : 
 - node graphql/server.js

Pour le tester sur Postman :
- Méthode : POST
- URL : http://localhost:4000/
- Body :
`````json
{
    "query": "query GetAvailableSlots($date: String!, $terrain: String!) { availableSlots(date: $date, terrain: $terrain) { time isAvailable } }",
    "variables": {
        "date": "2024-11-27",
        "terrain": "A"
    }
}
`````



TODO : 
README CLEAN
Un Open API Description File (OAD) au format yaml, décrivant votre API
GRAPHQL REVOIR TRUC QUI BUG