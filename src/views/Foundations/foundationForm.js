import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Input from "../../components/Input";
import FormButton from "../../components/Button";
import Select from "../../components/Select";

class FoundationForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newFoundation: {
                brand: '',
                shade: '',
                group: ''
            },
            shadeOptions: ['Light', 'Medium', 'Tan', 'Deep']
        }
        this.handleClearForm = this.handleClearForm.bind(this);
        this.handleInput = this.handleInput.bind(this)
    }

    componentDidMount () {
        this.setState({params: this.props.match.params})
    }

    handleFormSubmit(e) {
        debugger
        let foundationData = this.state.newFoundation;
        fetch(`${process.env.REACT_APP_API_URL}/api/v1/gurus/${this.state.params.id}/foundations`,{
            method: "POST",
            body: JSON.stringify(foundationData),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(response => {
            response.json().then(data =>{
                console.log("Successful" + data);
                this.props.history.push(
                    `/gurus/${this.state.params.id}`
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
        this.setState( prevState => {
                return {
                    newFoundation : {
                        ...prevState.newFoundation, [name]: value
                    }
                }
            }
        )
    }

    render() {
        return (
            <form>
                <Input
                    inputType={"text"}
                    title={"Brand"}
                    name={"brand"}
                    value={this.state.newFoundation.brand}
                    placeholder={"Mac"}
                    handleChange={this.handleInput}
                />{" "}
                <Input
                    inputType={"text"}
                    title={"Shade Name"}
                    name={"shade"}
                    value={this.state.newFoundation.shade}
                    placeholder={"NC30"}
                    handleChange={this.handleInput}
                />{" "}
                <Select
                    title={"Shade Category"}
                    name={"group"}
                    options={this.state.shadeOptions}
                    value={this.state.newFoundation.group}
                    placeholder={"Select Shade Category"}
                    handleChange={this.handleInput}
                />{" "}
                <FormButton variant="outlined" color="primary" type="submit" action={this.handleFormSubmit.bind(this)} title={"Submit"}/>
                <FormButton variant="outlined" color="secondary" title={"Clear"}/>

            </form>
        )

    }
}

export  default withRouter(FoundationForm);