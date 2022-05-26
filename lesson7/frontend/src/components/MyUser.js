import React from 'react';

const MyUserItem = ({myuser}) => {
    return (
       <tr key={myuser.uid}>
           <td>
               {myuser.firstname}
           </td>
           <td>
               {myuser.lastname}
           </td>
           <td>
               {myuser.email}
           </td>
           <td>
               {myuser.username}
           </td>
       </tr>
    )
 }

const MyUserListName = ({myuser_list}) => {
  // используя метод map() и заполняем данными тег li
  console.log(myuser_list);
  const listItems = myuser_list.map(( user, index ) =>
    <li>
      { user.lastname } { user.firstname }
    </li>
  );
  return (
    <ul> { listItems } </ul>
  );
}

const MyUserList= ({myuser_list}) => {
    return (
       <>
       <h1 class="display-6">User list</h1>
       <table class="table table-striped">
       <thead>
       <tr>
           <th scope="col">
               Имя
           </th>
           <th scope="col">
               Фамилия
           </th>
           <th scope="col">
               Почта
           </th>
           <th scope="col">
               Логин
           </th>
        </tr>
        </thead>

        <tbody>
            {myuser_list.map((my_user) => <MyUserItem myuser={my_user} />)}
         </tbody>
       </table>
       </>
    )
}


export default MyUserList
export {MyUserListName}