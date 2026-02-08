import os

target_file = r"C:\Users\yazan\.gemini\antigravity\scratch\uae-technical-services\solar-maintenance.html"
new_content_file = r"C:\Users\yazan\.gemini\antigravity\scratch\uae-technical-services\premium_section_temp.html"

with open(target_file, 'r', encoding='utf-8') as f:
    content = f.read()

with open(new_content_file, 'r', encoding='utf-8') as f:
    new_section = f.read()

start_marker = "<!-- Corrective Maintenance & Compliance - PREMIUM REDESIGN (Light Theme) -->"
end_marker = "</section>"

start_idx = content.find(start_marker)
if start_idx == -1:
    print("Start marker not found!")
    # Fallback to the previous marker design if the user edited it or if I misremembered
    start_marker = "<!-- Corrective Maintenance & Compliance - PREMIUM REDESIGN -->"
    start_idx = content.find(start_marker)
    if start_idx == -1:
        print("Backup start marker also not found. Aborting.")
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
