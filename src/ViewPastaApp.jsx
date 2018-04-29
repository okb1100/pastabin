import React from 'react';
import ReactDOM from 'react-dom';
// replace axios.
import axios from 'axios';
import PastaDetails from './components/pastaDetails';
import ContentDisplay from './components/contentDisplay';
import Notify from './components/notify';
import Navbar from './components/navbar';

const { navbarConfig } = require('./pastabinConfig');

class PastaView extends React.Component {
  constructor(props) {
    super(props);
    this.copySuccees = this.copySuccees.bind(this);
    this.notificationExpired = this.notificationExpired.bind(this);

    this.state = {
      pasta: {},
      notification: {},
      hasData: false,
    };
  }

  componentDidMount() {
    axios(`/api/get${window.location.pathname}`).then((res) => {
      if (res.status === 200) {
        const pasta = res.data;
        this.setState({ pasta, hasData: true });
      }
    });
  }

  copySuccees() {
    const notification = {
      message: 'Copied to clipboard.',
      time: Date.now(),
    };
    this.setState({ notification });
  }
  notificationExpired() {
    this.setState({ notification: { message: '' } });
  }

  render() {
    if (this.state.hasData) {
      return (
        <div>
          <Navbar items={navbarConfig.items} brand={navbarConfig.brand} />
          <div className="container-fluid">
            {this.state.notification.message && (
              <Notify
                onExpire={this.notificationExpired}
                time={this.state.notification.time}
                message={this.state.notification.message}
                timeout={3000}
              />
            )}
            <div className="row">
              <PastaDetails copySuccess={this.copySuccees} pasta={this.state.pasta} />
              <ContentDisplay
                className="col-md-9"
                content={this.state.pasta.content}
                syntax={this.state.pasta.syntax}
              />
            </div>
          </div>
        </div>
      );
    }
    return null;
  }
}

function Render(element) {
  ReactDOM.render(<PastaView />, document.getElementById(element.id));
}

export default Render;
