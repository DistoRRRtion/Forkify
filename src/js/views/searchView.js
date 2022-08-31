
class SearchView {
  _parentElement = document.querySelector('.search');

  getQuery() {
    const query = this._parentElement.querySelector('.search__field').value;
    this._cleanInput();
    return query;
  }

  _cleanInput() {  
    this._parentElement.querySelector('.search__field').value = '';
  }

  addHendlerSearch(handler) {
    this._parentElement.addEventListener('submit', function(e) {
      e.preventDefault();
      handler();
    })
  }
};

export default new SearchView();