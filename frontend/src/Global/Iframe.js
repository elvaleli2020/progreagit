import React from 'react';

const Iframe = ({ source }) => {

    if (!source) {
        return <div>Loading...</div>;
    }

    const src = source;
    return (
        // basic bootstrap classes. you can change with yours.
        <div  className=" embed-responsive embed-responsive-16by9">
                <iframe className="embed-responsive-item "
                        src={source}
                        allowFullScreen></iframe>
        </div>
    );
};

export default Iframe;