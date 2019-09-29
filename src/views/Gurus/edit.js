import React, { Component } from 'react';
import GuruForm from './guruForm'
import Container from '@material-ui/core/Container';

export default class GuruEdit extends Component {

    render() {
        return(
            <Container>
                <h1>Add Beauty Guru</h1>
                <GuruForm/>
            </Container>
        )
    }
}