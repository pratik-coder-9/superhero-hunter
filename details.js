
const heroName = document.getElementById("superhero-name");
const image = document.getElementById("img");

// call the update details function when the window is loaded

window.onload = function(){

  let winurl = window.location.href;
  let id = winurl.substring(winurl.lastIndexOf('=')+1);
  updateDetails(id);

}

// updating the details of superhero with particular id from fetched data

async function updateDetails(id){

  let url = `https://superheroapi.com/api.php/108116198753848/${id}`
  let data = await fetchApiData(url);
  console.log(data.name);

  if(data && data.response == 'success'){

    heroName.innerHTML = data["name"];
    image.src = data["image"]["url"];

    document.getElementById("full-name").appendChild(document.createTextNode(`Full Name: ${data["biography"]["full-name"]}`));

    document.getElementById("place-of-birth").appendChild(document.createTextNode(`Place of Birth: ${data["biography"]["place-of-birth"]}`));

    document.getElementById("aliases").appendChild(document.createTextNode(`Aliases: ${data["biography"]["aliases"].toString()}`));

    document.getElementById("alter-egos").appendChild(document.createTextNode(`Alter Egos: ${data["biography"]["alter-egos"]}`));

    document.getElementById("first-appearance").appendChild(document.createTextNode(`First Appearance: ${data["biography"]["first-appearance"]}`));

    document.getElementById("publisher").appendChild(document.createTextNode(`Publisher: ${data["biography"]["publisher"]}`));

  }
  
}

// fetching data from api

async function fetchApiData(url) {

  try{

    let response = await fetch(url);
    let data = await response.json();
    return data;

  }catch(err){

    console.log(err);

  }
}