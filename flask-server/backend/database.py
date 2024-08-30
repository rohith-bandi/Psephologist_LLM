from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client['Login-Sigup']  # Use a single database for the whole application

# Collections
users_collection = db['logincollections']
contact_collection = db['contact_messages']  # New collection for contact messages
