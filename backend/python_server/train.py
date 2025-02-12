import pandas as pd

df = pd.read_csv("Travel_details_dataset.csv")

print(df.head())
# drop all rows with value NA
df = df.dropna()
