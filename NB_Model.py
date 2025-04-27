import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.naive_bayes import GaussianNB
import joblib

# Load data
df = pd.read_csv('path_to_your_data.csv')

# Drop unwanted columns
df = df.drop(['Unnamed: 32', 'id'], axis=1)

# Encode labels
df['diagnosis'] = df['diagnosis'].map({'M': 1, 'B': 0})

# Features and Labels
X = df.drop('diagnosis', axis=1)
y = df['diagnosis']

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Scale features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Train model
model = GaussianNB()
model.fit(X_train_scaled, y_train)

# Save model and scaler
joblib.dump(model, 'breast_cancer_nb_model.pkl')
joblib.dump(scaler, 'scaler.pkl')

print("Training complete. Model and scaler saved.")
