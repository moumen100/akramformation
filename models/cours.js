import  connectionPromise from './connexion.js';
export const getCours = async () => {
    let connexion = await connectionPromise;

    let resultat = await connexion.all(
        'SELECT * FROM cours;'
    );

    return resultat;
}

    export const addCours = async (nom,date_debut,nbr_cour,capacite,description) => {
       
      
        let connexion = await connectionPromise;
    
        let resultat = await connexion.run(
            `INSERT INTO cours (nom, date_debut, nb_cours, capacite, description)
            VALUES(?,?,?,?,?)`,
           [nom,date_debut,nbr_cour, capacite,description]
        );
       
        return resultat.lastID;}

        export const DeleteCours = async (id) => {
       
      
            let connexion = await connectionPromise;
        
             await connexion.run(
                `DELETE FROM cours WHERE id_cours=?`,[id]
                
            );
            
            }
            export const getcoursUtilisateurs = async (idUser) => {
                // Attendre que la connexion à la base de données
                // soit établie
                let connection = await connectionPromise;
            
                // Envoyer une requête à la base de données pour récupérer la liste des cours auquels l'utilisateur est inscrits
                let results = await connection.all(
                    'SELECT *, (SELECT COUNT(*) FROM cours_utilisateur AS A WHERE A.id_cours = C.id_cours) as registered FROM cours AS C WHERE id_cours IN (SELECT id_cours FROM cours_utilisateur WHERE id_utilisateur = ?)'
                    , [idUser]);
            
                // Retourner les résultats
                return results;
            }
        
       

        

    
    
