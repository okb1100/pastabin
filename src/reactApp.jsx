import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import PastaDetails from './pastaDetails';
import ContentDisplay from './contentDisplay';

class PastaView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pasta: {},
    };
  }

  componentDidMount() {
    axios(`/api/get${window.location.pathname}`).then((res) => {
      if (res.status === 200) {
        const pasta = res.data;
        this.setState({ pasta });
      }
    });
  }

  render() {
    return (
      <div className="row">
        <PastaDetails pasta={this.state.pasta} />
        <ContentDisplay content={this.state.pasta.content} syntax={this.state.pasta.syntax} />
      </div>
    );
  }
}

function App() {
  ReactDOM.render(<PastaView />, document.getElementById('pastaRoot'));
}

export default App;
