import { shallow } from 'enzyme';
import React from 'react';
import Component from '../../src/simple-card/index.jsx';
import items from '../data/items';

describe('Simple Card', function() {

    const props = { items };

    let rendered = null;
    let compNode = null;

    beforeEach(() => {
        rendered = shallow(React.createElement(Component, props));
        compNode = rendered.find('.simple-card');
    });

    it('should be a simple card element', function() {
        expect(compNode.exists()).toBe(true);
    });
});