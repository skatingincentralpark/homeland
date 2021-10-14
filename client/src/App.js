import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import PrivateRoute from "./components/routing/PrivateRoute";
import Alert from "./components/layout/Alert";
import Progress from "./components/loading/Progress";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/landing/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Newsfeed from "./components/newsfeed/Newsfeed";
import CreateProfile from "./components/profile-forms/CreateProfile";
import EditProfile from "./components/profile-forms/EditProfile";
import EditUser from "./components/profile-forms/EditUser";
import Profile from "./components/profile/Profile";
import Friends from "./components/profile/Friends";
import Photos from "./components/profile/Photos";
import TempRegister from "./components/auth/TempRegister";
import Post from "./components/post/Post";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./store/auth/auth-actions";
import { getNotifications } from "./store/notification/notification-actions";

import setAuthToken from "./utils/setAuthToken";

import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.ui);

  const [state, setState] = useState({
    isAnimating: false,
    key: 0,
  });

  useEffect(() => {
    setState((prevState) => ({
      isAnimating: loading,
      key: prevState.isAnimating ? prevState.key : prevState.key ^ 1,
    }));
  }, [loading]);

  useEffect(() => {
    dispatch(loadUser());
    dispatch(getNotifications());
  }, [dispatch]);

  return (
    <Router>
      <Fragment>
        <>
          <Progress isAnimating={state.isAnimating} key={state.key} />
        </>
        <Navbar />
        <Alert />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/tempregister" component={TempRegister} />
          <Route exact path="/register" component={Register} />
          <PrivateRoute exact path="/newsfeed" component={Newsfeed} />
          <PrivateRoute exact path="/newsfeed/:id" component={Post} />
          <PrivateRoute
            exact
            path="/create-profile"
            component={CreateProfile}
          />
          <PrivateRoute exact path="/edit-user" component={EditUser} />
          <PrivateRoute exact path="/edit-profile" component={EditProfile} />
          <PrivateRoute exact path="/profile/:id" component={Profile} />
          <PrivateRoute exact path="/profile/:id/friends" component={Friends} />
          <PrivateRoute exact path="/profile/:id/photos" component={Photos} />
        </Switch>
      </Fragment>
    </Router>
  );
};

export default App;
