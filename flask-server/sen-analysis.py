import pandas as pd
from textblob import TextBlob
import json

# Load the dataset
df_bjp = pd.read_csv("data/bjp_tweets.csv")
df_congress = pd.read_csv("data/congress_tweets.csv")
df_AAP = pd.read_csv("data/Arvind Kejriwal_data.csv")
df_CPI = pd.read_csv("data/Arvind Kejriwal_data.csv")
df_BSP = pd.read_csv("data/Arvind Kejriwal_data.csv")
df_NPP = pd.read_csv("data/NPP.csv")
df_DMK = pd.read_csv("data/translated_tweets.csv")
df_BSP = pd.read_csv("data/BSP.csv")

# Function to calculate polarity
def polarity(text):
    return TextBlob(text).sentiment.polarity

df_bjp['polarity'] = df_bjp['tweet'].apply(polarity)
df_congress['polarity'] = df_congress['tweet'].apply(polarity)
df_AAP['polarity'] = df_AAP['Tweet'].apply(polarity)
df_CPI['polarity'] = df_CPI['Tweet'].apply(polarity)
df_BSP['polarity'] = df_BSP['Tweet'].apply(polarity)
df_NPP['polarity'] = df_NPP['title'].apply(polarity)
df_DMK['polarity'] = df_DMK['Tweets'].apply(polarity)
df_BSP['polarity'] = df_BSP['title'].apply(polarity)

# Function to classify sentiment
def sentiment(label):
    if label < 0:
        return "Negative"
    elif label == 0:
        return "Neutral"
    else:
        return "Positive"

df_bjp['sentiment'] = df_bjp['polarity'].apply(sentiment)
df_congress['sentiment'] = df_congress['polarity'].apply(sentiment)
df_AAP['sentiment'] = df_AAP['polarity'].apply(sentiment)
df_CPI['sentiment'] = df_CPI['polarity'].apply(sentiment)
df_BSP['sentiment'] = df_BSP['polarity'].apply(sentiment)
df_NPP['sentiment'] = df_NPP['polarity'].apply(sentiment)
df_DMK['sentiment'] = df_DMK['polarity'].apply(sentiment)
df_BSP['sentiment'] = df_BSP['polarity'].apply(sentiment)

# Save sentiment counts to JSON
bjp_sentiment_counts = df_bjp['sentiment'].value_counts().to_dict()
congress_sentiment_counts = df_congress['sentiment'].value_counts().to_dict()
AAP_sentiment_counts = df_AAP['sentiment'].value_counts().to_dict()
AAP_sentiment_counts = df_CPI['sentiment'].value_counts().to_dict()
AAP_sentiment_counts = df_BSP['sentiment'].value_counts().to_dict()
NPP_sentiment_counts = df_NPP['sentiment'].value_counts().to_dict()
DMK_sentiment_counts = df_DMK['sentiment'].value_counts().to_dict()
BSP_sentiment_counts = df_BSP['sentiment'].value_counts().to_dict()

data = {
    'bjp': bjp_sentiment_counts,
    'congress': congress_sentiment_counts,
    'AAP': AAP_sentiment_counts,
    'CPI': AAP_sentiment_counts,
    'BSP': AAP_sentiment_counts,
    'DMK': DMK_sentiment_counts,
    'NPP': NPP_sentiment_counts,
    'BSP': BSP_sentiment_counts,
}

with open('sentiment_data.json', 'w') as f:
    json.dump(data, f)
