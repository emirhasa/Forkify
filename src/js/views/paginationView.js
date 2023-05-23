import icons from '../../img/icons.svg';
import View from './View.js';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (this._data.page === 1 && numPages > 1) {
      return this._generateButtonMarkup(2);
    }

    // Page 1, and  there are no other pages
    if (this._data.page === 1 && numPages === 1) {
      return '';
    }

    // Last page
    if (this._data.page === numPages) {
      return this._generateButtonMarkup(numPages - 1, false);
    }

    // Other page
    return (
      this._generateButtonMarkup(this._data.page - 1, false) +
      this._generateButtonMarkup(this._data.page + 1, true)
    );
  }

  _generateButtonMarkup(toPage, btnNext = true) {
    return `
        <button class="btn--inline pagination__btn--${
          btnNext ? 'next' : 'prev'
        }" data-page="${toPage}">
            <svg class="search__icon">
                <use href="${icons}#${
      btnNext ? 'icon-arrow-right' : 'icon-arrow-left'
    }"></use>
            </svg>
            <span>Page ${toPage}</span>
        </button>
    `;
  }

  addHandlerPaginate(handler) {
    this._parentElement.addEventListener('click', e => {
      const selectedPage = e.target.closest('button').dataset.page;

      handler(+selectedPage);
    });
  }
}

export default new PaginationView();
