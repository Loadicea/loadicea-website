import os

target_file = r"C:\Users\yazan\.gemini\antigravity\scratch\uae-technical-services\building-maintenance.html"
new_content_file = r"C:\Users\yazan\.gemini\antigravity\scratch\uae-technical-services\dashboard_hero_temp.html"

with open(target_file, 'r', encoding='utf-8') as f:
    content = f.read()

with open(new_content_file, 'r', encoding='utf-8') as f:
    new_section = f.read()

# I am replacing the Executive Standard Hero I just put in.
# It starts with `<!-- Page Hero - EXECUTIVE STANDARD -->`
start_marker = "<!-- Page Hero - EXECUTIVE STANDARD -->"

start_idx = content.find(start_marker)

if start_idx == -1:
    print("Executive Standard marker not found! Checking original/cyber markers...")
    # Be robust
    start_idx = content.find("<!-- Page Hero - INTELLIGENT INFRASTRUCTURE -->")
    if start_idx == -1:
        start_idx = content.find("<!-- Page Hero -->")
    
    if start_idx == -1:
        print("No Hero markers found!")
        exit(1)

# Find the end of the hero.
# Same logic as before: find the start of the next section.
next_section_start_str = '<section class="section" style="background: linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%);">'
end_idx = content.find(next_section_start_str, start_idx)

if end_idx == -1:
    end_tag = "</section>"
    end_idx = content.find(end_tag, start_idx)
    if end_idx != -1:
         end_idx += len(end_tag)
    else:
        print("End tag not found!")
        exit(1)

# Construct new content
final_content = content[:start_idx] + new_section + content[end_idx:]

with open(target_file, 'w', encoding='utf-8') as f:
    f.write(final_content)

print(f"Successfully replaced Hero section. Start: {start_idx}, End: {end_idx}")
