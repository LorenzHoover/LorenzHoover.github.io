# How to update the Black Dome website

This guide is for changing the **address, phone number, email, opening hours,
or the announcement bar** at the top of the site.

You do not need to know any programming. You only ever edit **one file**, and
that file is mostly plain English with quote marks around it.

---

## The one file you edit

Everything lives in a file called **`site-content.js`**.

Change it once, and the new information appears on **every page** of the
website automatically. You never have to hunt through the site looking for
the old address in six different places.

---

## Making a change (about five minutes)

1. Go to **https://github.com/LorenzHoover/blackdome** and sign in.
2. In the list of files, click **`site-content.js`**.
3. Click the **pencil icon** near the top right. This turns the page into an
   editor.
4. Change the words **between the quote marks**. Nothing else.
5. Scroll to the bottom, type a short note about what you changed
   (for example, "new Sunday hours"), and click the green
   **Commit changes** button.
6. Wait about two minutes, then check www.blackdome.com. Refresh the page if
   you still see the old information.

That's it. There is no separate "publish" step.

---

## The three rules

1. **Only change the words between the "quote marks".**
2. **Keep the quote marks and the comma at the end of the line.**
3. **Never delete a whole line.** If something should be blank, leave the two
   quote marks with nothing between them, like this: `""`

Here is what a change looks like:

```
    phone: "+1 (828) 251-2001",        <-- before
    phone: "+1 (828) 555-1234",        <-- after
```

The comma at the end stays. The quote marks stay. Only the phone number changed.

---

## Turning the opening hours on

Right now the hours are **hidden from the public**, because nobody had
confirmed the Monday-to-Saturday times. This is deliberate: it is much better
for a customer to see no hours than to drive across town on wrong hours.

To switch them on:

1. Open `site-content.js` as described above.
2. Find the seven lines that look like this:

```
    { day: "Monday",    time: "NEEDS CONFIRMING" },
```

3. Replace `NEEDS CONFIRMING` with the real hours, written exactly how you
   want a customer to read them, for example `10:00 AM - 6:00 PM`.
   If you are closed that day, just write `Closed`.
4. A little further down, find this line:

```
    showHours: false,
```

5. Change the word `false` to `true`.
6. Commit the change as described above.

The hours will now appear on the Contact page and at the bottom of every page.

If you ever want to hide them again, change `true` back to `false`.

---

## The announcement bar

The dark bar across the top of every page is controlled by these two lines:

```
    bannerText: "We have moved! Find us at 12 Old Charlotte Hwy, Ste 85, ...",
    showBanner: true,
```

Change the text to say whatever you like. When the move is old news and you
want the bar gone, change `showBanner: true` to `showBanner: false`.

---

## If you move again

Change these two lines and **the map on the Contact page moves with you
automatically**. You do not need to touch the map:

```
    addressLine1: "12 Old Charlotte Hwy Ste 85",
    addressLine2: "Asheville, NC 28803",
```

---

## Two things this website cannot do for you

**1. Google.** Most people who want to know where you are and whether you are
open will see Google's answer, not your website. Google keeps its own record.
Search for "Black Dome Mountain Sports", click **Own this business?** or sign
in to Google Business Profile, and update the address and hours there too.
You can do this from a phone. It matters more than the website does.

**2. Facebook and Instagram.** Those also carry the old address until somebody
changes them.

---

## If something looks broken

Nothing you type in this file can permanently break the website. Every change
is saved as a numbered version, and any previous version can be restored.

If a page looks wrong after an edit, the usual cause is a missing quote mark
or a missing comma. Compare your line against the ones around it — they should
all have the same punctuation.
