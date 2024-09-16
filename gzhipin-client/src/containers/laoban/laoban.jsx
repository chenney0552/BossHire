// 老板的主界面
import React, {Component} from 'react';
import {connect} from 'react-redux';

class Laoban extends Component {
    render() {
        return (
            <div>Laoban</div>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {getUser}
)(Laoban)