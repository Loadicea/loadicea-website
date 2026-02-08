import shutil
import os
import glob

# Source is the brain directory
source_dir = r"C:\Users\yazan\.gemini\antigravity\brain\b95a78b2-4983-489e-b00c-d3c730b01d2d"
target_dir = r"C:\Users\yazan\.gemini\antigravity\scratch\uae-technical-services\assets\images"

# Ensure target exists
os.makedirs(target_dir, exist_ok=True)

# Map partial names to final names
mapping = {
    "villa_base": "villa_base.png",
    "office_base": "office_base.png",
    "warehouse_base": "warehouse_base.png",
    "hotel_base": "hotel_base.png"
}

for key, final_name in mapping.items():
    # Find the file (it has a timestamp suffix)
    pattern = os.path.join(source_dir, f"{key}*.png")
    matches = glob.glob(pattern)
    
    if matches:
        # Take the most recent if multiple
        latest_file = max(matches, key=os.path.getctime)
        final_path = os.path.join(target_dir, final_name)
        try:
            shutil.copy2(latest_file, final_path)
            print(f"Moved {latest_file} to {final_path}")
        except Exception as e:
            print(f"Error moving {final_name}: {e}")
    else:
        print(f"Could not find match for {key}")
