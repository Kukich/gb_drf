import React from 'react'
import {Link } from 'react-router-dom'

class Menu extends React.Component {
    constructor(props) {
        super(props)
        this.state={'token':''}
    }

    render(){
 return (
    <>
        <hr/>
            <h1 class="display-6">Menu</h1>
            <nav>
                <ul>
                    <li>
                        <Link to='/'  target="_top">MyUsers</Link>
                    </li>
                    <li>
                        <Link to='/projects'  target="_top">Projects</Link>
                    </li>
                    <li>
                        <Link to='/todos'  target="_top">TODOs</Link>
                    </li>
                    <li>
                        {this.props.is_authenticated() ? <><div>User: {this.props.name} </div><button onClick={()=>this.props.logout()}>Выйти</button></> :
                        <Link to='/login'  target="_top">Войти</Link>}
                    </li>
                </ul>
            </nav>
        <hr/>
    </>
 )
 }
}

export default Menu