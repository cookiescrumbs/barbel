import { shallow } from 'enzyme';
import React from 'react';
import Module from '../../src/suggested-search/index.jsx';
import items from './data/items';

describe('Suggested Search', () => {
    const props = {
        items,
        label: 'Custom label',
        placeholder: 'Custom placeholder',
        errorMessage: 'Custom error message: {{search}}'
    };

    let rendered = null;
    let searchBox = null;

    beforeEach(() => {
        rendered = shallow(React.createElement(Module, props));
        searchBox = rendered.find('form input');
    });

    it('should display the custom input label text.', () => {
        expect(rendered.find('label').text()).toBe('Custom label');
    });

    it('should display the custom placeholder text in the input.', () => {
        expect(rendered.find('input').props().placeholder).toBe('Custom placeholder');
    });

    it('should show the search button.', () => {
        const searchIcon = rendered.find('button.search');

        expect(searchIcon.text()).toBe('Search');
    });

    it('should not show the clear button.', () => {
        const clearButton = rendered.find('button.clear');

        expect(clearButton.exists()).toBe(false);
    });

    describe('Given a user enters one character.', () => {
        let clearButton = null;

        beforeEach(() => {
            searchBox.simulate('change', { target: { value: 'a' } });
            clearButton = rendered.find('button.clear');
        });

        it('should not show any search results.', () => {
            expect(rendered.find('#search-results ul li').length).toEqual(0);
        });

        it('should not show an error.', () => {
            const errorElement = rendered.find('#search-results span');

            expect(errorElement.exists()).toBe(false);
        });

        it('should not show the search button.', () => {
            const searchIcon = rendered.find('button.search');

            expect(searchIcon.exists()).toBe(false);
        });

        it('should show the clear button.', () => {
            expect(clearButton.text()).toBe('Clear input');
        });

        it('pressing the clear button should clear the results and input field.', () => {
            clearButton.simulate('click', {});
            expect(searchBox.text()).toBe('');
            expect(rendered.find('#search-results ul li').length).toEqual(0);
        });
    });

    describe('Given a user enters two characters.', () => {
        let clearButton = null;

        beforeEach(() => {
            searchBox.simulate('change', { target: { value: 'af' } });
            clearButton = rendered.find('button.clear');
        });

        it('should show some search results.', () => {
            expect(rendered.find('#search-results ul li').length).toEqual(3);
        });

        it('should not show the search button.', () => {
            const searchIcon = rendered.find('button.search');

            expect(searchIcon.exists()).toBe(false);
        });

        it('should show the clear button.', () => {
            expect(clearButton.text()).toBe('Clear input');
        });

        it('pressing the clear button should clear the results and input field.', () => {
            clearButton.simulate('click', {});
            expect(searchBox.props().value).toBe('');
            expect(rendered.find('#search-results ul li').length).toEqual(0);
        });

        it('should order the results alphabetically.', () => {
            const searchResults = rendered.find('#search-results ul li').map((item) => item.text());

            expect(searchResults).toEqual(['AFC Wimbledon', 'Africa Cup of Nations', 'World Cup Qualifying - African']);
        });

        it('each result should link to the specified url.', () => {
            const resultLinks = rendered.find('#search-results a').map((item) => item.props().href);

            expect(resultLinks).toEqual([
                'http://www.bbc.co.uk/sport/football/teams/afc-wimbledon/fixtures',
                'http://www.bbc.co.uk/sport/football/africa-cup-of-nations/fixtures',
                'http://www.bbc.co.uk/sport/football/qualifying-african/fixtures'
            ]);
        });
    });

    describe('Given a user enters a search term with no results.', () => {
        beforeEach(() => {
            searchBox.simulate('change', { target: { value: 'qwerty' } });
        });

        it('should display an error message.', () => {
            const errorElement = rendered.find('#search-results span');

            expect(errorElement.text()).toBe('Custom error message: qwerty');
        });
    });

    describe('Given a user enters a search term that produces a lot of results.', () => {
        beforeEach(() => {
            searchBox.simulate('change', { target: { value: 'ma' } });
        });

        it('should show a list of results ordered alphabetically with those that start with the search value at the top.', () => {
            searchBox.simulate('change', { target: { value: 'ma' } });
            const searchResults = rendered.find('#search-results ul li').map((item) => item.text());

            expect(searchResults).toEqual(['Macclesfield Town', 'Maidstone United', 'Mainz 05', 'Malaga', 'Manchester City', 'Manchester United', 'Mansfield Town', 'Marseille', 'Atlético Madrid', 'German Bundesliga', 'German DFB Cup', 'Kilmarnock', 'Las Palmas', 'Paris Saint Germain', 'Real Madrid', 'Roma', 'United States Major League Soccer']);
        });

        it('should be able to select the first result by pressing the down key.', () => {
            searchBox.simulate('keyDown', { keyCode: 40, preventDefault: () => null });
            const activeResult = rendered.find('.search-result--active');

            expect(activeResult.text()).toBe('Macclesfield Town');
            expect(rendered.find('ul').props()['aria-activedescendant']).toBe(activeResult.props().id);
        });

        it('should be able to select a result by pressing the up and down keys.', () => {
            searchBox.simulate('keyDown', { keyCode: 40, preventDefault: () => null });
            searchBox.simulate('keyDown', { keyCode: 40, preventDefault: () => null });
            searchBox.simulate('keyDown', { keyCode: 40, preventDefault: () => null });
            searchBox.simulate('keyDown', { keyCode: 38, preventDefault: () => null });
            const activeResult = rendered.find('.search-result--active');

            expect(activeResult.text()).toBe('Maidstone United');
            expect(rendered.find('ul').props()['aria-activedescendant']).toBe(activeResult.props().id);
        });

        it('should be able to select the search input by pressing the up key.', () => {
            searchBox.simulate('keyDown', { keyCode: 40, preventDefault: () => null });
            searchBox.simulate('keyDown', { keyCode: 38, preventDefault: () => null });
            const activeResult = rendered.find('.search-result--active');

            expect(activeResult.exists()).toBe(false);
            expect(rendered.find('ul').props()['aria-activedescendant']).toBe(null);
        });

        it('should not be able to select past the last result by pressing the down key.', () => {
            const results = rendered.find('#search-results ul li');

            results.forEach(() => {
                searchBox.simulate('keyDown', { keyCode: 40, preventDefault: () => null });
            });
            const activeResult = rendered.find('.search-result--active');

            expect(activeResult.text()).toBe('United States Major League Soccer');
            expect(rendered.find('ul').props()['aria-activedescendant']).toBe(activeResult.props().id);
        });

        it('pressing the escape key should clear the results and input field.', () => {
            searchBox.simulate('keyDown', { keyCode: 27, preventDefault: () => null });
            expect(searchBox.props().value).toBe('');
            expect(rendered.find('#search-results ul li').length).toEqual(0);
            expect(rendered.find('ul').props()['aria-activedescendant']).toBe(null);
        });

    });
});