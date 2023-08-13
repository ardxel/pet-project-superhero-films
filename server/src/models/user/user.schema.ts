import { compare, genSalt, hash } from 'bcryptjs';
import config from 'config';
import { sign } from 'jsonwebtoken';
import { CallbackWithoutResultAndOptionalError, Schema, Types } from 'mongoose';
import { DocumentUser, IUser, UserMethods, UserModel } from './user.types';

const userRole = ['ADMIN', 'USER'] as const;

/*
 * User Schema
 */

export const UserSchema = new Schema<IUser, UserModel, UserMethods>(
  {
    username: {
      type: String,
      required: true,
      match: [/^(?=.{6,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, '{VALUE} is not valid username'],
      unique: true,
      validate: (value) => value.length > 1,
    },
    email: {
      type: String,
      required: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please, provide valid email',
      ],
      unique: true,
    },
    password: {
      type: String,
      required: true,
      match: [/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/, 'Please provide valid password'],
    },
    role: {
      type: String,
      required: true,
      enum: userRole,
    },
    name: {
      type: String,
      required: false,
    },
    avatar: String,
    biography: String,
    gender: String,
    birthday: Date,
    country: String,
    favorites: {
      type: [Types.ObjectId],
      required: true,
    },
    ratings: {
      type: [
        {
          id: {
            type: Types.ObjectId,
          },
          value: {
            type: Number,
          },
        },
      ],
      required: true,
    },
    watchlist: {
      type: [Types.ObjectId],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

/*
 * Pre-save hooks
 */

// encrypt password
UserSchema.pre('save', async function (next: CallbackWithoutResultAndOptionalError) {
  if (this.isNew) {
    const salt = await genSalt(10);
    const hashedPassword = await hash(this.password, salt);
    this.password = hashedPassword;
  }
  next();
});

/*
 * Statics
 */

UserSchema.statics = {
  findByUsername: async function (username: string): Promise<DocumentUser | null> {
    const user = await this.findOne({ username });

    return user;
  },
};

/*
 * Methods
 */

UserSchema.methods = {
  /*
   * create json web token
   */
  createToken: function () {
    return sign(
      {
        userId: this._id,
        name: this.name,
      },
      config.jwt.secret,
      {
        expiresIn: config.jwt.lifetime,
      },
    );
  },

  /*
   * compare request password with user password
   */

  checkPassword: async function (password: string) {
    const isEqual = await compare(password, this.password);
    return isEqual;
  },

  /*
   * return clear user object without password and role
   */
  getSafeCopy: function () {
    return {
      email: this.email,
      username: this.username,
      name: this.name,
      favorites: this.favorites,
      ratings: this.ratings,
      watchlist: this.watchlist,
      avatar: this.avatar,
      biography: this.biography,
      gender: this.gender,
      birthday: this.biography,
      country: this.country,
    };
  },

  change: function (path, value) {
    console.log('CHENGING: ', path, value);
    if (path in this) {
      this[path] = value;
    }
  },
};

export default UserSchema;
