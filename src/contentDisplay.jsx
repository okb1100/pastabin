import React from 'react';
import PropTypes from 'prop-types';
import hljs from 'highlight.js/lib/highlight';
import './css/zenburn-custom.css';

const languages = [
  'actionscript',
  'apache',
  'autohotkey',
  'bash',
  'basic',
  'cs',
  'cpp',
  'css',
  'delphi',
  'diff',
  'dockerfile',
  'go',
  'gradle',
  'xml',
  'http',
  'ini',
  'json',
  'java',
  'javascript',
  'kotlin',
  'lua',
  'makefile',
  'markdown',
  'nginx',
  'objectivec',
  'php',
  'perl',
  'python',
  'ruby',
  'rust',
  'sql',
  'swift',
  'brainfuck',
  'coffeescript',
];
languages.forEach((langName) => {
  // eslint-disable-next-line
  const langModule = require(`highlight.js/lib/languages/${langName}`);
  hljs.registerLanguage(langName, langModule);
});

function ZoomButton(props) {
  return (
    <div className="btn-group" role="group">
      <button className="btn btn-secondary" onClick={props.zoomInHandler}>
        Zoom in
      </button>
      <button className="btn btn-secondary" onClick={props.zoomOutHandler}>
        Zoom out
      </button>
    </div>
  );
}
ZoomButton.propTypes = {
  zoomInHandler: PropTypes.func.isRequired,
  zoomOutHandler: PropTypes.func.isRequired,
};

class ContentDisplay extends React.Component {
  constructor(props) {
    super(props);

    this.ref = React.createRef();
    this.state = {
      zoomLevel: 16,
    };

    this.zoomInHandler = this.zoomInHandler.bind(this);
    this.zoomOutHandler = this.zoomOutHandler.bind(this);
  }

  componentDidMount() {
    hljs.highlightBlock(this.ref.current);
  }

  zoomInHandler() {
    this.setState({ zoomLevel: this.state.zoomLevel + 2 });
  }
  zoomOutHandler() {
    this.setState({ zoomLevel: this.state.zoomLevel - 2 });
  }
  render() {
    const lines = this.props.content.split('\n').map((val, i) => `${i + 1}\n`);
    return (
      <div className="col-md-9">
        <div className="card bg-dark">
          <div className="btn-group" role="group">
            <button
              className="btn btn-secondary"
              onClick={(e) => {
                this.zoomInHandler(e);
              }}
            >
              Zoom in
            </button>
            <button
              className="btn btn-secondary"
              onClick={(e) => {
                this.zoomOutHandler(e);
              }}
            >
              Zoom out
            </button>
          </div>
          <div className="card-body pastaCard p-0">
            <table className="pastaTable w-100" style={{ fontSize: this.state.zoomLevel }}>
              <tbody ref={this.ref}>
                <tr>
                  {/* What the fuck? */}
                  <td
                    className="lines text-right border border-top-0 border-bottom-0 border-left-0 border-secondary"
                    width="5%"
                  >
                    <pre className="text-secondary">{lines}</pre>
                  </td>
                  <td className="pastaContent d-block pl-1">
                    <pre className={`text-white hljs ${this.props.syntax}`}>
                      {this.props.content}
                    </pre>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
ContentDisplay.propTypes = {
  content: PropTypes.string.isRequired,
  syntax: PropTypes.string,
};
ContentDisplay.defaultProps = {
  syntax: 'plain-text',
};
export default ContentDisplay;
