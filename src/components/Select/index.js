import React from "react";
import PropTypes from "prop-types";
import {
    Form
} from 'react-bootstrap';
import "./style.css";


class Select extends React.Component {
  state = {
    value: this.props.value
  }

  selectRef = null;
  setSelectRef = ref => {
    this.selectRef = ref;
  }

  onChange = (value, actionMeta) => {
    this.props.onChange(value, actionMeta);
    this.setState({ value });
  }

  render = () => {
    const { SelectComponent, isDisabled, required, ...props } = this.props;
    const enableRequired = !isDisabled;
    const { value } = this.state;
    return (
      <div className="react-select">
        <SelectComponent
          {...props}
          size="3"
          ref={this.setSelectRef}
          onChange={ this.onChange }
        />
        {enableRequired && (
            <div>
                <input
                    tabIndex={-1}
                    id="hidden-validate"
                    autoComplete="off"
                    className="d-none"
                    value={ value || '' }
                    onChange={() => {} }
                    onFocus={() => this.selectRef.focus()}
                    required={required}
                />
                <Form.Control.Feedback type="invalid" className="message-select">Campo obrigatório</Form.Control.Feedback>
            </div>
        )}
      </div>
    );
  }
}


Select.protoTypes = {
  selectComponent: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  required: PropTypes.bool
};

export default Select;
