import { Sequelize } from "sequelize";

export class SequelizeConnection {
    private static sequelizeConnection: Sequelize;

    private constructor() {}

    public static getInstance(): Sequelize {
        if (!SequelizeConnection.sequelizeConnection) {
            SequelizeConnection.sequelizeConnection = new Sequelize('Trainstagram', 'admin', 'password1!', {
                host: 'trainstagram-1.csi9vj8illv2.us-east-1.rds.amazonaws.com',
                dialect: 'mssql',
                logging: false,
                dialectOptions: {
                    options: {
                        trustServerCertificate: true,
                        encrypt: true
                    }
                }
              });
        }
        return SequelizeConnection.sequelizeConnection;
    }
}