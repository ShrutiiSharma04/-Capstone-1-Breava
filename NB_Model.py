import kagglehub
import pandas as pd

# Download the dataset
path = kagglehub.dataset_download("uciml/breast-cancer-wisconsin-data")
print("Path to dataset files:", path)

# Load the data
df = pd.read_csv(path + "/data.csv")
df.head()

# Drop unwanted columns
df = df.drop(['Unnamed: 32', 'id'], axis=1)

# Encode 'diagnosis' column: M = 1, B = 0
df['diagnosis'] = df['diagnosis'].map({'M': 1, 'B': 0})

# Features and Labels
X = df.drop('diagnosis', axis=1)
y = df['diagnosis']

# Train-test split
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

from sklearn.naive_bayes import GaussianNB
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

# Create and train model
model = GaussianNB()
model.fit(X_train, y_train)

# Predict
y_pred = model.predict(X_test)

# Results
print("Accuracy:", accuracy_score(y_test, y_pred))
print("Classification Report:\n", classification_report(y_test, y_pred))
print("Confusion Matrix:\n", confusion_matrix(y_test, y_pred))

# Example: test new patient
new_patient_data = [[14.5, 20.4, 95.2, 658.9, 0.1, 0.2, 0.1, 0.05, 0.18, 0.06,
                     0.4, 1.3, 2.9, 38.2, 0.006, 0.02, 0.03, 0.01, 0.018, 0.004,
                     16.3, 27.1, 108.2, 819.1, 0.15, 0.4, 0.4, 0.13, 0.34, 0.09]]

prediction = model.predict(new_patient_data)

print("Prediction:", "Malignant" if prediction[0] == 1 else "Benign")