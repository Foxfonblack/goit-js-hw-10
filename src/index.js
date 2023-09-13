import { getBreeds, getBreedByID } from "./cat-api"
import SlimSelect from "slim-select"
import 'slim-select/dist/slimselect.css'
import Notiflix from 'notiflix';


const select = document.querySelector('.breed-select')
const loader = document.querySelector('.loader')
const err = document.querySelector('.error')
const catInfo = document.querySelector('.cat-info')

loader.classList.add('show')
select.classList.add('hide')

getBreeds().then(data=>{
        console.log(data)
    const breedsMarkup = createSelectOptions(data);
select.insertAdjacentHTML('beforeend', breedsMarkup)
new SlimSelect({select:".breed-select"})
select.classList.remove('hide')
}).catch(error=>{
    console.log(error.message)
    // err.classList.add('visible')
    Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!')
 

}).finally(()=>{
    loader.classList.remove('show')
   

})
    

function createSelectOptions(arr){
    return arr.map(({id, name})=>{
        return `<option value="${id}">${name}</option>`
    }).join('')
}

select.addEventListener('change', onSelectChange)
function onSelectChange(evt){
loader.classList.add('show')
catInfo.innerHTML = "";
const index = evt.target.selectedIndex
console.log(index);
const options = evt.target.options
console.log(options);
const id = options[index].value
console.log(id);
getBreedByID(id).then(data=>{
    console.log(data[0])
const markup = createCatMarkup(data[0])
catInfo.innerHTML = markup

})
.catch(error=>{console.log(error.message)
// err.classList.add('visible')
Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!')
}).finally(()=>{
    loader.classList.remove('show')

    

})
}



function createCatMarkup({breeds, url}){
return breeds.map(item => {
    return `<img src="${url}" alt="${item.name}" width="300">
    <div class="wraper">
      <h2 class="title">${item.name}</h2>
      <p class="text">${item.description}</p>
      <p class="description"><span class="tmp">Temperament: </span>${item.temperament}</p>
    </div>`
}).join("")
}