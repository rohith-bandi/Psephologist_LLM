from flask import Flask, request, jsonify, send_file, send_from_directory
from flask_cors import CORS
from models import create_user, find_user, save_contact_message
import os
import pymysql
from dotenv import load_dotenv
import google.generativeai as genai
import json
from langchain_community.llms import Ollama

load_dotenv()  # Load environment variables from .env file
ollama = Ollama(model="phi3")

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})  # Allow CORS for your specific API endpoints

# Configure the generative AI model
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
model = genai.GenerativeModel('gemini-pro')
chat = model.start_chat(history=[])



def get_llama2_response(question, prompt):
    combined_input = prompt + "\n\n" + question
    response = ollama.invoke(combined_input)
    return response.strip()

def read_sql_query(sql):
    config = {
        'user': 'root',
        'password': os.getenv('DB_PASSWORD'),
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

prompt = """You are an expert in converting English questions to SQL queries! You generate only the SQL query without any explanation. 
The SQL database has the name election_data and has the following columns - State_Name, Constituency_No, Year, Position, Candidate, Party, Votes, Valid_Votes, Electors, Constituency_Name, Turnout_Percentage, Vote_Share_Percentage, Deposit_Lost, Margin, Margin_Percentage, ENOP, Party_Type_TCPD.

Ensure that the Constituency_Name in the SQL query exactly matches the Constituency_Name provided in the question.

For example:

Example 1 - Give me party wise performance for NAGARKURNOOL constituency in the year 2019
SELECT Party, SUM(Votes) AS total_votes FROM election_data WHERE Constituency_Name = "NAGARKURNOOL" AND Year = 2019 GROUP BY Party ORDER BY total_votes DESC;

Example 2 - Give me party wise performance for MAHBUBNAGAR constituency in the year 2019
SELECT Party, SUM(Votes) AS total_votes FROM election_data WHERE Constituency_Name = "MAHBUBNAGAR" AND Year = 2019 GROUP BY Party ORDER BY total_votes DESC;


"""

@app.route('/api/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    question = data.get('prompt')
    response = get_llama2_response(question, prompt)
    print("Generated SQL Query:", response)
    response = response.replace("sql", "").replace("", "").strip()
    try:
        sql_result = read_sql_query(response)
        return jsonify(sql_result)  # Return JSON response here
    except pymysql.MySQLError as e:
        return jsonify({"error": str(e)})




@app.route('/api/chat', methods=['POST'])
def chat_endpoint():
    user_message = request.json.get('message')
    response = chat.send_message(user_message, stream=True)
    bot_reply = ''.join([chunk.text for chunk in response])
    return jsonify({'reply': bot_reply})

@app.route('/api/data')
def data():
    try:
        with open('../sentiment_data.json', 'r') as f:
            data = json.load(f)
        return jsonify(data)
    except Exception as e:
        app.logger.error(f"Error loading data: {str(e)}")
        return jsonify({'error': str(e)})

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.get_json()
    name = data['name']
    password = data['password']
    create_user(name, password)
    return jsonify({"message": "User created successfully"}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    name = data['name']
    password = data['password']
    user = find_user(name)
    if user and user['password'] == password:
        return jsonify({"message": "Login successful"}), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 400

@app.route('/api/contact', methods=['POST'])
def contact():
    data = request.get_json()
    name = data['name']
    email = data['email']
    message = data['message']
    
    if not name or not email or not message:
        return jsonify({'error': 'Invalid input'}), 400

    save_contact_message(name, email, message)

    return jsonify({'success': True}), 200

@app.route('/plot/<filename>')
def get_plot(filename):
    return send_from_directory('plots', filename)

@app.route('/plot/sa-bar.png')
def plots():
    return send_file('../plots/sa-bar.png')

@app.route('/plot/sa-pie.png')
def plots1():
    return send_file('../plots/sa-pie.png')

@app.route('/plot/sa-pie1.png')
def plots2():
    return send_file('../plots/sa-pie1.png')

@app.route('/plot/sa-bar1.png')
def plots3():
    return send_file('../plots/sa-bar1.png')

if __name__ == '__main__':
    app.run(debug=True)
