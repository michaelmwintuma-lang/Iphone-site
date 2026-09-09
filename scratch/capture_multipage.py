import asyncio
from playwright.async_api import async_playwright
import os

artifact_dir = r"C:\Users\USER\.gemini\antigravity-ide\brain\e498b4b9-1dd5-4077-82e6-c76ac7eed4e2"

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(viewport={'width': 1366, 'height': 850})
        page = await context.new_page()

        # 1. Home Page
        print("Testing Page 1: Home (/) ...")
        await page.goto("http://localhost:3000/", wait_until="networkidle")
        await asyncio.sleep(1)
        await page.screenshot(path=os.path.join(artifact_dir, "multipage_home.png"))

        # 2. How It Works Page
        print("Testing Page 2: How It Works (/how-it-works) ...")
        await page.click("nav.desktop-nav >> text=How It Works")
        await page.wait_for_url("**/how-it-works")
        await asyncio.sleep(0.8)
        await page.screenshot(path=os.path.join(artifact_dir, "multipage_how_it_works.png"))

        # 3. Price Calculator Page
        print("Testing Page 3: Price Calculator (/calculator) ...")
        await page.click("nav.desktop-nav >> text=Price Calculator")
        await page.wait_for_url("**/calculator")
        await asyncio.sleep(0.8)
        # Click Daily MoMo
        daily_btn = page.locator("button:has-text('Daily MoMo')")
        if await daily_btn.count() > 0:
            await daily_btn.click()
            await asyncio.sleep(0.3)
        await page.screenshot(path=os.path.join(artifact_dir, "multipage_calculator.png"))

        # 4. All iPhones Catalog Page
        print("Testing Page 4: All iPhones (/all-iphones) ...")
        await page.click("nav.desktop-nav >> text=All iPhones")
        await page.wait_for_url("**/all-iphones")
        await asyncio.sleep(0.8)
        await page.screenshot(path=os.path.join(artifact_dir, "multipage_catalog.png"))

        # 5. Trade-In Page
        print("Testing Page 5: Trade-In (/trade-in) ...")
        await page.click("nav.desktop-nav >> text=Trade-In")
        await page.wait_for_url("**/trade-in")
        await asyncio.sleep(0.8)
        await page.screenshot(path=os.path.join(artifact_dir, "multipage_tradein.png"))

        # 6. Questions (FAQ) Page
        print("Testing Page 6: Questions FAQ (/faq) ...")
        await page.click("nav.desktop-nav >> text=Questions (FAQ)")
        await page.wait_for_url("**/faq")
        await asyncio.sleep(0.8)
        await page.screenshot(path=os.path.join(artifact_dir, "multipage_faq.png"))

        # 7. Visit Shop Page
        print("Testing Page 7: Visit Shop (/visit-shop) ...")
        await page.click("nav.desktop-nav >> text=Visit Shop")
        await page.wait_for_url("**/visit-shop")
        await asyncio.sleep(0.8)
        await page.screenshot(path=os.path.join(artifact_dir, "multipage_visit_shop.png"))

        await browser.close()
        print("All 7 pages verified and captured successfully!")

if __name__ == "__main__":
    asyncio.run(main())
