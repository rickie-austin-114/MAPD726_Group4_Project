import pandas as pd
import re

df = pd.read_csv("Travel_details_dataset.csv")

# Find rows with any NaN values
rows_with_na = df[df.isna().any(axis=1)]
print(rows_with_na)

df = df.dropna()


def clean_and_convert(input_string):
    # Use regex to find all numerical characters
    numerical_string = re.sub(r'\D', '', input_string)
    return int(numerical_string)


df["Accommodation cost"] = df["Accommodation cost"].apply(clean_and_convert)
df["Transportation cost"] = df["Transportation cost"].apply(clean_and_convert)

df1 = df[["Destination", "Duration (days)", "Traveler age", "Traveler gender", "Traveler nationality", "Accommodation type", "Transportation type"]]

df1["cost"] = df["Accommodation cost"] + df["Transportation cost"]

df1.to_csv("cleaned_data.csv", index=False)