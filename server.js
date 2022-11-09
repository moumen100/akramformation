// Aller chercher les configurations de l'application
import 'dotenv/config';

// Importer les fichiers et librairies
import express, { json, urlencoded } from 'express';
import helmet from 'helmet';
import compression from 'compression';
import { create } from 'express-handlebars';
import hbs from 'hbs'
import cors from 'cors';
import cspOption from './csp-options.js'
import { getCours,addCours,DeleteCours} from './models/cours.js';
import path from 'path';
const __dirname = path.resolve();



// Création du serveur
const app = express();

// Ajout de middlewares
app.use(helmet(cspOption));
app.use(compression());
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));
//Sets our app to use the handlebars engine
app.use(express.static('public'))
/*
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('views', './views');*/

//Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"

//Route de la fonction Getcour Methode Get
app.set("view engine", "hbs");
app.set("views", "./views/layouts");
hbs.registerPartials(__dirname +'/views/partials');

app.get('/', async (request, response) => {
    response.render('main', {
        titre: 'admin',
        styles: ['/css/style.css'],
        scripts: ['/js/admin.js'],
        cours: await getCours(),
        
    });
});
app.get('/cours', async (request, response) => {
    
    let cours = await getCours();
    
    if (!cours){
        response.status(404).json({
            error:"Aucun cours trouvé"
        });
    }
    else {
        
        response.status(200).json(cours);
        console.log("hello")
    }
});

//Route de la fnction addCour Methode Post
app.post('/cours', async (request, response) => {
    let u=request.body
    let cour={ nom:u.nom,
           date_debut:u.date,
           nb_cours:u.nb_cours,
           capacite:u.nb_places,
           description:u.description,}
    let id = await addCours(cour.nom,cour.date_debut,cour.nb_cours,cour.capacite,cour.description);
    response.status(201).json({ id: id,nom: cour.nom, description:cour.description, 
        date : cour.date_debut, nb_cours: cour.nb_cours, nb_places :cour.capacite });
});
app.delete('/cours', (request, response) => {
    DeleteCours(request.body.id)
    response.sendStatus(200)
});
app.get('/inscription', async (request, response) => {
    response.render('inscription', {
        titre: 'inscription',
        styles: ['/css/style.css'],
        scripts: ['/js/inscription.js'],
        cours: await getCours(),
        
    });
});

app.get('/mesCours', async (request, response) => {
    response.render('mescours', {
        titre: 'Mes Cours',
        styles: ['/css/style.css'],
        scripts: ['/js/mescours.js'],
        cours: await getcoursUtilisateurs(),
        
    });
});
// Requete post pour l'inscription à un cours
app.post('/registerToCourse', async (request, response) => {
    try {
      // ajoute le cours courseID à l'utilisateur userID
      let result = await addCourseToUser(request.body.cours_id, request.body.user_id);
      // envoyer une réponse en cas de succès
      if (result) {
        response.json({ result: "OK" })
      } else {
        response.json({ result: "NOT_OK" })
      }
    } catch (err) {
      // signaler une erreur lorsque l'insertion ou la connexion à la base de données échoue
      response.json({ result: "ERROR" })
    }
  })

  app.delete('/deregisterCourse', async (request, response) => {
    console.log(request.body)
    try {
      await removeCourseFromUser(request.body.cours_id, request.body.user_id);
      response.json({ result: "OK" })
    } catch (err) {
      response.json({ result: "ERROR" })
    }
  })


// Renvoyer une erreur 404 pour les routes non définies
app.use(function (request, response) {
    // Renvoyer simplement une chaîne de caractère indiquant que la page n'existe pas
    response.status(404).send(request.originalUrl + ' not found.');
});

// Démarrage du serveur
app.listen(process.env.PORT);
console.info(`Serveurs démarré:`);
console.info(`http://localhost:${ process.env.PORT }`);


