import React from 'react';

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
                <div className="caption">
                    <h4>{heading}</h4>
                    <p className="text-muted">{subHeading}</p>
                </div>
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
