
let deleteBtn = document.getElementsByClassName("btnDel")
let add= document.getElementById('add-sport');
let ul= document.getElementById('sport-list-admin')
 let nom =document.getElementById('nom_sport')
let description =document.getElementById('Description')
let date =document.getElementById('date_debut')
let nbr_cour =document.getElementById('nbr_cour')
let nbr_places = document.getElementById('nbr_places')
let Ajouter = document.getElementById('Ajouter')
var form = document.getElementById("add-sport");


form.addEventListener('submit', (event) => {

    event.preventDefault();
    addCours();

});
const addCours = async () => {
    let data = {
        nom: nom.value,
        description: description.value,
        date:date.value,
        nb_cours:nbr_cour.value,
        nb_places:nbr_places.value,
    }

    let response = await fetch('/cours', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if(response.ok) {
        let data = await response.json()
        location.reload();
    }
}
    for(let i=0;i < deleteBtn.length; i++) { 
            deleteBtn[i].addEventListener("click", (event)=>{
                event.preventDefault();
                let CourId = event.currentTarget.getAttribute("data-id")
                DeleteCours(CourId)
                console.log(CourId);
            
            });
    }

   async function DeleteCours (uid){
   let data = {
    id: Number(uid)
   }
    let response = await fetch("/cours", {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
    },
      body: JSON.stringify(data)
    });
   if (response.ok){
   location.reload();
   }
  }

// const addSportClient= (id, Nom, Description,Date_cour,Nbr,Nbr_places) => {
//   let li = document.createElement('li');

//     let Button = document.createElement('Button');
    
    
//     Button.addEventListener('Delete', DeleteCours);
//     Button.dataset.id = id;
//     li.append(Button);

//     let div1 = document.createElement('div');
//     div.innerText = Nom;
//     li.append(div1);
//     let div2 = document.createElement('div');
//     div.innerText = Description;
//     li.append(div2);
//     let div3 = document.createElement('div');
//     div.innerText = Date_cour;
//     li.append(div3);
//     let div4 = document.createElement('div');
//     div.innerText = Nbr;
//     li.append(div4);
//     let div5 = document.createElement('div');
//     div.innerText = Nbr_places;
//     li.append(div5);
//     ul.append(li);
// }