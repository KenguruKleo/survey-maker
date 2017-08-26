import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import { handlePaymentToken } from '../actions';

class Payments extends React.Component {
    render(){
        return(
            <StripeCheckout
                name="Survey Maker"
                description="$5 for 5 surveys"
                amount = {500}
                token = { this.props.handlePaymentToken }
                stripeKey = {process.env.REACT_APP_STRIPE_KEY}
            >
                <a>Add Credits</a>
            </StripeCheckout>
        );
    }
}

export default connect(
    null,
    { handlePaymentToken }
)(Payments);