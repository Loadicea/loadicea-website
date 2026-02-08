import os
import shutil

target_file = r"C:\Users\yazan\.gemini\antigravity\scratch\uae-technical-services\industries.html"
new_content_file = r"C:\Users\yazan\.gemini\antigravity\scratch\uae-technical-services\industries_matrix_temp.html"

# Just do a full file copy
shutil.copy2(new_content_file, target_file)

print(f"Successfully updated {target_file} to Matrix Layout")
