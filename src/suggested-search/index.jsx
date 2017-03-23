import React from 'react';

const KEY_ENTER = 13;
const KEY_ESCAPE = 27;
const KEY_UP = 38;
const KEY_DOWN = 40;

export default class SuggestedSearch extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchValue: props.search || '',
            activeIndex: -1
        };

        this.keyDownHandlers = {
            [KEY_ESCAPE]: () => {
                this.clearSearchInput();
            },
            [KEY_DOWN]: (event) => {
                event.preventDefault();
                this.selectNextResult();
            },
            [KEY_UP]: (event) => {
                event.preventDefault();
                this.selectPreviousResult();
            }
        };
    }

    itemMatchesSearch(item) {
        const searchValue = this.state.searchValue.toLowerCase();

        return searchValue && item.name.toLowerCase().indexOf(searchValue) > -1;
    }

    resultsMatchingSearch() {
        return this.props.items.filter((item) => this.itemMatchesSearch(item));
    }

    itemStartsWithSearchTerm(item) {
        return item.name.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) === 0;
    }

    resultsStartingWithSearchTerm(results) {
        return results.filter((result) => this.itemStartsWithSearchTerm(result));
    }

    remainingResults(matchingResults, resultsStartingWithSearchTerm) {
        return matchingResults.filter((item) => resultsStartingWithSearchTerm.indexOf(item) === -1);
    }

    alphabeticallyOrder(list) {
        return list.sort((itemA, itemB) => itemA.name.localeCompare(itemB.name));
    }

    orderedResults() {
        if (this.state.searchValue.length < 2) {
            return [];
        }
        const resultsMatchingSearch = this.resultsMatchingSearch();

        const resultsStartingWithSearchTerm = this.resultsStartingWithSearchTerm(resultsMatchingSearch);

        const remainingResults = this.remainingResults(resultsMatchingSearch, resultsStartingWithSearchTerm);

        const allResults = this.alphabeticallyOrder(resultsStartingWithSearchTerm).concat(this.alphabeticallyOrder(remainingResults));

        return allResults;
    }

    shouldShowError(orderedResults) {
        return orderedResults.length === 0 && this.state.searchValue.length >= 2;
    }

    handleChange(event) {
        if (event.target) {
            this.setState({
                searchValue: event.target.value,
                activeIndex: -1
            });
        }
    }

    selectNextResult() {
        const orderedResults = this.orderedResults();

        if (this.state.activeIndex < orderedResults.length - 1) {
            this.setState({ activeIndex: this.state.activeIndex + 1 });
        }
    }

    selectPreviousResult() {
        if (this.state.activeIndex > -1) {
            this.setState({ activeIndex: this.state.activeIndex - 1 });
        }
    }

    handleKeyDown(event) {
        const handler = this.keyDownHandlers[event.keyCode];

        if (handler) {
            handler(event);
        }
    }

    handleInputKeyDown(event) {
        if (event.keyCode === KEY_ENTER) {
            event.preventDefault();
        }

        this.handleKeyDown(event);
    }

    clearSearchInput() {
        this.setState({ searchValue: '' });
    }

    searchResultID(index) {
        return `search-result-${index}`;
    }

    renderResultsError() {
        const errorMessageTemplate = this.props.errorMessage || 'Sorry, there are no search results for {{search}}';

        const errorMessage = errorMessageTemplate.replace(/{{search}}/g, this.state.searchValue);

        return <div className="well well-sm">{errorMessage}</div>;
    }

    renderResultsList(orderedResults) {
        const renderedResults = orderedResults.map((result, index) => this.renderResultLink(result, index));

        let activeDescendant = null;

        if (this.state.activeIndex > -1) {
            activeDescendant = this.searchResultID(this.state.activeIndex);
        }

        return (
            <div
                id="search-results-list"
                aria-activedescendant={activeDescendant}
                className="list-group"
                role="listbox">
              {renderedResults}
            </div>
        );
    }

    renderResultLink(item, index) {
        if (item.url) {
            const isActive = index === this.state.activeIndex;

            const className = `list-group-item ${isActive ? ' active' : ''}`;

            return <a
                id={this.searchResultID(index)}
                className={className}
                role="option"
                href={item.url}
                onKeyDown={(event) => this.handleKeyDown(event)}
                key={index}
            >{item.name}</a>;
        }

        return item.name;
    }

    renderResults() {
        const orderedResults = this.orderedResults();

        return (
            <div role="region" id="search-results" aria-live="polite" >
               { this.shouldShowError(orderedResults) ? this.renderResultsError() : this.renderResultsList(orderedResults)}
            </div>
        );
    }

    renderSearchButton() {
        return (
            <i className="glyphicon glyphicon-search" aria-hidden="true"></i>
        );
    }

    renderClearButton() {
        return (
            <button
                key="clear-button"
                type="button"
                onClick={() => this.clearSearchInput()}
                className="btn btn-default clear">
                <span className="hidden">Clear input</span>
                <i className="glyphicon glyphicon-remove-sign" aria-hidden="true"></i>
            </button>
        );
    }

    renderIcon() {
        return this.state.searchValue.length > 0 && !this.props.search
            ? this.renderClearButton()
            : this.renderSearchButton();
    }

    render() {
        return (
            <form action="" method="get" className="" role="search">
                <label htmlFor="search" className="hidden" id="search-input">{this.props.label}</label>
                <input
                    type="text"
                    name="search"
                    className="form-control input-lg"
                    placeholder={this.props.placeholder}
                    onChange={(event) => this.handleChange(event)}
                    onKeyDown={(event) => this.handleInputKeyDown(event)}
                    value={this.state.searchValue}
                    autoCapitalize="off"
                    autoComplete="off"
                    autoCorrect="off"
                    aria-label="Search"
                    aria-haspopup="true"
                    role="combobox"
                    aria-autocomplete="both"
                    aria-controls="search-results"
                >
                </input>
                {this.renderIcon()}
                {this.renderResults()}
            </form>
        );
    }

    componentDidUpdate() {

        const list = document.getElementById('search-results-list');

        if (list) {
            const activeDescendant = document.getElementById(list.getAttribute('aria-activedescendant'));

            if (activeDescendant) {
                activeDescendant.focus();
            } else {
                const input = document.getElementById('search-input');

                if (input) {
                    input.focus();
                }
            }
        }
    }
}

SuggestedSearch.displayName = 'SuggestedSearch';

SuggestedSearch.propTypes = {
    search: React.PropTypes.string,
    items: React.PropTypes.array.isRequired,
    label: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    errorMessage: React.PropTypes.string
};
