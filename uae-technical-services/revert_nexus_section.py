import os

target_file = r"C:\Users\yazan\.gemini\antigravity\scratch\uae-technical-services\building-maintenance.html"
new_content_file = r"C:\Users\yazan\.gemini\antigravity\scratch\uae-technical-services\restored_single_provider.html"

with open(target_file, 'r', encoding='utf-8') as f:
    content = f.read()

with open(new_content_file, 'r', encoding='utf-8') as f:
    new_section = f.read()

# I used this tag in the Nexus design
start_marker = "<!-- Complete Building Support - HOLOGRAPHIC NEXUS DESIGN -->"
end_marker_next_section = '<!-- Technical Scope - EXECUTIVE MATRIX DESIGN -->'

start_idx = content.find(start_marker)
if start_idx == -1:
    print("Start marker not found! Trying fallback...")
    exit(1)

# Find the start of the NEXT section.
# We know the next section starts with `<!-- Technical Scope - EXECUTIVE MATRIX DESIGN -->`
# But let's look for the </section> before it to be safe, or just find the next section tag.
# Actually, the python script logic for `replace_nexus_section` replaced based on start marker and end tag.
# Let's verify what the file looks like now. It has `<!-- Complete Building Support ...` and ends with `</section>`.

end_tag = "</section>"
end_idx = content.find(end_tag, start_idx)

if end_idx == -1:
    print("End marker not found!")
    exit(1)

end_idx += len(end_tag)

# Construct new content (restoring the old one)
final_content = content[:start_idx] + new_section + content[end_idx:]

with open(target_file, 'w', encoding='utf-8') as f:
    f.write(final_content)

print(f"Successfully reverted section. From {start_idx} to {end_idx}")
