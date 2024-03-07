import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import {
  SavedUsersEntity,
  UserEntity,
  loadUser,
  saveUser,
  updateUserProperty,
  deleteUser,
} from "./redux/user";
import { ChangeEvent, MouseEvent, useState } from "react";

function App() {
  const [userId, setUserId] = useState(1);
  const user = useSelector(
    (state: { user: UserEntity & SavedUsersEntity }) => state.user
  );
  const dispatch = useDispatch();

  const increaseUserId = (userId: number) => {
    if (userId < 10) {
      setUserId(userId + 1);
    } else {
      setUserId(1);
    }
  };

  const handleLoadUser = () => {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(loadUser(data));
        increaseUserId(userId);
      })
      .catch((err) => {
        console.log(err);
        alert("An error ocurred");
      });
  };

  const handleSave = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (user.name === "" || user.email === "" || user.name === "") {
      alert("All inputs need to have a value");
      return;
    }
    dispatch(saveUser());
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const inputName = e.target.name;
    dispatch(updateUserProperty({ inputName, value: newValue }));
  };

  const handleDeleteButton = (e: MouseEvent<HTMLElement>, id: string) => {
    e.preventDefault();
    dispatch(deleteUser(id));
  };

  return (
    <>
      <h1>Redux lab</h1>
      <button onClick={handleLoadUser}>Load an user</button>
      {user && (
        <form>
          <div className="inputContainer">
            <label htmlFor="usernameInput">Username</label>
            <input
              id="usernameInput"
              name="username"
              value={user.username}
              onChange={handleInput}
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="nameInput">Name</label>
            <input
              name="name"
              id="nameInput"
              value={user.name}
              onChange={handleInput}
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="emailInput">Email</label>
            <input
              name="email"
              id="emailInput"
              value={user.email}
              onChange={handleInput}
            />
          </div>
          <button onClick={handleSave}>Guardar</button>
        </form>
      )}

      {user?.savedUsers &&
        user.savedUsers.map((savedUser) => (
          <div id="savedUsersContainer">
            <hr />
            <p>Username: {savedUser.username}</p>
            <p>Name: {savedUser.name}</p>
            <p>Email: {savedUser.email}</p>
            <button onClick={(e) => handleDeleteButton(e, savedUser.id)}>
              Delete
            </button>
          </div>
        ))}
    </>
  );
}

export default App;
