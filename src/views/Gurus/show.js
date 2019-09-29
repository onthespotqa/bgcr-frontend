import React, {Component} from 'react'
import shadeCategories from "../../utils/shadeCategories";

import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import {Link} from "react-router-dom";
import {findShadeCategory} from "../../utils/shadeCategories";

import MaterialTable from "material-table";

class Guru extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      gurus: {
        id: '',
        blog: '',
        undertone: [],
        skin: '',
        group: '',
        foundations: [{
          brand: '',
          shade: ''
        }]
      },
    };

    fetch(`/api/v1${props.location.pathname}`)
      .then(res => res.json())
      .then((data) => {
        this.setState({gurus: data, loaded: true})
      })
  }

  toggleItemEditing = index => {
    this.setState({
      items: this.state.items.map((item, itemIndex) => {
        if (itemIndex === index) {
          return {
            ...item,
            isEditing: !item.isEditing
          }
        }
        return item;
      })
    });
  };

  handleItemUpdate = (event, index) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      items: this.state.items.map((item, itemIndex) => {
        if (itemIndex === index) {
          return {
            ...item,
            [name]: value
          }
        }
        return item;
      })
    });
  };

  deleteFoundation(row) {
    const id = this.state.gurus.foundations[row].id
    console.log('Deleted ' + this.state.gurus.foundations[row])
    fetch(`/api/v1/gurus/${this.state.gurus.id}/foundations/${id}`, {method: 'DELETE'})
  }

  updateFoundation(row, fData) {
    const id = this.state.gurus.foundations[row].id
    console.log('Updated ' + this.state.gurus.foundations[row])
    fetch(`/api/v1/gurus/${this.state.gurus.id}/foundations/${id}`, {method: 'PATCH',  body: JSON.stringify(fData),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }})
  }

  render() {
    const {id, blog, undertone, skin, group, foundations} = this.state.gurus;
    const formattedUndertones = undertone ? undertone.join(', ') : ''
    if (this.state.loaded) {
      return (
        <Paper>
          <Box m={5} p={5}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                {blog}
              </Typography>
              <Typography>
                <List component="nav" aria-label="main mailbox folders">
                  <ListItem>
                    <ListItemText primary="Undertone" secondary={formattedUndertones}/>
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Skin Type" secondary={skin}/>
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Shade Category" secondary={findShadeCategory(this.state.gurus)}/>
                  </ListItem>
                </List>
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small"><Link to={`/gurus/${id}/edit`}>Edit</Link></Button>
              <Button size="small"><Link to={`/gurus/${id}/foundations/new`}>Add Foundation</Link></Button>
            </CardActions>
          </Card>
          </Box>
          <Box m={5} p={2}>
          <div style={{maxWidth: "100%"}}>
            <MaterialTable
              columns={[
                {title: "Brand", field: "brand"},
                {title: "Shade", field: "shade"},
              ]}
              data={foundations}
              onRowClick={(event, rowData, showGuru) => showGuru}
              title="Foundation Shades"
              options={{search: false}}
              editable={{
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve, reject) => {
                    setTimeout(() => {
                      {
                        const data = this.state.gurus.foundations;
                        const index = data.indexOf(oldData);
                        this.updateFoundation(index)
                        data[index] = newData;
                        this.updateFoundation(index, data[index])
                        this.setState({ data }, () => resolve());
                      }
                      resolve()
                    }, 1000)
                  }),
                onRowDelete: oldData =>
                  new Promise((resolve, reject) => {
                    setTimeout(() => {
                      {
                        let data = this.state.gurus.foundations;
                        const index = data.indexOf(oldData);
                        this.deleteFoundation(index)
                        data.splice(index, 1);
                        this.setState({ data }, () => resolve());
                      }
                      resolve()
                    }, 1000)
                  }),
              }}
            />
          </div>
          </Box>
        </Paper>
      )
    } else {
      return (<p>Loading</p>)
    }
  }
}

export default Guru;