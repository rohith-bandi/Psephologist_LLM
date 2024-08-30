import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor, VotingRegressor
from sklearn.svm import SVR
from sklearn.metrics import mean_squared_error
from sklearn.cluster import KMeans
from sklearn.model_selection import cross_val_score
import shap
import h2o
from h2o.automl import H2OAutoML

# Example data
data = {
    "bjp": {
      "Positive": 43.5,
      "Neutral": 35.0,
      "Negative": 21.5,
      "Current": 301,
      "ApprovalRating": 65,
      "RecentElectionWins": 4,
      "LeaderPopularity": 70,
      "SocialMediaInfluence": 10000000,
      "Funding": 5000,
      "CoalitionStrength": 10,
      "IncumbencyFactor": "Yes"
    },
    "congress": {
      "Positive": 37.5,
      "Neutral": 34.5,
      "Negative": 35.0,
      "Current": 53,
      "ApprovalRating": 50,
      "RecentElectionWins": 2,
      "LeaderPopularity": 55,
      "SocialMediaInfluence": 8000000,
      "Funding": 3000,
      "CoalitionStrength": 5,
      "IncumbencyFactor": "No"
    },
    "aap": {
      "Positive": 32.0,
      "Neutral": 52.5,
      "Negative": 15.5,
      "Current": 1,
      "ApprovalRating": 60,
      "RecentElectionWins": 3,
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
      "Current": 2,
      "ApprovalRating": 40,
      "RecentElectionWins": 1,
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
      "Current": 24,
      "ApprovalRating": 70,
      "RecentElectionWins": 2,
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
      "Current": 23,
      "ApprovalRating": 55,
      "RecentElectionWins": 2,
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
      "Current": 1,
      "ApprovalRating": 50,
      "RecentElectionWins": 1,
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
      "Current": 10,
      "ApprovalRating": 45,
      "RecentElectionWins": 1,
      "LeaderPopularity": 50,
      "SocialMediaInfluence": 2000000,
      "Funding": 500,
      "CoalitionStrength": 2,
      "IncumbencyFactor": "No"
    }
  }

# Convert to DataFrame
df = pd.DataFrame.from_dict(data, orient='index')

# Prepare features and target
X = df.drop("Current", axis=1)
y = df["Current"]

# Encode categorical variables
X = pd.get_dummies(X, columns=["IncumbencyFactor"])

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Initialize and train models
rf_model = RandomForestRegressor(n_estimators=100, random_state=42)
rf_model.fit(X_train, y_train)

# Feature Importance
explainer = shap.TreeExplainer(rf_model)
shap_values = explainer.shap_values(X_train)

# Predictions
rf_predictions = rf_model.predict(X_test)
rf_mse = mean_squared_error(y_test, rf_predictions)

# Ensemble Learning
gb_model = GradientBoostingRegressor(n_estimators=100, random_state=42)
ensemble_model = VotingRegressor(estimators=[('rf', rf_model), ('gb', gb_model)])
ensemble_model.fit(X_train, y_train)
ensemble_predictions = ensemble_model.predict(X_test)

# Clustering-Based Analysis
kmeans = KMeans(n_clusters=3, random_state=42)
clusters = kmeans.fit_predict(X)
df['Cluster'] = clusters

# Non-Linear Relationships
svm_model = SVR(kernel='rbf')
svm_model.fit(X_train, y_train)
svm_predictions = svm_model.predict(X_test)

# AutoML
h2o.init()
h2o_df = h2o.H2OFrame(df)
y_col = "Current"
X_cols = list(h2o_df.columns)
X_cols.remove(y_col)
aml = H2OAutoML(max_models=20, seed=42)
aml.train(x=X_cols, y=y_col, training_frame=h2o_df)
lb = aml.leaderboard

# Cross-Validation
cv_scores = cross_val_score(rf_model, X, y, cv=5)

import json

# Answering Questions
results = {}

# 1. Compare predicted seat count for ruling party
ruling_party = "bjp"
ruling_party_seat_count = rf_model.predict(pd.get_dummies(X.loc[[ruling_party]]))[0]
results["Predicted seat count for BJP"] = f"The predicted seat count for BJP is approximately {ruling_party_seat_count:.2f}. This is based on the model's analysis of various factors such as approval ratings, social media influence, and recent election wins."

# 2. Seat gains or losses compared to previous election
previous_seat_counts = {"bjp": 301, "congress": 53}  # Example values
predicted_seat_counts = {party: rf_model.predict(pd.get_dummies(X.loc[[party]]))[0] for party in data.keys()}
seat_changes = {party: predicted_seat_counts[party] - previous_seat_counts.get(party, 0) for party in data.keys()}
results["Seat changes compared to previous election"] = {
    party: f"The predicted seat count for {party} is {predicted_seat_counts[party]:.2f}, which represents a change of {seat_changes[party]:.2f} seats compared to the previous election."
    for party in data.keys()
}

# 3. Party likely to win most seats
most_seats_party = max(predicted_seat_counts, key=predicted_seat_counts.get)
results["Party likely to win most seats"] = f"The party likely to win the most seats is {most_seats_party}, with a predicted seat count of {predicted_seat_counts[most_seats_party]:.2f}. This suggests that {most_seats_party} has the strongest electoral performance among the analyzed parties."

# 4. BJP maintaining majority
majority_threshold = 300  # Example threshold
bjp_majority = ruling_party_seat_count > majority_threshold
results["BJP maintaining majority"] = f"BJP is {'likely' if bjp_majority else 'unlikely'} to maintain its majority, as the predicted seat count is {ruling_party_seat_count:.2f}, {'above' if bjp_majority else 'below'} the majority threshold of {majority_threshold} seats."

# 5. Congress gaining more seats
congress_gain = seat_changes.get("congress", 0)
results["Congress gaining more seats"] = f"Congress is predicted to gain {congress_gain:.2f} seats compared to the previous election, reflecting an improvement in their electoral performance."

# 6. Party likely to experience decline in support
decline_party = min(seat_changes, key=seat_changes.get)
results["Party likely to experience decline in support"] = f"The party likely to experience the most significant decline in voter support is {decline_party}, with a predicted change of {seat_changes[decline_party]:.2f} seats."

# 7. Coalition government forming
coalition_possible = any(count < majority_threshold for count in predicted_seat_counts.values())
results["Chance of coalition government forming"] = f"There is {'a high' if coalition_possible else 'little'} chance of a coalition government forming, as {'no single party' if coalition_possible else 'a party'} is expected to secure a majority on its own."

# 8. Highest probability of forming government
probable_government_party = most_seats_party
results["Party with highest probability of forming government"] = f"The party with the highest probability of forming the government is {probable_government_party}, given its predicted seat count of {predicted_seat_counts[probable_government_party]:.2f}, which is the highest among all parties."

# 9. Expected overall performance of each party
results["Expected overall performance of each party"] = {
    party: f"{party} is expected to secure approximately {predicted_seat_counts[party]:.2f} seats, indicating their overall performance in the election."
    for party in data.keys()
}

# 10. Predicted change in seat count for each party
results["Predicted change in seat count for each party"] = {
    party: f"The seat count for {party} is predicted to change by {seat_changes[party]:.2f} seats compared to the previous election."
    for party in data.keys()
}

# Save the results to a JSON file
with open("election_predictions_explainable.json", "w") as json_file:
    json.dump(results, json_file, indent=4)

print("Results saved to election_predictions_explainable.json")

# # Advanced Questions
# print(f"Mean Squared Error (RF Model): {rf_mse}")
# shap.summary_plot(shap_values, X_train)
# print(f"SVM Model Predictions: {svm_predictions}")
# print(f"AutoML Leaderboard: {lb}")
# print(f"Cross-Validation Scores: {cv_scores}")
# print(f"Clustering Results: {df[['Cluster']].head()}")