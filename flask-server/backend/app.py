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

Always copy the Constituency_Name exactly as it is provided in the question without making any changes.Dont change the Constitunecy name take the as it is Constituency_Name from the prompt.
Don't give any spelling mistakes in the Constituency_Name.
Copy the constituency name as it is don't change the name of the constituency.
Check the below examples for reference.
For the below examples you can use the below SQL query to get the results.
please give the queries given in the examples to get the results.
limit to 15 rows for the results.
For example:
Example 1 - Give me party wise performance for the year 2019
SELECT Party, SUM(Votes) AS total_votes FROM election_data WHERE Year = 2019 GROUP BY Party ORDER BY total_votes DESC LIMIT 15;

Example 2 - Give me party wise performance for the year 2020
SELECT Party, SUM(Votes) AS total_votes FROM election_data WHERE Year = 2020 GROUP BY Party ORDER BY total_votes DESC LIMIT 15;

Example 3 - Give me party wise performance for the year 2014
SELECT Party, SUM(Votes) AS total_votes FROM election_data WHERE Year = 2014 GROUP BY Party ORDER BY total_votes DESC LIMIT 15;

Example 4 - Give me party wise performance for NAGARKURNOOL constituency in the year 2019
SELECT Party, SUM(Votes) AS total_votes FROM election_data WHERE Constituency_Name = "NAGARKURNOOL" AND Year = 2019 GROUP BY Party ORDER BY total_votes DESC;

Example 5 - Give me party wise performance for MAHBUBNAGAR constituency in the year 2019
SELECT Party, SUM(Votes) AS total_votes FROM election_data WHERE Constituency_Name = "MAHBUBNAGAR" AND Year = 2019 GROUP BY Party ORDER BY total_votes DESC;

Example 6 - Give me party wise performance for ADILABAD constituency in the year 2019
SELECT Party, SUM(Votes) AS total_votes FROM election_data WHERE Constituency_Name = "ADILABAD" AND Year = 2019 GROUP BY Party ORDER BY total_votes DESC;

Example 7 - Give me party wise performance for the year 2021 in Andhra Pradesh
SELECT Party, SUM(Votes) AS total_votes FROM election_data WHERE State_Name = "Andhra_Pradesh" AND Year = 2019 GROUP BY Party ORDER BY total_votes DESC;
"""

# Sample data for prediction (You can modify and expand this as needed)
with open('../prediction.json', 'r') as f:
    predictions = json.load(f)

# def predict_winning_party(party_data):
#     scores = {}
#     for party, data in party_data.items():
#         # Adjust the weight of each factor as needed
#         score = (
#             data["ApprovalRating"] * 0.25 +
#             data["RecentElectionWins"] * 0.15 +
#             data["LeaderPopularity"] * 0.15 +
#             data["SocialMediaInfluence"] * 0.1 +
#             data["Funding"] * 0.1 +
#             (10 if data["IncumbencyFactor"] == "Yes" else 0) +
#             data["Positive"] * 0.15 -  # Positive sentiment boosts the score
#             data["Negative"] * 0.1 +   # Negative sentiment reduces the score
#             data["Neutral"] * 0.05     # Neutral sentiment has a smaller impact
#         )
#         scores[party] = score

#     winning_party = max(scores, key=scores.get)
#     return winning_party

@app.route('/api/predict', methods=['POST'])
def predict():
    data = request.get_json()
    question = data.get('question')
    
    answer = predictions.get(question, "Sorry, I don't have an answer for that question.")
    
    # If the answer is a dictionary, convert it to a readable string format
    if isinstance(answer, dict):
        formatted_answer = "<br>".join([f"{party}: {details}" for party, details in answer.items()])
    else:
        formatted_answer = answer
    
    return jsonify({'answer': formatted_answer})

# @app.route('/api/predict', methods=['POST'])
# def predict_endpoint():
    question = request.json.get('question')
    
    if "likely to win" in question.lower():
        winning_party = predict_winning_party(party_data)
        answer = f"Based on the current data, <strong>{winning_party.upper()}</strong> is most likely to win the next election."
    
    elif "positive sentiment percentage" in question.lower():
        party_name = "bjp"  # Example for BJP; you can expand this logic
        answer = f"The positive sentiment percentage for <strong>BJP</strong> is <strong>{party_data[party_name]['Positive']}%</strong>."
    
    elif "seats does congress" in question.lower():
        answer = f"<strong>Congress</strong> currently holds <strong>{party_data['congress']['Current']}</strong> seats in the Lok Sabha."
    
    elif "funding amount for aap" in question.lower():
        answer = f"The funding amount for <strong>AAP</strong> is <strong>{party_data['aap']['Funding']}</strong> crores."
    
    elif "leader popularity of bjp" in question.lower():
        answer = f"The leader popularity rating for <strong>BJP</strong> is <strong>{party_data['bjp']['LeaderPopularity']}</strong>."
    
    elif "likely to win the most seats" in question.lower():
        winning_party = predict_winning_party(party_data)
        answer = f"Based on the current data, <strong>{winning_party.upper()}</strong> is likely to win the most seats in the upcoming election."
    
    elif "bjp maintain its current majority" in question.lower():
        bjp_seats = party_data["bjp"]["Current"]
        answer = f"<strong>BJP</strong> currently holds <strong>{bjp_seats}</strong> seats. Whether it will maintain this majority depends on voter turnout and sentiment shifts."
    
    elif "congress expected to gain more seats" in question.lower():
        congress_seats = party_data["congress"]["Current"]
        answer = f"<strong>Congress</strong> currently holds <strong>{congress_seats}</strong> seats. The chances of gaining more seats will depend on campaign strategies and voter sentiment."
    
    elif "decline in voter support" in question.lower():
        decline_party = min(party_data, key=lambda p: party_data[p]["Positive"] - party_data[p]["Negative"])
        answer = f"Based on current sentiment data, <strong>{decline_party.upper()}</strong> is likely to experience a decline in voter support."
    
    elif "coalition government forming" in question.lower():
        answer = "There is a strong possibility of a coalition government forming post-election depending on the distribution of seats among parties."
    
    elif "highest probability of forming the government" in question.lower():
        winning_party = predict_winning_party(party_data)
        answer = f"<strong>{winning_party.upper()}</strong> has the highest probability of forming the government in the upcoming election."
    
    elif "expected overall performance" in question.lower():
        performance = {party: f"{data['Positive']}% positive sentiment and {data['Current']} current seats" for party, data in party_data.items()}
        answer = "<ul>"
        for party, details in performance.items():
            answer += f"<li><strong>{party.upper()}:</strong> {details}</li>"
        answer += "</ul>"
    
    elif "predicted change in seat count" in question.lower():
        change_in_seats = {party: "increased" if data["ApprovalRating"] > 50 else "decreased" for party, data in party_data.items()}
        answer = "<ul>"
        for party, change in change_in_seats.items():
            answer += f"<li><strong>{party.upper()}:</strong> {change}</li>"
        answer += "</ul>"
    
    elif "major impact of the future winning party" in question.lower():
        winning_party = predict_winning_party(party_data)
        answer = f"The major impact of <strong>{winning_party.upper()}</strong> winning the upcoming election could include policy shifts, economic changes, and social reforms based on their agenda."
    
    else:
        answer = "Sorry, I don't have an answer for that question."

    return jsonify({'answer': answer})


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

if __name__ == '__main__':
    app.run(debug=True)
