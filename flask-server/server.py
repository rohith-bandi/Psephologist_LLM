from dotenv import load_dotenv
load_dotenv()
import streamlit as st
import os
import pymysql
# from langchain.llms import Ollama
from langchain_community.llms import Ollama

# Configure Ollama
ollama = Ollama(model="phi3")

def get_llama2_response(question, prompt):
    # Combine prompt and question into a single input for the Llama2 model
    combined_input = prompt + "\n\n" + question
    response = ollama.invoke(combined_input)
    return response.strip()

def read_sql_query(sql, db):
    config = {
        'user': 'root',
        'password': 'Indra2565',
        'host': 'localhost',
        'database': 'voting',
        'cursorclass': pymysql.cursors.DictCursor
    }
    cnx = pymysql.connect(**config)
    cursor = cnx.cursor()
    cursor.execute(sql)
    rows = cursor.fetchall()
    cnx.commit()
    cnx.close()
    return rows

prompt = """You are an expert in converting English questions to SQL queries!You generate only sql query without any explanation.
 The SQL database has the name election_data and has the following columns - State_Name, Constituency_No, Year, Position, Candidate, Party, Votes, Valid_Votes, Electors, Constituency_Name, Turnout_Percentage, Vote_Share_Percentage, Deposit_Lost, Margin, Margin_Percentage, ENOP, Party_Type_TCPD.

For example,
Example 1 - Give me party wise performance for ELURU constituency in the year 2019
SELECT Party, SUM(Votes) AS total_votes FROM election_data WHERE Constituency_Name = "ELURU" AND Year = 2019 GROUP BY Party ORDER BY total_votes DESC;

Example 2 - Give me the part wise performance of Andhra_Pradesh state in the year 2014
SELECT LOWER(Party) AS party_name, SUM(Votes) AS total_votes FROM election_data WHERE State_Name = 'Andhra_Pradesh' and Year='2014' GROUP BY LOWER(Party) ORDER BY total_votes DESC;
"""

# Streamlit App
st.set_page_config(page_title="I can Retrieve Any SQL query")
st.header("Llama2 App To Retrieve SQL Data")

question = st.text_input("Input: ", key="input")

submit = st.button("Ask the question")

# if submit is clicked
if submit:
    response = get_llama2_response(question, prompt)
    print("Generated SQL Query:", response)
    response = response.replace("sql", "").replace("", "").strip()
    try:
        sql_result = read_sql_query(response, "voting")
        st.subheader("The Response is")
        for row in sql_result:
            print(row)
            st.write(row)
    except pymysql.MySQLError as e:
        st.error(f"Error executing query: {e}")
        print(f"Error executing query: {e}")