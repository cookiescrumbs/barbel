import React from 'react';

class SimpleCard extends React.Component {

    render() {
        return (
            <div className="col-md-4 col-sm-12 simple-card">
                <a href="/waters/loch-neldricken">
                <img src="https://dur8xuaowfaya.cloudfront.net/images/images/000/000/077/medium/neldricken.jpg?1476951599" className="img-responsive img-centered" alt="Loch Neldricken" />
                <div className="caption">
                    <h4>Loch Neldricken</h4>
                    <p className="text-muted">Galloway Forest Park, Scotland</p>
                </div>
                </a>
            </div>
        );
    }
}

SimpleCard.displayName = 'SimpleCard';

export default SimpleCard;
