import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchStream } from "../../actions";

class StreamShow extends Component {
  constructor(props) {
    super(props);
    this.renderContent = this.renderContent.bind(this);
  }
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }
  renderContent() {
    const { stream } = this.props;

    if (!stream) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h1>{stream.title}</h1>
        <h5>{stream.description}</h5>
      </div>
    );
  }
  render() {
    return <div>{this.renderContent()}</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
