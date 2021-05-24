const recipeContainer = document.querySelector('.recipe');
const resultsContainer = document.querySelector('.results');
const searchForm = document.querySelector('.searchForm');
let resultsPerPage = 10;
let currentPage = 1;

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/api/get?rId=47746

///////////////////////////////////////

const showSpinner = function(parentElement){
  let html = `<div class="spinner">
  <svg>
    <use href="src/img/icons.svg#icon-loader"></use>
  </svg>
</div>`;

parentElement.innerHTML = '';
parentElement.insertAdjacentHTML('afterbegin', html)
}

const displayRecipe = async function()
{
  try
  {
    let id = location.hash.slice(1);

    showSpinner(recipeContainer);

    const response = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`);

    if(!response.ok){
      throw new Error(`${response.statusText} (${response.status})`);
    }

    const data = await response.json();
    
    let recipe = data.recipe;
    recipe = {
      imageURL: recipe.image_url,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      recipeId: recipe.recipe_id,
      socialRank: recipe.social_rank,
      sourceURL: recipe.source_url,
      title: recipe.title
    }
    console.log(recipe);

    const html = `
    <div class="recipeBlock">
    <div class="recipeImage">
      <img src="${recipe.imageURL}">
    </div>

    <div class="recipeName">
      <h1>${recipe.title}.</h1>
    </div>

    <div class="tsb">
      <div class="timeAndServings">
        <div class="duration">
          <svg class="clockIcon icon">
            <use href="src/img/icons.svg#icon-clock"></use>
          </svg>
          <span class="durationNumber">30</span>
          &nbsp;Minutes
        </div>
        <div class="servings">
          <svg class="usersIcon icon">
            <use href="src/img/icons.svg#icon-users"></use>
          </svg>
          <span class="servingsNumber">4</span>
          &nbsp;Servings
          <div class="plusAndMinus">
            <svg class="plusIcon icon">
              <use href="src/img/icons.svg#icon-plus-circle"></use>
            </svg>
            <svg class="minusIcon icon">
              <use href="src/img/icons.svg#icon-minus-circle"></use>
            </svg>

          </div>
        </div>
      </div>

      <div class="bookmarkIcon">
        &nbsp;
        <svg class="bookmarkIconSvg icon">
          <use href="src/img/icons.svg#icon-bookmark"></use>
        </svg>
      </div>
    </div>

    <div class="ingredientsBlock">
      <h2>RECIPE INGREDIENTS.</h2>
      <ul class="ingredients">
        ${recipe.ingredients.map(ing => {
          return `<li class="ingredient"><svg class="recipeIcon icon"><use href="src/img/icons.svg#icon-check"></use></svg><div class="recipeDescription">${ing}</div></li>`;
        }).join('')}
      </ul>
    </div>

    <div class="howToCook">
      <h2>HOW TO COOK IT</h2>

      <p class="howToCookText">
        This recipe was carefully designed and tested by
        <span class="recipePublisher">${recipe.publisher}</span>. Please check out
        directions at their website.
      </p>

      
      <a class="recipeLink" href="${recipe.sourceURL}" target="_blank">
          <button class="recipeLinkButton">
          DIRECTIONS
          <svg class="recipeLinkButtonSvg icon">
            <use href="src/img/icons.svg#icon-arrow-right"></use>
          </svg>
          </button>
        </a>
    </div>
  </div>
    `;
    
    recipeContainer.innerHTML = '';
    recipeContainer.insertAdjacentHTML('afterbegin', html) 
  

  }catch(err){
    alert(err);
  }
};
// displayRecipe();


const displayResults = function(recipes){

// console.log(resultsPerPage);

  recipes.forEach(recipe => {
    let html = `<li class="result">
    <a href="#${recipe.recipe_id}" class="resultLink">
      <div class="resultImage">
        <img src="${recipe.image_url}">
      </div>
      <div class="resultData">
        <h4 class="resultTitle">${recipe.title}.</h4>
        <p class="resultPublisher">${recipe.publisher}</p>
      </div>
    </a>
    </li>`;

  resultsContainer.insertAdjacentHTML('afterbegin', html);

  });
  
}

const controlPagination = function(recipes, numberOfResults, numberOfPages){
  // displayResults(recipes);
  // if()


}

const search = async function(recipeName)
{
  try{
    let dataRes = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${recipeName}`);
    if(!dataRes.ok){
      throw new Error(`Can't find the requested recipe :-(`)
    }
    let data = await dataRes.json();
    let {recipes} = data;
    let numberOfResults = data.count;
    let numberOfPages = Math.ceil(numberOfResults/resultsPerPage);

    // console.log(data)
    // console.log(numberOfResults)
    // console.log(numberOfPages)
    // console.log(recipes);
    controlPagination(recipes, numberOfResults, numberOfPages)
    // displayResults(recipes);
  }
  catch(error){
  // console.log(error.message)
    alert(error.message);
  }

}
// search();
searchForm.addEventListener('submit', function(e){
  e.preventDefault();
  
  const recipeName = document.querySelector('.searchField').value;

  search(recipeName);

  document.querySelector('.searchField').value = '';
  document.querySelector('.searchField').blur();
  
  console.log(recipeName);
})

//link click
window.addEventListener('hashchange', displayRecipe)

