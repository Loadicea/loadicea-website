import os

target_file = r"C:\Users\yazan\.gemini\antigravity\scratch\uae-technical-services\building-maintenance.html"
new_content_file = r"C:\Users\yazan\.gemini\antigravity\scratch\uae-technical-services\universal_gateway_cta_temp.html"

with open(target_file, 'r', encoding='utf-8') as f:
    content = f.read()

with open(new_content_file, 'r', encoding='utf-8') as f:
    new_section = f.read()

# Start marker
start_marker = "<!-- CTA -->"

start_idx = content.find(start_marker)

if start_idx == -1:
    print("CTA marker not found!")
    exit(1)

# End marker
end_marker = "<!-- Enhanced Footer -->"
end_idx = content.find(end_marker, start_idx)

if end_idx == -1:
    print("End marker not found!")
    exit(1)

# Construct new content
final_content = content[:start_idx] + new_section + content[end_idx:]

with open(target_file, 'w', encoding='utf-8') as f:
    f.write(final_content)

print(f"Successfully replaced CTA section. Start: {start_idx}, End: {end_idx}")
