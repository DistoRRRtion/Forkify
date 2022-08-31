import View from './View.js';
import icons from 'url:../../img/icons.svg';
 
class AddRecipeView extends View {
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _overlay = document.querySelector('.overlay');
  _window = document.querySelector('.add-recipe-window');
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was seccessfully iploaded';

  constructor() {
    super();
    this._addHeadlerShowWindow();
    this._addHeadlerCloseWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHeadlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  } 

  _addHeadlerCloseWindow() {
    this._btnClose.addEventListener('click',this.toggleWindow.bind(this));
    this._overlay.addEventListener('click',this.toggleWindow.bind(this));

  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function(e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    })
  }
};

export default new AddRecipeView();