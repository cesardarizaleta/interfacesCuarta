const { Strategy } = require('passport-local')
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const UsersService = require('./../../../services/user_service');
const service = new UsersService();

const LocalStrategy = new Strategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    async (username, password, done) => {
        try{
            const user = await service.findOneByEmail(username);
            if(!user){
                done(boom.unauthorized(), false);
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                done(boom.unauthorized(), false);
            }
            delete user.dataValues.password;
            done(null, user);
        }
        catch(error){
            done(error, false);
        }
    }
);

module.exports = LocalStrategy;