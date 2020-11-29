import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchStreams } from "../../actions";

class StreamList extends Component {
  componentDidMount() {
    console.log("fetching...");
    this.props.fetchStreams();
  }
  renderList() {
    return this.props.streams.map((stream) => {
      return (
        <div className="item" key={stream.id}>
          {this.renderBtns(stream)}
          <i className="ui icon middle aligned large camera" />
          <div className="content">
            <Link to={`/stream/${stream.id}`} className="header">
              {stream.title}
            </Link>
            <div className="description">{stream.description}</div>
          </div>
        </div>
      );
    });
  }
  renderBtns(stream) {
    if (stream.userId === this.props.currentUserId) {
      return (
        <div className="ui right floated content">
          <Link
            to={`/stream/delete/${stream.id}`}
            className="ui button basic red"
          >
            <i className="ui icon trash alternate outline" />
            Delete
          </Link>
          <Link
            to={`/stream/edit/${stream.id}`}
            className="ui button basic yellow"
          >
            <i className="ui icon edit outline" />
            Edit
          </Link>
        </div>
      );
    }
    return null;
  }
  renderCreate() {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: "right" }}>
          <Link to="/stream/new" className="ui button green outline">
            <i className="icon upload" />
            Create Stream
          </Link>
        </div>
      );
    }
  }
  render() {
    return (
      <div>
        <h2>Streams</h2>
        <div className="ui celled list">{this.renderList()}</div>
        {this.renderCreate()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);
