import React from 'react';
import LoadingInternal from "../Components/Plantilla/LoadingInternal";

const Iframe = ({ source }) => {

    if (!source) {
        return <LoadingInternal></LoadingInternal>;
    }

    const src = source;
    return (
        // basic bootstrap classes. you can change with yours.
        <div  className="embed-responsive embed-responsive-16by9">
                <iframe className="embed-responsive-item "
                        src={src}
                        allowFullScreen></iframe>
        </div>
    );
};

export default Iframe;