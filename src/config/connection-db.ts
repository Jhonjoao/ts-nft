import { getConnectionOptions, createConnection, Connection } from "typeorm";


const createConnectionDb = async (): Promise<Connection> => {

    const connectionOptions = await getConnectionOptions(process.env.NODE_ENV || 'default');
    return await createConnection({ ...connectionOptions, name: "default" });

}

export default createConnectionDb;