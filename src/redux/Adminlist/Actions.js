import {
  ADD_ADMIN_LIST,
  EDIT_ADMIN_LIST,
  DELETE_ADMIN_LIST,
  SEARCH_ADMIN_LIST,
} from "./ActionType";

import axios from "axios";

export const addAdminlist = (payload) => ({
  type: ADD_ADMIN_LIST,
  payload,
});
export const deleteAdminlist = (payload) => ({
  type: DELETE_ADMIN_LIST,
  payload,
});

export const editAdminlist = (payload) => ({
  type: EDIT_ADMIN_LIST,
  payload,
});

export const sreachAdmin = (payload) => ({
  type: SEARCH_ADMIN_LIST,
  payload,
});

export const getData = () => (dispatch) => {
  axios
    .get(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    )
    .then(({ data }) => {
      dispatch(addAdminlist(data));
    });
};
