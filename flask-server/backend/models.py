from database import users_collection, contact_collection

def create_user(name, password):
    user = {
        "name": name,
        "password": password
    }
    users_collection.insert_one(user)

def find_user(name):
    return users_collection.find_one({"name": name})

def save_contact_message(name, email, message):
    contact_message = {
        "name": name,
        "email": email,
        "message": message
    }
    contact_collection.insert_one(contact_message)
