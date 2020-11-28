import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";

class StreamForm extends Component {
  constructor(props) {
    super(props);
    this.renderInput = this.renderInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }
  renderInput({ label, input, meta }) {
    const className = `field ${meta.error && meta.touched && "error"}`;
    return (
      <div className={className}>
        <label>{label}</label>
        {/* destructure the input object on formProps to get access to value and onChange properties */}
        <input {...input} autoComplete="off" />
        {/* {console.log(meta)} */}

        {this.renderError(meta)}
      </div>
    );
  }
  onSubmit(formValues) {
    this.props.onSubmit(formValues);
  }
  render() {
    return (
      <div>
        <form
          className="ui form error"
          onSubmit={this.props.handleSubmit(this.onSubmit)}
        >
          <Field
            name="title"
            component={this.renderInput}
            label="Enter name:"
          />
          <Field
            name="description"
            component={this.renderInput}
            label="Enter description:"
          />
          <button className="ui basic button primary">Submit</button>
        </form>
      </div>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  if (!formValues.title) {
    errors.title = "Please enter a name for your stream";
  }

  if (!formValues.description) {
    errors.description = "Please enter a description for your stream";
  }

  return errors;
};

export default reduxForm({
  form: "streamForm",
  validate,
})(StreamForm);
