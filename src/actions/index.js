import { SIGN_IN, SIGN_OUT, CREATE_STREAM } from "./types";
import streams from "../apis/streams";

const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId,
  };
};

const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};
const createStream = (formData) => async (dispatch) => {
  const response = await streams.post("/streams", formData);

  dispatch({ type: CREATE_STREAM, payload: response.data });
};

export { signIn, signOut, createStream };
