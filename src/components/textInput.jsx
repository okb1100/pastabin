import React from 'react';
import PropTypes from 'prop-types';

class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(id, e) {
    this.props.onChange(id, e.target.value);
  }

  render() {
    return (
      <div className="form-group">
        {this.props.label}
        <input
          type="text"
          className="form-control bg-dark text-white"
          id={this.props.id}
          placeholder={this.props.placeholder}
          onChange={(e) => this.handleChange(this.props.id, e)}
        />
      </div>
    );
  }
}

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

TextInput.defaultProps = {
  placeholder: '',
  onChange: () => null,
};

export default TextInput;
