import React from 'react';

class Header extends React.Component {
    render(){
        return(
            <nav>
                <div className="nav-wrapper">
                    <div className="col s12">
                        <a href="/" className="brand-logo">Survey Maker</a>
                        <ul className="right">
                            <li>
                                <a>Login with Google</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Header;