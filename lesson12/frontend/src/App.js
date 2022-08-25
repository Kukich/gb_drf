import React from 'react';
import './App.css';
import axios from 'axios';
import Menu from './components/Menu.js';
import MyUserList from './components/MyUser.js';
import ToDoList from './components/ToDo.js';
import ProjectList,{ProjectPage} from './components/Project.js';
import LoginForm from './components/Auth.js';
import ToDoForm from './components/ToDoForm.js';
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
            'name':'Unknown'
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

   createTodo(text,project,create_user){
      const headers = this.get_headers()
      const data = {
        'text': text,
        'project': project,
        'create_user': create_user
      }
      axios.post(`http://127.0.0.1:8000/api/todos/`,data,{headers})
        .then(response => {
           let new_todo = response.data
           const prjct = this.state.projects.filter(item => item.uid === new_todo.project)[0]
           const cr_user = this.state.myusers.filter(item => item.uid === new_todo.create_user)[0]
           new_todo.project = prjct
           new_todo.create_user = cr_user
           this.setState({'todos': [...this.state.todos,new_todo,new_todo ]})
        }).catch(error => {
                console.log(error)
        })
   }

   deleteTodo(uid){
      const headers = this.get_headers()
      axios.delete(`http://127.0.0.1:8000/api/todos/${uid}`,{headers})
        .then(response => {
                this.setState({'todos': this.state.todos.filter(item => item.uid !== uid)} )
        }).catch(error => {
                console.log(error)
        })
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
        return this.state.token !== '' && this.state.token !== undefined
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
        axios.get('http://127.0.0.1:8000/api/todos?is_active=true',{headers})
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
         <Menu name={this.state.name} is_authenticated={()=>this.is_authenticated()} logout={()=>this.logout()}/>
        <hr/>
            </div>
            <div class="body">
            <Switch>
              <Route exact path="/todos/create" component={() => <ToDoForm projects={this.state.projects} myusers={this.state.myusers} createTodo={(text,project,create_user) => this.createTodo(text,project,create_user)} />} />
              <Route exact path="/todos" component={() => <ToDoList todo_list={this.state.todos} deleteTodo={(uid) => this.deleteTodo(uid)} />} />
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


