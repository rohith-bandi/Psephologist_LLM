import pandas as pd
import mysql.connector
from mysql.connector import errorcode

# Load the cleaned data from CSV file
file_path = "/Users/apple/Downloads/final4.csv"

# Specify the data types for the problematic columns
dtype_spec = {8: str, 11: str}

# Read the CSV file with specified data types
df = pd.read_csv(file_path, dtype=dtype_spec, low_memory=False)

# Convert Vote_Share_Percentage to the correct data type (float)
df['Vote_Share_Percentage'] = pd.to_numeric(df['Vote_Share_Percentage'].str.strip(), errors='coerce')

# Handle any potential invalid data by replacing them with a default value (e.g., 0.0)
df['Vote_Share_Percentage'] = df['Vote_Share_Percentage'].fillna(0.0)

# Database connection configuration
config = {
    'user': 'root',
    'password': 'Indra2565',
    'host': 'localhost',
    'database': 'voting',
    'raise_on_warnings': True,
    'auth_plugin': 'mysql_native_password'  # Ensure correct authentication plugin is used
}

try:
    # Establishing the connection to the database
    cnx = mysql.connector.connect(**config)
    cursor = cnx.cursor()

    # Creating the insert query
    add_data = ("INSERT INTO election_data "
                "(State_Name, Constituency_No, Year, Position, Candidate, Party, Votes, Valid_Votes, Electors, "
                "Constituency_Name, Turnout_Percentage, Vote_Share_Percentage, Margin,"
                "Margin_Percentage) "
                "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)")

    # Iterating over the DataFrame and inserting each row into the MySQL table
    for _, row in df.iterrows():
        data = (row['State_Name'], row['Constituency_No'], row['Year'], row['Position'], row['Candidate'], 
                row['Party'], row['Votes'], row['Valid_Votes'], row['Electors'], row['Constituency_Name'], 
                row['Turnout_Percentage'], row['Vote_Share_Percentage'], row['Margin'], 
                row['Margin_Percentage'])
        cursor.execute(add_data, data)

    # Committing the transaction
    cnx.commit()

    print("Data inserted successfully into the election_data table.")

except mysql.connector.Error as err:
    if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
        print("Something is wrong with your user name or password")
    elif err.errno == errorcode.ER_BAD_DB_ERROR:
        print("Database does not exist")
    else:
        print(err)

