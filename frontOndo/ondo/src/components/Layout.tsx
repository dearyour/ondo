import React from 'react';
import PropTypes from 'prop-types'
const Layout  = (props :any) :JSX.Element  => {
    return (
        <div>
            {props}
        </div>
    )

};

Layout.propTypes  ={
    props: PropTypes.node.isRequired,
};

export default Layout;