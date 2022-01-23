import React from 'react';
import PropTypes from 'prop-types'
const AppLayout = ( props :any) => {
    return (
        <div>
            {props}
        </div>
    )

};

AppLayout.propTypes ={
    children: PropTypes.node.isRequired,
};

export default AppLayout;