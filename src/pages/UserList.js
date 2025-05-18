import React, { useState } from 'react';
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Pagination,
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  ModalFooter
} from '@windmill/react-ui';
import { IoHome } from 'react-icons/io5';
import { useDeleteUserMutation, useGetAllUserQuery, useGetUserDataByIdQuery } from '../features/auth/auth';
import { Link } from 'react-router-dom';

function UserList() {
  const [userId, setUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [keyword, setKeyword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError, error, refetch } = useGetAllUserQuery({
    searchTerm: keyword,
    page: currentPage,
    limit: itemsPerPage,
  });

  const { data: userDetail, isLoading: loadingUserDetail, isError: errorUserDetail } = useGetUserDataByIdQuery(userId, {
    skip: !userId, // only fetch when userId is set
  });

  const [deleteUser] = useDeleteUserMutation();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id).unwrap();
        refetch();
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };

  const handleView = (id) => {
    setUserId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setUserId(null);
  };

  const totalResults = data?.meta?.total || 0;
  const users = data?.data || [];
  const singleUser = userDetail?.data || {};

  return (
    <>
      <div className="bg-gray-100 px-6 py-3 mt-4">
        <nav className="flex items-center text-gray-500 text-sm space-x-2">
          <IoHome className="w-4 h-4" />
          <span>System User</span>
          <span>{'>'}</span>
          <span className="text-gray-500">User List</span>
        </nav>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 bg-userListHeader text-white font-semibold px-4 py-3 rounded-t-md shadow my-4">
        <h2 className="text-lg">System User Info</h2>
        <Button className="bg-white text-black hover:bg-gray-200 transition-colors">
          Print
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between px-4 py-4 gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <label htmlFor="entries" className="text-sm text-gray-700">Show</label>
          <select
            id="entries"
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          <span className="text-sm text-gray-700">entries</span>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="search" className="text-sm text-gray-700">Search:</label>
          <input
            id="search"
            type="text"
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
              setCurrentPage(1);
            }}
            className="border px-2 py-1 text-sm rounded w-full sm:w-auto"
            placeholder="Search..."
          />
        </div>
      </div>

      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Property</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>User Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center">
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.Property}</TableCell>
                  <TableCell>{user.Name}</TableCell>
                  <TableCell>{user.Username}</TableCell>
                  <TableCell>{user.Email}</TableCell>
                  <TableCell>{user.Contact}</TableCell>
                  <TableCell>{user.Role}</TableCell>
                  <TableCell>{user.Status}</TableCell>
                  <TableCell className="flex flex-col sm:flex-row gap-1">
                    <Button
                      onClick={() => handleView(user.id)}
                      className="bg-gray-200 hover:bg-gray-300 text-sm px-2 py-1 rounded"
                    >
                      View
                    </Button>
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-2 py-1 rounded">
                      <Link to={`/app/edit-user/${user.id}`}>Edit</Link>
                    </Button>
                    <Button
                      className="bg-red-500 hover:bg-red-600 text-white text-sm px-2 py-1 rounded"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={itemsPerPage}
            onChange={setCurrentPage}
            label="Table navigation"
            currentPage={currentPage}
          />
        </TableFooter>
      </TableContainer>

      {/* View User Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader>User Information</ModalHeader>
        <ModalBody>
          {loadingUserDetail ? (
            <p>Loading user data...</p>
          ) : errorUserDetail ? (
            <p className="text-red-600">Failed to load user data.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><strong>Name:</strong> {singleUser.Name}</div>
              <div><strong>Username:</strong> {singleUser.Username}</div>
              <div><strong>Email:</strong> {singleUser.Email}</div>
              <div><strong>Phone:</strong> {singleUser.Contact}</div>
              <div><strong>Role:</strong> {singleUser.Role}</div>
              <div><strong>Status:</strong> {singleUser.Status}</div>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button layout="outline" onClick={closeModal}>Close</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default UserList;
