import re

# Read the file
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Fix Process section text colors - change dark text to white for navy background
# Fix the badge color
content = re.sub(
    r'(<!-- How We Work.*?<div\s*style="[^"]*background: linear-gradient\(135deg, rgba\(10, 25, 47, 0\.08\), rgba\(10, 25, 47, 0\.04\)\); border: 2px solid #0A192F; color:) #0A192F',
    r'\1 #F4B400',
    content,
    flags=re.DOTALL
)

# Fix the h2 title color
content = re.sub(
    r'(<h2 style="font-size: 2\.75rem; font-weight: 800; color:) #0A192F(; margin-bottom: 1rem;">Our Process</h2>)',
    r'\1 white\2',
    content
)

# Fix the subtitle color
content = re.sub(
    r'(<p style="color:) #6B7280(; font-size: 1\.25rem; max-width: 700px; margin: 0 auto;">A systematic approach)',
    r'\1 #D1D5DB\2',
    content
)

# 2. Replace the vertical timeline with a compact 2x2 grid layout
old_process_content = r'<div style="position: relative; max-width: 900px; margin: 0 auto;">.*?</div>\s*</div>\s*</section>'

new_process_content = '''<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; max-width: 1000px; margin: 0 auto;">
                <!-- Step 1: Check -->
                <div class="process-card" style="background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(10px); border: 2px solid rgba(255, 255, 255, 0.1); border-radius: 20px; padding: 2.5rem 2rem; transition: all 0.4s ease; position: relative; overflow: hidden;">
                    <div style="position: absolute; top: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, #F4B400, #F59E0B);"></div>
                    <div style="display: flex; align-items: center; gap: 1.5rem; margin-bottom: 1.5rem;">
                        <div style="width: 64px; height: 64px; background: linear-gradient(135deg, #F4B400, #F59E0B); border-radius: 16px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 8px 24px rgba(244, 180, 0, 0.3);">
                            <i class="ph-fill ph-clipboard-text" style="font-size: 32px; color: white;"></i>
                        </div>
                        <div>
                            <div style="display: inline-block; background: rgba(244, 180, 0, 0.15); color: #F4B400; padding: 0.25rem 0.75rem; border-radius: 50px; font-size: 0.75rem; font-weight: 700; margin-bottom: 0.5rem;">STEP 1</div>
                            <h3 style="font-size: 1.5rem; font-weight: 700; color: white; margin: 0;">Check</h3>
                        </div>
                    </div>
                    <p style="color: #D1D5DB; line-height: 1.7; margin: 0;">Complete check of your solar and building assets to see how things are working.</p>
                </div>

                <!-- Step 2: Plan -->
                <div class="process-card" style="background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(10px); border: 2px solid rgba(255, 255, 255, 0.1); border-radius: 20px; padding: 2.5rem 2rem; transition: all 0.4s ease; position: relative; overflow: hidden;">
                    <div style="position: absolute; top: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, #3B82F6, #2563EB);"></div>
                    <div style="display: flex; align-items: center; gap: 1.5rem; margin-bottom: 1.5rem;">
                        <div style="width: 64px; height: 64px; background: linear-gradient(135deg, #3B82F6, #2563EB); border-radius: 16px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 8px 24px rgba(59, 130, 246, 0.3);">
                            <i class="ph-fill ph-strategy" style="font-size: 32px; color: white;"></i>
                        </div>
                        <div>
                            <div style="display: inline-block; background: rgba(59, 130, 246, 0.15); color: #3B82F6; padding: 0.25rem 0.75rem; border-radius: 50px; font-size: 0.75rem; font-weight: 700; margin-bottom: 0.5rem;">STEP 2</div>
                            <h3 style="font-size: 1.5rem; font-weight: 700; color: white; margin: 0;">Plan</h3>
                        </div>
                    </div>
                    <p style="color: #D1D5DB; line-height: 1.7; margin: 0;">We create a custom Regular Maintenance schedule following best standards.</p>
                </div>

                <!-- Step 3: Fix & Maintain -->
                <div class="process-card" style="background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(10px); border: 2px solid rgba(255, 255, 255, 0.1); border-radius: 20px; padding: 2.5rem 2rem; transition: all 0.4s ease; position: relative; overflow: hidden;">
                    <div style="position: absolute; top: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, #10B981, #059669);"></div>
                    <div style="display: flex; align-items: center; gap: 1.5rem; margin-bottom: 1.5rem;">
                        <div style="width: 64px; height: 64px; background: linear-gradient(135deg, #10B981, #059669); border-radius: 16px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 8px 24px rgba(16, 185, 129, 0.3);">
                            <i class="ph-fill ph-gear" style="font-size: 32px; color: white;"></i>
                        </div>
                        <div>
                            <div style="display: inline-block; background: rgba(16, 185, 129, 0.15); color: #10B981; padding: 0.25rem 0.75rem; border-radius: 50px; font-size: 0.75rem; font-weight: 700; margin-bottom: 0.5rem;">STEP 3</div>
                            <h3 style="font-size: 1.5rem; font-weight: 700; color: white; margin: 0;">Fix & Maintain</h3>
                        </div>
                    </div>
                    <p style="color: #D1D5DB; line-height: 1.7; margin: 0;">Specialized teams perform scheduled work + provide 24/7 emergency help.</p>
                </div>

                <!-- Step 4: Report -->
                <div class="process-card" style="background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(10px); border: 2px solid rgba(255, 255, 255, 0.1); border-radius: 20px; padding: 2.5rem 2rem; transition: all 0.4s ease; position: relative; overflow: hidden;">
                    <div style="position: absolute; top: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, #8B5CF6, #7C3AED);"></div>
                    <div style="display: flex; align-items: center; gap: 1.5rem; margin-bottom: 1.5rem;">
                        <div style="width: 64px; height: 64px; background: linear-gradient(135deg, #8B5CF6, #7C3AED); border-radius: 16px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 8px 24px rgba(139, 92, 246, 0.3);">
                            <i class="ph-fill ph-chart-line-up" style="font-size: 32px; color: white;"></i>
                        </div>
                        <div>
                            <div style="display: inline-block; background: rgba(139, 92, 246, 0.15); color: #8B5CF6; padding: 0.25rem 0.75rem; border-radius: 50px; font-size: 0.75rem; font-weight: 700; margin-bottom: 0.5rem;">STEP 4</div>
                            <h3 style="font-size: 1.5rem; font-weight: 700; color: white; margin: 0;">Report</h3>
                        </div>
                    </div>
                    <p style="color: #D1D5DB; line-height: 1.7; margin: 0;">Detailed reporting with condition reports, repair history, and performance data.</p>
                </div>
            </div>
        </div>
    </section>
    <style>
        .process-card:hover {
            transform: translateY(-8px);
            border-color: #F4B400 !important;
            box-shadow: 0 16px 40px rgba(244, 180, 0, 0.2);
        }
    </style>'''

content = re.sub(old_process_content, new_process_content, content, flags=re.DOTALL)

# Remove the old process-step hover styles since we're using new process-card class
content = re.sub(
    r'<style>\s*\.process-step>div:first-child>div:hover,\s*\.process-step>div:last-child>div:hover \{[^}]+\}\s*</style>',
    '',
    content,
    flags=re.DOTALL
)

# Write the updated content
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Process section improvements applied:")
print("1. Fixed text colors (white text on navy background)")
print("2. Replaced vertical timeline with compact 2x2 grid")
print("3. Added colorful step badges and icons")
print("4. Reduced section height significantly")
print("5. Added glassmorphism cards with hover effects")
