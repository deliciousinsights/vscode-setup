# VS Code Setup

Ce dépôt facilite la configuration aux petits oignons de Visual Studio Code pour les formations Delicious Insights.

[Tous les détails sont ici](https://installations.delicious-insights.com/software/vscode.html#paramétrage--personnalisation), mais nous redonnons ci-dessous la procédure :

Il te faudra de toutes façons [Node](https://installations.delicious-insights.com/software/node.html) installé sur la machine, avec **npm 5.2+** (suis ces liens pour les installer au mieux, si besoin).

## À fond…

Si tu as npm 5.2+ d’installé (ce qui est automatique à partir de Node 8.2.0 ; à défaut, fais `npm install -g npm`, éventuellement préfixé de `sudo` sur Linux ou OSX si besoin), y’a pas plus simple :

```bash
npx vscode-setup
```

Si tu avais déjà une ancienne version et que tu veux garantir la dernière, tu peux faire plutôt :

```bash
npx --ignore-existing vscode-setup
```

## À la main…

C’est plus long mais bon, voici comment :

1. Récupère ce dépôt
    - Soit à la main, si tu as Git installé : `git clone https://github.com/deliciousinsights/vscode-setup`
    - Soit en [téléchargeant un Zip](https://github.com/deliciousinsights/vscode-setup/archive/master.zip) que tu décompresseras ensuite
2. Ouvre le dépôt dans VS Code
    - Soit depuis la ligne de commande : une fois dans le répertoire du dépôt, tape simplement `code .`
    - Soit depuis VS Code : utilise la commande *Fichier > Ouvrir un dossier* (*File > Open Folder*) et sélectionne le dossier du dépôt.
3. Va dans le menu *Tâches > Exécuter la tâche* (*Tasks > Run Task*) et choisis la tâche configurée proposée (`npm: setup-vs-code`).

Tu devrais voir s’ouvrir un terminal de tâche en bas de la fenêtre de l’éditeur, et pouvoir suivre le déroulement des réglages.

Après s’être assuré que toutes les extensions recommandées sont installées, le système te demandera, dans le terminal de tâche, si tu souhaites fusionner les réglages recommandés dans tes paramètres généraux. Cette étape est optionnelle, et si tu as déjà des réglages aux petits oignons, tu peux répondre Non.  Dans le cas contraire, le programme vérifie si tu n’aurais pas déjà fait une telle fusion, par mesure de sécurité. Si ce n’est pas le cas, où que tu confirmes tout de même, il ajoute nos réglages recommandés, commentaires compris, à la fin de tes propres réglages utilisateur.

En bout de processus, les paramètres et extensions indiqués ci-dessous seront installés et actifs d’office : tu n’auras plus qu’à redémarrer VS Code.

-----------------------

© 2017 Delicious Insights.  Licensed under MIT (see `LICENSE.md`).
