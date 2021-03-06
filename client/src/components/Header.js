import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments'

class Header extends React.Component {
    renderContent() {
        switch (this.props.auth){
            case null:
                return;
            case false:
                return <li><a href="/auth/google">Login with Google</a></li>;
            default:
                return [
                    <li key="1"><Payments/></li>,
                    <li key="2" style={{ margin: '0 10px'}}>Credits: {this.props.auth.credits}</li>,
                    <li key="3"><a href="/api/logout">Logout</a></li>
                ];
        }
    }

    render(){
        return(
            <nav>
                <div className="nav-wrapper">
                    <div className="col s12">
                        <Link
                            to={ this.props.auth ? "/surveys" : "/" }
                            className="left brand-logo"
                        >
                            Survey Maker
                        </Link>
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