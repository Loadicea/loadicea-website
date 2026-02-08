import os

target_file = r"C:\Users\yazan\.gemini\antigravity\scratch\uae-technical-services\solar-maintenance.html"
new_content_file = r"C:\Users\yazan\.gemini\antigravity\scratch\uae-technical-services\cta_section_temp.html"

with open(target_file, 'r', encoding='utf-8') as f:
    content = f.read()

with open(new_content_file, 'r', encoding='utf-8') as f:
    new_section = f.read()

start_marker = "<!-- CTA -->"
# Searching for the footer start to find the end of the CTA section
# The CTA section ends just before this footer comment.
# However, the section tag closes before the footer.
# Let's find start_marker, then find the FIRST </section> after it.

start_idx = content.find(start_marker)
if start_idx == -1:
    print("Start marker not found!")
    exit(1)

end_tag = "</section>"
end_idx = content.find(end_tag, start_idx)
if end_idx == -1:
    print("End marker not found!")
    exit(1)

end_idx += len(end_tag)

# Construct new content
final_content = content[:start_idx] + new_section + content[end_idx:]

with open(target_file, 'w', encoding='utf-8') as f:
    f.write(final_content)

print(f"Successfully replaced section. Start: {start_idx}, End: {end_idx}")
