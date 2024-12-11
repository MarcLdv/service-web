# service-web
Création d'une API restfull, implémentant un système de réservation de terrains de badminton. Utilisation d'un ORM, spécification Openai et Swagger

## Lancement du projet : 

npm install
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


## Dictionnaire des données

| Code      | Libellé                             | Type    | Obligatoire ?  | Remarques/Contraintes                                     |
|:----------|:------------------------------------|:--------|:---------------|:----------------------------------------------------------|
| pseudo    | Le pseudo d'un administrateur       | String  | Oui            | Soit unique (identifiant)                                 |
| password  | Le mot de passe de l'administrateur | String  | Oui            | Chaîne de caractères hashée dans la base de données       |
| userId    | L'identifiant d'un utilisateur      | Number  | Oui            | Unique                                                    |
| username  | Nom d'un utilisateur                | String  | Oui            | Soit unique (identifiant)                                 |
| courtId   | Identifiant d'un terrain            | Number  | Oui            | Unique                                                    |
| name      | Nom d'un terrain                    | String  | Non            |                                                           |
| status    | Status d'un terrain                 | String  | Oui            | Peut prendre les valeurs : `available`, `unavailable`     |
| slotId    | Identifiant d'un horaire            | Number  | Oui            | Unique                                                    |
| name      | Nom d'un horaire                    | String  | Oui            |                                                           |
| schedule  | Heure et date de l'horaire          | String  | Oui            | Format `dd-mm-YYYY hh:mm`                                 |
| status    | Status de l'horaire                 | String  | Oui            | Peut prendre les valeurs : `available`, `unavailable`     |

## Tableau récapitulatif
| Ressource                                            | Noms des ressources (URL)         | Paramètres d'URL                                                      | Méthodes HTTP  | Commentaires                                                                                    |
|:-----------------------------------------------------|:----------------------------------|:----------------------------------------------------------------------|:---------------|:------------------------------------------------------------------------------------------------|
| Récupérer tous les terrains                          | /courts                           |                                                                       | GET            |                                                                                                 |
| Ajouter un terrain                                   | /courts                           | Format JSON dans le body : le "name" et le "status" du terrain ajouté | POST           | Le "name" doit être unique, une erreur s'affiche si ce n'est pas le cas                         |
| Récupérer les informations d'un terrain spécifique   | /courts/{courtId}                 | Identifiant d'un terrain                                              | GET            |                                                                                                 |
| Récupérer tous les utilisateurs                      | /users                            |                                                                       | GET            |                                                                                                 |
| S'inscrire en tant que nouvel utilisateur            | /register                         | Format JSON dans le body : "username"                                 | POST           | Le "username" doit être unique, une erreur s'affiche si ce n'est pas le cas                     |
| Se connecter en tant qu'utilisateur                  | /login                            | Format JSON dans le body : "username"                                 | POST           |                                                                                                 |
| Créer une nouvelle réservation                       | /reservations                     | Format JSON dans le body : "slotId"                                   | POST           |                                                                                                 |
| Récupérer les réservations de l'utilisateur connecté | /reservations                     |                                                                       | GET            | L'utilisateur doit être connecté                                                                |
| Supprimer une réservation                            | /reservations/{reservationId}     | Identifiant d'une réservation                                         | DELETE         | L'utilisateur doit être connecté pour supprimer une de ses réservations                         |
| Se connecter en tant qu'administrateur               | /admin/login                      | Format JSON dans le body : "name" et le mot de passe "password"       | POST           |                                                                                                 |
| Modifier le statut d'un terrain                      | /admin/courts/{courtId}           | Identifiant d'un terrain                                              | POST           | L'utilisateur doit être connecté en tant qu'administrateur pour modifier le statut d'un terrain |


TODO : 
README CLEAN
Un Open API Description File (OAD) au format yaml, décrivant votre API
GRAPHQL REVOIR TRUC QUI BUG