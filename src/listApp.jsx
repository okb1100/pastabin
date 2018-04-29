import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import Navbar from './components/navbar';
import DateView from './components/dateView';

const { navbarConfig } = require('./pastabinConfig');

class ListApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: {},
      hasData: false,
    };
  }

  componentDidMount() {
    const { listType } = this.props;
    const query = window.location.pathname.match(/\/.+\/(.+)/)[1];
    axios.post('/api/list', { listType, query }).then((res) => {
      if (res.status === 200) {
        const list = res.data;
        this.setState({ list, hasData: true });
      }
    });
  }
  render() {
    if (this.state.hasData) {
      const posts = this.state.list.map((post, index) => (
        <div className="col-md-6" key={post.id}>
          <div className="card bg-dark text-white mb-2">
            <div className="card-header">
              <a href={`/${post.id}`}>{`${index} - ${post.title}`}</a>
            </div>
            <div className="card-body">
              <pre className={`hljs text-white ${post.syntax}`}>{post.content.substr(0, 100)}</pre>
            </div>
            <div className="card-footer">
              <DateView date={post.date} />
              -
              <span className="syntax">{post.syntax}</span>
            </div>
          </div>
        </div>
      ));
      return (
        <div>
          <Navbar items={navbarConfig.items} brand={navbarConfig.brand} />
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-white text-center">
                {/*
                    h3 author's all posts ||
                    h3 Posts labeled as label
                 */}
              </div>
              {posts}
            </div>
          </div>
        </div>
      );
    }
    return null;
  }
}
ListApp.propTypes = {
  listType: PropTypes.string.isRequired,
};
function Render(element, type) {
  ReactDOM.render(<ListApp listType={type} />, document.getElementById(element.id));
}

export default Render;
