import os

target_file = r"C:\Users\yazan\.gemini\antigravity\scratch\uae-technical-services\building-maintenance.html"
new_content_file = r"C:\Users\yazan\.gemini\antigravity\scratch\uae-technical-services\executive_hero_temp.html"

with open(target_file, 'r', encoding='utf-8') as f:
    content = f.read()

with open(new_content_file, 'r', encoding='utf-8') as f:
    new_section = f.read()

# The previous script replaced content starting from `<!-- Page Hero -->` but it replaced it with the Cyber Hero content.
# The Cyber hero content starts with `<!-- Page Hero - INTELLIGENT INFRASTRUCTURE -->`.
# I should search for that tag.

start_marker = "<!-- Page Hero - INTELLIGENT INFRASTRUCTURE -->"

# If I ran it multiple times or reverted, it might be different.
# I will check for the Cyber Hero marker.
start_idx = content.find(start_marker)

if start_idx == -1:
    print("Cyber Hero marker not found! Checking original marker...")
    start_marker = "<!-- Page Hero -->"
    start_idx = content.find(start_marker)
    if start_idx == -1:
        print("Original marker not found either!")
        exit(1)

# The replaced hero section ends at the start of the next section.
# The next section starts with `<section class="section" style="background: linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%);">` (the restored single provider section).
# I used `replace_hero_section.py` which found the END of the hero by finding the start of the next section.
# I will do the same.

next_section_start_str = '<section class="section" style="background: linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%);">'
end_idx = content.find(next_section_start_str, start_idx)

if end_idx == -1:
    # Fallback: Find the </section> of the hero.
    # The Cyber Hero has </section> at the end.
    # Let's find the first </section> after start_idx.
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
