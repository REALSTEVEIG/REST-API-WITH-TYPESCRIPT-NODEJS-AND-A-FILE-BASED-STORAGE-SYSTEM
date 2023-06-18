import { User, UnitUser, Users } from "./user.interface";
import bcrypt from "bcryptjs"
import {v4 as random} from "uuid"

let users: Users = {
  "1": {
    id: "1",
    username: "stephen123",
    email: "steve@gmail.com",
    password: "steve123"
  },
  "2": {
    id: "2",
    username: "jerry123",
    email: "jerry@gmail.com",
    password: "jerry123"
  },
  "3": {
    id: "3",
    username: "sam",
    email: "sam@gmail.com",
    password: "sam123"
  },
  "4": {
    id: "4",
    username: "mary123",
    email: "mary@gmail.com",
    password: "mary123"
  }
};

export const findAll = async (): Promise<UnitUser[]> => Object.values(users);

export const findOne = async (id: string): Promise<UnitUser> => users[id];

export const create = async (userData: UnitUser): Promise<UnitUser | null> => {

  let id = random()

  let check_user = await findOne(id);

  while (check_user) {
    id = random()
    check_user = await findOne(id)
  }

  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(userData.password, salt);

  const user : UnitUser = {
    id : id,
    username : userData.username,
    email : userData.email,
    password: hashedPassword
  };

  users[id] = user;

  return user;
};

export const findByEmail = async (user_email: string): Promise<null | UnitUser> => {

  const allUsers = await findAll();

  const getUser = allUsers.find(result => user_email === result.email);

  if (!getUser) {
    return null;
  }

  return getUser;
};

export const comparePassword  = async (email : string, supplied_password : string) : Promise<null | UnitUser> => {

    const user = await findByEmail(email)

    const decryptPassword = await bcrypt.compare(supplied_password, user!.password)

    if (!decryptPassword) {
        return null
    }

    return user
}

export const update = async (id : string, updateValues : User) : Promise<UnitUser | null> => {

    const userExists = await findOne(id)

    if (!userExists) {
        return null
    }

    if(updateValues.password) {
        const salt = await bcrypt.genSalt(10)
        const newPass = await bcrypt.hash(updateValues.password, salt)

        updateValues.password = newPass
    }

    users[id] = {
        ...userExists,
        ...updateValues
    }

    return users[id]
}

export const remove = async (id : string) : Promise<null | void> => {

    const user = await findOne(id)

    if (!user) {
        return null
    }

    delete users[id]
}
