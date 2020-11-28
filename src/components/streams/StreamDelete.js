import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchStream, deleteStream } from "../../actions";
import Modal from "../Modal";
import history from "../../history";

class StreamDelete extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }
  handleDelete() {
    this.props.deleteStream(this.props.match.params.id);
  }
  renderContent() {
    const { stream } = this.props;
    if (!stream) {
      return <div>Are you sure you want to delete your stream?</div>;
    }

    return `Are you sure you want to delete the '${stream.title}' stream?`;
  }
  renderActions() {
    return (
      <>
        <div className="ui red button" onClick={this.handleDelete}>
          <i className="ui icon check" />
          Delete
        </div>
        <Link to="/" className="ui cancel orange button">
          <i className="ui icon close" />
          Cancel
        </Link>
      </>
    );
  }
  render() {
    return (
      <Modal
        title="Delete Stream"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push("/")}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(
  StreamDelete
);
