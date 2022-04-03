import React, { useEffect, useState } from "react";
import Icon from "react-crud-icons";
import "../../node_modules/react-crud-icons/dist/css/react-crud-icons.css";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";

// Redux All action importing
import {
  getData,
  deleteAdminlist,
  editAdminlist,
  sreachAdmin,
} from "../redux/Adminlist/Actions";

// input demo object
const initValues = {
  name: "",
  email: "",
  role: "",
};

// setTimeoutid for serach bar
var setTimeoutid;

// emapty array for check box admin
var checkdataarr = [];

// Main component Function
export default function AdminList() {
  const { adminList } = useSelector((store) => store); // Get Admin data from redux store
  const dispatch = useDispatch();
  const [display, setDisplay] = useState(false);
  const [values, setValues] = useState(initValues); // Input values assigend

  const [num, setNum] = useState(""); // One eidt id number

  // Pagnation all value assigend
  const [currentPage, setCurrentPage] = useState(0);
  const [Adminperpage] = useState(10);
  const [allCheckValue, setAllCheckValue] = useState(false);

  // useing useEffect to get data from redux sotre
  useEffect(() => {
    getAdminList();
  }, []);

  // Get data from redux sotre funtion
  const getAdminList = () => {
    dispatch(getData()); //  calling dispatch function
  };

  // Doing the Pagnation functionality and Page number user count
  const indexoffirstpage = currentPage * Adminperpage;
  let currentAmdin = adminList.slice(
    indexoffirstpage,
    indexoffirstpage + Adminperpage
  );
  const pageCount = Math.ceil(adminList.length / Adminperpage);

  // ReactPaginate In bulid function
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Search bar function doing dobouncing search by any value
  const getSearch = (v) => {
    if (v.length < 1) {
      getAdminList();
    } else {
      clearTimeout(setTimeoutid);
      setTimeoutid = setTimeout(() => {
        let updatedata = adminList.filter((e) => {
          if (e.name == v || e.email == v || e.role == v) {
            return e;
          }
        });
        dispatch(sreachAdmin(updatedata));
      }, 2000);
    }
  };

  // Delete Admin particular user functionality
  const deleteData = (id) => {
    let updatedata = adminList.filter((e) => {
      return e.id !== id;
    });
    dispatch(deleteAdminlist(updatedata));
  };

  // Edit the particular Admin user new value functionality
  const editvalue = (e) => {
    let { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  // Edit the particular Admin  user functionality
  // save the changes
  const changethevalue = () => {
    let updatedata = adminList.filter((e) => {
      if (num === e.id) {
        e.name = values.name;
        e.email = values.email;
        e.role = values.role;
        return e;
      }
      return e;
    });
    dispatch(editAdminlist(updatedata));
    setNum("");
  };

  // Cancel the editing process
  const cancelfu = () => {
    setNum("");
  };

  // Selected user delete id
  const checkboxDelete = (v) => {
    checkdataarr.push(v);
  };

  // Selected user delete function
  const DeleteCheckbox = () => {
    let updatedata = adminList;

    for (let i = 0; i < checkdataarr.length; i++) {
      updatedata = updatedata.filter((e) => {
        return e.id !== checkdataarr[i];
      });
    }
    checkdataarr = [];
    dispatch(deleteAdminlist(updatedata));
    setAllCheckValue(false);
  };

  return (
    <div className="MaindivAdminList">
      <input
        type="text"
        placeholder="Search by name, email or role"
        onChange={(e) => {
          getSearch(e.target.value);
        }}
        className="serachinput"
      />
      <div>
        <table>
          <thead>
            <tr>
              <th className="checkboxth">
                {allCheckValue ? (
                  <input
                    className="checkboxt"
                    type="checkbox"
                    onClick={() => {
                      setAllCheckValue(!allCheckValue);
                    }}
                  />
                ) : (
                  <input
                    className="checkboxt"
                    type="checkbox"
                    onClick={() => {
                      setAllCheckValue(!allCheckValue);
                    }}
                    checked=""
                  />
                )}
              </th>
              <th className="Nameth">Name</th>
              <th className="Emailth">Email</th>
              <th className="Roleth">Role</th>
              <th className="Roleth">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentAmdin.map((e) => {
              return (
                <tr key={e.id}>
                  <td>
                    {allCheckValue ? (
                      <input
                        className="checkboxt"
                        type="checkbox"
                        onClick={checkboxDelete(e.id)}
                        checked
                      />
                    ) : (
                      <input
                        className="checkboxt"
                        type="checkbox"
                        onClick={() => {
                          checkboxDelete(e.id);
                        }}
                      />
                    )}
                  </td>
                  <td>
                    {num === e.id ? (
                      <input
                        type="text"
                        placeholder={e.name}
                        name="name"
                        onChange={editvalue}
                      />
                    ) : (
                      e.name
                    )}
                  </td>
                  <td>
                    {num === e.id ? (
                      <input
                        type="email"
                        name="email"
                        placeholder={e.email}
                        onChange={editvalue}
                      />
                    ) : (
                      e.email
                    )}
                  </td>
                  <td>
                    {num === e.id ? (
                      <input
                        type="text"
                        placeholder={e.role}
                        name="role"
                        onChange={editvalue}
                      />
                    ) : (
                      e.role
                    )}
                  </td>
                  <td>
                    {num === e.id ? (
                      <button className="sgbtn" onClick={changethevalue}>
                        Save
                      </button>
                    ) : (
                      <Icon
                        name="edit"
                        tooltip="Edit"
                        theme="light"
                        size="medium"
                        onClick={() => setNum(e.id)}
                      />
                    )}
                    {num === e.id ? (
                      <button className="sgbtn" onClick={cancelfu}>
                        Cancel
                      </button>
                    ) : (
                      <Icon
                        name="delete"
                        tooltip="Edit"
                        theme="light"
                        msize="medium"
                        onClick={() => deleteData(e.id)}
                      />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div>
        <div>
          <button className="deletebutton" onClick={DeleteCheckbox}>
            Delete Checkbox User
          </button>
        </div>
        <div>
          <div>
            <ReactPaginate
              previousLabel="<"
              nextLabel=">"
              onPageChange={handlePageClick}
              pageCount={pageCount}
              containerClassName={"paginationBttns"}
              previousLinkClassName={"paginationBttn"}
              nextLinkClassName={"nextbtn"}
              disabledClassName={"disabledbtn"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
