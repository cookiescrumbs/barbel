import React from 'react';

class SuggestedSearch extends React.Component {

    render() {
        return (
            <div className="suggested-search">
                <form action="#" className="" role="search">
                    <label htmlFor="search" className=""></label>
                    <input
                        type="text"
                        id=""
                        className=""
                        value="hello"
                        autoCapitalize="off"
                        autoComplete="off"
                        autoCorrect="off"
                        aria-label="Search"x
                        aria-haspopup="true"
                        role="combobox"
                        aria-autocomplete="both"
                        aria-controls="search-results"
                    >
                    </input>
                </form>
            </div>
        );
    }
}

SuggestedSearch.displayName = 'SuggestedSearch';

SuggestedSearch.propTypes = {};

export default SuggestedSearch;
