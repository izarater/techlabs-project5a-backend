const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const ROLES = require("../middlewares/auth-user/roles")

// iteraciones de encriptado, entre mas mejor, aunque consume mas recursos
const saltRounds = 10;

const rolSchema = new mongoose.Schema({
  rol: {
    type: String,
    default: ROLES.CLIENT,
    enum: ROLES
  },
  rol_id: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  }
})

const userSchema = new mongoose.Schema({
  identification: {
    type: String,
    required: true
  },
  username: {
    type: String,
    // required: true
  },
  email: {
    type: String,
    // required: true
  },
  phone: {
    type: Number,
  },
  rol: rolSchema,

  password: {
    type: String,
    required: true
  }
})

userSchema.pre('save', function(next) {
  const data = this;
  // console.l
  if (this.isNew || this.isModified('password')) {
    bcrypt.hash(data.password, saltRounds, function (error, hasshedPassword) {
      if(error) {
        next(error);
      } else {
        
        // se modifica el valor de la contraseña por una contraseña encriptada
        console.log(data.password, hasshedPassword)
        data.password = hasshedPassword;
        next()
      }
    });
  } else {
    next();
  }
});

userSchema.method('isCorrectPassword', function (password, callback) {
  const data = this;
  bcrypt.compare(password, data.password, function(err, same) {
    // console.log(password, data.password)
    if(err) {
      callback(err);
    }else {
      // console.log('Same' , same)
      callback(err, same);
    }
  })
})


const User = mongoose.model('User', userSchema);

module.exports =   User;