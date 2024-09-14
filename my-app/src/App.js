import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import './App.css';

function useUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setUsers([
        {id: 1, name: 'Sasha Mushenko', age: 25, email: 'mcasha888@gmail.com'},
        {id: 2, name: 'Sasha Kulbachna', age: 24, email: 'vetosfly123@gmail.com'},
        {id: 3, name: 'Sergay Fitoshenko', age: 31, email: 'serj777@gmail.com'},
      ]);
      setLoading(false);
    }, 5000);
  }, [])

  return {users, loading}
}

function App() {
  const [serchText, setSerchText] = useState('');
  const inputRef = useRef(null);
  const {users, loading} = useUsers();

  const handleSearch = useCallback((event) => {
    setSerchText(event.target.value);
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter(user => 
      user.name.toLowerCase().includes(serchText.toLowerCase())
    );
  }, [serchText, users]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);


  return (
    <div className="App">
      <h1>User Search Application</h1>
      <input 
        type='text'
        ref={inputRef}
        placeholder='Search by name...'
        value={serchText}
        onChange={handleSearch}
        />

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <ul>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <li key={user.id}>
                {user.name} - {user.age} years old - {user.email}
              </li>
            ))
          ) : (
            <p>No users found</p>
          )}
        </ul>
      )}
    </div>
  );
}

export default App;
