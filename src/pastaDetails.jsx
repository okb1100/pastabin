import React from 'react';
import PropTypes from 'prop-types';
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

function PastaDetails(props) {
  return (
    <div className="col-md-3">
      <table className="table table-dark bg-dark">
        <tbody>
          <DetailsRow name="Title" value={props.pasta.title} />
          <DetailsRow
            name="Author"
            value={props.pasta.uploader}
            link={`/u/${props.pasta.uploader}`}
          />
          <DetailsRow name="Label" value={props.pasta.label} link={`/label/${props.pasta.label}`} />
          <DetailsRow name="Syntax" value={props.pasta.syntax} />
          <DateRow date={props.pasta.date} />
        </tbody>
      </table>

      <div className="btn-group" role="group">
        <Clipboard
          onSuccess={props.copySuccess}
          className="btn btn-secondary"
          data-clipboard-text={props.pasta.content}
        >
          Copy
        </Clipboard>
        <a className="btn btn-secondary" role="button" href={`/download/${props.pasta.id}`}>
          Download
        </a>
      </div>
    </div>
  );
}

PastaDetails.propTypes = {
  pasta: PropTypes.shape({
    content: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    date: PropTypes.number.isRequired,
    title: PropTypes.string,
    syntax: PropTypes.string,
    label: PropTypes.string,
    uploader: PropTypes.string,
  }).isRequired,
  copySuccess: PropTypes.func.isRequired,
};

export default PastaDetails;
