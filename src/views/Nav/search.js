import React, {Component} from 'react';
import SearchBar from 'material-ui-search-bar'

class Search extends Component {
    constructor() {
        super()
        this.state = {
            query: '',
            results: []
        }
        this.handleSearch = this.handleSearch.bind(this);
    }

    filterGurus = (query) => {
        fetch(`/api/v1/gurus`)
            .then(res => res.json())
            .then((data) => {
                debugger
                data = data.filter(function(item){
                    if (item.blog.toLowerCase().includes(query.toLowerCase())) {
                        return true;
                    }
                });
                this.setState({
                    results: data
                })
            })
    }

    handleSearch(e) {
        this.setState({
            query: e.target.value
        }, () => {
            if (this.state.query && this.state.query.length > 2) {
                this.filterGurus(this.state.query)
            } else if (!this.state.query) {
                // eslint-disable-next-line no-unused-expressions
                this.state.results
            }
        })
    }

    render() {
        return (
          <SearchBar
            value={this.state.value}
            onChange={(query) => this.filterGurus(query)}
            onRequestSearch={() => console.log(this.state.results)}
          />
        )
    }

}

export default Search