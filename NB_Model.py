import kagglehub
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.naive_bayes import GaussianNB
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
import joblib

# Step 1: Download the dataset
path = kagglehub.dataset_download("uciml/breast-cancer-wisconsin-data")
print("Path to dataset files:", path)

# Step 2: Load the data
df = pd.read_csv(path + "/data.csv")
print("First 5 rows of the dataset:\n", df.head())

# Step 3: Preprocessing
df = df.drop(['Unnamed: 32', 'id'], axis=1)

# Encode 'diagnosis' column: M = 1, B = 0
df['diagnosis'] = df['diagnosis'].map({'M': 1, 'B': 0})

# Features and Labels
X = df.drop('diagnosis', axis=1)
y = df['diagnosis']

# Step 4: Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Step 5: Scaling features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Step 6: Train the Naive Bayes model
model = GaussianNB()
model.fit(X_train_scaled, y_train)

# Step 7: Evaluate the model
y_pred = model.predict(X_test_scaled)

print("\nModel Evaluation Results:")
print("Accuracy:", accuracy_score(y_test, y_pred))
print("Classification Report:\n", classification_report(y_test, y_pred))
print("Confusion Matrix:\n", confusion_matrix(y_test, y_pred))

# Step 8: Save the trained model and scaler
joblib.dump(model, 'breast_cancer_nb_model.pkl')
joblib.dump(scaler, 'scaler.pkl')

print("\n✅ Training complete. Model and scaler saved successfully.")

# Step 9: Example: test on new patient data
new_patient_data = [[14.5, 20.4, 95.2, 658.9, 0.1, 0.2, 0.1, 0.05, 0.18, 0.06,
                     0.4, 1.3, 2.9, 38.2, 0.006, 0.02, 0.03, 0.01, 0.018, 0.004,
                     16.3, 27.1, 108.2, 819.1, 0.15, 0.4, 0.4, 0.13, 0.34, 0.09]]

# Remember to scale new input data before prediction
new_patient_scaled = scaler.transform(new_patient_data)
new_prediction = model.predict(new_patient_scaled)

print("\nNew Patient Prediction:", "Malignant" if new_prediction[0] == 1 else "Benign")
