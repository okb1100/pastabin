import React from 'react';
import PropTypes from 'prop-types';

class SyntaxSelector extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(id, e) {
    this.props.onChange(id, e.target.value);
  }
  render() {
    const languages = [
      'Plain Text',
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
    ].map((lang) => (
      <option key={lang} value={lang}>
        {lang}
      </option>
    ));

    return (
      <div className="form-group">
        Select syntax (optional)
        <select
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
