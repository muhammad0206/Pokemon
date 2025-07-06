const searchButton = document.getElementById("search");
const random = document.getElementById("Random");
const pokemonNameInput = document.getElementById("Pokemon-Name");
const pokemonContainer = document.getElementById("PokemonDetails");

const API_URL = "https://pokeapi.co/api/v2/pokemon/";

const displayPokemonData = (pokemonData) => {
    pokemonContainer.innerHTML = ""

    const pokemonImg = pokemonData.sprites.front_default;
    const pokemonName = pokemonData.name;
    const pokemonWeight = pokemonData.weight;
    const pokemonHeight = pokemonData.height;
    const pokemonType = pokemonData.types[0].type.name;
    const pokemonShinnyImg = pokemonData.shinnysprite;

    let shinnyPokemon = false;

    const pokemonhtml = `
    <h1 class="po">${pokemonName}</h1>
    <img id= "pokemon-Img" src="${pokemonImg}" alt="pokemon-img" class="pokemon-image"/>
    <button id="shinny">shinny</button>
    <p> weight: ${pokemonWeight / 10} kg</p>
    <p> height: ${pokemonHeight / 10} m</p>
    <p> type: ${pokemonType}</p>
    `
    pokemonContainer.innerHTML = pokemonhtml;
    const shinny = document.getElementById("shinny");
    const currentPokemonImg = document.getElementById("pokemon-Img");

    shinny.addEventListener("click", () =>{
        currentPokemonImg.src = PokemonShinnyImg ? pokemonImg : shinnyPokemon;
        shinnyPokemon = !shinnyPokemon;


    })
};

const getPokemonData = async (name) =>{
    
    try{
        const response = await fetch(API_URL + name);

        const data = await response.json();

        if(data) displayPokemonData(data)
    }

    catch (error){
        console.log("error");
    }
}

document.addEventListener("DOMContentLoaded",() =>{
    getPokemonData("vulpix");
})

// Randomly generate from 1025

searchButton.addEventListener("click", () =>{
    if(pokemonNameInput.value.trim()){
        getPokemonData(pokemonNameInput.value);
        pokemonNameInput.value = "";
    }
    else{
        alert("please enter name");
    }
});


const randomPokemon = () =>{
    const totalPokemon = 1025;
    const randomNumber = Math.floor(Math.random() * totalPokemon);
    return randomNumber === 0 ? 1 : randomNumber;
}

random.addEventListener("click", () => {
    let number = randomPokemon();
    getPokemonData(number);
})