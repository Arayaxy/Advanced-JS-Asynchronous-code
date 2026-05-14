// //RESUELVE TUS EJERCICIOS AQUI
// Utiliza la API (https://dog.ceo/dog-api/) para resolver estos ejercicios.


// - [ ] 1.- Declara una funcion  **getAllBreeds** que devuelva un array de strings con todas las razas de perro.
const getAllBreeds = async () => {
    const respuesta = await fetch("https://dog.ceo/api/breeds/list/all")
    const data = await respuesta.json();

    const razas = Object.keys(data.message);

    return razas
}

// - [ ] 2.- Declara una función **getRandomDog** que obtenga una imagen random de una raza.

const getRandomDog = async () => {
    const respuesta = await fetch("https://dog.ceo/api/breeds/image/random")
    const data = await respuesta.json();

    return data.message
}
// - [ ] 3.- Declara una función **getAllImagesByBreed** que obtenga todas las imágenes de la raza komondor.

const getAllImagesByBreed = async () => {
    const respuesta = await fetch("https://dog.ceo/api/breed/komondor/images")
    const data = await respuesta.json();

    return data.message
}

// - [ ] 4.- Declara una funcion **getAllImagesByBreed2(breed)** que devuelva las imágenes de la raza pasada por el argumento

const getAllImagesByBreed2 = async (raza) => {
    const respuesta = await fetch(`https://dog.ceo/api/breed/${raza}/images`)
    const data = await respuesta.json()

    return data.message
}

// ### GitHub API (I) - ¿Quieres saber mi información? Aquí la tienes ###

// - [ ] 5.- Declarara una función **getGitHubUserProfile(username)** que obtenga el perfil de usuario de github a partir de su 
// nombre de usuario. (https://api.github.com/users/{username}).

const getGitHubUserProfile = async (username) => {
    const usuario = await fetch(`https://api.github.com/users/${username}`)
    const data = await usuario.json()

    return data;
}
// - [ ] 6.- Declara una función **printGithubUserProfile(username)** que reciba como argumento el nombre de un usuario (username), retorne {img, name} y pinte la foto y el nombre en el DOM.
const printGithubUserProfile = async (username) => {
    const usuario = await getGitHubUserProfile(username)
    const perfil = {
        img: usuario.avatar_url,
        name: usuario.name || usuario.login
    }
    document.body.innerHTML += `
        <img src="${perfil.img}" alt="imagen de usuario">
        <h1>${perfil.name}</h1>
    `;
    return perfil
}

// - [ ] 7. Crea una función **getAndPrintGitHubUserProfile(username)** que contenga una petición a la API
//  para obtener información de ese usuario y devuelva un string que represente una tarjeta HTML como en el ejemplo,
//  la estructura debe ser exactamente la misma:
const getAndPrintGitHubUserProfile = async (username) => {
    const usuario = await getGitHubUserProfile(username);

    return `<section>
        <img src="${usuario.avatar_url}" alt="${usuario.name || usuario.login}">
        <h1>${usuario.name || usuario.login}</h1>
        <p>Public repos: ${usuario.public_repos}</p>
    </section>`;
};
// ```html
// <section>
//     <img src="url de imagen" alt="imagen de usuario">
//     <h1>Nombre de usuario</h1>
//     <p>Public repos: (número de repos)</p>
// </section>
// ```

// - [ ] 8.- Manipulación del DOM: Crea un input de tipo texto, y un botón buscar. 
// El usuario escribirá en el input el nombre de usuario de GitHub que quiera buscar.
//  Después llamaremos a la función **getAndPrintGitHubUserProfile(username)** que se ejecute cuando se pulse el botón buscar.
// (Esto no se testea).
addEventListener
const input = document.createElement("input");
const boton = document.createElement("button")
const contenedor = document.createElement("div")

boton.textContent = "Buscar"
input.placeholder = "Escribe un usuario de GitHub"


document.body.appendChild(input)
document.body.appendChild(boton)
document.body.appendChild(contenedor)

boton.addEventListener("click", async () => {
    const usuario = input.value;

    const tarjeta = await getAndPrintGitHubUserProfile(usuario);

    contenedor.innerHTML = tarjeta
})

// ### GitHub API (II)- Promesas, promesas y más promesas ###

// - [ ] 9.- Dada una lista de usuarios de github guardada en una array,crea una funcion **fetchGithubUsers(userNames)**
//  que utilice 'https://api.github.com/users/${name}' para obtener el nombre de cada usuario. \
// Objetivo: Usar Promise.all()\
// Recordatorio: Una llamada a fetch() devuelve un objeto promesa.\
// Pregunta. ¿cuántas promesas tendremos?

// Hasta que no se resuelvan todas las promesas desencadenadas por cada fetch(), no se cargarán los datos.

// Pasos:

// - Mapear el array y hacer un fetch() para cada usuario. Esto nos de vuelve un array lleno de promesas.
// - Con Promise.all() harás que se tenga que resolver todo el proceso de peticiones a GitHub a la vez.
// - Cuando Promise.all() haya terminado:
// Consigue que se imprima por consola la url del repositorio de cada usuario.
// // Consigue que se imprima por consola el nombre de cada usuario.

async function fetchGithubUsers(userNames) {
    const promesas = userNames.map((name) => {
        return fetch(`https://api.github.com/users/${name}`);
    });

    const respuestas = await Promise.all(promesas);

    const promesasJson = respuestas.map((respuesta) => {
        return respuesta.json();
    });

    const usuarios = await Promise.all(promesasJson);

    const resultado = usuarios.map((usuario) => {
        return {
            name: usuario.name || usuario.login,
            url: usuario.repos_url,
            
        };
    });

    resultado.forEach((usuario) => {
        console.log(usuario.repos_url);
        console.log(usuario.name);
    });

    return resultado;
}