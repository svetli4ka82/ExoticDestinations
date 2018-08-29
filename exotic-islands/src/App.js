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
import Header from './components/common/Navigation';
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
    };
    this.onLogout = this.onLogout.bind(this);
  }

  componentWillMount() {
    
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          logIn: true,
          user: user,
          userKey: user.uid
        });
        this.checkAdmin();
      }
      else {
        this.setState({ logIn: false })
      }
    })
  }
  
  
  checkAdmin = async () => {
    await firebase.database().ref('users/')
      .on('value', (snapshot) => {
        let items = snapshot.val();
        this.setState({ users: items },()=>{
          for (const key in items) {
            if (items[key]['email'] === this.state.user.email) {
              const role = items[key]['role']
              if (role === 'Admin') {
                this.setState({
                  checkIsAdmin: true
                });
              }
            }
          }
        });
      })
  };

  onLogout() {
    localStorage.clear();
    firebase.auth().signOut()
      .then(() => {
        this.setState({
          logIn: false,
          checkIsAdmin:false
        });
      });
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="App">
        <Header loggedIn={this.state.logIn}
          onLogout={this.onLogout} isAdmin={this.state.checkIsAdmin} />

        <Switch >
          <Route exact path='/' component={HomePage} />

          {/* auth */}
          <Route exact path='/login' component={LoginPage} />
          <Route exact path='/register' component={RegisterPage} />

          {/* destinations */}
          <Route exact path='/destinations' render={()=><DestinationPage isAdmin={this.state.checkIsAdmin} />} />
          <Route path='/destinations/mine' component={MyDestinations} />
          <Route path='/destinations/add' component={AddDestination} />
          <Route path='/destinations/edit/:id'  component={EditDestination} />
          <Route path='/destinations/:id'  component={DestinationDetails}
            isAdmin={this.state.checkIsAdmin} />

          {/* users */}
          {this.state.checkIsAdmin && this.state.isLogin && <Route exact path='/users' component={UsersPage} />}
          {this.state.checkIsAdmin && this.state.isLogin && <Route path='/users/edit/:id' component={EditUser} />}
          {this.state.checkIsAdmin && this.state.isLogin && <Route path='/users/:id' component={User} />}
        </Switch>
        <Footer />
      </div>
    )
  }
}

export default withRouter(App);
