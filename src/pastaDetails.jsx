import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Clipboard from 'react-clipboard.js';

function DetailsRow(props) {
  /*  Too many conditions */
  if (props.link && props.value) {
    return (
      <tr>
        <td>{props.name}</td>
        <td>
          <a href={props.link}>{props.value}</a>
        </td>
      </tr>
    );
  }
  if (!props.link && props.value) {
    return (
      <tr>
        <td>{props.name}</td>
        <td>{props.value}</td>
      </tr>
    );
  }
  return null;
}

DetailsRow.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  link: PropTypes.string,
};

DetailsRow.defaultProps = {
  name: null,
  value: null,
  link: null,
};

function DateRow(props) {
  return (
    <tr>
      <td>Date</td>
      <td>{new Date(props.date).toLocaleDateString()}</td>
    </tr>
  );
}

DateRow.propTypes = {
  date: PropTypes.number,
};

DateRow.defaultProps = {
  date: null,
};

export default class PastaDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      details: {},
    };
  }

  componentDidMount() {
    axios(`/api/get${window.location.pathname}`).then((res) => {
      if (res.status === 200) {
        const details = res.data;
        this.setState({ details });
      }
    });
  }

  render() {
    if (this.state.details.content) {
      return (
        <div>
          <table className="table table-dark bg-dark">
            <tbody>
              <DetailsRow name="Title" value={this.state.details.title} />
              <DetailsRow
                name="Author"
                value={this.state.details.uploader}
                link={`/u/${this.state.details.uploader}`}
              />
              <DetailsRow
                name="Label"
                value={this.state.details.label}
                link={`/label/${this.state.details.label}`}
              />
              <DetailsRow name="Syntax" value={this.state.details.syntax} />
              <DateRow date={this.state.details.date} />
            </tbody>
          </table>

          <div className="btn-group" role="group">
            <Clipboard
              className="btn btn-secondary"
              data-clipboard-text={this.state.details.content}
            >
              Copy
            </Clipboard>
            <a
              className="btn btn-secondary"
              role="button"
              href={`/download/${this.state.details.id}`}
            >
              Download
            </a>
          </div>
        </div>
      );
    }
    return null;
  }
}
