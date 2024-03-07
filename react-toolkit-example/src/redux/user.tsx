import { createSlice } from "@reduxjs/toolkit";

export type UserEntity = {
  name: string;
  username: string;
  email: string;
};

export type SavedUsersEntity = {
  savedUsers: (UserEntity & { id: string })[];
};

const initialState: UserEntity & SavedUsersEntity = {
  name: "",
  username: "",
  email: "",
  savedUsers: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadUser: (store, action) => {
      const { name, username, email } = action.payload as UserEntity;
      store.name = name;
      store.username = username;
      store.email = email;

      return store;
    },

    updateUserProperty: (store, action) => {
      const { inputName, value } = action.payload as {
        inputName: string;
        value: string;
      };
      if (Object.keys(store).includes(inputName)) {
        if (typeof store[inputName as keyof typeof store] === "object") {
          throw new Error("Not supported");
        }
        (store as UserEntity)[inputName as keyof UserEntity] = value;
        return store;
      }

      throw new Error("Input name does not exist");
    },

    saveUser: (store) => {
      const { username, name, email } = store;
      const id = new Date().getTime().toString();
      const newUser = { username, name, email, id };
      store.savedUsers.push(newUser);

      store.email = "";
      store.name = "";
      store.username = "";
      return store;
    },

    deleteUser: (store, action) => {
      const id = action.payload as string;
      store.savedUsers = store.savedUsers.filter(
        (savedUser) => savedUser.id !== id
      );
    },
  },
});

export const userReducer = userSlice.reducer;
export const { loadUser, updateUserProperty, saveUser, deleteUser } =
  userSlice.actions;
