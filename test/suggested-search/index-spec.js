import { shallow } from 'enzyme';
import React from 'react';
import Component from '../../src/suggested-search/index.jsx';

describe('Suggested Search', function() {

    const props = {};

    let rendered = null;
    let compNode = null;

    beforeEach(() => {
        rendered = shallow(React.createElement(Component, props));
        compNode = rendered.find('.suggested-search');
    });

    it('should have an input field', function() {
        expect(compNode.find('form input').exists()).toBe(true);
    });

});