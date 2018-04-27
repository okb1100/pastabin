import React from 'react';
import PropTypes from 'prop-types';

const { languagesSupported } = require('../pastabinConfig');

languagesSupported.unshift('Plain Text');
class SyntaxSelector extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(id, e) {
    this.props.onChange(id, e.target.value);
  }
  render() {
    const languages = languagesSupported.map((lang) => (
      <option key={lang} value={lang}>
        {lang}
      </option>
    ));

    return (
      <div className="form-group">
        Select syntax (optional)
        <select
          value="Plain Text"
          onChange={(e) => this.handleChange(this.props.id, e)}
          id={this.props.id}
          className="form-control bg-dark text-white"
        >
          {languages}
        </select>
      </div>
    );
  }
}

SyntaxSelector.propTypes = {
  onChange: PropTypes.func,
  id: PropTypes.string.isRequired,
};
SyntaxSelector.defaultProps = {
  onChange: () => null,
};

export default SyntaxSelector;
