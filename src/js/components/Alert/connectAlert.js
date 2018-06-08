import PropTypes from 'prop-types';
import React from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';

const connectAlert = (WrappedComponent) => {
  const ConnectedAlert = (props, context) => {
    return (
      <WrappedComponent
        {...props}
        alertWithType={context.alertWithType}
        alert={context.alert}
      />
    );
  };


  ConnectedAlert.contextTypes = {
    alertWithType: PropTypes.func,
    alert: PropTypes.func
  };

  return hoistNonReactStatic(ConnectedAlert, WrappedComponent);
};

export default connectAlert;
