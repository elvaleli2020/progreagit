import React from 'react';

export default function LoadingIndicator(props) {
    return (
        <h1>
            <div className="loading-indicator" style={{display: 'block', textAlign: 'center', marginTop: '30px'}}>
                Loading ...
            </div>
        </h1>
    );
}
