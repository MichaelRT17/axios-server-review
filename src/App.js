import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

class App extends Component {
  constructor() {
    super()

    this.state = {
      friends: [],
      nameInput: '',
      foodInput: ''
    }
  }

  componentDidMount() {
    axios.get('/api/getFriends').then(res => {
      console.log(res.data)
      this.setState({ friends: res.data })
    })
  }

  addFriend() {
    axios.post('/api/addFriend', {name: this.state.nameInput, food: this.state.foodInput}).then(res => {
      this.setState({ friends: res.data, nameInput: '', foodInput: ''})
    })

  }

  deleteFriend(id) {
    console.log(id)
    axios.delete(`/api/deleteFriend/${id}`).then(res => {
      this.setState({friends: res.data})
    })
  } 

  render() {
    console.log(this.state)
    let mappedFriends = this.state.friends.map((x, i) => {
      return (
        <div key={i + x.name}>
          <h3>{x.name}</h3>
          <h4>{x.food}</h4>
          <h5 onClick={() => this.deleteFriend(x.id)}>Delete</h5>
          <h6>--------------------</h6>
        </div>
      )
    })
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <h1>Add Friends</h1>
        <p>Name</p>
        <input onChange={e => this.setState({nameInput: e.target.value})}/>
        <p>Food</p>
        <input onChange={e => this.setState({foodInput: e.target.value})}/>
        <br /><br />
        <button onClick={() => this.addFriend()}>Add</button>
        <div> <hr />
          {mappedFriends}
        </div>



      </div>
    );
  }
}

export default App;
