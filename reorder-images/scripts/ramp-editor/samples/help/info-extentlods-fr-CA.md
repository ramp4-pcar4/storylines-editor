##### Informations détaillées concernant la section _Étendue et niveaux de détails_

C'est généralement la première section à configurer. Elle va définir quel système de référence spatiale votre visualisateur
utilisera. Selon le gabarit que vous utilisez, la majeure partie de cette section est peut-être déjà remplie. Si vous souhaitez
modifier ces paramètres, cochez la case "Afficher les options de configuration avancées", puis procédez comme suit:

1. Vous devez ajouter un schéma de tuile par référence spatiale
    * Entrez un nom. Le nom sera utilisé pour générer l'identifiant unique schéma de tuile.
2. Vous devez créer une étendue spatiale par schéma de tuile. Dans cette section, vous allez définir le système de référence spatiale à utiliser
    * Pour trouver quel WKID utiliser, vous pouvez vous référer à cette
    <a href="http://spatialreference.org/ref/" target="_blank">liste de références spatiale</a>.
    * Entrez un identifiant unique puis définissez au moins l'étendue par défaut (les boutons pour définir l'étendue ne fonctionnent qu'avec ces wkid : 3978, 3857 et 102100).
3. Vous pouvez définir un LOD (Niveaux de détails) par schéma de tuile
    * Entrez un identifiant unique.
    * Utilisez le bouton "Définir les niveaux de détails" avec l'URL de votre carte de base. Un _TileLayer_ contient un
    certain nombre de LOD et chaque LOD correspond à une carte à une échelle ou une résolution donnée. Vous pouvez ensuite
    supprimer certains d'entre eux pour limiter les niveaux où l'utilisateur peut zoomer.
4. Vous devez lier votre schéma de tuile avec le jeu d'étendue spatiale et le niveau de détails créés précédemment
    * Sélectionnez leur identifiant unique dans la section Schéma des tuiles.
