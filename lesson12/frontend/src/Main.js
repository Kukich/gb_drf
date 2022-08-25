import React from 'react';
import './App.css';
import axios from 'axios';
import MyUserList from './components/MyUser.js';
import ToDoList from './components/ToDo.js';
import ProjectList,{ProjectPage} from './components/Project.js';
import Menu from './components/Menu.js';
import Footer from './components/Footer.js';
import {BrowserRouter as Router,Switch,Route,withRouter } from 'react-router-dom'


const NotFound404 = ({ location }) => {
    return (
        <div>
            <h1>Страница по адресу '{location.pathname}' не найдена</h1>
        </div>
    )
}



class Main extends React.Component {
  componentDidMount() {

  }
  render(){
    let path=this.props.history.location.pathname
    console.log(this.props.history.location.pathname)
    return(<div>{path}</div>)
  }
}
export default withRouter(Main);


