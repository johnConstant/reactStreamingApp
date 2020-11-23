import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends Component {
  constructor(props) {
    super(props);

    this.onAuthChange = this.onAuthChange.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
    this.onSignOut = this.onSignOut.bind(this);
  }
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "242327283522-g7artf6b04p14t0tg5dca635id08lig7.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }
  onAuthChange(isSignedIn) {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  }
  onSignIn() {
    this.auth.signIn();
  }
  onSignOut() {
    this.auth.signOut();
  }
  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <div className="ui red google button" onClick={this.onSignOut}>
          <i className="google icon"></i>Logout
        </div>
      );
    } else {
      return (
        <div className="ui green google button" onClick={this.onSignIn}>
          <i className="google icon"></i>Sign In
        </div>
      );
    }
  }
  render() {
    return <div className="item">{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
