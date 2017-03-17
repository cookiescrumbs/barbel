import React from 'react';

export default class SimpleCard extends React.Component {

    render() {
        return (
            <div className="col-md-4 col-sm-12 simple-card" >
                Simple Card
            </div>
        );
    }
};

SimpleCard.displayName = 'SimpleCard';

SimpleCard.propTypes = {
    items: React.PropTypes.array.isRequired
};