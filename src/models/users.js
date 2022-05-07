import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'O campo "Nome" é obrigatorio.']
    },
    email: {
        type: String,
        required: [true, 'O campo "Email" é obrigatorio.']
    },
    userName: {
        type: String,
        required: [true, 'O campo "Usuário" é obrigatorio.']
    },
    password: {
        type: String,
        required: [true, 'O campo "Senha" é obrigatorio.']
    },
})

export default mongoose.model.users || mongoose.model('users', schema)