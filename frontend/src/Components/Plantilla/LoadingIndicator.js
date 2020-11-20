import React from 'react';

export default function LoadingIndicator(props) {
    return (
        <h1>
            <div className="loading-indicator" style={{display: 'block', textAlign: 'center', marginTop: '30px'}}>
                <img src="./img/loading.gif" width="500px" alt="a" style={{opacity: .8}}
                             className="brand-image"/>
            </div>
        </h1>
    );
}
