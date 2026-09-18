# adaptABILITY therapy tools

Small, self-contained web pages used in sessions at adaptABILITY Therapie. Each tool is one HTML file (plus an icon if it has one) that runs entirely in the browser on a clinic tablet. There are no accounts, no server, and no learner data: anything a tool remembers (photos, settings) is stored on the tablet that made it and nowhere else.

This site is separate from the CE provider site and from the practice scheduler on purpose. Nothing here is continuing-education content, and nothing here is a system of record.

## Tools

| Tool | File | What it is |
| --- | --- | --- |
| Pick and Play | `pick-and-play.html`, `pick-and-play-icon.png` | Tablet version of the wall choice board and vertical schedule line. Learner taps activities onto a strip, works through them top to bottom, taps each finished. Edit panel (staff) sets slot count, the "Then" item, adult-selected picks, resequencing, reset, and tile photos. |

## How the site is published

The repo is connected to Netlify. Any push to the main branch publishes within about a minute. There is no build step; Netlify serves the files as they are. The publish directory is the repo root.

Each tool is reached at `https://<site>.netlify.app/<file>.html`. If a tool grows beyond one file, give it a folder with an `index.html` so its address is `/<tool>/`.

## Adding a tool

1. Keep it to one HTML file with its CSS and JavaScript inline. No frameworks, no build tools. External fonts from Google Fonts are fine; everything else should be in the file.
2. Add the document skeleton and the tablet "web app" tags in `<head>` (copy them from `pick-and-play.html`): charset, viewport with `viewport-fit=cover`, `apple-mobile-web-app-capable`, `apple-mobile-web-app-title`, `theme-color`, and an `apple-touch-icon` link to a 180x180 PNG.
3. Do not use `alert()`, `confirm()`, or `prompt()`. Tablets in Guided Access and embedded views block them silently, so buttons appear dead. Use in-page confirmations (a second tap, a small form).
4. If the tool stores anything, use `localStorage` and wrap every read and write in `try/catch`. Never store learner names or session data here.
5. Keep the same teaching rules the tools are built for: the visual controls the behavior, not the adult. No text that tells the learner what to do.
6. Add a row to the table above and push.

## Putting a tool on an iPad

1. Open the tool's address in Safari, then Share, then Add to Home Screen. It opens full-screen from the icon.
2. Settings, Accessibility, Guided Access: on, with a staff passcode. Triple-click the top button on the open tool to lock the iPad to it; triple-click and passcode to exit.
3. Set Auto-Lock to 15 minutes. Turn off notifications on that iPad.
4. Open the tool from its icon and do any one-time setup (for Pick and Play: tap Edit, add photos of real materials, set the Then item). Setup lives on that iPad only, so repeat it per device.

## Updating a tool

Replace the file in the repo and push. Every tablet loads the new version the next time the tool is opened. If a tablet shows an old version, close the tool fully and reopen it from the home screen. Photos and settings stored on the tablet survive updates.

## Owner

Suzanne Ward, BCBA, adaptABILITY Therapie GmbH. Pick and Play was first built in September 2026 from the activity-schedule training project; the training document describes the research base and the procedure the tool follows.
