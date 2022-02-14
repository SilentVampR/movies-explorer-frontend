import React from 'react';

const ProtectedComponent = ({ component: Component, ...props  }) => {
  return (
    props.isLoggedIn && <Component {...props} />
)}

export default ProtectedComponent;
