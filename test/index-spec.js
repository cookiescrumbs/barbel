import { shallow } from 'enzyme';
import React from 'react';
import Module from '../../src/index.jsx';
import items from './data/items';

describe('Hello Wold', () => {
    const props = {};
    let rendered = null;
    let searchBox = null;

    beforeEach(() => {
        rendered = shallow(React.createElement(Module, props));
        searchBox = rendered.find('.hello-world');
    });

    it('should display the custom input label text.', () => {
        expect(rendered.find('label').text()).toBe('Custom label');
    });


});