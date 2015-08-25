#Panel View for Keep

Panelized extension for Google's note-taking service Keep.

After you download the zip, extract it to the folder location of your choice on your hard drive.
In Chrome, click the menu button > Tools > Extensions. In the top right corner, make sure "Developer mode" is checked. Click the "Load unpacked extension" button. Navigate to the extension's folder, click it to select it, and click OK.
That should do it; the Keep icon should appear next to the URL bar. Right click the icon for settings, etc. etc.
Enjoy!

##Installation

There are couple different ways to install.

###Chrome Web Store

The extension can be found on the [Chrome Web Store](https://chrome.google.com/webstore/detail/panel-view-for-keep/jccocffecajimkdjgfpjhlpiimcnadhb). Click the "Free" button in the upper right. It's that easy!

###Manual Installation

You can download the latest from Github. Follow these steps to activate Panel View for Keep:

1. Download the [latest release](https://github.com/peiche/PanelViewKeep/releases).
2. Extract to the folder location of your choice.
3. In Chrome, navigate to [chrome://extensions](chrome://extensions). (Alternatively, click the menu button > More tools > Extensions.)
4. In the top right corner, make sure "Developer mode" is checked.
5. Click the **Load unpacked extension** button. Navigate to the extension's folder, click it to select it, and click OK.

##Building

So you want to build the project yourself. Great! Please follow [these directions](building.md).

##FAQ

1. **I don't get it. This just opens Google Keep in a new tab.**

   Not so! This extension serves as a shortcut to [keep.google.com](http://keep.google.com), but also much more. You'll find at the bottom of Keep's sidebar (click the hamburger icon (☰) to open it), a new link entitled "Send to Panel." Click that and you're on your way.

2. **When I click "Send to Panel," it opens a popup window, not a panel.**

   Unfortunately, Chrome disables the panel API by default. To override this, you'll need to enable it in [chrome:flags](chrome://flags/#enable-panels) and restart Chrome. Now you're ready to use panels.

3. **Why can't I upload an image when Keep is in panel view?**

   This is a known bug with panels. Read more about this issue on [crbug.com](https://code.google.com/p/chromium/issues/detail?id=463367&q=panel%20upload&colspec=ID%20Pri%20M%20Stars%20ReleaseBlock%20Cr%20Status%20Owner%20Summary%20OS%20Modified).

##Contribute

If you see something wrong, or you want to improve on what I've got here, feel free to submit an issue or create a pull request.

##Changelog

3.0
- Complete rewrite of the override stylesheet!
  - Moved the "Add note" area to the bottom of the panel, to match the Android app. It creates a new note in full-screen, again just like the Android app.
  - Modified the [toast](https://www.google.com/design/spec/components/snackbars-toasts.html) to match the Android app.
  - Fixed Share Note screen in the panel.
- The panel view now persists across sessions.
- Fixed bug where Keep in a tab [would not close when switching to a panel](http://eichefam.net/2015/08/24/on-tab-detachment-and-reattachment/).
- Fixed console errors due to invalid window and tab IDs.

2.8.2
- Fixed bug where reminders were not visible in single note view.

2.8.1
- Fixed bug where checklist notes without a title were being hidden in the collapsed list view.

2.8
- Reverted to default list view.
- Added an option (below "Send to Tab") to enable collapsed list view.
- Added the "storage" permission so the extension remembers the option.
- Cleaned up source styles.

2.7.1
- Changed list view to show collapsed notes.

2.6
- Updated individual note view to take up the full height of the window (only for small window sizes).
- Fixed typos in readme and building docs.

2.5
- Fixed CSS bug when the Share button on a note is clicked without first opening the note.
- Fixed toolbar icon. The 2.4 update had the wrong icon by accident.
- Added keep-sharing.google.com to permissions.

2.4
- Cleaned up remaining unused options dialog code.

2.3
- No longer opens existing tab ID if the tab is not on Keep anymore.

2.2
- Removed permissions for storage and context menus, and associated scripts.
- Removed options, because the only option was to enable context menus, which are now removed.
- Removed storage for whether to open in tab or panel. By default, Panel View will now always open in a tab, in a new browser session.

2.1
- Added keep.google.com to the list of permissions. (keep.google.com previously redirected to drive.google.com/keep, but it doesn't.)

2.0
- Changes to reflect Google's updated look for the Keep website.

1.8
- Fixed some wonky styling. Yes, "wonky" is a word, because I said so.

1.7
- Added a "Send to" icon on the rightmost side of the black bar, which enables easy switching between tab and panel.
- User account switching!
- Options page moved to an in-window dialog. The only option for now is the context menu toggle. The extension itself will remember in which view you last opened Keep.

##License

Panel View for Keep is [GPL v2.0 or later](LICENSE.txt).

All other resources are licensed as follows:

* jQuery - MIT - https://jquery.org/license/
