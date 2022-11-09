


let InscrireBtn = document.getElementsByClassName("InscrireBtn")

    for(let i=0;i < InscrireBtn.length; i++) { 
        InscrireBtn[i].addEventListener("click", (event)=>{
            event.preventDefault();
            let CourId = event.currentTarget.getAttribute("data-id")
            InscrireAuCours(CourId)
            console.log(CourId);
        
        });
}

async function InscrireAuCours (uid){
let data = {
    cours_id: Number(uid),
    user_id: 1
}
let response = await fetch("/registerToCourse", {
  method: "POST",
  headers: {
    'Content-Type': 'application/json',
},
  body: JSON.stringify(data)
});
if (response.ok){
location.reload();
}
}