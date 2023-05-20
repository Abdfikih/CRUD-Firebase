import { useState, useEffect } from "react";
import "./App.css";
import "tailwindcss/tailwind.css";
import { db } from "./firebase-config";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

function App() {
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false); // State untuk menandakan apakah data telah dimuat atau belum

  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  const createUser = async () => {
    await addDoc(usersCollectionRef, { name: newName, age: Number(newAge) });
    setNewName("");
    setNewAge(0);
  };

  const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id);
    const newFields = { age: age + 1 };
    await updateDoc(userDoc, newFields);
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setDataLoaded(true); // Mengubah state `dataLoaded` menjadi `true` setelah data dimuat
    };

    getUsers();
  }, []);

  return (
    <div className="App bg-gray-200 min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">User Management With Firestore ^_^</h1>
      <div className="flex space-x-4 mb-4">
        <input
          className="border border-gray-400 px-2 py-1 rounded"
          placeholder="Name..."
          value={newName}
          onChange={(event) => {
            setNewName(event.target.value);
          }}
        />
        <input
          className="border border-gray-400 px-2 py-1 rounded"
          type="number"
          placeholder="Age..."
          value={newAge}
          onChange={(event) => {
            setNewAge(event.target.value);
          }}
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={createUser}>
          Create User
        </button>
      </div>
      {dataLoaded && // Hanya akan merender data jika `dataLoaded` adalah `true`
        users.map((user) => {
          return (
            <div key={user.id} className="bg-white rounded-lg shadow-md p-4 mb-4 flex justify-between items-center">
              <div>
                <h1 className="text-xl font-semibold">{user.name}</h1>
                <p className="text-gray-500">Age: {user.age}</p>
              </div>
              <div>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600"
                  onClick={() => {
                    updateUser(user.id, user.age);
                  }}
                >
                  Increase Age
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={() => {
                    deleteUser(user.id);
                  }}
                >
                  Delete User
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default App;
