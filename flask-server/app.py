from flask import Flask, request, jsonify, send_file, render_template
from flask_cors import CORS
import os
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
# app.register_blueprint( url_prefix='/api')

# Configure Google API key
os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
model = genai.GenerativeModel('gemini-pro')
chat = model.start_chat(history=[])

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/data')
def data():
    with open('sentiment_data.json', 'r') as f:
        data = json.load(f)
    return jsonify(data)

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message')
    response = chat.send_message(user_message, stream=True)
    bot_reply = ''.join([chunk.text for chunk in response])
    return jsonify({'reply': bot_reply})

@app.route('/plot/sa-bar.png')
def plots():
    return send_file('plots/sa-bar.png')

@app.route('/plot/sa-pie.png')
def plots1():
    return send_file('plots/sa-pie.png')

@app.route('/plot/sa-pie1.png')
def plots2():
    return send_file('plots/sa-pie1.png')

@app.route('/plot/sa-bar1.png')
def plots3():
    return send_file('plots/sa-bar1.png')

if __name__ == '__main__':
    app.run(debug=True)
