import { shallow } from 'enzyme';
import React from 'react';
import Component from '../../src/index.jsx';
import items from './data/items';

describe('Card', () => {
    const props = { items };
    let rendered = null;
    let compNode = null;

    beforeEach(() => {
        rendered = shallow(React.createElement(Module, props));
        compNode = rendered.find('.card');
    });

    it('should display a card', () => {
        expect(compNode.exists()).toBe(true);
    });
});