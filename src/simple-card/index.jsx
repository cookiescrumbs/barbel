import React from 'react';
import styled from 'styled-components';


const Card = styled.div`
    margin: 0 0 30px 0;
`;

const Caption = styled.div`
    margin: 0 auto;
    padding: 15px;
    max-width: 650px;
    text-align: center;
    background-color: #fff;
    borderTop: 1px solid #f7f7f7;
    color: #333;
`;

const Img = styled.img`
    &:hover {
        -webkit-filter: grayscale(100);
        filter: grayscale(100);
    }
`;

const Link = styled.a`
    text-decoration: none;
    &:hover {
        text-decoration: none;
        img{
            -webkit-filter: grayscale(100);
            filter: grayscale(100);
        }
        div {
            background-color: #e7e7e7;
        }
    }
    &:visited {
        text-decoration: none;
    }
    &:active {
        text-decoration: none;
    }
    &:focus {
        text-decoration: none;
    }
`;


class SimpleCard extends React.Component {

    render() {

        const heading = this.props.heading,
            subHeading = this.props.subHeading,
            href = this.props.href,
            imgSrc = this.props.imgSrc,
            imgAlt = this.props.imgAlt;

        return (
            <Card className="simple-card col-md-4 col-sm-12">
                <Link href={href}>
                    <Img src={imgSrc} className="img-responsive center-block" alt={imgAlt} />
                    <Caption>
                        <h4>{heading}</h4>
                        <p className="text-muted">{subHeading}</p>
                    </Caption>
                </Link>
            </Card>
        );
    }
}

SimpleCard.displayName = 'SimpleCard';

SimpleCard.propTypes = {
    href: React.PropTypes.string.isRequired,
    imgSrc: React.PropTypes.string.isRequired,
    imgAlt: React.PropTypes.string.isRequired,
    heading: React.PropTypes.string.isRequired,
    subHeading: React.PropTypes.string.isRequired
};

export default SimpleCard;
