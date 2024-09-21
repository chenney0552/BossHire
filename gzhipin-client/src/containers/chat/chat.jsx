import React, { Component } from 'react';
import { connect } from 'react-redux';

class Chat extends Component {
  render() {
    return (<div>Chat</div>)
  }
}

export default connect(state => ({}), 
{}
)(Chat);