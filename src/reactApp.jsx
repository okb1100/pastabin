import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import PastaDetails from './pastaDetails';
import ContentDisplay from './contentDisplay';
import Notify from './notify';

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
        <div className="container-fluid">
          {/* Should move this logic into the component */}
          {this.state.notification.message && (
            <Notify
              onExpire={this.notificationExpired}
              time={this.state.notification.time}
              message={this.state.notification.message}
            />
          )}
          <div className="row">
            <PastaDetails copySuccess={this.copySuccees} pasta={this.state.pasta} />
            <ContentDisplay content={this.state.pasta.content} syntax={this.state.pasta.syntax} />
          </div>
        </div>
      );
    }
    return null;
  }
}

function App() {
  ReactDOM.render(<PastaView />, document.getElementById('pastaRoot'));
}

export default App;
