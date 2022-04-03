import {
  ADD_ADMIN_LIST,
  EDIT_ADMIN_LIST,
  DELETE_ADMIN_LIST,
  SEARCH_ADMIN_LIST,
} from "./ActionType";

const init = {
  adminList: [],
};

export const AdminReducer = (store = init, { type, payload }) => {
  switch (type) {
    case ADD_ADMIN_LIST:
      return {
        ...store,
        adminList: payload,
      };

    case DELETE_ADMIN_LIST:
      return {
        ...store,
        adminList: payload,
      };

    case EDIT_ADMIN_LIST:
      return {
        ...store,
        adminList: payload,
      };

    case SEARCH_ADMIN_LIST:
      console.log(payload);
      return {
        ...store,
        adminList: payload,
      };

    default:
      return { ...store };
  }
};
