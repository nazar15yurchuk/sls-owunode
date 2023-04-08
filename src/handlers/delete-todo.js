const {dbConnection} = require("../mongo.client");

const {ObjectId} = require("mongodb");

const deleteTodo = async (event) => {
    const {todoId} = event.pathParameters

    const todo = await dbConnection
        .collection('todos')
        .findOne({_id: new ObjectId(todoId)})

    if (!todo) {
        return {
            statusCode: 422,
            body: "Entity not found"
        }
    }

    await dbConnection.collection('todos').deleteOne({ _id: new ObjectId(todoId)}) /*або {_id: todo._id} */

    return {
        statusCode: 204,
        body:  JSON.stringify("Deleted"),
    };
};

module.exports = {
    handler: deleteTodo,
}

