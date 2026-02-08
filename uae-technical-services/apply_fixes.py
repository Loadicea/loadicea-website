import re

# Read the file
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove back-to-top button (search for it in footer area)
content = re.sub(
    r'<a[^>]*back-to-top[^>]*>.*?</a>',
    '',
    content,
    flags=re.DOTALL | re.IGNORECASE
)

# 2. Make Industries section more compact - reduce padding
content = re.sub(
    r'(<!-- Industries Served - Enhanced -->.*?<section class="section"\s*style="[^"]*)"',
    r'\1; padding: 3rem 0;"',
    content,
    flags=re.DOTALL
)

# Reduce industry card padding
content = re.sub(
    r'(class="industry-card-enhanced"\s*style="[^"]*padding:) 2rem 1\.5rem',
    r'\1 1.5rem 1.25rem',
    content
)

# 3. Change Process section to navy background and make it compact horizontal layout
# Find the Process section and change its background
content = re.sub(
    r'(<!-- How We Work - Enhanced Process Timeline -->.*?<section class="section"\s*style=")background: linear-gradient\(180deg, #FFFFFF 0%, #F9FAFB 100%\)',
    r'\1background: linear-gradient(135deg, #0A192F 0%, #1E3A5F 100%)',
    content,
    flags=re.DOTALL
)

# Write the updated content
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Changes applied:")
print("1. Removed back-to-top button")
print("2. Made Industries section more compact (reduced padding)")
print("3. Changed Process section to navy background")
print("\nColor flow is now: Navy -> White -> Navy -> White -> Navy -> White -> Navy -> Navy (CTA)")
