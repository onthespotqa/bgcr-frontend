import React, {Component} from 'react'
import PropTypes from 'prop-types';
import '../../App.css'
import {Link} from "react-router-dom";
import {linkTo} from "../../utils/resource";
import {shadeCategoryLookup} from '../../utils/shadeCategories'
import {withStyles, makeStyles} from '@material-ui/core/styles';

import MaterialTable from "material-table";
import Box from "@material-ui/core/Box";
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  button: {
    marginTop: 10
  }
}));


class GuruIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      gurus: [],
    };
    this.setState({...this.state, isFetching: true});
    fetch(`/api/v1/gurus`)
      .then(res => res.json())
      .then((data) => {
        this.setState({gurus: data})
      })
      .catch(console.log)
  }

  deleteGuru(index) {
    const id = this.state.gurus[index].id
    console.log('Deleted ' + this.state.gurus[index])
    fetch(`/api/v1/gurus/${id}`, {method: 'DELETE'})
  }

  render() {
    const gurus = this.state.gurus;
    const {classes} = this.props;
    return (
      <Paper className={classes.root}>
        <Box m={4}>
          <Button href={'/gurus/new'} variant={"contained"} color={"primary"}>Add a Beauty Guru
          </Button>
        </Box>
        <Box p={2}>
          <div style={{maxWidth: "100%"}}>
            <MaterialTable
              columns={[
                {
                  field: 'blog',
                  title: 'Beauty Guru',
                  render: rowData => <Link to={linkTo(rowData)}>{rowData.blog}</Link>
                },
                {title: "Skin Type", field: "skin"},
                {title: "Undertones", field: "undertone"},
                {title: "Shade Category", field: "group",
                  lookup: shadeCategoryLookup}
              ]}
              data={gurus}
              onRowClick={(event, rowData, showGuru) => showGuru}
              title="Beauty Gurus"
              editable={{
                onRowDelete: oldData =>
                  new Promise((resolve, reject) => {
                    setTimeout(() => {
                      {
                        let data = this.state.gurus;
                        const index = data.indexOf(oldData);
                        this.deleteGuru(index)
                        data.splice(index, 1);
                        this.setState({data}, () => resolve());
                      }
                      resolve()
                    }, 1000)
                  }),
              }}
              options={{
                grouping: true
              }}
            />
          </div>
        </Box>
      </Paper>
    )
  }
}

GuruIndex.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(GuruIndex);