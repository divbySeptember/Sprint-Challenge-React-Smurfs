import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';
import {Route} from 'react-router-dom'
import Smurf from './components/Smurf'
import NavBar from './components/NavBar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
  }
  componentDidMount () {
    axios
      .get(`http://localhost:3333/smurfs`)
      .then(response => {
        this.setState({ smurfs: response.data })
      })
      .catch(err => {
        console.log(err)
      })
  } 


  deleteSmurf = smurf => {
    axios.delete(`http://localhost:3333/smurfs/${smurf.id}`)
      .then(response => this.setState({smurfs: response.data}))
      .catch(err => console.log(err))
  }


  render() {
    return (
      <div className="App">
        <Route path="/">
          <NavBar />
        </Route>
        <Route
          path="/smurf-form"
          render={props => (
            <SmurfForm {...props} addSmurfHandler={this.addSmurfHandler} />
          )}
        />
        <Route
          exact
          path="/"
          render={props => <Smurfs {...props} smurfs={this.state.smurfs} deleteSmurf={this.deleteSmurf} />}
        />
        <Route exact path="/:id" render={props => <Smurf {...props} smurfs={this.state.smurfs} updateSmurf={this.updateSmurf} />}/>
      </div>
    );
  }
}

export default App;
