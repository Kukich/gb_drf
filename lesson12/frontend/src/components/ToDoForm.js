import React from 'react';

class ToDoForm extends React.Component{
   constructor(props){
        super(props)
        this.state = {
            'text': '',
            'project': 0,
            'create_user': 0
        }
   }

   handleChange(event){
        console.log('handleChange')
        console.log(event.target.name)
        console.log(event.target.value)
        this.setState({[event.target.name] : event.target.value})
   }

   handleSubmit(event) {
       console.log('form submited')
       console.log(this.state.text)
       console.log(this.state.project)
       console.log(this.state.create_user)
       this.props.createTodo(this.state.text, this.state.project,this.state.create_user)
       event.preventDefault()
   }

   render () {
    return (
        <form onSubmit={(event) => this.handleSubmit(event)}>
            <div className="form-group">
                <label for="text">text</label>
                <input name = "text" type="text" className="form-control" value = {this.state.text} onChange={(event)=>this.handleChange(event)}/>
            </div>
            <div className="form-group">
                <label for="project">project</label>
                <select name = "project" className="form-control" onChange={(event)=>this.handleChange(event)}>
                    {this.props.projects.map((project) => <option value={project.uid}>{project.name}</option>)}
                </select>
            </div>
            <div className="form-group">
                <label for="user">user</label>
                <select name = "create_user" className="form-control" onChange={(event)=>this.handleChange(event)}>
                    {this.props.myusers.map((user) => <option value={user.uid}>{user.lastname} {user.firstname}</option>)}
                </select>
            </div>
            <input type="submit" className="btn btn-primary" value="Save"/>
        </form>
    )
   }
}

export default ToDoForm