import os

target_file = r"C:\Users\yazan\.gemini\antigravity\scratch\uae-technical-services\building-maintenance.html"
new_content_file = r"C:\Users\yazan\.gemini\antigravity\scratch\uae-technical-services\hero_section_temp.html"

with open(target_file, 'r', encoding='utf-8') as f:
    content = f.read()

with open(new_content_file, 'r', encoding='utf-8') as f:
    new_section = f.read()

start_marker = "<!-- Page Hero -->"
# The Hero ends where the "Single Provider" section begins.
# Since I reverted the Single Provider section, it starts with:
# <section class="section" style="background: linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%);">
# But relying on the style attribute is brittle.
# I can rely on the comment: <!-- The "Single Provider" Value Prop -->
# Let's check if that comment exists in the reverted content.
# The reverted content started with <section ...> immediately.
# Wait, I reverted lines 8827 to 19231.
# The `restored_single_provider.html` started with <section ...>.
# The `replace_nexus_section.py` replaced between `<!-- The "Single Provider" Value Prop -->` and `</section>`.
# So the comment `<!-- The "Single Provider" Value Prop -->` SHOULD still be there *before* the section I reverted.
# NO, `replace_nexus_section.py` used `start_idx = content.find(start_marker)`.
# And `final_content = content[:start_idx] + new_section + ...`
# So the start marker `<!-- The "Single Provider" Value Prop -->` was REMOVED (because it wasn't included in content[:start_idx]? Wait.)
# content[:start_idx] excludes the marker.
# And `new_section` (the nexus temp file) started with `<!-- Complete Building Support ...`.
# So the comment `<!-- The "Single Provider" Value Prop -->` is GONE.
# What is the new marker?
# The restored content starts with `<section ...`.
# But `revert_nexus_section.py` ALSO used the same logic?
# `start_idx = content.find(start_marker)` where start_marker was `<!-- Complete Building Support - HOLOGRAPHIC NEXUS DESIGN -->`.
# So it removed THAT comment and replaced it with `restored_single_provider.html`.
# `restored_single_provider.html` starts with `<section ...`.
# So there is NO comment marker before the reverted section now.

# So I need to find the end of the HERO section differently.
# The Hero section is directly followed by the Single Provider section.
# The Single Provider section starts with `<section class="section" style="background: linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%);">`.
# I can verify this string.

next_section_start_str = '<section class="section" style="background: linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%);">'

start_idx = content.find(start_marker)
if start_idx == -1:
    print("Start marker not found!")
    exit(1)

# Find the start of the next section
end_idx = content.find(next_section_start_str, start_idx)

if end_idx == -1:
    # Maybe try a robust fallback: finding the first <section> after the hero starts?
    # The hero itself is a section.
    # So I need the START of the *second* section after the hero start.
    # Actually, simpler: finding the </section> of the hero.
    # Then I replace up to </section>.
    # Hero starts with <section ...>. It ends with </section>.
    # So finding the first </section> after start_marker gives me the end of the Hero.
    end_tag = "</section>"
    end_idx = content.find(end_tag, start_idx)
    if end_idx != -1:
        end_idx += len(end_tag)
    else:
        print("Hero end tag not found!")
        exit(1)

# Construct new content
final_content = content[:start_idx] + new_section + content[end_idx:]

with open(target_file, 'w', encoding='utf-8') as f:
    f.write(final_content)

print(f"Successfully replaced Hero section. Start: {start_idx}, End: {end_idx}")
