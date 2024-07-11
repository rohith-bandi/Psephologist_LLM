# import pandas as pd
# from textblob import TextBlob
# import matplotlib.pyplot as plt
# import seaborn as sns
# from wordcloud import WordCloud, STOPWORDS

# # Load the dataset
# df = pd.read_csv("/Users/apple/Downloads/bjp_tweets.csv")
# df1 = pd.read_csv("/Users/apple/Downloads/congress_tweets.csv")

# # Function to calculate polarity
# def polarity(text):
#     return TextBlob(text).sentiment.polarity

# df['polarity'] = df['tweet'].apply(polarity)
# df1['polarity'] = df1['tweet'].apply(polarity)

# # Function to classify sentiment
# def sentiment(label):
#     if label < 0:
#         return "Negative"
#     elif label == 0:
#         return "Neutral"
#     else:
#         return "Positive"

# df['sentiment'] = df['polarity'].apply(sentiment)
# df1['sentiment'] = df1['polarity'].apply(sentiment)

# # Plot sentiment distribution using seaborn
# plt.figure(figsize=(7, 5))
# sns.countplot(x='sentiment', data=df, palette=['red', 'gold', 'yellowgreen'])
# plt.title('Sentiment Distribution of BJP')
# plt.savefig('plots/sa-bar.png')
# # plt.show()

# plt.figure(figsize=(7, 5))
# sns.countplot(x='sentiment', data=df1, palette=['yellowgreen', 'gold','red' ])
# plt.title('Sentiment Distribution of Congress')
# plt.savefig('plots/sa-bar1.png')
# # plt.show()

# # Plot sentiment distribution as pie chart
# plt.figure(figsize=(7, 5))
# colors = ("yellowgreen", "gold", "red")
# wp = {'linewidth': 2, 'edgecolor': "black"}
# tags = df['sentiment'].value_counts()
# explode = (0.1, 0.1, 0.1)
# tags.plot(kind='pie', autopct='%1.1f%%', shadow=True, colors=colors,
#           startangle=90, wedgeprops=wp, explode=explode, label='')
# plt.title('Distribution of Sentiments of BJP')
# plt.savefig('plots/sa-pie.png')
# # plt.show()

# plt.figure(figsize=(7, 5))
# colors = ("yellowgreen", "gold", "red")
# wp = {'linewidth': 2, 'edgecolor': "black"}
# tags = df1['sentiment'].value_counts()
# explode = (0.1, 0.1, 0.1)
# tags.plot(kind='pie', autopct='%1.1f%%', shadow=True, colors=colors,
#           startangle=90, wedgeprops=wp, explode=explode, label='')
# plt.title('Distribution of Sentiments of Congress')
# plt.savefig('plots/sa-pie1.png')
# # plt.show()


import pandas as pd
from textblob import TextBlob
import json

# Load the dataset
df_bjp = pd.read_csv("/Users/apple/Downloads/bjp_tweets.csv")
df_congress = pd.read_csv("/Users/apple/Downloads/congress_tweets.csv")
df_AAP = pd.read_csv("/Users/apple/Downloads/Arvind Kejriwal_data.csv")

# Function to calculate polarity
def polarity(text):
    return TextBlob(text).sentiment.polarity

df_bjp['polarity'] = df_bjp['tweet'].apply(polarity)
df_congress['polarity'] = df_congress['tweet'].apply(polarity)
df_AAP['polarity'] = df_AAP['Tweet'].apply(polarity)

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

# Save sentiment counts to JSON
bjp_sentiment_counts = df_bjp['sentiment'].value_counts().to_dict()
congress_sentiment_counts = df_congress['sentiment'].value_counts().to_dict()
AAP_sentiment_counts = df_AAP['sentiment'].value_counts().to_dict()

data = {
    'bjp': bjp_sentiment_counts,
    'congress': congress_sentiment_counts,
    'AAP': AAP_sentiment_counts
}

with open('sentiment_data.json', 'w') as f:
    json.dump(data, f)
