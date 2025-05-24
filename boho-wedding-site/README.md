# Boho Wedding Site

A beautiful boho-style wedding website with a password-protected entrance screen, Save the Date information, RSVP link, Spotify playlist integration, dress code information, and a couple's story section.

## Features

- Password-protected entrance
- Responsive design for all devices
- Smooth scrolling navigation menu
- Save the Date with time, date, and venue information
- RSVP link to external site
- Spotify playlist song request feature
- Dress code section with color palette
- Bilingual content (English and Hebrew)
- Our Story section with couple photo

## Customizing the Background Image

The site is set up to use a background image of you as a couple. To replace the placeholder image with your own:

1. **To replace the couple photo:**
   - Simply replace the file at `/public/images/uploads/couple.jpg` with your own photo
   - The image should be high quality (recommended at least 1920px wide)
   - The site is already set up to display your image without any overlay

## Customization

### Password
You can change the password in `src/app/page.tsx` by updating the `PASSWORD` constant:

```javascript
const PASSWORD = "your-new-password";
```

### Wedding Details
Update the wedding details in `src/app/wedding/page.tsx`:

- Names: Look for `<h2>Maya & Ilay</h2>` and update as needed
- Date and Time: Find the section with `<h3>When</h3>` and update
- Location: Find the section with `<h3>Where</h3>` and update
- Parents' names: Find the parents' section and update

### Colors
The site uses Tailwind CSS for styling. The primary colors are:
- Light blue: `text-sky-300`, `text-sky-400`
- White: `text-white`
- Semi-transparent black backgrounds: `bg-black/50`

To change colors, search for these classes in the code and replace them with your preferred Tailwind color classes.

### Fonts
The site uses several fonts:
- Great Vibes: Cursive font for decorative headings
- Cormorant Garamond: Elegant serif for main headings
- Montserrat: Clean sans-serif for English text
- Heebo: Modern Hebrew font
- Amatic SC: For stylized Hebrew titles

## Development

This project uses:
- Next.js 14 with React
- TypeScript
- Tailwind CSS
- Shadcn UI components
- Bun as package manager

### Commands

```bash
# Install dependencies
bun install

# Run development server
bun run dev

# Build for production
bun run build

# Start production server
bun run start
```

## License

All rights reserved. This project and its contents are not free to use without permission.
