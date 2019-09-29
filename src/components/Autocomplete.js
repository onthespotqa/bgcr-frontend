import React, {Component} from "react";
import PropTypes from "prop-types";
import Input from '../components/Input'
import {Link} from "react-router-dom";

export class Autocomplete extends Component {
    static propTypes = {
        suggestions: PropTypes.instanceOf(Array)
    };
    static defaultProperty = {
        suggestions: []
    };

    constructor(props) {
        super(props);
        this.state = {
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: ""
        };
    }

    onChange = e => {
        const userInput = e.currentTarget.value;
        this.setState({
            findingSuggestions: true
        })

        fetch(`/api/v1/gurus`)
            .then(res => res.json())
            .then((data) => {
             data = data.filter(function (item) {
                  if (item.blog.toLowerCase().includes(userInput.toLowerCase())) {
                   return true;
                  }
                 }
             );

             this.setState({filteredSuggestions: data, findingSuggestions: false, showSuggestions: true, activeSuggestion: 0, userInput: userInput  } )
            })
    };

    onClick = e => {
        this.setState({
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: e.currentTarget.innerText
        });
    };
    onKeyDown = e => {
        const {activeSuggestion, filteredSuggestions} = this.state;

        if (e.keyCode === 13) {
            this.setState({
                activeSuggestion: 0,
                showSuggestions: false,
                userInput: filteredSuggestions[activeSuggestion]
            });
        } else if (e.keyCode === 38) {
            if (activeSuggestion === 0) {
                return;
            }

            this.setState({activeSuggestion: activeSuggestion - 1});
        } else if (e.keyCode === 40) {
            if (activeSuggestion - 1 === filteredSuggestions.length) {
                return;
            }

            this.setState({activeSuggestion: activeSuggestion + 1});
        }
    };

    render() {
        const {
            onChange,
            onClick,
            onKeyDown,
            state: {
                activeSuggestion,
                filteredSuggestions,
                showSuggestions,
                userInput
            }
        } = this;
        let suggestionsListComponent;
        if (showSuggestions && userInput) {
            if (filteredSuggestions.length) {
                suggestionsListComponent = (
                    <ul>
                        {filteredSuggestions.map((suggestion, index) => {
                            return (
                                <li key={suggestion.id} onClick={onClick}>
                                    <Link to={`/gurus/${suggestion.id}`}>{suggestion.blog}</Link>
                                </li>
                            );
                        })}
                    </ul>
                );
            } else {
                suggestionsListComponent = (
                    <div class="no-suggestions">
                        <em>No suggestions</em>
                    </div>
                );
            }
        }
        return (
            <React.Fragment>
                <Input
                    type="search"
                    handleChange={onChange}
                    onKeyDown={onKeyDown}
                    value={userInput}
                />
                {suggestionsListComponent}
            </React.Fragment>
        );
    }
}

export default Autocomplete;