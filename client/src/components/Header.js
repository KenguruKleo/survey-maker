import React from 'react';
import { connect } from 'react-redux';

class Header extends React.Component {
    renderContent() {
        switch (this.props.auth){
            case null:
                return;
            case false:
                return <li><a href="/auth/google">Login with Google</a></li>;
            default:
                return <li><a href="/api/logout">Logout</a></li>;
        }
    }

    render(){
        return(
            <nav>
                <div className="nav-wrapper">
                    <div className="col s12">
                        <a href="/" className="left brand-logo">Survey Maker</a>
                        <ul className="right">
                            {this.renderContent()}
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default connect(
    state => ({
        auth: state.auth
    })
)(Header);