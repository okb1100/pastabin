import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import TextInput from './components/textInput';
import SyntaxSelector from './components/syntaxSelector';

function validateContent(content) {
  if (content.length < 15) {
    return false;
  }
  return true;
}

class UploadForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pasta: {
        title: '',
        author: '',
        label: '',
        content: '',
        syntax: '',
      },
    };
    this.uploadPasta = this.uploadPasta.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  onChangeHandler(id, val) {
    /* A different approach required */
    const { pasta } = this.state;
    switch (id) {
      case 'ptitle':
        pasta.title = val;
        break;
      case 'pauthor':
        pasta.author = val;
        break;
      case 'plabel':
        pasta.label = val;
        break;
      case 'pcontent':
        pasta.content = val;
        break;
      case 'psyntax':
        pasta.syntax = val;
        break;
      default:
        return;
    }
    this.setState({ pasta });
  }

  uploadPasta() {
    // check for empty spaces etc.
    if (validateContent(this.state.pasta.content)) {
      axios
        .post('api/uploadPasta', this.state.pasta)
        .then((res) => {
          // Notify: success
          if (res.status === 200) {
            const link = (
              <a className="alert-link" href={`/${res.data}`}>
                {' '}
                {window.location.href + res.data}{' '}
              </a>
            );
            this.props.onNotify(
              <span>Your submission is hosted on {link}.</span>,
              'success',
              3600 * 60,
            );
          } else {
            this.props.onNotify(<span>An error occurred. Try again later...</span>, 'danger', 3600);
          }
        })
        .catch((err) => {
          // Notify: err
          this.props.onNotify(err.message, 'danger', 3600);
        });
    } else {
      this.props.onNotify('Blank submissions are not allowed. Please fill in the textbox.');
    }
  }
  render() {
    return (
      <div className="row">
        <div className="col-md-8">
          <div className="card mb-5 bg-dark text-white">
            <div className="card-body">
              <div className="form-group">
                Paste your content below.
                <textarea
                  id="pcontent"
                  required
                  rows="10"
                  className="form-control bg-dark text-white"
                  onChange={(e) => {
                    this.onChangeHandler('pcontent', e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="card-footer">
              <button className="btn btn-secondary btn-lg" onClick={this.uploadPasta}>
                Send
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card bg-dark text-white">
            <div className="card-body">
              <TextInput
                onChange={this.onChangeHandler}
                label="Title"
                placeholder="Title (Optional)"
                id="ptitle"
              />
              <TextInput
                onChange={this.onChangeHandler}
                label="Uploader Name"
                placeholder="Uploader name(optional)"
                id="pauthor"
              />
              <SyntaxSelector id="psyntax" onChange={this.onChangeHandler} />
              <TextInput
                onChange={this.onChangeHandler}
                label="Post label"
                placeholder="Label (optional)"
                id="plabel"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
UploadForm.propTypes = {
  onNotify: PropTypes.func,
};
UploadForm.defaultProps = {
  onNotify: () => null,
};
export default UploadForm;
