const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const container = document.querySelector('.container');
let searchQuery = '';
const APP_ID = "27cd14b0";
const APP_key = "90eeb500d9bdf29f76c271a39d92e6bb";
// console.log(container)
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector('input').value;
  fetchAPI();
})

async function fetchAPI(){
  const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=20`;
  const response = await fetch(baseURL); 
  const data = await response.json();
  generateHTML(data.hits)
  console.log(data);
}

function generateHTML(results){
  container.classList.remove('initial');
  let generatedHTML= '';
  results.map(result => {
    generatedHTML += `
      <div class="item">
        <img src="${result.recipe.image}" alt="img">
        <div class="flex-container">
          <h1 class="title">${result.recipe.label}</h1>
          <a class="view-btn" target="_blank" href="${result.recipe.url}">View Recipe</a>
        </div>
        <p class="item-data"><span>Calories:</span> ${result.recipe.calories.toFixed(2)}</p>
        <p class="item-data"><span>Diet label:</span> ${result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels : 'No Data Found'}</p>
        <p class="item-data"><span>Health labels:</span> ${result.recipe.healthLabels}</p>
      </div>
    `
  })
  searchResultDiv.innerHTML = generatedHTML;
}