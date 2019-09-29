import React, { Component } from 'react';
import FoundationForm from './foundationForm'
import Container from '@material-ui/core/Container';

export default class GuruFoundationNew extends Component {

    render() {
        return(
            <Container>
                <h1>Add A Foundation Shade</h1>
                <FoundationForm/>
            </Container>
        )
    }
}