import  connectionPromise from './connexion.js';

export const getCours = async () => {
    let connexion = await connectionPromise;

    let resultat = await connexion.all(
        'SELECT * FROM cours;'
    );}
    
    export const capacite= async (id) => {
        let connexion = await promesseConnexion;
    
        await connexion.run(
            `UPDATE cours SET capacite = capacite + 1
            WHERE id_cours = ?`, 
            [id]
        );
    }
    
    
    

