import React from 'react';
import './App.css';
import axios from 'axios';
import MyUserList from './components/MyUser.js';
import ToDoList from './components/ToDo.js';
import ProjectList,{ProjectPage} from './components/Project.js';
import LoginForm from './components/Auth.js';
import Footer from './components/Footer.js';
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom'
import Main from './Main.js'
import Cookies from 'universal-cookie'

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
            'todos': [],
            'token': '',
        }
   }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_authenticated()){
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }

   get_token(username, password) {
        axios.post('http://127.0.0.1:8000/api-auth-token/',
            {
            username: username,
            password: password
        }).then(response => {
            this.set_token(response.data['token'],username)
        }).catch(error => alert('Неверный логин или пароль'))
    }

    set_token(token,name) {
        const cookies = new Cookies()
        cookies.set('token', token)
        cookies.set('name', name)
        this.setState({'token': token,'name':name}, ()=>this.load_data())
    }

    is_authenticated() {
        return this.state.token != ''
    }

    get_token_from_storage(){
        const cookies = new Cookies()
        const token = cookies.get('token')
        const name = cookies.get('name')
        this.setState({'token': token,'name': name}, ()=>this.load_data())
    }

    logout(){
        this.set_token('','')
    }

   load_data(){
      const myusers = [];
      const projects = [];
      const todos = [];
      console.log('we are getting start');
      const headers = this.get_headers()
      axios.get('http://127.0.0.1:8000/api/myusers',{headers})
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
        axios.get('http://127.0.0.1:8000/api/todos',{headers})
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
        axios.get('http://127.0.0.1:8000/api/projects',{headers})
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

  componentDidMount() {
    this.get_token_from_storage()
  }

  render () {
    return (
    <Router>
        <div class = "container">
            <div class="menu">
        <hr/>
            <h1 class="display-6">Menu</h1>
            <nav>
                <ul>
                    <li>
                        <Link to='/'>MyUsers</Link>
                    </li>
                    <li>
                        <Link to='/projects'>Projects</Link>
                    </li>
                    <li>
                        <Link to='/todos'>TODOs</Link>
                    </li>
                    <li>
                        {this.is_authenticated() ? <><div>User: {this.state.name} </div><button onClick={()=>this.logout()}>Выйти</button></> :
                        <Link to='/login'>Войти</Link>}
                    </li>
                </ul>
            </nav>
        <hr/>
            </div>
            <div class="body">
            <Switch>
              <Route exact path="/todos" component={() => <ToDoList todo_list={this.state.todos} />} />
              <Route exact path="/projects" component={() => <ProjectList project_list={this.state.projects} />} />
              <Route exact path="/" component={() => <MyUserList myuser_list={this.state.myusers} />} />
              <Route path="/projects/:uid">
                <ProjectPage project_list={this.state.projects} />
              </Route>
              <Route exact path="/login" component={() => <LoginForm get_token={(username, password) => this.get_token(username, password) } /> }/>
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


