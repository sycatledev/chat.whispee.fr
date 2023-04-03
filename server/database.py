import pymongo

class Data:
    def __init__(self, dbhost, dbport):
        self.dbhost = dbhost
        self.dbport = dbport

    async def get_client(self):
        dbclient = pymongo.MongoClient(f"mongodb://{self.dbhost}:{self.dbport}/")
        return dbclient

    async def get_database(self, database_name):
        print("Connecting to database..")
        client = await self.get_client()
        database = client[database_name]
        print(f"Successfuly connected to database '{database_name}'.")

        return database