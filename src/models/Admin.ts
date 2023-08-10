import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/database';

class Admin extends Model {
  public id!: number;
  public name!: string;
  public username!: string;
  public email!: string;
  public token!: string;
  public password!: string;


  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Admin.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  username: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  email: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  token: {
    type: new DataTypes.STRING(128),
    allowNull: true,
    defaultValue: '',
  },
  password: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Admin',
  tableName: 'admin',
});

Admin.sync({ alter: true });

export default Admin;