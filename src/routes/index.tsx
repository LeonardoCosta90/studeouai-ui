import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import Route from './Route';

import Login from '../pages/Login';

import Users from '../pages/Users';
import CreateUser from '../pages/Users/CreateUser';
import EditUser from '../pages/Users/EditUser';

import Categories from '../pages/Categories';
import CreateCategory from '../pages/Categories/CreateCategory';
import EditCategory from '../pages/Categories/EditCategory';

import Class from '../pages/Class';
import Details from '../pages/Class/Details';
import CreateClass from '../pages/Class/CreateClass';

import ForgotPass from '../pages/ForgotPass';

import AttendedClass from '../pages/AttendedClass';
import Welcome from '../pages/Welcome';
import Register from '../pages/Register';
import ResetPass from '../pages/ResetPass';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Welcome} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/forgot-pass" exact component={ForgotPass} />
        <Route path="/reset-pass" exact component={ResetPass} />

        <Route path="/users" exact component={Users} isPrivate />
        <Route path="/users/create-user" exact component={CreateUser} isPrivate />
        <Route path="/users/edit-user" exact component={EditUser} isPrivate />

        <Route path="/categories" exact component={Categories} isPrivate />
        <Route path="/categories/create-category" exact component={CreateCategory} isPrivate />
        <Route path="/categories/edit-category" exact component={EditCategory} isPrivate />

        <Route path="/class" exact component={Class} isPrivate />
        <Route path="/class/details-class" exact component={Details} isPrivate />
        <Route path="/class/create-class" exact component={CreateClass} isPrivate />

        <Route path="/attended-class" exact component={AttendedClass} isPrivate />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;