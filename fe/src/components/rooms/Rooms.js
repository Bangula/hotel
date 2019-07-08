import React, { useState, useEffect } from "react";
import { getAllRooms } from "../../services/http/endpoints/rooms";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Room from "./components/Room";

import { useSelector } from "react-redux";

import "@zendeskgarden/react-pagination/dist/styles.css";
import { ThemeProvider } from "@zendeskgarden/react-theming";
import { Pagination } from "@zendeskgarden/react-pagination";

// Components

const useStyles = makeStyles(theme => ({
  progress: {
    position: "fixed",
    top: "50%",
    zIndex: "100",
    left: 0,
    right: 0,
    margin: "0 auto",
    transform: "translateY(-50%)"
  }
}));

const Rooms = () => {
  const [allRooms, setAllRooms] = useState([]);
  const [loader, setLoader] = useState(true);

  const [currentPage, setCurrentPage] = useState(1); //for api
  const [totalPages, setTotalPages] = useState(1);

  const classes = useStyles();
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);

  useEffect(() => {
    getData(currentPage);
  }, []);

  useEffect(() => {
    if (allRooms.length) getData(currentPage);
  }, [currentPage]);

  async function getData(page) {
    const { data, error } = await getAllRooms(page);

    if (data) {
      setAllRooms(data.data.data);
      setLoader(false);
      setTotalPages(data.data.meta.pagination.total_pages);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    } else if (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="header-image" />
      <h1 className="home-header text-center text-5xl text-gray-600 z-50">
        <i className="fas fa-bed " />
        <br />
        Rooms
      </h1>
      {loader ? <CircularProgress className={classes.progress} /> : null}
      <div className="container mx-auto lg:flex flex-wrap mt-8 pb-32">
        {allRooms.length > 0
          ? allRooms.map(item => {
              return (
                <Room data={item} key={item.id} isAuth={isAuthenticated} />
              );
            })
          : null}

        {!loader ? (
          <div className="w-full flex justify-center mt-16">
            <ThemeProvider>
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onChange={currentPage => {
                  return setCurrentPage(currentPage);
                }}
              />
            </ThemeProvider>
          </div>
        ) : null}
      </div>
      {/* <Modal open={modalIsOpen} close={setModalIsOpen}>
        <ModalContent close={() => setModalIsOpen(false)} />
      </Modal> */}
    </>
  );
};

export default Rooms;
