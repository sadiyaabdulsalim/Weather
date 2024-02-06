import React, { useState, useEffect } from 'react';
import { collection, getDocs, getDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Assuming you have already initialized Firebase
import { Link } from 'react-router-dom';

const ActiveUserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, 'users');
        const usersSnapshot = await getDocs(usersCollection);
        const userList = [];
        usersSnapshot.forEach((doc) => {
          userList.push({ id: doc.id, ...doc.data() });
        });
        setUsers(userList);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await deleteDoc(doc(db, 'users', userId));
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleChangeStatus = async (userId) => {
    try {
      const userRef = doc(db, 'users', userId);
      const userSnapshot = await getDoc(userRef);
      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        await updateDoc(userRef, {
          status: userData.status === 'active' ? 'inactive' : 'active',
        });
        const updatedUsers = users.map((user) =>
          user.id === userId
            ? { ...user, status: userData.status === 'active' ? 'inactive' : 'active' }
            : user
        );
        setUsers(updatedUsers);
      }
    } catch (error) {
      console.error('Error changing user status:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    
    <div>
        <Link to="/">Go back to main</Link>
      <h2>Active Users</h2>
      <table>
  <thead>
    <tr>
      <th>Username</th>
      <th>Added Date</th>
      <th>Status</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {users.map((user) => (
      <tr key={user.id}>
        <td>{user.username}</td>
        <td>{user.addedDate}</td>
        <td>{user.status}</td>
        <td>
          <button onClick={() => handleDelete(user.id)}>Delete</button>
          <button onClick={() => handleChangeStatus(user.id)}>
            {user.status === 'active' ? 'Deactivate' : 'Activate'}
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
    </div>
  );
};

export default ActiveUserTable;
