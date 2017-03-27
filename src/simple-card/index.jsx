import React from 'react';
import styled from 'styled-components';


const Caption = styled.div`
    margin: 0 auto;
    padding: 15px;
    max-width: 650px;
    text-align: center;
    background-color: #fff;
    borderTop: 1px solid #f7f7f7;
    color: #333;
`;

const Link = styled.a`
    text-decoration: none;
`;


class SimpleCard extends React.Component {

    render() {

        const heading = this.props.heading,
            subHeading = this.props.subHeading,
            href = this.props.href,
            imgSrc = this.props.imgSrc;

        return (
            <div className="col-md-4 col-sm-12 simple-card">
                <a href={href}>
                    <img src={imgSrc} className="img-responsive img-centered" alt="blah" />
                    <Caption>
                        <h4>{heading}</h4>
                        <p className="text-muted">{subHeading}</p>
                    </Caption>
                </a>
            </div>
        );
    }
}

SimpleCard.displayName = 'SimpleCard';

SimpleCard.propTypes = {
    href: React.PropTypes.string.isRequired,
    imgSrc: React.PropTypes.string.isRequired,
    heading: React.PropTypes.string.isRequired,
    subHeading: React.PropTypes.string.isRequired
};

export default SimpleCard;
