import pandas as pd
import joblib

# Step 1: Load the saved model and scaler
model = joblib.load('breast_cancer_nb_model.pkl')
scaler = joblib.load('scaler.pkl')

# Step 2: Upload the CSV file
file_path = input("Please enter the path to the patient's CSV file: ")

try:
    new_patient_df = pd.read_csv(file_path)
    print("\n✅ Patient data uploaded successfully!")
    
    # Step 3: Preprocessing
    # Remove 'id' and 'diagnosis' columns if they exist
    new_patient_df = new_patient_df.drop(columns=['id', 'diagnosis'], errors='ignore')
    
    # Check if the file has exactly 30 features
    if new_patient_df.shape[1] != 30:
        raise ValueError(f"The uploaded file must have exactly 30 features, but it has {new_patient_df.shape[1]}.")

    # Step 4: Scale the input
    new_patient_scaled = scaler.transform(new_patient_df)
    
    # Step 5: Make prediction
    new_prediction = model.predict(new_patient_scaled)

    # Step 6: Show result
    for idx, pred in enumerate(new_prediction):
        print(f"Patient {idx+1} Prediction:", "Malignant" if pred == 1 else "Benign")
        
except Exception as e:
    print("❌ Error:", e)
