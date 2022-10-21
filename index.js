
// using the superhero api

const url = 'https://superheroapi.com/api.php/108116198753848';

const inputBox = document.getElementById('input-box');
const searchList = document.getElementById('search-list');
inputBox.addEventListener('keyup', handleSearchInput); // handling the keypress event

// handling the input search query

async function handleSearchInput(e){

  // trimming the query name
  let name = e.target.value.trim();

  if(name.length == 0){
    await clearResults();
  }
  else{
    // fetch results
    let data = await fetchApiData(`${url}/search/${name}`);

    if(data && data.response === 'success'){

      searchList.innerHTML = "";
      let favs = getFavs();

      // creating a list of elements for search results & adding event listeners

      for(let i = 0; i < data.results.length; i++){

          let itemBar = document.createElement('div');
          itemBar.className = "search-item-bar";
          itemBar.setAttribute('id', `${data.results[i].id}`);

          let heroName = document.createElement('div');
          heroName.innerHTML = data.results[i].name;
          heroName.addEventListener('click', viewHeroDetails); // adding event listener to superhero names in search list
          itemBar.appendChild(heroName); // adding heroname to the item bar

          let option = document.createElement('div');

          // if the superhero is already present in favourites then this action takes place
          if(favs.includes(data.results[i].id)){

            option.innerHTML = "Remove From Favourites";
            option.addEventListener('click', removeFromFavourites);  
          }
          // if the superhero is not present in favourites then this action takes place
          else{

            option.innerHTML = "Add To Favourites";
            option.addEventListener('click', addToFavourites);  
          }

          itemBar.appendChild(option); // adding option to the item bar
          searchList.appendChild(itemBar); // adding item bar to the search list
      }

    }

    else{

      await clearResults();
    }
  }
}

// fetch results from the api

async function fetchApiData(url){

  try{
      let response = await fetch(url);
      let data = await response.json();
      return data;  
  }catch(err){
    await clearResults();
  }

}

// clearing the search list, when user erases all alphabets in the search input box

async function clearResults(){

  let i = searchList.childNodes.length;

  while(i--){
    searchList.removeChild(searchList.lastChild);
  }

}

// redirecting to superhero details page if a user clicks on the name of superhero in the search list
// this page opens in the same tab

async function viewHeroDetails(e){

  let path = `${window.location.pathname} + /../details.html#id=${e.target.parentElement.id}`;
  window.open(path,"_self");

}

// adding a superhero to favourites by option in the search list

async function addToFavourites(e){

  let id = e.target.parentElement.id;
  let favs = getFavs();

  if(!favs.includes(id)){
    favs.push(id);
  }

  localStorage.setItem('favouriteSection', JSON.stringify(favs));
  e.target.innerHTML = 'Remove From Favourites';
  e.target.removeEventListener('click', addToFavourites);
  e.target.addEventListener('click', removeFromFavourites);
  
}

// removing a superhero from favourites by option in the search list

async function removeFromFavourites(e){

  let id = e.target.parentElement.id;
  let favs = getFavs();

  let updatedFavs = favs.filter(function(val){
    return val != id;
  })
  localStorage.setItem('favouriteSection', JSON.stringify(updatedFavs));
  e.target.innerHTML = 'Add To Favourites';
  e.target.removeEventListener('click', removeFromFavourites);
  e.target.addEventListener('click', addToFavourites);

}

// extracting list of favourite superhero id's from local storage

function getFavs(){

  let favs;
  if(localStorage.getItem('favouriteSection') === null){ // favourite section is present in the favourite page
    favs = [];
  }
  else{
    favs = JSON.parse(localStorage.getItem('favouriteSection'));
  }
  return favs; 
}
