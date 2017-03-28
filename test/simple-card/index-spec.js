import { shallow } from 'enzyme';
import React from 'react';
import Component from '../../src/simple-card/index.jsx';

describe('Simple Card', () => {

    const props = {
        href: '/waters/loch-neldricken',
        imgSrc: 'https://dur8xuaowfaya.cloudfront.net/images/images/000/000/077/medium/neldricken.jpg?1476951599',
        alt: 'Looking down over Loch Neldricken from Loch Enoch',
        heading: 'Loch Neldricken',
        subHeading: 'Galloway Forest Park, Scotland'
    };

    let rendered = null;
    let compNode = null;

    beforeEach(() => {
        rendered = shallow(React.createElement(Component, props));
        compNode = rendered.find('.simple-card');
    });

    it('should have a heading', () => {
        expect(compNode.find('h4').text()).toBe('Loch Neldricken');
    });

    it('should have a sub-heading', () => {
        expect(compNode.find('.caption p').text()).toBe('Galloway Forest Park, Scotland');
    });

    it('should have an image', () => {
        console.log(compNode);
        expect(compNode.find('img').get(0).props.src).toBe('https://dur8xuaowfaya.cloudfront.net/images/images/000/000/077/medium/neldricken.jpg?1476951599');
    });

    it('should have an alt tag', () => {
        expect(compNode.find('img').get(0).props.alt).toBe('Looking down over Loch Neldricken from Loch Enoch');

    });

    it('should have a link', () => {
        expect(compNode.find('a').get(0).props.href).toBe('/waters/loch-neldricken');
    });


});
