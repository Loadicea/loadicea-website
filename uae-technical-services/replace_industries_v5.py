import os
import shutil

target_file = r"C:\Users\yazan\.gemini\antigravity\scratch\uae-technical-services\industries.html"
new_content_file = r"C:\Users\yazan\.gemini\antigravity\scratch\uae-technical-services\industries_v5_final.html"

shutil.copy2(new_content_file, target_file)

print(f"Successfully updated {target_file} to Hybrid V5 Layout")
