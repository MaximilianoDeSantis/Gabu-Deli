

const APIKEY = "7ff355ffe0f6438eb8f70770de2957d9"; // La Api tiene un limite de peticiones
const cart = [];
const searchInput = document.getElementById("search-input"); 
const modalBtnComprar = document.getElementById("modal-btn-comprar"); 
const modalBtnLimpiar = document.getElementById("modal-btn-limpiar"); 

let data;

const checkLocalCart = localStorage.getItem('cart');





// Trae la informacion guardada sobre el carro de compras en local storage
if (checkLocalCart) {
    data = JSON.parse(checkLocalCart)
    let a = [... data].map ( item => {
        cart.push(item) 
     })
}

// Funciones de botones pre seteados
const buttons = {
    "btn-popular": (id) => {
        buttonActiveControl(id)
        getPopular()
        displayCards(data)
    },
    "btn-vegetariana": (id) => {
        buttonActiveControl(id)
        getVegetarian()
        displayCards(data)
    },
    "btn-italiana": (id) => {
        buttonActiveControl(id)
        getItaliana()
        displayCards(data)
    },
    "btn-americana": (id) => {
        buttonActiveControl(id)
        getAmericana()
        displayCards(data)
    },
    "btn-thai": (id) => {
        buttonActiveControl(id)
        getThai()
        displayCards(data)
    },
    "btn-japonesa": (id) => {
        buttonActiveControl(id)
        getJaponesa()
        displayCards(data)
    },
    "btn-cart": (id) => {
        displayCardsInCart(cart);
    },
    "modal-btn-limpiar": (id) => {
        cart.splice(0, cart.length);
        actualizarLocalStorageCart();
    },
    "modal-btn-comprar": (id) => {
        (cart.length > 0) ? compraFinalizadaConExito() : compraErronea();
    },
}



// Agrega al carro la card clickeada y cheque si ya hay existencia y en ese caso aumenta su cantidad
const agregarAlCarro = (obj) => {
    let existe = cart.some((el) => el.id === obj.id);
    if (!existe) {
        obj.cantidad = 1
        cart.push(obj)
    } else {
        obj.cantidad++
    }
    actualizarLocalStorageCart();
}

const quitarDelCarro = (obj) => {
   // let existe = cart.some((el) => el.id === obj.id);
   if (cart[cart.indexOf(obj)].cantidad > 1) {
    cart[cart.indexOf(obj)].cantidad--;
    actualizarLocalStorageCart();
    displayCardsInCart();
   } else {
    cart.splice(cart.indexOf(obj), 1);
    actualizarLocalStorageCart();
    displayCardsInCart();
   }


}

const actualizarLocalStorageCart = () => {
    localStorage.setItem('cart', JSON.stringify(cart)) // actualizar local storage
}




// Fetchs y Guardar en LocalStorage porque la API tiene un maximo diario de peticiones
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
        const api = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY}&cuisine=Italian`);
        data = await api.json();
        localStorage.setItem('italiana', JSON.stringify(data.results))
        console.log("USADA LA API ITALIANA")
    }  
}
const getAmericana = async () => {
    const checkLocal = localStorage.getItem('americana');
    if (checkLocal) {
        data = JSON.parse(checkLocal)
    }
    else {
        const api = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY}&cuisine=american`);
        data = await api.json();
        localStorage.setItem('americana', JSON.stringify(data.results))
        console.log("USADA LA API AMERICANA")
    }  
}
const getThai = async () => {
    const checkLocal = localStorage.getItem('thai');
    if (checkLocal) {
        data = JSON.parse(checkLocal)
    }
    else {
        const api = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY}&cuisine=thai`);
        data = await api.json();
        localStorage.setItem('thai', JSON.stringify(data.results))
        console.log("USADA LA API THAI")
    }  
}
const getJaponesa = async () => {
    const checkLocal = localStorage.getItem('japonesa');
    if (checkLocal) {
        data = JSON.parse(checkLocal)
    }
    else {
        const api = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY}&cuisine=japanese`);
        console.log(api)
        data = await api.json();
        console.log(data)
        localStorage.setItem('japonesa', JSON.stringify(data.results))
        console.log("USADA LA API JAPONESA")
    }  
}
const getBusqueda = async (busqueda) => {
    console.log(`FETCH ${busqueda}`)
    const checkLocal = localStorage.getItem(`${busqueda}`);
    if (checkLocal) {
        data = JSON.parse(checkLocal)
    }
    else {
        const api = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY}&query=${busqueda}`);
        console.log(api)
        data = await api.json();
        console.log(`DATA ${data}`)
        localStorage.setItem(`${busqueda}`, JSON.stringify(data.results))
        console.log(`DATA RESULTS ${data.results}`)

    }  
}


// Construir y mostrar CARDs
const displayCards = (data) => {
    const root = document.getElementById(`display`)
    root.innerHTML = "";

    if (data.length) {
        data.map(recipe =>{
            root.innerHTML += `
                <div id="plato-${recipe.id}" class="card shadow-sm p-1" style="width: 18rem;">
                    <img class="card-img-top" src="${recipe.image}" alt="${recipe.title}">
                    <div class="card-body">
                        <h5 class="card-title">${recipe.title}</h5>
                    <a id="btnCompra-${recipe.id}" href="#" class="btn btn-primary align-self-end">Agregar al carro</a>
                    </div>
                </div>`    
        })

        // Listener de botones dinamicos de las card
        data.map(btn => {
            document.getElementById(`btnCompra-${btn.id}`).addEventListener("click",e => {
            agregarAlCarro(btn)
            })
        })
    }

    else {
        root.innerHTML = `<h2> No se encuentras recetas </h2>`
    }
}

// Muestra en el carro de compras lo seleccionado
const displayCardsInCart = (data) => {
    const modalBodyDisplay = document.getElementById("modal-body-display"); 
    modalBodyDisplay.innerHTML = "";
    cart.map(recipe =>{
        modalBodyDisplay.innerHTML +=            
            `
            <div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
              <div class="col-md-4">
                <img src="${recipe.image}" class="img-fluid rounded-start" alt="${recipe.title}">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${recipe.title}</h5>
                  <p class="card-text"><small class="text-muted">Cantidad: ${recipe.cantidad}</small></p>
                  <a id="btnEliminar-${recipe.id}" href="#" class="btn btn-primary align-self-end">Eliminar</a>
                </div>
              </div>
            </div>
          </div>` 
    })

    cart.map(btn => {
        document.getElementById(`btnEliminar-${btn.id}`).addEventListener("click", e=> {
            quitarDelCarro(btn)
        })
    })
}


// Control de botones clikeados de busqueda
document.addEventListener('click', e => {
    if (buttons.hasOwnProperty(e.target.id)) {
        buttons[e.target.id](e.target.id)
    }
})








// Controlar el estado activo del boton clickeado 
const buttonActiveControl = (id) => {
    const botonesFiltro = document.querySelectorAll(".boton-filtro");
    let a = [... botonesFiltro].map(e => {
        if (e.classList.contains("btn-primary")) {
            e.classList.remove("btn-primary")
            e.classList.add("btn-dark")
        }     
})
    document.getElementById(id).classList.remove("btn-dark")
    document.getElementById(id).classList.add("btn-primary")
}

const compraFinalizadaConExito = () => {
    // MENSAJE FINALIZACION COMPRA
    Swal.fire(
        'Compra realizada con exito!',
        'Muchas gracias por su compra.',
        'success'
    )
    cart.splice(0, cart.length);
    actualizarLocalStorageCart();  
}
    
const compraErronea = () => {
    // MENSAJE ERROR EN COMPRA
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No tiene elementos en el carro de compras',
      })
}




// Input de busqueda
searchInput.addEventListener("change", e => {
    getBusqueda(e.target.value);
    searchInput.value =""
    displayCards(data)
})



