/**
 * Created by mupxq on 8/27/17.
 */
import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let todoListSubSchema = new Schema({
    id: Number,
    text: String,
    completed: Boolean,
});

let todoListSchema = new Schema({
    userEmail: String,
    todoList: [todoListSubSchema],
    Status: {
        type: Boolean,
        default: true
    }
});

let toDoListDBInterface = mongoose.model('TodoList', todoListSchema);
export default toDoListDBInterface;
