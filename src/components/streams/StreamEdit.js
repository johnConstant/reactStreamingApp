import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchStream, editStream } from "../../actions";
import StreamForm from "./StreamForm";

class StreamEdit extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }
  onSubmit(formValues) {
    console.log(formValues);
    this.props.editStream(this.props.match.params.id, formValues);
  }
  render() {
    const { stream } = this.props;
    if (!stream) {
      return <div>Loading ...</div>;
    }
    return (
      <div>
        <h3>Edit a stream:</h3>
        <StreamForm
          initialValues={{
            title: stream.title,
            description: stream.description,
          }}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps, { fetchStream, editStream })(
  StreamEdit
);
