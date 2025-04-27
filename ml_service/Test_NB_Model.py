# ml_service/Test_NB_Model.py

import sys
import pandas as pd
import joblib

# 1) load once at import
MODEL_PATH  = 'breast_cancer_nb_model.pkl'
SCALER_PATH = 'scaler.pkl'
model  = joblib.load(MODEL_PATH)
scaler = joblib.load(SCALER_PATH)

def predict_from_csv(path_to_csv):
    """
    Reads CSV at path_to_csv, drops id/diagnosis columns,
    scales features, returns ['benign','malignant',...]
    """
    df = pd.read_csv(path_to_csv)
    
    # drop unused columns if present
    df = df.drop(columns=['id','diagnosis'], errors='ignore')
    
    # enforce exactly 30 features
    if df.shape[1] != 30:
        raise ValueError(f"CSV needs 30 features, found {df.shape[1]}")
    
    # scale & predict
    X_scaled = scaler.transform(df.values)
    preds    = model.predict(X_scaled)
    
    # map to strings
    label_map = {0: 'benign', 1: 'malignant'}
    return [label_map[int(p)] for p in preds]

if __name__ == "__main__":
    # allow: python Test_NB_Model.py path/to/file.csv
    if len(sys.argv) != 2:
        print("Usage: python Test_NB_Model.py path/to/file.csv")
        sys.exit(1)

    csv_path = sys.argv[1]
    try:
        results = predict_from_csv(csv_path)
        for idx, r in enumerate(results, 1):
            print(f"Patient {idx}: {r}")
    except Exception as e:
        print(f"ERROR: {e}")
        sys.exit(2)
