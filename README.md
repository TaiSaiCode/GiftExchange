# Projet d'intégration POO et TechnoWeb

Projet d'integration dans le cadre du cours 420-B34-RO DÉVELOPPEMENT DES APPLICATIONS INFORMATIQUES

## Membre de l'équipe

- Mathieu Nicolas - 1446510
- Mallet Joey - 0360308
- Amegnignon Della Franck - 2223966
- Tran Tom - 1168746
- Étienne Robert - 1656232
- Théorêt Bruno - 9132760

## Norme de programmation

- Écrire les noms de variables, fonctions et classe en anglais. Ainsi que les commentaires et la documentation
- Utilisez des noms de variables significatives et décrivez clairement ce qu'ils représentent. Les noms doivent être en minuscule séparer les mots avec un underscore. Exemple : “liste_orginin”, “first_name”, “last_name”.
- Utilisez des verbes pour les noms de fonctions et commencez chaque mot avec une majuscule sauf le premier mot. Exemple : "calculerTaxes", "enregistrerUtilisateur", "afficherMessageErreur".
- Utilisez des noms de classes significatifs et décrivez clairement ce qu'ils représentent, en commençant chaque mot avec une majuscule. Exemple : "Utilisateur", "Commande", "Produit". Éviter les verbes dans les noms de classe.
- Utilisez des commentaires pour décrire le code lorsque nécessaire et documenter les fonctions et les classes. Éviter les commentaires redondants ou pouvant porter à confusion.
- Évitez les fonctions trop longues, en les limitant à une seule tâche.
- Évitez d'utiliser des variables globales, car elles peuvent causer des effets secondaires imprévus.
- Évitez d'utiliser des constantes magiques (nombres ou chaînes de caractères utilisés dans le code sans explication), en les remplaçant par des variables avec des noms significatifs.
- Évitez les redondances dans le code.
- Évitez les fonctions qui retournent plusieurs valeurs. Privilégier plutôt une structure claire comme une classe, une liste ou un tuple.
- Évitez les effets de bord dans les fonctions (c'est-à-dire les effets sur les variables en dehors de la fonction).
- Évitez d'utiliser des goto, car ils peuvent rendre le code difficile à suivre.
- Utilisez des assertions pour vérifier que les préconditions et les postconditions sont respectées. Les préconditions devraient se trouver avant l’exécution du code principal.
- Évitez les exceptions silencieuses, car elles peuvent rendre le débogage difficile. (c’est-à-dire les arrêts de programmes involontaire qui ne sont pas fournis de code d’erreur ou encore les try-catch avec aucune gestion de l’erreur)
- Utiliser un logger afin de pouvoir mieux comprendre le comportement des bugs survenu.
- Utilisez des exceptions personnalisées (dérivée de la classe exception) au lieu de code d’erreur sous forme d’enum.
- Évitez les fonctions qui ont un grand nombre d'arguments.
- Utilisez des tests unitaires pour vérifier que les fonctions fonctionnent correctement.
- Utilisez des outils de gestion de versions tels que Git pour suivre les modifications apportées au code.
- Éviter l’indentation qui dépasse deux niveaux de profondeur dans une fonction. Si celle-ci dépasse de deux niveaux, il est probable que le code pourrait être extrait dans d’autres fonctions.
- Évitez d'utiliser des fonctions obsolètes ou dépréciées.

## Gestionnaire de projet - JIRA

Nous avons choisis d'utiliser JIRA comme gestionnaire de projet. <br/>
Voici une photo comme demandé dans l'énnoncé du Sprint 0 :

![image](https://user-images.githubusercontent.com/37345940/228403273-49ba5380-fbc8-4b20-a106-6f4a08622e79.png)

## Setup – Instructions sur comment exécuter l’application

On a décidé d’utiliser un monorepo afin de faciliter la gestion du code; on inclut le code du backend et du frontend dans le même repo GIT

Git clone https://github.com/crosemont809/giftexchange.git
À la racine, exécuter la commande “Code . “ va ouvrir Visual Studio Code 

Front-End: 

Cd GiftExchangeClient
Npm install
Npm run dev

Back-End: 

À la racine du projet, cliquer sur GiftExchangeServer.sln  - Ca va ouvrir Visual Studio
Appuyer sur PLAY!
Note : .NET 7 doit être installé sur votre ordinateur
https://dotnet.microsoft.com/en-us/download/dotnet/thank-you/sdk-7.0.202-windows-x64-installer

