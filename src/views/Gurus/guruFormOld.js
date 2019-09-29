import React, { Component } from 'react';
import Input from "../../components/Input";
import Select from "../../components/Select";
import CheckBox from "../../components/CheckBox";
import Button from "../../components/Button";
import { withRouter } from 'react-router';
import shadeCategories from "../../utils/shadeCategories";
import { Formik } from 'formik';
import * as Yup from 'yup';

class GuruFormOld extends Component {
    constructor(props) {
       super(props)
        this.state = {
           newGuru: {
               blog: '',
               undertone: [],
               skin: ''
           },
           undertoneOptions: ['Yellow', 'Olive',  'Pink', 'Red', 'Neutral', 'Golden'],
            skinTypeOptions: ['Dry', 'Oily', 'Combination/Dry', 'Combination/Oily', 'Normal/Dry', 'Normal'],
            shadeOptions: ['Fair','Light', 'Medium', 'Tan', 'Deep','Dark']
        }
        this.handleInput = this.handleInput.bind(this);
        this.handleCheckBox = this.handleCheckBox.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);
    }

    handleFormSubmit(e) {
        e.preventDefault();
        let guruData = this.state.newGuru;
        debugger

        fetch('/api/v1/gurus',{
            method: "POST",
            body: JSON.stringify(guruData),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(response => {
            response.json().then(data =>{
                console.log("Successful" + data);
                this.props.history.push(
                    `/gurus/${data.id}`
                );
            })
        })
    }

    handleClearForm(e) {
        e.preventDefault();
        this.setState({
            newGuru: {
                blog: '',
                undertone: '',
                skin: '',
                group: ''
            },
        })
    }

    handleInput(e) {
        let value = e.target.value;
        let name = e.target.name;
        this.setState(
            prevState => ({
                newGuru: {
                    ...prevState.newGuru,
                    [name]: value
                }
            }),
            () => console.log(this.state.newGuru)
        );
    }

    handleCheckBox(e) {
        const newSelection = e.target.value;
        let newSelectionArray;

        if (this.state.newGuru.undertone.indexOf(newSelection) > -1) {
            newSelectionArray = this.state.undertoneOptions.filter(
                s => s !== newSelection
            );
        } else {
            newSelectionArray = [...this.state.newGuru.undertone, newSelection];
        }

        this.setState(prevState => ({
            newGuru: { ...prevState.newGuru, undertone: newSelectionArray }
        }));
    }

    render() {
        return (
            <form>
                <Input
                    inputType={"text"}
                    title={"Guru Name"}
                    name={"blog"}
                    value={this.state.newGuru.blog}
                    placeholder={"Enter the BG' Name/Handle"}
                    handleChange={this.handleInput}
                />{" "}
                <Select
                    title={"Skin Type"}
                    name={"skin"}
                    options={this.state.skinTypeOptions}
                    value={this.state.newGuru.skin}
                    placeholder={"Select Skin Type"}
                    handleChange={this.handleInput}
                />{" "}
                <CheckBox
                    title={"Undertone"}
                    name={"undertone"}
                    options={this.state.undertoneOptions}
                    selectedOptions={this.state.newGuru.undertone}
                    handleChange={this.handleCheckBox}
                />{" "}
                <Select
                    title={"Shade Category"}
                    name={"group"}
                    options={this.state.shadeOptions}
                    value={this.state.newGuru.group}
                    placeholder={"Select Shade Category"}
                    handleChange={this.handleInput}
                />{" "}
                <Button
                    action={this.handleFormSubmit}
                    variant={"contained"}
                    color={"primary"}
                    title={"Submit"}
                />{" "}
                <Button
                    action={this.handleClearForm}
                    type={"light"}
                    variant={"contained"}
                    title={"Cancel"}
                />{" "}

            </form>
        )

    }
}

export  default withRouter(GuruFormOld);