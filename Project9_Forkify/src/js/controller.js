const recipeContainer = document.querySelector('.recipe');

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

const getRecipe = async function()
{
  try
  {
    showSpinner(recipeContainer);

    const response = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=54388`);

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
getRecipe();
