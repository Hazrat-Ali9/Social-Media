export const loginStart = (userCredentials) => ({
  type: "LOGIN_START",
});
export const loginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user
});
export const loginFailure = (error) => ({
  type: "LOGIN_FAILURE",
  payload: error
});

export const follow = ( userId) => ({
  type: "FOLLOW",
  payload: userId
});

export const unFollow = ( userId) => ({
  type: "UNFOLLOW",
  payload: userId
});

// Auth Action jsx