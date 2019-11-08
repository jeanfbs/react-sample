import React, { Component } from 'react';
import Spinner from "../Spinner";

export default class Loading extends Component {


    render = () => {
        return (
            <div className={ "text-center " + (this.props.loading ? '': 'd-none') }>
                <Spinner variant={ this.props.variant } width={ this.props.width } height={ this.props.height } loading={ this.props.loading } />
                <h4>Carregando...</h4>
            </div>
        )
    }
}
