import React from 'react';

class SimpleCard extends React.Component {

    render() {
        return (
            <div className="col-md-4 col-sm-12 simple-card" >
                Simple Card
            </div>
        );
    }
}

SimpleCard.displayName = 'SimpleCard';

export default SimpleCard;
