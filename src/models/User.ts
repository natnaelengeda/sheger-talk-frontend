import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/database';

class User extends Model {
  public id!: number;
  public username!: string;
  public name!: string;
  public age!: number;
  public gender!: string;
  public city!: string;
  public descritpion!: string;
  public image!: string;
  public chatId!: string;
  public stage!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  age: {
    type: new DataTypes.INTEGER,
    allowNull: false,
  },
  gender: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  city: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  descritpion: {
    type: new DataTypes.STRING(200),
    allowNull: true,
  },
  username: {
    type: new DataTypes.STRING(128),
    allowNull: true,
  },
  chatId: {
    type: new DataTypes.STRING(128),
    allowNull: true,
  },
  stage: {
    type: new DataTypes.INTEGER,
    allowNull: true,
  },
  image: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  }

}, {
  sequelize,
  modelName: 'User',
  tableName: 'user',
});

User.sync({ alter: true });

export default User;