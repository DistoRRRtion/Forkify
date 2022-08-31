import View from './View.js';
import icons from 'url:../../img/icons.svg'; // загружаем иконки
 
class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHeandlerClick(heandler) {
    this._parentElement.addEventListener('click', function(e) {
      const btn = e.target.closest('.btn--inline');

      if(!btn) return;

      const goToPage = +btn.dataset.goto;
      heandler(goToPage);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);

    const nextBtn = `
      <button data-goto="${currentPage + 1}" class="btn--inline pagination__btn--next">
        <span>Page ${currentPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
    `;

    const prevBtn = `
      <button data-goto="${currentPage - 1}" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg> 
        <span>Page ${currentPage - 1}</span>
      </button> 
    `;

    // ⏺ ➡️
    if (currentPage === 1 && numPages > 1) {
      return nextBtn;
    };

    // ⬅️ ⏺
    if (currentPage === numPages && numPages > 1) {
      return prevBtn;
    }; 

    // ⬅️ ⏺ ➡️
    if (currentPage < numPages) {
      const other = prevBtn + nextBtn;
      return other;
    };

    // ⏺
    return '';
  }
}

export default new PaginationView();