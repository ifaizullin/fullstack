const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')
const User = require('../models/User')

module.exports.login = async function (req, res) {
    const candidate = await User.findOne({ email: req.body.email })
    if (candidate) {
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
        if (passwordResult) {
            //Генерим токен
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, { expiresIn: 60 * 60 })

            res.status(200).json({
                token: 'Bearer ' + token
            })
        } else {
            //Ошибка пароль не верный
            res.status(401).json({
                message: 'Пароль не совпадает.'
            })
        }
    } else {
        // Пользователя нет 404
        res.status(404).json({
            message: 'Такого пользователя не существует.'
        })
    }
}


module.exports.register = async function (req, res) {
    const candidate = await User.findOne({ email: req.body.email })
    if (candidate) {
        // Пользователь есть, выдаем ошибку 409 conflict
        res.status(409).json({
            message: 'Такой email уже занят. Попробуй другой'
        })
    } else {
        // Создаем юзера, создаем соль и создаем подсоленный хэш пароля юзера
        const salt = bcrypt.genSaltSync(10)
        const password = req.body.password
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        })
        try {
            await user.save()
            // статус 201 так как создано в базе
            res.status(201).json(user)
        }
        catch(e){
            // Обработать ошбику    
            console.log(e)
        }
        
    }
}