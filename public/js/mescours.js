


let DesInscrireBtn = document.getElementsByClassName("DesInscrireBtn")

    for(let i=0;i < DesInscrireBtn.length; i++) { 
      DesInscrireBtn[i].addEventListener("click", (event)=>{
            event.preventDefault();
            let CourId = event.currentTarget.getAttribute("data-id")
            DesInscrireDeCours(CourId)
            console.log(CourId);
        
        });
}

async function DesInscrireBtn (uid){
let data = {
    cours_id: Number(uid),
    user_id: 1
}
let response = await fetch("/deregisterCourse", {
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