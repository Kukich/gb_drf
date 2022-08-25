import React from 'react'
import {Link} from 'react-router-dom'

const ToDoItem = ({todo,deleteTodo}) => {
    return (
       <tr key={todo.uid}>
           <td>
               {todo.uid}
           </td>
           <td>
               {todo.create_date}
           </td>
           <td>
               {todo.text}
           </td>
           <td>
               {todo.create_user.lastname} {todo.create_user.firstname}
           </td>
           <td>
               <Link to={`projects/${todo.project.uid}`}>{todo.project.name}</Link>
           </td>
           <td>
               <button onClick={()=>deleteTodo(todo.uid)} type='button'>Deactivate</button>
           </td>
       </tr>
    )
 }

const ToDoList= ({todo_list,deleteTodo}) => {
    return (
       <>
       <h1 class="display-6">TODO list</h1>
       <table class="table table-striped">
       <thead>
       <tr>
           <th scope="col">
               UID
           </th>
           <th scope="col">
               Дата создания
           </th>
           <th scope="col">
               Текст
           </th>
           <th scope="col">
               Владелец
           </th>
           <th scope="col">
               Проект
           </th>
           </tr>
           </thead>

           <tbody>
             {todo_list.map((todo) => <ToDoItem todo={todo} deleteTodo={deleteTodo} />)}
            </tbody>
       </table>
       <button>
          <Link to={`todos/create`}  target="_top">Create ToDo</Link>
       </button>
       </>
    )
}

export default ToDoList