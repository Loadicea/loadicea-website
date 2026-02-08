import os

target_file = r"C:\Users\yazan\.gemini\antigravity\scratch\uae-technical-services\building-maintenance.html"
new_content_file = r"C:\Users\yazan\.gemini\antigravity\scratch\uae-technical-services\dual_core_methodology_temp.html"

with open(target_file, 'r', encoding='utf-8') as f:
    content = f.read()

with open(new_content_file, 'r', encoding='utf-8') as f:
    new_section = f.read()

# The section starts with <!-- PPM vs Corrective Methodology -->
start_marker = "<!-- PPM vs Corrective Methodology -->"

start_idx = content.find(start_marker)
if start_idx == -1:
    print("Start marker not found! Trying fallback...")
    # Maybe try searching for the section tag directly if comment was removed?
    # but I haven't removed it yet.
    # From Step 3309, line 754: <!-- PPM vs Corrective Methodology -->
    # It should be there.
    exit(1)

# The section ends before the CTA.
# <!-- CTA -->
end_marker = "<!-- CTA -->"
end_idx = content.find(end_marker, start_idx)

if end_idx == -1:
    print("End marker not found!")
    exit(1)

# Construct new content
# Note: I want to replace everything including the start marker up to the end marker.
final_content = content[:start_idx] + new_section + content[end_idx:]

with open(target_file, 'w', encoding='utf-8') as f:
    f.write(final_content)

print(f"Successfully replaced Methodology section. Start: {start_idx}, End: {end_idx}")
