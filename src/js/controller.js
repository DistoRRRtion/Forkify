import * as model from './model.js'; 
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeView.js';  
import searchView from './views/searchView.js'; 
import resultsView from './views/resultsView.js'; 
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js'; 

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

const controlRecipe = async function() {
  try {
    const id = window.location.hash.slice(1);
    if(!id) return;

    recipeView.renderSpinner();

    // 0) Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

    // 1) updating bookmark view
    bookmarksView.update(model.state.bookmarks);
    
    // 2) load recipe
    await model.loadRecipe(id); // ❌ async ф-ция вернет ПРОМИС!!! - поэтому нам нужно его обработать "await" всякий раз когда мы вызыв асик ф-цию
    
    // 3) rendering recipe
    recipeView.render(model.state.recipe);

  } catch (err) {
    recipeView.renderError();
    console.error(err)
  }
};

const controlSearchResult = async function() {
  try {
    resultsView.renderSpinner();

    // 1) get search query;
    const query = searchView.getQuery();
    if(!query) return;

    // 2) load serch results
    await model.loadSearchResults(query); 

    // 3) render 10 results 
    resultsView.render(model.getSearchResultsPage());

    // 4) render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlPagination = function(goToPage) { 
  // 1) render NEW results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2) render NEW pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function(newServings) {
  // update the recipe servings
  model.updateServings(newServings);

  // update the recipe view
  recipeView.update(model.state.recipe);
};

const controlAddBokmark = function() {
  // 1) add or remove bookmarks
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe)
  else model.deleteBookmark(model.state.recipe.id);

  // 2) update recipe view
  recipeView.update(model.state.recipe);

  // 3) Render bookmarks
  bookmarksView.render(model.state.bookmarks)
};

const controlBookmarks = function() {
  bookmarksView.render(model.state.bookmarks)
};

const controlAddRecipe = async function(newRecipe) {
  try {
    // show loading speener
    addRecipeView.renderSpinner();

    // upload a new recipe
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    // render recipe
    recipeView.render(model.state.recipe);

    // seccses mesage
    addRecipeView.renderMessage();

    // render bookmarkView
    bookmarksView.render(model.state.bookmarks);

    // change id in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`); // pushState -> позволяет нам изменить URL без перезагруз страницы
 
    // close form window
    setTimeout(function() {
      addRecipeView.toggleWindow()
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error("❌", err);
    addRecipeView.renderError(err.message);
  }
};

// 🔥 publisher - subscriber patern
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBokmark);
  searchView.addHendlerSearch(controlSearchResult);
  paginationView.addHeandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
