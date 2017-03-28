import { expect } from 'chai';
import { mount } from 'enzyme';
import React from 'react';
import Component from '../../src/simple-card/index.jsx';

describe('Simple Card', () => {

    const props = {
        href: '/waters/loch-neldricken',
        imgSrc: 'https://dur8xuaowfaya.cloudfront.net/images/images/000/000/077/medium/neldricken.jpg?1476951599',
        imgAlt: 'Looking down over Loch Neldricken from Loch Enoch',
        heading: 'Loch Neldricken',
        subHeading: 'Galloway Forest Park, Scotland'
    };

    let rendered = null;
    let compNode = null;

    beforeEach(() => {
        rendered = mount(React.createElement(Component, props));
        compNode = rendered.find('.simple-card');
    });

    it('should have a heading', () => {
        expect(compNode.find('h4').text()).to.eql('Loch Neldricken');
    });

    it('should have a sub-heading', () => {
        expect(compNode.find('div p').text()).to.eql('Galloway Forest Park, Scotland');
    });

    it('should have an image', () => {
        expect(compNode.find('img').props().src).to.eql('https://dur8xuaowfaya.cloudfront.net/images/images/000/000/077/medium/neldricken.jpg?1476951599');
    });

    it('should have an alt tag', () => {
        expect(compNode.find('img').props().alt).to.eql('Looking down over Loch Neldricken from Loch Enoch');
    });

    it('should have a link', () => {
        expect(compNode.find('a').props().href).to.contain('/waters/loch-neldricken');
    });

});
