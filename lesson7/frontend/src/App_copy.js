import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import MyUserList from './components/MyUser.js';
import ToDoList from './components/ToDo.js';
import ProjectList,{ProjectPage} from './components/Project.js';
import Menu from './components/Menu.js';
import Footer from './components/Footer.js';
import {BrowserRouter as Router,Switch,Route } from 'react-router-dom'


const NotFound404 = ({ location }) => {
    return (
        <div>
            <h1>Страница по адресу '{location.pathname}' не найдена</h1>
        </div>
    )
}



class App extends React.Component {
   constructor(props){
        super(props)
        this.state = {
            'myusers': [],
            'projects': [],
            'todos': []
        }
   }
  componentDidMount() {

      const myusers = [];
      const projects = [];
      const todos = [];
      console.log('we are getting start');
      axios.get('http://127.0.0.1:8000/api/myusers')
        .then(response => {
                const myusers_json = response.data.results
                this.setState(
                {
                    'myusers': myusers_json
                }
                )
        }).catch(error => {
                console.log(error)
                this.setState(
                {
                    'myusers': myusers
                }
                )
        })
        axios.get('http://127.0.0.1:8000/api/todos')
        .then(response => {
                const todos_json = response.data.results
                this.setState(
                {
                    'todos': todos_json
                }
                )
        }).catch(error => {
                console.log(error)
                this.setState(
                {
                    'todos': todos
                }
                )
        })
        axios.get('http://127.0.0.1:8000/api/projects')
        .then(response => {
                const projects_json = response.data.results
                this.setState(
                {
                    'projects': projects_json
                }
                )
        }).catch(error => {
                console.log(error)
                this.setState(
                {
                    'projects': projects
                }
                )
        })

  }
  render () {
    return (
    <Router>
        <div class = "container">
            <div class="menu">
                <Menu />
            </div>
            <div class="body">
            <Switch>
              <Route exact path="/todos" component={() => <ToDoList todo_list={this.state.todos} />} />
              <Route exact path="/projects" component={() => <ProjectList project_list={this.state.projects} />} />
              <Route exact path="/" component={() => <MyUserList myuser_list={this.state.myusers} />} />
              <Route path="/projects/:uid">
                <ProjectPage project_list={this.state.projects} />
              </Route>
              <Route component={NotFound404} />
             </Switch>
            </div>
            <div class="footer">
                <Footer />
            </div>
        </div>
    </Router>
    )
  }
}

export default App;


