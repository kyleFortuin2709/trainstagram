module.exports = function (sequelize: any, DataTypes: any) {
    const Post = sequelize.define('posts', {
      postID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      Image: {
        type: DataTypes.BLOB,
        allowNull: false
      },
      Caption: {
        type: DataTypes.STRING,
        allowNull: true
      },
      Likes: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      PostedAt: {
        type: DataTypes.DATE,
        allowNull: true
      }
    }, {
      freezeTableName: true,
      timestamps: true,
      classMethods: {
        associate () {
          // associations can be defined here
        }
      }
    })
  
    return Post
  }