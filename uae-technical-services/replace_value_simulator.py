import os
import shutil

target_file = r"C:\Users\yazan\.gemini\antigravity\scratch\uae-technical-services\value-simulator.html"
new_content_file = r"C:\Users\yazan\.gemini\antigravity\scratch\uae-technical-services\value_simulator_premium_temp.html"

shutil.copy2(new_content_file, target_file)

print(f"Successfully updated {target_file} to Premium Savings Dashboard")
