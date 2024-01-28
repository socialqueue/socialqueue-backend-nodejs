import { DataTypes } from "sequelize"


import User from "../models/sql/User.js"
import Channel from "../models/sql/Channel.js"
import Post from "../models/sql/Post.js"
import PostAnalytic from "../models/sql/PostAnalytic.js"


// One    User       has    many    Channel.
// One    Channel    has    many    Post.
// One    Post       has    one     PostAnalytic.


// Post.belongsTo(User, {
//     constraints: true,
//     // RESTRICT, CASCADE, NO ACTION, SET DEFAULT, SET NULL
//     onDelete: "SET NULL",
//     onUpdate: "CASCADE"
// })


const sequelizeInit = () => {
    User.hasMany(Channel, {
        foreignKey: {
            type: DataTypes.BIGINT,
        }
    });
    Channel.belongsTo(User);


    Channel.hasMany(Post, {
        foreignKey: {
            type: DataTypes.BIGINT,
        }
    });
    Post.belongsTo(Channel);


    Post.hasOne(PostAnalytic, {
        foreignKey: {
            type: DataTypes.BIGINT,
        }
    });
    PostAnalytic.belongsTo(Post);
}


export default sequelizeInit
