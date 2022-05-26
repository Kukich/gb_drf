import React from 'react'
import {Link} from 'react-router-dom'

const ToDoItem = ({todo}) => {
    return (
       <tr>
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
               <Link to={`projects/${todo.project.uid}`}>{todo.project.uid}</Link>
           </td>
       </tr>
    )
 }

const ToDoList= ({todo_list}) => {
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
             {todo_list.map((todo) => <ToDoItem todo={todo} />)}
            </tbody>
       </table>
       </>
    )
}

export default ToDoList