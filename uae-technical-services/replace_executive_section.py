import os

target_file = r"C:\Users\yazan\.gemini\antigravity\scratch\uae-technical-services\building-maintenance.html"
new_content_file = r"C:\Users\yazan\.gemini\antigravity\scratch\uae-technical-services\executive_section_temp.html"

with open(target_file, 'r', encoding='utf-8') as f:
    content = f.read()

with open(new_content_file, 'r', encoding='utf-8') as f:
    new_section = f.read()

# I used this tag in the Blueprint design
start_marker = "<!-- Technical Scope - NAVY BLUE BLUEPRINT REDESIGN -->"
end_marker = "</section>"

start_idx = content.find(start_marker)
if start_idx == -1:
    print("Start marker not found! Trying fallback...")
    # Fallback in case I used a different tag or if it was modified
    start_marker = "<!-- Technical Scope -->"
    start_idx = content.find(start_marker)
    if start_idx == -1:
        print("Fallback marker not found!")
        exit(1)

# Find the first </section> after the start marker
end_idx = content.find(end_marker, start_idx)
if end_idx == -1:
    print("End marker not found!")
    exit(1)

end_idx += len(end_marker)

# Construct new content
final_content = content[:start_idx] + new_section + content[end_idx:]

with open(target_file, 'w', encoding='utf-8') as f:
    f.write(final_content)

print(f"Successfully replaced section. Start: {start_idx}, End: {end_idx}")
