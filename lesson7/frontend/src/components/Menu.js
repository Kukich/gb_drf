import React from 'react'
import {Link } from 'react-router-dom'

class Menu extends React.Component {
    constructor(props) {
        super(props)
        console.log(props)
    }

    render(){
 return (
    <>
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
                        {this.is_authenticated() ? <button onClick={()=>this.logout()}>Logout</button> :
                        <Link to='/login'>Login</Link>}
                    </li>
                </ul>
            </nav>
        <hr/>
    </>
 )
 }
}

export default Menu