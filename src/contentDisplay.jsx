import React from 'react';

function ContentDisplay(props) {
  if (props.content) {
    return (
      <div className="col-md-9">
        <div className="card bg-dark">
          <div className="card-body pastaCard p-0">
            <table className="pastaTable w-100">
              <tbody>
                <tr>
                  {/* What the fuck? */}
                  <td
                    className="lines text-right border border-top-0 border-bottom-0 border-left-0 border-secondary"
                    width="5%"
                  >
                    <pre className="text-secondary" />
                  </td>
                  <td className="pastaContent d-block pl-1">
                    <pre className={`text-white hljs ${props.syntax}`}>{props.content}</pre>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
  return null;
}
export default ContentDisplay;
