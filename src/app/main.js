const APIKEY = "7ff355ffe0f6438eb8f70770de2957d9"; // La Api tiene un limite de peticiones


const searchInput = document.getElementById("search-input"); 
let data;




// Fetchs
const getPopular = async () => {
    const checkLocal = localStorage.getItem('popular');

    if (checkLocal) {
       data = JSON.parse(checkLocal)
    }
    else {
        const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${APIKEY}&number=9`);
        data = await api.json();
        localStorage.setItem('popular', JSON.stringify(data.recipes))
        console.log("USADA LA API POPULAR")
    }  
}

const getVegetarian = async () => {
    const checkLocal = localStorage.getItem('vegetariano');
    if (checkLocal) {
        data = JSON.parse(checkLocal)
    }
    else {
        const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${APIKEY}&number=9&tags=vegetarian`);
        data = await api.json();
        localStorage.setItem('vegetariano', JSON.stringify(data.recipes))
        console.log("USADA LA API VEGETARIANO")
    }  
}

const getItaliana = async () => {
    const checkLocal = localStorage.getItem('italiana');
    if (checkLocal) {

        data = JSON.parse(checkLocal)

    }
    else {
        const api = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY}&number=9&cuisine=italiana`);
        data = await api.json();
        localStorage.setItem('italiana', JSON.stringify(data.recipes))
        console.log("USADA LA API ITALIANA")
    }  
}

const getAmericana = async () => {
    const checkLocal = localStorage.getItem('americana');
    if (checkLocal) {
        data = JSON.parse(checkLocal)
    }
    else {
        const api = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY}&number=9&cuisine=american`);
        data = await api.json();
        localStorage.setItem('americana', JSON.stringify(data.recipes))
        console.log("USADA LA API AMERICANA")
    }  
}

const getThai = async () => {
    const checkLocal = localStorage.getItem('thai');
    if (checkLocal) {
        data = JSON.parse(checkLocal)
    }
    else {
        const api = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY}&number=9&cuisine=thai`);
        data = await api.json();
        localStorage.setItem('thai', JSON.stringify(data.recipes))
        console.log("USADA LA API THAI")
    }  
}
const getJaponesa = async () => {
    const checkLocal = localStorage.getItem('japonesa');
    if (checkLocal) {
        data = JSON.parse(checkLocal)
    }
    else {
        const api = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY}&number=9&cuisine=japanese`);
        data = await api.json();
        localStorage.setItem('japonesa', JSON.stringify(data.recipes))
        console.log("USADA LA API JAPONESA")
    }  
}



// Construir CARDs

const displayCards = (data) => {
    const root = document.getElementById(`display`)
    console.log(root)

    dataPopular.map(recipe =>{
        console.log(recipe.title)
        root.innerHTML += `
            <div class="card shadow-sm p-1" style="width: 18rem;">
                <img class="card-img-top" src="${recipe.image}" alt="${recipe.title}">
                <div class="card-body">
                    <h5 class="card-title">${recipe.title}</h5>
                <a href="#" class="btn btn-primary">Agregar al carro</a>
                </div>
            </div>`

    })

}



// Input de busqueda

searchInput.addEventListener("change", e => {
    console.log(searchInput.value)
    searchInput.value =""
})
