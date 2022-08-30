import { useEffect, useState } from "react";
import "./App.css";
import { db } from "./firebase-config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
function App() {
  const [value, setValue] = useState({
    name: "",
    age: "",
    email: "",
  });

  const [users, setUsers] = useState([]);

  const usersCollection = collection(db, "users");

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const updateAge = async (id, age) => {
    const newFields = { age: parseInt(age + 1) };

    await updateDoc(doc(db, "users", id), newFields);
  };

  const delUser = async (id) => {
    await deleteDoc(doc(db, "users", id));
    const newUsers = users.filter((user) => {
      return user.id !== id;
    });

    setUsers(newUsers);
  };

  const handleSubmit = async () => {
    setUsers([
      ...users,
      {
        name: value.name,
        age: value.age,
        email: value.email,
      },
    ]);
    await addDoc(usersCollection, {
      name: value.name,
      age: Number(value.age),
      email: value.email,
    });
  };

  const getUsers = async () => {
    const data1 = await getDocs(usersCollection);
    setUsers(data1.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getUsers();
    //eslint-disable-next-line
  }, [users]);

  return (
    <div className="App">
      <input
        type="text"
        placeholder="name"
        onChange={(e) => handleChange(e)}
        name="name"
      />
      <input
        type="number"
        placeholder="age"
        name="age"
        onChange={(e) => handleChange(e)}
      />
      <input
        type="email"
        placeholder="email"
        onChange={(e) => handleChange(e)}
        name="email"
      />
      <button onClick={handleSubmit}>Create User</button>

      {users.map((user) => {
        return (
          <div key={user.id}>
            <h1>Name:{user.name}</h1>
            <h1>age:{user.age}</h1>
            <h1>email:{user.email}</h1>
            <button onClick={() => updateAge(user.id, user.age)}>
              Increase Age
            </button>
            <button onClick={() => delUser(user.id)}>Delete User</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
