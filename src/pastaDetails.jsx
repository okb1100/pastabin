import React from 'react';
import axios from 'axios';

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
    return (
      <table className="table table-dark bg-dark">
        <tbody>
          {/* Fix this. Create a component and call that. */}
          if({this.state.details.title}){
            <tr>
              <td> Title </td>
              <td> {this.state.details.title} </td>
            </tr>
          }
          if({this.state.details.uploader}){
            <tr>
              <td> Author </td>
              <td>
                {' '}
                <a href={`/u/${this.state.details.uploader}`}>{this.state.details.uploader}</a>{' '}
              </td>
            </tr>
          }
          if({this.state.details.label}){
            <tr>
              <td> Label </td>
              <td>
                {' '}
                <a href={`/label/${this.state.details.label}`}>{this.state.details.label}</a>{' '}
              </td>
            </tr>
          }
          <tr>
            <td>Syntax</td>
            <td>{this.state.details.syntax}</td>
          </tr>
          <tr>
            <td>Date</td>
            <td className="date">{this.state.details.date}</td>
          </tr>
        </tbody>
      </table>
    );
  }
}
