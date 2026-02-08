import re

# Property data
properties = [
    ('01', 'ph-fill ph-buildings', 'Fountain Views', 'Downtown Dubai'),
    ('02', 'ph-fill ph-bed', 'Yotel Hotel', 'Sheikh Zayed Road'),
    ('03', 'ph-fill ph-bed', 'The Rove Hotels', 'Various Locations'),
    ('04', 'ph-fill ph-bed', 'Holiday Inn Express', 'Various Locations'),
    ('05', 'ph-fill ph-building-apartment', 'Burj Vista', 'Downtown Dubai'),
    ('06', 'ph-fill ph-building-apartment', 'Boulevard Crescent', 'Downtown Dubai'),
    ('07', 'ph-fill ph-building-apartment', 'Boulevard Point', 'Downtown Dubai'),
    ('08', 'ph-fill ph-island', 'Shoreline Apartments', 'Palm Jumeirah'),
]

centered_properties = [
    ('09', 'ph-fill ph-tree-palm', 'Mira Oasis', 'Arabian Ranches II'),
    ('10', 'ph-fill ph-house-line', 'Azalea', 'Arabian Ranches II'),
]

# Card template - Subtle number badge
card_template = '''<div class="property-card" style="background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05)); backdrop-filter: blur(10px); border: 2px solid rgba(244, 180, 0, 0.2); border-radius: 16px; padding: 2rem 1.75rem; transition: all 0.3s ease; position: relative; overflow: hidden;">
                    <div style="position: absolute; top: 10px; right: 10px; width: 24px; height: 24px; background: rgba(244, 180, 0, 0.15); border: 1px solid rgba(244, 180, 0, 0.3); border-radius: 6px; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 0.6875rem; color: rgba(244, 180, 0, 0.7);">{num}</div>
                    <div style="position: absolute; bottom: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, #F4B400, #F59E0B); border-radius: 0 0 14px 14px;"></div>
                    <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 0.75rem;">
                        <div style="width: 48px; height: 48px; background: linear-gradient(135deg, rgba(244, 180, 0, 0.2), rgba(244, 180, 0, 0.1)); border-radius: 10px; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 20px rgba(244, 180, 0, 0.2);">
                            <i class="{icon}" style="font-size: 24px; color: #F4B400;"></i>
                        </div>
                        <h3 style="font-size: 1.25rem; font-weight: 700; color: white; margin: 0;">{name}</h3>
                    </div>
                    <p style="color: #9CA3AF; font-size: 0.9375rem; margin: 0;">{location}</p>
                </div>'''

# Generate grid cards
grid_cards = []
for num, icon, name, location in properties:
    card = card_template.format(num=num, icon=icon, name=name, location=location)
    grid_cards.append('                ' + card.strip())

# Generate centered cards with max-width
centered_cards = []
for num, icon, name, location in centered_properties:
    card = card_template.format(num=num, icon=icon, name=name, location=location)
    card = card.replace('position: relative;', 'position: relative; width: 100%; max-width: 310px;')
    centered_cards.append('                ' + card.strip())

# Read index.html
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Find the properties section
start_marker = '            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem;">'
end_marker = '    <style>\n        .property-card:hover'

start = content.find(start_marker)
end = content.find(end_marker)

if start == -1 or end == -1:
    print(f"Error: Could not find markers. Start: {start}, End: {end}")
    exit(1)

# Build new section
new_section = start_marker + '\n'
new_section += '\n'.join(grid_cards)
new_section += '\n            </div>\n\n'
new_section += '            <!-- Last 2 cards centered -->\n'
new_section += '            <div style="display: flex; justify-content: center; gap: 1.5rem; margin-top: 1.5rem; max-width: 640px; margin-left: auto; margin-right: auto;">\n'
new_section += '\n'.join(centered_cards)
new_section += '\n            </div>\n        </div>\n    </section>\n    '

# Replace
result = content[:start] + new_section + content[end:]

# Write back
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(result)

print('Successfully updated property cards with subtle number badges!')
