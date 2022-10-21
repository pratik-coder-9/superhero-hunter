
let favouriteSection = document.getElementById('favourite-superheros');
displaySuperheros(); // this function displays a list of superheroes added in the favourite section

async function displaySuperheros(){

  let favs = getFavs(); // calling the getFavs function

  for(let i = 0; i < favs.length; i++){

      let url = `https://superheroapi.com/api.php/108116198753848/${favs[i]}`
      let data = await fetchApiData(url); // calling the fetchApiData function

      if(data && data.response === 'success'){

          // creating superhero card which contains image container & info container
          let superheroCard = document.createElement('div');
          superheroCard.setAttribute('id', favs[i]);
          superheroCard.className = 'superhero-card';

          // creating image container
          let imageContainer = document.createElement('div');
          imageContainer.className = 'img-container';

          // creating image tag
          let superheroImage = document.createElement('img');
          superheroImage.setAttribute('src', data["image"]["url"]);

          // adding the superhero image to image container
          imageContainer.appendChild(superheroImage);

          // adding the image container to superhero card
          superheroCard.appendChild(imageContainer);

          // creating label container which contains superhero name and remove button
          let label = document.createElement('div');
          label.className = 'label';

          // superohero name
          let superheroName = document.createElement('div');
          superheroName.className = 'superhero-name';
          superheroName.innerHTML = data["name"];

          // adding superhero name to label container
          label.appendChild(superheroName);

          // creating remove button
          let removeBtn = document.createElement('div');
          removeBtn.className = 'remove-button';
          removeBtn.innerHTML = 'Remove';

          // adding the remove button to label container
          label.appendChild(removeBtn);

          // adding label container to superhero card
          superheroCard.appendChild(label);

          // adding superhero card to favourite section
          favouriteSection.appendChild(superheroCard);

          // adding event listener to remove button
          removeBtn.addEventListener('click', removeFavourites);
        
      }

  }

}

// get a list of favourites

function getFavs(){

  let favs;
  if(localStorage.getItem('favouriteSection') === null){
    favs = [];
  }
  else{
    favs = JSON.parse(localStorage.getItem('favouriteSection'));
  }
  return favs; 

}

// fetching results from the api

async function fetchApiData(url){

  try{
    let response = await fetch(url);
    let data = await response.json();
    return data;  
  }catch(err){
    await clearResults();
  }

}

// remove superheroes from favourites section

async function removeFavourites(e){

  console.log(e.target.parentElement.parentElement);
  let id = e.target.parentElement.parentElement.id;
  console.log(id);

  let favs = getFavs();

  let updatedFavs = favs.filter(function(val){
    return val != id;
  })
  localStorage.setItem('favouriteSection', JSON.stringify(updatedFavs));

  let heros = document.getElementsByClassName('superhero-card');

  for(let i = 0; i < heros.length; i++){

    if(heros[i].id == id){
      favouriteSection.removeChild(heros[i]);
      break;
    }

  }

}
