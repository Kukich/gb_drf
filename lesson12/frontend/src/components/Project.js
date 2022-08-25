import React from 'react';
import {MyUserListName} from './MyUser.js';
import { useParams,Link } from 'react-router-dom'

export const ProjectPage = ({project_list}) => {
    let { uid } = useParams();
    console.log(uid);
    let filtered_items = project_list.filter((item) => item.uid === uid);
    console.log(filtered_items[0]);
    return (
       <ProjectList project_list={filtered_items} />
    )
}

const ProjectItem = ({project}) => {
    return (
       <tr key='{project.uid}'>
           <td>
               <Link to={`projects/${project.uid}`}>{project.uid}</Link>
           </td>
           <td>
               {project.name}
           </td>
           <td>
               {project.url}
           </td>
           <td>
              <MyUserListName myuser_list={project.users} />
           </td>
       </tr>
    )
 }

const ProjectList= ({project_list}) => {
    let h1 = 'list';
    if(project_list.length === 1){
        h1 = project_list[0].uid;
    }
    return (
       <>
       <h1 class="display-6">Project {h1}</h1>
       <table class="table table-striped">
       <thead>
       <tr>
           <th scope="col">
               UID
           </th>
           <th scope="col">
               Название
           </th>
           <th scope="col">
               Url
           </th>
           <th scope="col">
               Пользователи
           </th>
           </tr>
           </thead>

           <tbody>
             {project_list.map((project) => <ProjectItem project={project} />)}
          </tbody>
       </table>
       </>
    )
}

export default ProjectList