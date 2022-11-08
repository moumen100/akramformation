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
        
       

        

    
    
