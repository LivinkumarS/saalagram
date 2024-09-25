import { Alert, Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { BiX } from "react-icons/bi";
import { MdVerified } from "react-icons/md";
import { useSelector } from "react-redux";
import { Table } from "flowbite-react";
import { Modal } from "flowbite-react";
import { PiExclamationMarkBold } from "react-icons/pi";

export default function DashUsers() {
  const { currentUser } = useSelector((state) => state.user);
  const [userList, setUserList] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [totalUsers, setTotalUsers] = useState(null);
  const [showMore, setShowMore] = useState(true);

  useEffect(() => {
    if (userList.length === totalUsers) {
      setShowMore(false);
    } else {
      setShowMore(true);
    }
  }, [totalUsers, userList]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await fetch(`https://saalagram-1.onrender.com/api/user/getusers/${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserList(data.usersWithoutPassword);
          setTotalUsers(data.totalUsers);
        } else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    getUsers();
  }, [currentUser._id]);

  async function handleShowMore() {
    try {
      const res = await fetch(
        `https://saalagram-1.onrender.com/api/user/getusers/${currentUser._id}?startIndex=${userList.length}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserList((prev) => {
          return { ...prev, ...data.usersWithoutPassword };
        });
        setTotalUsers(data.totalUsers);
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  async function handleDeleteUser() {
    setShowModal(false);
    try {
      const res = await fetch(
        `https://saalagram-1.onrender.com/api/user/deleteaccount/${currentUser._id}/${userIdToDelete}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (res.ok) {
        setUserList((prev) =>
          prev.filter((user) => user._id !== userIdToDelete)
        );

        setUserIdToDelete(null);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  return (
    <div className="table-auto lg:overflow-hidden md:mx-auto overflow-x-scroll scrollbar p-3 scrollbar-track-slate-300 scrollbar-thumb-slate-700 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-400">
      <Table hoverable className="shadow-md">
        <Table.Head>
          <Table.HeadCell>User Name</Table.HeadCell>
          <Table.HeadCell>Profile</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Admin</Table.HeadCell>
          <Table.HeadCell>Last Updated</Table.HeadCell>
          <Table.HeadCell>Delete</Table.HeadCell>
        </Table.Head>

        {userList.map((user) => {
          return (
            <Table.Body className="divide-y">
              <Table.Cell>{user.username}</Table.Cell>
              <Table.Cell>
                <img
                  src={user.profilePhoto}
                  alt="profile"
                  className="w-10 h-10 rounded-full self-center"
                ></img>
              </Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell className="font-semibold text-black dark:text-gray-400">
                {user.isAdmin ? (
                  <MdVerified
                    fill="blue"
                    className="text-2xl w-full text-center"
                  />
                ) : (
                  <BiX fill="red" className="text-2xl w-full text-center" />
                )}
              </Table.Cell>
              <Table.Cell>
                {new Date(user.updatedAt).toLocaleString()}
              </Table.Cell>
              <Table.Cell>
                <span
                  onClick={() => {
                    setShowModal(true);
                    setUserIdToDelete(user._id);
                  }}
                  className="text-red-600 hover:underline cursor-pointer"
                >
                  Delete
                </span>
              </Table.Cell>
            </Table.Body>
          );
        })}
      </Table>
      {showMore && (
        <Button
          color={"transparent"}
          onClick={handleShowMore}
          className="text-blue-500 mx-auto p-0 mt-4 text-sm font-bold "
        >
          Show More
        </Button>
      )}
      {errorMessage ? <Alert color="red">{errorMessage}</Alert> : null}
      {showModal && (
        <Modal
          popup
          show={showModal}
          size={"md"}
          onClose={() => {
            setShowModal(false);
          }}
        >
          <Modal.Header />
          <Modal.Body>
            <h1 className="w-10 h-10 text-3xl font-bold rounded-full flex justify-center items-center mx-auto mb-4 border-2 border-black">
              <PiExclamationMarkBold />
            </h1>
            <h1 className="text-3xl font-bold text-black w-fit mx-auto mb-6 text-center">
              Are You Sure..?
            </h1>
            <div className="w-fit mx-auto flex gap-4">
              <Button
                onClick={handleDeleteUser}
                color={"red"}
                className="font-bold text-2xl bg-red-600 text-black"
              >
                Yes, Delete
              </Button>
              <Button
                onClick={() => {
                  setShowModal(false);
                }}
                color={"transparent"}
                className="font-bold text-2xl border-2 border-black"
              >
                No, Cancel
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
}
