/* ============================================================================

   BLACK DOME MOUNTAIN SPORTS — WEBSITE INFORMATION

   THIS IS THE ONLY FILE YOU NEED TO EDIT to change the store address,
   phone number, email, or opening hours.

   Whatever you type between the "quote marks" below will appear on every
   page of the website automatically. You do not need to touch any other file.

   THREE RULES:
     1. Only change the words between the "quote marks".
     2. Always keep the quote marks and the comma at the end of the line.
     3. Do not delete any line. If something should be blank, use ""

   Example — changing the phone number:
        phone: "+1 (828) 251-2001",          <-- before
        phone: "+1 (828) 555-1234",          <-- after

   ============================================================================ */

var BLACK_DOME = {

  /* --- STORE ADDRESS ------------------------------------------------------
     Street address on the first line, then city/state/ZIP on the second. */

  addressLine1: "12 Old Charlotte Hwy Ste 85",
  addressLine2: "Asheville, NC 28803",

  /* A short note shown under the address. Use "" for none. */
  addressNote: "Located in the Highland Brewing complex",

  /* The map on the Contact page. This is a special web address from Google
     Maps, not something you should type by hand.
     To get a new one if the store ever moves again:
       1. Go to Google Maps and search the new address.
       2. Click Share > Embed a map > COPY HTML.
       3. Paste the whole thing below, then find the part that starts with
          src=" and ends with the next " -- copy ONLY the text between
          those quote marks in below, replacing what is there now. */
  mapEmbedSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3245.267262138902!2d-82.5015146241219!3d35.57179467262278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8859f3bfc604ad0b%3A0x82b6c39ab02e1676!2s12%20Old%20Charlotte%20Hwy%20%2385%2C%20Asheville%2C%20NC%2028803!5e0!3m2!1sen!2sus!4v1785970638760!5m2!1sen!2sus",


  /* --- CONTACT ------------------------------------------------------------ */


  email: "info@blackdome.com",


  /* --- OPENING HOURS ------------------------------------------------------
     Type the hours exactly as you want customers to read them.
     If the store is closed that day, type: Closed                            */

  hours: [
    { day: "Monday",    time: "11:00 AM - 6:00 PM" },
    { day: "Tuesday",   time: "11:00 AM - 6:00 PM" },
    { day: "Wednesday", time: "11:00 AM - 6:00 PM" },
    { day: "Thursday",  time: "11:00 AM - 6:00 PM" },
    { day: "Friday",    time: "11:00 AM - 6:00 PM" },
    { day: "Saturday",  time: "10:00 AM - 5:00 PM" },
    { day: "Sunday",    time: "1:00 PM - 5:00 PM" }
  ],

  /* SAFETY SWITCH.
     While this says false, the hours are HIDDEN from the website, so no
     customer ever sees wrong hours. Once the seven lines above are correct,
     change the word false to true and the hours will appear.               */

  showHours: true,


  /* --- A SHORT MESSAGE AT THE TOP OF EVERY PAGE ---------------------------
     Good for temporary news, e.g. "Now open in our new location!"
     Set showBanner to false to hide it.                                    */

  bannerText: "We have moved! Find us at 12 Old Charlotte Hwy, Ste 85, in the Highland Brewing complex.",
  showBanner: true,


  /* --- THE YEAR THE STORE OPENED ------------------------------------------
     Used to say "serving customers for XX years" so it is never out of date. */

  foundedYear: 1984

};
