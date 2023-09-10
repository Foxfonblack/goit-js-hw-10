const BASE_URL = 'https://api.thecatapi.com/v1/'
const API_KEY = 'live_mxGgBdd4VBVkgojAmiW8l3zqSX8l3ZxFJczK7c9gYUviJCcQG5rDSvxyMjNfhFed'


function getBreeds(){
return fetch(`${BASE_URL}breeds?api_key=${API_KEY}`)
.then(resp => {
    if(!resp.ok){
        throw new Error(resp.statusText)
    }
    return resp.json()
}
)
}

function getBreedByID(breedId){
return fetch(`${BASE_URL}images/search?breed_ids=${breedId}&api_key=${API_KEY}`)
.then(resp => {
    if(!resp.ok){
        throw new Error(resp.statusText)
    }
    return resp.json()
}
)
}

export {getBreeds, getBreedByID}