"""
Builds every logo/icon asset the site uses from the two source files in pics/.

    python scripts/brand_assets.py      (needs Pillow: pip install pillow)

Outputs
  app/favicon.ico, app/icon.png, app/apple-icon.png   browser tab + home-screen icons
  public/brand/cw-mark.png                            square mark (letters filled white)
  public/brand/logo-square.png                        mark on white, for JSON-LD / manifest
  public/brand/logo-horizontal.png                    mark + navy wordmark (light surfaces)
  public/brand/logo-horizontal-light.png              mark + light wordmark (dark surfaces)
  public/brand/logo-nav.webp, logo-nav-light.webp     small files served in the nav/footer
  public/brand/logo-full.png                          full lockup incl. "DIGITAL SOLUTIONS"
  public/brand/og-image.png                           1200x630 social share image
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
MARK_SRC = ROOT / "pics" / "ChatGPT Image Feb 16, 2026, 02_34_45 PM.png"
LOCKUP_SRC = ROOT / "pics" / "ChatGPT Image Feb 16, 2026, 02_36_05 PM (1).png"
BRAND = ROOT / "public" / "brand"
APP = ROOT / "app"

LIGHT_TEXT = (234, 241, 242)  # --deep-fg
PAGE_BG = (244, 246, 247)  # --bg (light)

# Regions inside the lockup source (measured from its alpha channel)
WORDMARK_BOX = (516, 398, 1290, 487)  # "CodeWaveTech"
FULL_BOX = (255, 360, 1291, 579)  # mark + wordmark + tagline


def fill_letters_white(mark: Image.Image) -> Image.Image:
    """The source mark has transparent letter cut-outs; back them with white."""
    a = mark.getchannel("A").point(lambda v: 255 if v >= 128 else 0)
    ImageDraw.floodfill(a, (0, 0), 128)  # mark everything reachable from outside
    inside = a.point(lambda v: 0 if v == 128 else 255).filter(ImageFilter.MinFilter(7))
    base = Image.new("RGBA", mark.size, (255, 255, 255, 0))
    base.putalpha(inside)
    base.alpha_composite(mark)
    return base


def trim(im: Image.Image) -> Image.Image:
    return im.crop(im.getchannel("A").point(lambda v: 255 if v > 8 else 0).getbbox())


def square(im: Image.Image, size: int, pad: float = 0.0, bg=(0, 0, 0, 0)) -> Image.Image:
    canvas = Image.new("RGBA", (size, size), bg)
    inner = int(size * (1 - 2 * pad))
    w, h = im.size
    scale = inner / max(w, h)
    r = im.resize((max(1, round(w * scale)), max(1, round(h * scale))), Image.LANCZOS)
    canvas.alpha_composite(r, ((size - r.width) // 2, (size - r.height) // 2))
    return canvas


def recolor_dark_text(im: Image.Image, rgb) -> Image.Image:
    """Turns the navy letters (and their anti-aliased edges) light; the gold 'Tech' is kept."""
    px = im.load()
    out = im.copy()
    po = out.load()
    for y in range(im.height):
        for x in range(im.width):
            r, g, b, a = px[x, y]
            if a and not (r > b + 60):  # anything that isn't the gold "Tech"
                po[x, y] = (*rgb, a)
    return out


def horizontal(mark: Image.Image, wordmark: Image.Image) -> Image.Image:
    """Mark : wordmark height ratio matches the nav's 34px mark next to ~20px text."""
    text_h = wordmark.height
    mark_h = round(text_h * 34 / 20)
    m = mark.resize((round(mark.width * mark_h / mark.height), mark_h), Image.LANCZOS)
    gap = round(mark_h * 0.3)
    canvas = Image.new("RGBA", (m.width + gap + wordmark.width, mark_h), (0, 0, 0, 0))
    canvas.alpha_composite(m, (0, 0))
    canvas.alpha_composite(wordmark, (m.width + gap, (mark_h - text_h) // 2))
    return canvas


def main():
    BRAND.mkdir(parents=True, exist_ok=True)
    mark = trim(fill_letters_white(Image.open(MARK_SRC).convert("RGBA")))
    lockup = Image.open(LOCKUP_SRC).convert("RGBA")
    wordmark = trim(lockup.crop(WORDMARK_BOX))

    mark.save(BRAND / "cw-mark.png", optimize=True)
    square(mark, 256, 0.08, (255, 255, 255, 255)).convert("RGB").save(
        BRAND / "logo-square.png", optimize=True
    )

    logo = horizontal(mark, wordmark)
    logo_light = horizontal(mark, recolor_dark_text(wordmark, LIGHT_TEXT))
    logo.save(BRAND / "logo-horizontal.png", optimize=True)
    logo_light.save(BRAND / "logo-horizontal-light.png", optimize=True)
    # Small files actually served in the nav and footer (2x of the 36px display height)
    nav_size = (round(72 * logo.width / logo.height), 72)
    logo.resize(nav_size, Image.LANCZOS).save(BRAND / "logo-nav.webp", quality=88, method=6)
    logo_light.resize(nav_size, Image.LANCZOS).save(BRAND / "logo-nav-light.webp", quality=88, method=6)

    full = trim(lockup.crop(FULL_BOX))
    full_mark = mark.resize((round(mark.width * full.height / mark.height), full.height), Image.LANCZOS)
    full.alpha_composite(full_mark, (0, 0))  # replace glow-mark with the clean, white-letter mark
    full.save(BRAND / "logo-full.png", optimize=True)

    og = Image.new("RGBA", (1200, 630), (*PAGE_BG, 255))
    f = full.resize((960, round(full.height * 960 / full.width)), Image.LANCZOS)
    og.alpha_composite(f, ((1200 - f.width) // 2, (630 - f.height) // 2))
    og.convert("RGB").save(BRAND / "og-image.png", optimize=True)

    # Browser tab + home screen
    square(mark, 256, 0.02).save(APP / "icon.png", optimize=True)
    square(mark, 180, 0.1, (255, 255, 255, 255)).convert("RGB").save(APP / "apple-icon.png", optimize=True)
    square(mark, 64, 0.0).save(APP / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])

    for p in sorted(BRAND.iterdir()):
        print(p.relative_to(ROOT), Image.open(p).size)


if __name__ == "__main__":
    main()
