import React from 'react';
import PropTypes from 'prop-types';
import '../css/notify.css';

class Notify extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      time: Date.now(),
    };
  }
  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      time: Date.now(),
    });

    if (this.state.time > this.props.time + this.props.timeout) {
      this.expired();
    }
  }

  expired() {
    this.props.onExpire();
  }

  render() {
    return (
      <div className="row notify">
        <div className={`col-md-6 alert alert-${this.props.type}`} role="alert">
          {this.props.message}
        </div>
      </div>
    );
  }
}
Notify.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string,
  time: PropTypes.number.isRequired,
  timeout: PropTypes.number,
  onExpire: PropTypes.func.isRequired,
};

Notify.defaultProps = {
  type: 'info',
  timeout: 1000,
};

export default Notify;
