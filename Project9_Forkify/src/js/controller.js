const recipeContainer = document.querySelector('.recipe');
const resultsContainer = document.querySelector('.results');
const searchForm = document.querySelector('.searchForm');
const bookmarksBlock = document.querySelector('.bookmarks');
const bookmarksButton = document.querySelector('.bookmarksButton');
const addRecipeButton = document.querySelector('.addRecipeButton');
const addBookmark = document.querySelector('.bookmarkIcon');
const pagination = document.querySelector('.pagination');

const resultsPerPage = 10;
let currentPage = 1;
let recipe;
let bookmarks = [];
let recipes;
let numberOfPages;
let numberOfResults;


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
    
    recipe = data.recipe;
    recipe = {
      imageURL: recipe.image_url,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      recipeId: recipe.recipe_id,
      socialRank: recipe.social_rank,
      sourceURL: recipe.source_url,
      title: recipe.title
    }
    // console.log(recipe);

    const html = `
    <div class="recipeBlock">
    <div class="recipeImage">
      <img src="${recipe.imageURL}">
    </div>

    <div class="recipeName">
      <h1>${recipe.title}.</h1>
    </div>

    <div class="bookmarkIcon">
    <svg class="bookmarkIconSvg icon">
    <use href="src/img/icons.svg#icon-bookmark"></use>
      </svg>
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
    recipeContainer.insertAdjacentHTML('afterbegin', html);

  
  }catch(err){
    // alert(err);
    console.log(err)
  }
};
// displayRecipe();


const displayResults = function(recipes){

// console.log(resultsPerPage);
resultsContainer.innerHTML = '';
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

// const controlPagination = function(recipes, numberOfResults, numberOfPages){
//   // displayResults(recipes);
//   // if()


// }

const search = async function(recipeName)
{
  try{
    showSpinner(resultsContainer);
    let dataRes = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${recipeName}`);
    if(!dataRes.ok){
      throw new Error(`Can't find the requested recipe :-(`)
    }
    let data = await dataRes.json();
    // console.log(data)
    recipes = data.recipes;
    
    // console.log(data)
    // console.log(numberOfResults)
    // console.log(numberOfPages)
    // console.log(recipes);
    // controlPagination(recipes, numberOfResults, numberOfPages)
    // displayResults(recipes);
    numberOfResults = data.count;
    numberOfPages = Math.ceil(numberOfResults/resultsPerPage);
    controlPagination();
  }
  catch(error){
  console.log(error)
    // alert(error.message);
    resultsContainer.innerHTML = '';
  }

}
// search();
searchForm.addEventListener('submit', function(e){
  e.preventDefault();
  
  const recipeName = document.querySelector('.searchField').value;

  search(recipeName);

  document.querySelector('.searchField').value = '';
  document.querySelector('.searchField').blur();
  
})

//link click
window.addEventListener('hashchange', displayRecipe)


bookmarksButton.addEventListener('click', function(e){
  e.preventDefault();
  bookmarksBlock.classList.toggle('hidden');
  // console.log('bookmarks');
});

addRecipeButton.addEventListener('click', () => alert("This feature will be implemented soon :-)"));

//bookmarks feature
const updateBookmarks = function(){
  if(!bookmarks.length == 0)
  {
    bookmarksBlock.innerHTML = '';
    bookmarks.forEach(function(bookmark){
      let html = `<li class="result">
      <a href="#${bookmark.recipeId}" class="resultLink">
        <div class="resultImage">
          <img src="${bookmark.imageURL}">
        </div>
        <div class="resultData">
          <h4 class="resultTitle">${bookmark.title}.</h4>
          <p class="resultPublisher">${bookmark.publisher}.</p>
        </div>
      </a>
    </li>`;

    bookmarksBlock.insertAdjacentHTML('afterbegin', html);
    })
  }else{
    bookmarksBlock.innerHTML = `<li class="message">
    <svg class="messageIcon icon">
      <use href="src/img/icons.svg#icon-alert-triangle"></use>
    </svg>
    <p>
      No bookmarks yet. Find a nice recipe and bookmark it :)
    </p>
  </li>`;
  }
}

const addOrRemoveBookmark = function(id){

  // console.log('--------------');
  let bookmarked = bookmarks.some(bookmark => {
    if(bookmark.recipeId == id){
      return true;
    }else{
      return false;
    }
  });
  // console.log(bookmarked)

  if(bookmarked){
    let index = bookmarks.findIndex(bookmark => bookmark.recipeId === id);
    bookmarks.splice(index, 1);
    alert("UnBookmarked the recipe.");
  }else{
    bookmarks.push(recipe);
    document.querySelector('.bookmarkIcon').style.backgroundColor = 'red';
    alert("Recipe bookmarked.");
  }
  updateBookmarks();
  store();
  
};

recipeContainer.addEventListener('click', function(e){
  const btn = e.target.closest('.bookmarkIcon');
  if(!btn){
    //closing bookmarks section
    // if(bookmarksBlock.classList.contains('hidden')){

    //   bookmarksBlock.classList.remove('hidden');
    //   console.log('closee')
    // }
    return;
  }
  let id = location.hash.slice(1);
  console.log(id);
  addOrRemoveBookmark(id);
})

//localstorage
const store = function(){
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  // alert("Saved")
}

const getData = function(){
  let data = JSON.parse(localStorage.getItem('bookmarks'));
  console.log(data);
  if(data)
  {
    bookmarks = data;
  }
}

//pagination
const controlPagination = function(){
  let start = (currentPage - 1) * resultsPerPage;
  let end = currentPage * resultsPerPage;
  if(currentPage<=numberOfPages){
    console.log(start, end);
    // console.log(recipes.slice(start, end));
    displayResults(recipes.slice(start, end));
  }

  //first page and some pages left
  if(currentPage === 1 && numberOfPages > currentPage){
    let html = `<button class="paginationButton" data-page="${currentPage + 1}">
    <span>Page ${currentPage + 1}</span>
    <svg class="icon paginationIcon">
      <use href="src/img/icons.svg#icon-arrow-right"></use>
    </svg>
  </button>`;

    document.querySelector('.paginationButtonLeft').innerHTML = '';
    document.querySelector('.paginationButtonRight').innerHTML = html;
    // console.log('this works')

  }


  //first page and NO pages left
  if(currentPage === 1 && numberOfPages === 0){
    return;
  }

  //Last page
  if(currentPage === numberOfPages){
    let html = `<button class="paginationButton" data-page="${currentPage - 1}">
    <svg class="icon paginationIcon">
      <use href="src/img/icons.svg#icon-arrow-left"></use>
    </svg>
    <span>Page ${currentPage - 1}</span>
  </button>`;

    document.querySelector('.paginationButtonLeft').innerHTML = html;
    document.querySelector('.paginationButtonRight').innerHTML = '';
    // console.log('this works')
  }

  //other page
  if(currentPage > 1 && currentPage < numberOfPages){
    let htmlLeft = `<button class="paginationButton" data-page="${currentPage - 1}">
    <svg class="icon paginationIcon">
      <use href="src/img/icons.svg#icon-arrow-left"></use>
    </svg>
    <span>Page ${currentPage - 1}</span>
  </button>`;

  let htmlRight = `<button class="paginationButton" data-page="${currentPage + 1}">
  <span>Page ${currentPage + 1}</span>
  <svg class="icon paginationIcon">
    <use href="src/img/icons.svg#icon-arrow-right"></use>
  </svg>
</button>`;

document.querySelector('.paginationButtonLeft').innerHTML = htmlLeft;
document.querySelector('.paginationButtonRight').innerHTML = htmlRight;

  }
  

};

pagination.addEventListener('click', function(e){
  const btn = e.target.closest('.paginationButton');
  console.log(btn.dataset.page);
  currentPage = +btn.dataset.page;
  controlPagination();
})


const init = function(){
  getData();
  updateBookmarks();
};
init();