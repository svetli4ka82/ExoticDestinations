import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import PrivateRoute from './components/common/PrivateRoute';
import firebase, { auth } from './firebase/firebase';

//users
import RegisterPage from './components/Auth/RegisterPage';
import LoginPage from './components/Auth/LoginPage';
import UsersPage from './components/Users/UsersPage';
import User from './components/Users/User';
import EditUser from './components/Users/EditUser';

//destinations
import DestinationPage from './components/Destination/DestinationPage';
import AddDestination from './components/Destination/AddDestination';
import EditDestination from './components/Destination/EditDestination';
import MyDestinations from './components/MyDestinations/MyDestinations';
import DestinationDetails from './components/Destination/DestinationDetails';

//common
import HomePage from './components/HomePage/HomePage';
import Navigation from './components/common/Navigation';
import Footer from './components/common/Footer';
import { currentUser } from './components/Users/users.service';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      logIn: false,
      userKey: '',
      user: '',
      users: '',
      checkIsAdmin: false
    }
    this.onLogout = this.onLogout.bind(this);
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          logIn: true,
          user: user,
          userKey: user.uid
        })
      }
      else {
        this.setState({ logIn: false })
      }
    })
  }
  componentDidMount = async () => {
    return await firebase.database().ref('users/')
      .on('value', (snapshot) => {
        let items = snapshot.val();
        this.setState({ users: items });

        for (const key in items) {
          if (items[key]['email'] === this.state.user.email) {
            const role = items[key]['role']
            console.log(role)
            if (role === 'Admin') {
              this.setState({
                checkIsAdmin: true
              });
            }
          }
        }
      })
  }

  onLogout() {
    localStorage.clear();
    firebase.auth().signOut()
      .then(() => {
        this.setState({
          logIn: false
        });
      });
    this.props.history.push('/');
  }

  render() {
    console.log(this.state.checkIsAdmin)
    return (
      <div className="App">
        <Navigation loggedIn={this.state.logIn}
          onLogout={this.onLogout} isAdmin={this.state.checkIsAdmin} />

        <Switch>
          <Route exact path='/' component={HomePage} />

          {/* auth */}
          <Route exact path='/login' component={LoginPage} />
          <Route exact path='/register' component={RegisterPage} />

          {/* destinations */}
          <PrivateRoute exact path='/destinations' component={DestinationPage}
            isAdmin={this.state.checkIsAdmin} />
          <PrivateRoute path='/destinations/mine' component={MyDestinations} />
          <PrivateRoute path='/destinations/add' component={AddDestination} />
          <PrivateRoute path='/destinations/edit/:id' component={EditDestination} />
          <PrivateRoute path='/destinations/:id' component={DestinationDetails}
            isAdmin={this.state.checkIsAdmin} />

          {/* users */}
          {this.state.checkIsAdmin && <PrivateRoute exact path='/users' component={UsersPage} />}
          {this.state.checkIsAdmin && <PrivateRoute path='/users/edit/:id' component={EditUser} />}
          {this.state.checkIsAdmin && <PrivateRoute path='/users/:id' component={User} />}
        </Switch>
        <Footer />
      </div>
    )
  }
}

export default withRouter(App);
