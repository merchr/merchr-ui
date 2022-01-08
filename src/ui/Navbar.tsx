import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav>
            <div className="container">
                <div className='row'>
                    <div className='col'>
                        Menu
                    </div>
                    <div className='col'>
                        Merchr
                    </div>
                    <div className='col'>
                        <div className='col'>
                            Shopping Cart
                            Account
                        </div>
                    </div>
                </div>
            </div>
            {/* <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/account">Account</Link>
                </li>
                <li>
                    <Link to="/users">Users</Link>
                </li>
            </ul> */}
        </nav>
    );
}

export default Navbar;
