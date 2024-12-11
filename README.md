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

- Lancer le Serveur Postgresql

```Bash
docker compose up -d
```

- Créer la base de donnée

```Bash
cd .\src\
npx sequelize-cli db:migrate
```

- Peupler la base de données

```Bash
npx sequelize-cli db:seed:all
```

- Lancer l'API

```Bash
npm run dev
```

## Utiliser le service

>Pour avoir une vision globale de l'API et la documentation Swagger se connecter sur l'adresse :

```Bash
localhhost:3000/api-docs
```

- S'autentifier

```Bash
curl -X 'POST' \
  'http://localhost:3000/login' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "username": "JeanDupont"
}'
```

- Accéder à une ressource protégée

```Bash
curl -X 'POST' \
  'http://localhost:3000/reservations' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer  <votre jwt>' \
  -H 'Content-Type: application/json' \
  -d '{
  "courtId": 1,
  "slotId": 1
}'
```

## Démarer le serveur GraphQL

- Lancer le serveur

```Bash
- node graphql/server.js
```

- Tester via Postman

    Méthode : POST \
    URL : http://localhost:4000/

  - Body

    ```Json
    {
        "query": "query AvailableSlots($date: String!, $terrain: String!) {
          availableSlots(date: $date, terrain: $terrain) {
            time
            date
          }
        }",
        "variables": {
          "date": "2024-12-12",
          "terrain": "B"
        }
    }
    ```

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

## Sécurité

>Dans notre application nous avons utilisé la bibliothèque bcrypt afin de hasher le mot de passe de l'admin lors du peupleument, pour cela nous avon définis un "salt" puis les fonction de cryptage et décryptage qui sont donc utilisées au peupleument et au login de l'admin pour comparer les mots de passes. Ainsi, on obtient un mot de passe de ce type : "$2b$10$bRvyT7158hQCcbWMN3fn6Oo6YEQK6PfPn94Hg79Z92qFlKIvGaP3b".

## Remarques

>Marc Lebreton -> J'ai beaucoup apprécié travailler sur ce projet. Il m'aura permis de découvrir de nombreuses technologies que j'espère réutiliser à l'avenir, notamment Node.js que j'avais très peu vu et qui est une technologie importante. J'ai également mis en place une le développement de ce projet en réfléchissant d'abord à son design puis ensuite au développement. Cependant, cette méthode a aussi eu son lot de désavantage, après avoir établis un premier design, j'ai mal exprimé la façon dont je voulais implémenter les créneaux d'un court avec Victor et nous sommes parties dans des directions opposées, de mon côté, j'ai créé un slot pour chaque créneau afin de pouvoir récupérer son statut, horaire et avoir un id de user. Cependant, Victor de son côté a fait l'inverse en limitant la taille de la base de données et associant les réservations aux slots directement. Nous n'avons pas réussi à savoir quelle méthode était la plus optimale dans ce genre de situation, c'est pour cela que nous avons deux versions ressemblantes, mais des différences aux niveaux des slots.

## Références

### OpenAPI

- [Le guide officiel pour démarrer avec OpenAPI](https://learn.openapis.org/) ;
- [OpenAPI tooling](https://tools.openapis.org/), 
- [The OpenAPI Specification Explained](https://learn.openapis.org/specification/),

### Sequelize

- [Sequelize](https://sequelize.org/)

### GraphQL

- [Documentation officielle](https://graphql.org/learn/)

### Node JS

- [Documentation officielle](https://nodejs.org/docs/latest/api/)

### JSONWEBTOKEN

- [Documentation](https://www.npmjs.com/package/jsonwebtoken)
