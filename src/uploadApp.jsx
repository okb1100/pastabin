import React from 'react';
import ReactDOM from 'react-dom';
// replace axios.
import Notify from './components/notify';
import Navbar from './components/navbar';
import UploadForm from './components/uploadForm';

const { navbarConfig } = require('./pastabinConfig');

class UploadApp extends React.Component {
  constructor(props) {
    super(props);
    this.notificationExpired = this.notificationExpired.bind(this);
    this.onNotify = this.onNotify.bind(this);
    this.state = {
      notification: {},
    };
  }
  onNotify(message, type, timeout) {
    const notification = {
      message,
      type,
      timeout,
      time: Date.now(),
    };
    this.setState({ notification });
  }

  notificationExpired() {
    this.setState({ notification: { message: '' } });
  }
  render() {
    return (
      <div>
        <Navbar items={navbarConfig.items} brand={navbarConfig.brand} />
        <div className="container">
          {this.state.notification.message && (
            <Notify
              onExpire={this.notificationExpired}
              type={this.state.notification.type}
              time={this.state.notification.time}
              message={this.state.notification.message}
              timeout={this.state.notification.timeout}
            />
          )}
          <UploadForm onNotify={this.onNotify} />
        </div>
      </div>
    );
  }
}

function Render(element) {
  ReactDOM.render(<UploadApp />, document.getElementById(element.id));
}

export default Render;
