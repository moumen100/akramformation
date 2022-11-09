import  connectionPromise from './connexion.js';


    
    

    export const addCourseToUser = async (idCours, idUser) => {
        // Attendre que la connexion à la base de données
        // soit établie
        let connection = await connectionPromise;
    
        // Récupérer la capacité des cours de la base de donnée
        let capacity = await connection.all(
            'SELECT capacite FROM cours WHERE id_cours = ?'
            , [idCours]);
    
        // vérifier si l'utilisateur est déjà enregistré
        let isRegistered = await connection.all(
            'SELECT COUNT(*) as isRegistered FROM cours_utilisateur WHERE id_cours = ? AND id_utilisateur = 1'
            , [idCours]);
    
        // Récupérerle nombre d'utilisateurs enregistrés
        let registered = await connection.all(
            'SELECT COUNT(*) as registered FROM cours_utilisateur WHERE id_cours = ?'
            , [idCours]);
    
        // Si il n'ya plus de capacité ou déjà inscrit nous ne faisons pas d'inscription
        if (registered[0].registered >= capacity[0].capacite || isRegistered[0].isRegistered) {
            console.log("it worked")
            return false
        }
    
        // Envoyer une requête à la base de données pour ajouter un nouveau cours a l'utilisateur
        let results = await connection.run(
            'INSERT INTO cours_utilisateur (id_cours, id_utilisateur) VALUES (?,?)'
            , [idCours, idUser]
        );
    
        return true
    }
    export const removeCourseFromUser = async (idCours, idUser) => {
        // Attendre que la connexion à la base de données
        // soit établie
        let connection = await connectionPromise;
    
        // Envoyer une requête à la base de données pour supprimer un cours a partir de ID de l'utilisateur
        let results = await connection.run(
            'DELETE FROM cours_utilisateur WHERE id_cours = ? AND id_utilisateur = ?'
            , [idCours, idUser]
        );
    }

    
    
    

