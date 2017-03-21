import { shallow } from 'enzyme';
import React from 'react';
import Component from '../../src/suggested-search/index.jsx';

describe('Suggested Search', () => {

    const props = {};

    let rendered = null;
    let compNode = null;

    beforeEach(() => {
        rendered = shallow(React.createElement(Component, props));
        compNode = rendered.find('.suggested-search');
    });

    describe('Given a user enters two characters.', () => {

        beforeEach(() => {
            searchBox.simulate('change', { target: { value: 'af' } });
        });

        it('should show some search results.', () => {
            expect(rendered.find('#search-results ul li').length).toEqual(3);
        });
    });

});