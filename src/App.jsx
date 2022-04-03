import "./App.css";
import AdminList from "./components/AdminList";
import { getData } from "./redux/Adminlist/Actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

function App() {
  return (
    <div className="App">
      <AdminList />
      {/* <div>
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
      </div> */}
    </div>
  );
}

export default App;
