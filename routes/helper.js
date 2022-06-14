import { client } from "../index.js";

export async function updateUserByUsername(username, data) {
    return await client
        .db("b33wd")
        .collection("users")
        .updateOne({ username }, { $set: data });
}
export async function deleteUserByUsername(username) {
    return await client
        .db("b33wd")
        .collection("users")
        .deleteOne({ username });
}
export async function createUsers(data) {
    return await client.db("b33wd").collection("users").insertMany(data);
}
export async function getUserByUsername(username) {
    return await client
        .db("b33wd")
        .collection("users")
        .findOne({ username: username });
}
export async function getAllUsers() {
    return await client
        .db("b33wd")
        .collection("users")
        .find({})
        .toArray();
}
