// create a not found component
import { Button } from 'antd-mobile';
import React, {Component} from 'react';

class NotFound extends Component {
    render() {
        return (
            <div>
                <h2>404 Not Found</h2>
                <Button
                    type='primary'
                    onClick={() => this.props.history.replace('/')}
                >
                    Go Home
                </Button>
            </div>
        )
    }
}

export default NotFound