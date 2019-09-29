import React, { Component } from 'react';
import { Route } from 'react-router';

class KeyedRoute extends Component {
    render() {
        const { component, location, ...moreProps } = this.props;
        return (
            <Route
                key={location.pathname}
                {...moreProps}
                component={component}
            />
        );
    }
}

export default  KeyedRoute