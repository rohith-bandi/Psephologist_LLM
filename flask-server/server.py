import pandas as pd
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor, VotingRegressor
import json

# 2019 data
data_2019 = {
    "bjp": {
      "Positive": 43.5,
      "Neutral": 35.0,
      "Negative": 21.5,
      "Seats": 301,
      "ApprovalRating": 65,
      "LeaderPopularity": 70,
      "SocialMediaInfluence": 10000000,
      "Funding": 5000,
      "CoalitionStrength": 10,
      "IncumbencyFactor": "Yes"
    },
    "congress": {
      "Positive": 30.5,
      "Neutral": 34.5,
      "Negative": 35.0,
      "Seats": 53,
      "ApprovalRating": 50,
      "LeaderPopularity": 30,
      "SocialMediaInfluence": 5000000,
      "Funding": 3000,
      "CoalitionStrength": 5,
      "IncumbencyFactor": "No"
    },
    "aap": {
      "Positive": 32.0,
      "Neutral": 52.5,
      "Negative": 15.5,
      "Seats": 1,
      "ApprovalRating": 60,
      "LeaderPopularity": 65,
      "SocialMediaInfluence": 6000000,
      "Funding": 2000,
      "CoalitionStrength": 2,
      "IncumbencyFactor": "No"
    },
    "cpi": {
      "Neutral": 33.3,
      "Positive": 33.3,
      "Negative": 33.3,
      "Seats": 2,
      "ApprovalRating": 40,
      "LeaderPopularity": 45,
      "SocialMediaInfluence": 100000,
      "Funding": 100,
      "CoalitionStrength": 3,
      "IncumbencyFactor": "No"
    },
    "dmk": {
      "Neutral": 33.3,
      "Positive": 33.3,
      "Negative": 33.3,
      "Seats": 24,
      "ApprovalRating": 70,
      "LeaderPopularity": 60,
      "SocialMediaInfluence": 3000000,
      "Funding": 1500,
      "CoalitionStrength": 4,
      "IncumbencyFactor": "No"
    },
    "aitc": {
      "Neutral": 33.3,
      "Positive": 33.3,
      "Negative": 33.3,
      "Seats": 23,
      "ApprovalRating": 55,
      "LeaderPopularity": 65,
      "SocialMediaInfluence": 4000000,
      "Funding": 2000,
      "CoalitionStrength": 3,
      "IncumbencyFactor": "No"
    },
    "npp": {
      "Neutral": 72.0,
      "Positive": 19.0,
      "Negative": 9.0,
      "Seats": 1,
      "ApprovalRating": 50,
      "LeaderPopularity": 50,
      "SocialMediaInfluence": 50000,
      "Funding": 100,
      "CoalitionStrength": 1,
      "IncumbencyFactor": "No"
    },
    "bsp": {
      "Neutral": 63.0,
      "Negative": 29.0,
      "Positive": 8.0,
      "Seats": 10,
      "ApprovalRating": 45,
      "LeaderPopularity": 50,
      "SocialMediaInfluence": 2000000,
      "Funding": 500,
      "CoalitionStrength": 2,
      "IncumbencyFactor": "No"
    }
}

# 2024 data (no seat count)
data_2024 = {
    "bjp":{
        "Positive":63,
        "Negative":15,
        "Neutral":22,
        "ApprovalRating":65,
        "LeaderPopularity": 75,
        "SocialMediaInfluence": 15000000,
        "Funding": 5000,
        "CoalitionStrength": 10,
        "IncumbencyFactor": "Yes"
    },
    "congress":{
        "Positive":40,
        "Negative":30,
        "Neutral":40,
        "ApprovalRating":50,
        "LeaderPopularity": 40,
        "SocialMediaInfluence": 5000000,
        "Funding": 1500,
        "CoalitionStrength": 6,
        "IncumbencyFactor": "Yes"
    },
    "aap":{
        "Positive":34.0,
        "Negative":12,
        "Neutral":54,
        "ApprovalRating":62,
        "LeaderPopularity": 67,
        "SocialMediaInfluence": 4000000,
        "Funding": 3000,
        "CoalitionStrength":2,
        "IncumbencyFactor": "No"
    },
    "dmk":{
        "Positive":31.3,
        "Negative":34.5,
        "Neutral":34.5,
        "ApprovalRating":67,
        "LeaderPopularity": 50,
        "SocialMediaInfluence": 2000000,
        "Funding": 600,
        "CoalitionStrength": 3,
        "IncumbencyFactor": "No"
    },
    "cpi": {
        "Neutral": 33.3,
        "Positive": 33.3,
        "Negative": 33.3,
        "ApprovalRating": 40,
        "LeaderPopularity": 45,
        "SocialMediaInfluence": 100000,
        "Funding": 100,
        "CoalitionStrength": 3,
        "IncumbencyFactor": "No"
      },
    "aitc":{
        "Positive":40,
        "Negative":30,
        "Neutral":30,
        "ApprovalRating":72,
        "LeaderPopularity": 62,
        "SocialMediaInfluence": 4000000,
        "Funding": 200,
        "CoalitionStrength": 3,
        "IncumbencyFactor": "No"
    },
    "bsp":{
        "Positive":15,
        "Negative":63,
        "Neutral":22,
        "ApprovalRating":20,
        "LeaderPopularity": 50,
        "SocialMediaInfluence": 50000,
        "Funding": 120,
        "CoalitionStrength": 2,
        "IncumbencyFactor": "No"
    },
    "npp":{
        "Positive":15,
        "Negative":63,
        "Neutral":22,
        "ApprovalRating":25,
        "LeaderPopularity": 30,
        "SocialMediaInfluence": 5000,
        "Funding": 50,
        "CoalitionStrength": 1,
        "IncumbencyFactor": "No"
    }
}

# Convert 2019 data to DataFrame
df_2019 = pd.DataFrame.from_dict(data_2019, orient='index')

# Extract the target (seats) and features for 2019
X_2019 = df_2019.drop("Seats", axis=1)
y_2019 = df_2019["Seats"]

# Encode categorical variables
X_2019 = pd.get_dummies(X_2019, columns=["IncumbencyFactor"])

# Convert 2024 data to DataFrame
df_2024 = pd.DataFrame.from_dict(data_2024, orient='index')

# Ensure the same columns are present
X_2024 = pd.get_dummies(df_2024, columns=["IncumbencyFactor"])

# Align columns of 2024 with 2019 data
X_2024 = X_2024.reindex(columns=X_2019.columns, fill_value=0)

# Initialize and train individual models
rf_model = RandomForestRegressor(n_estimators=100, random_state=42)
gb_model = GradientBoostingRegressor(n_estimators=100, random_state=42)

# Ensemble Learning: Combine models using VotingRegressor
ensemble_model = VotingRegressor(estimators=[('rf', rf_model), ('gb', gb_model)])
ensemble_model.fit(X_2019, y_2019)

# Predictions for 2024
predicted_seats_2024 = ensemble_model.predict(X_2024)

# Create a dictionary for the results
predicted_seat_counts = {party: int(predicted_seats_2024[i]) for i, party in enumerate(data_2024.keys())}

# Historical seat counts (2019)
previous_seat_counts = {party: data_2019[party]['Seats'] for party in data_2019.keys()}

# Calculate seat changes
seat_changes = {party: predicted_seat_counts[party] - previous_seat_counts.get(party, 0) for party in predicted_seat_counts.keys()}

# Calculate majority status for BJP
majority_threshold = 300  # Example threshold
bjp_majority = predicted_seat_counts["bjp"] > majority_threshold

# Determine the party with the most seats
most_seats_party = max(predicted_seat_counts, key=predicted_seat_counts.get)

# Determine the party with the greatest decline
decline_party = min(seat_changes, key=seat_changes.get)

# Coalition possibility
coalition_possible = any(count < majority_threshold for count in predicted_seat_counts.values())

# Answering Questions
results = {}

results["What is the predicted seat count for BJP?"] = f"The predicted seat count for BJP is approximately {predicted_seat_counts['bjp']}."

results["What are the seat gains or losses compared to the previous election?"] = {
    party: f"The predicted seat count for {party} is {predicted_seat_counts[party]}, which represents a change of {seat_changes[party]} seats compared to the previous election."
    for party in predicted_seat_counts.keys()
}

results["Which party is likely to win the most seats?"] = f"The party likely to win the most seats is {most_seats_party}, with a predicted seat count of {predicted_seat_counts[most_seats_party]}."

results["Is BJP likely to maintain its majority?"] = f"BJP is {'likely' if bjp_majority else 'unlikely'} to maintain its majority, as the predicted seat count is {predicted_seat_counts['bjp']}, {'above' if bjp_majority else 'below'} the majority threshold of {majority_threshold} seats."

results["Is Congress predicted to gain more seats?"] = f"Congress is predicted to gain {seat_changes.get('congress', 0)} seats compared to the previous election."

results["Which party is likely to experience the most significant decline in support?"] = f"The party likely to experience the most significant decline in voter support is {decline_party}, with a predicted change of {seat_changes[decline_party]} seats."

results["What is the chance of a coalition government forming?"] = f"There is {'a high' if coalition_possible else 'little'} chance of a coalition government forming."

results["Which party has the highest probability of forming the government?"] = f"The party with the highest probability of forming the government is {most_seats_party}, given its predicted seat count of {predicted_seat_counts[most_seats_party]}."

results["What is the expected overall performance of each party?"] = {
    party: f"{party} is expected to secure approximately {predicted_seat_counts[party]} seats."
    for party in predicted_seat_counts.keys()
}

results["What is the predicted change in seat count for each party?"] = {
    party: f"The seat count for {party} is expected to change by {seat_changes[party]} seats compared to the previous election."
    for party in predicted_seat_counts.keys()
}

# Save the results to a JSON file
with open("prediction.json", "w") as json_file:
    json.dump(results, json_file, indent=4)

print("Results saved to prediction.json")

# Create a dictionary for the predicted seat counts only
predicted_seat_counts_dict = {party: predicted_seat_counts[party] for party in predicted_seat_counts.keys()}

# Save the predicted seat counts to a JSON file
with open("predicted_seat_counts.json", "w") as json_file:
    json.dump(predicted_seat_counts_dict, json_file, indent=4)

print("Predicted seat counts saved to predicted_seat_counts.json")
