import os

target_file = r"C:\Users\yazan\.gemini\antigravity\scratch\uae-technical-services\building-maintenance.html"
new_content_file = r"C:\Users\yazan\.gemini\antigravity\scratch\uae-technical-services\nexus_section_temp.html"

with open(target_file, 'r', encoding='utf-8') as f:
    content = f.read()

with open(new_content_file, 'r', encoding='utf-8') as f:
    new_section = f.read()

start_marker = '<!-- The "Single Provider" Value Prop -->'
# The next section starts with this comment, which I recently added
end_marker_next_section = '<!-- Technical Scope - EXECUTIVE MATRIX DESIGN -->'

start_idx = content.find(start_marker)
if start_idx == -1:
    print("Start marker not found!")
    exit(1)

# Find the start of the NEXT section, then find the last </section> before it.
# Actually, it's safer to find the first </section> after the start_marker, assuming no nested sections.
# However, the original code had nested divs but the section tag is top level.
# Let's verify the content structure from previous reads.
# The section to replace is:
# <section class="section" style="background: linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%);"> ... </section>

end_tag = "</section>"
end_idx = content.find(end_tag, start_idx)

if end_idx == -1:
    print("End marker not found!")
    exit(1)

end_idx += len(end_tag)

# Check if there's any style block after it that belongs to it.
# The previous view showed:
# </section>
# <style> ... </style>
# <!-- Technical Scope -->
# So I should probably include the style block in the replacement target if I want to remove it, 
# OR just replace the section and leave the old styles as dead code (safer).
# But wait, the new design has its own styles inside the new HTML.
# If I don't remove the old styles, they might conflict if class names match (feature-card-simple).
# My new design uses 'protocol-card' and 'iso-card', so likely no conflict.
# I will replace just the section to be safe.

# Construct new content
final_content = content[:start_idx] + new_section + content[end_idx:]

with open(target_file, 'w', encoding='utf-8') as f:
    f.write(final_content)

print(f"Successfully replaced section. Start: {start_idx}, End: {end_idx}")
