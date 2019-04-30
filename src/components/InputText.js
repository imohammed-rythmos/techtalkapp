import React, { Component } from "react";

class InputText extends Component {
  render() {
    let { onChangHandler, fieldName, fieldType, fieldValue } = this.props;
    return (
      <div>
        <label>
          {fieldName}
          <input
            onChange={e => onChangHandler(e.target.value)}
            className="form-control"
            type={fieldType}
            value={fieldValue}
          />
        </label>
      </div>
    );
  }
}

export default InputText;
