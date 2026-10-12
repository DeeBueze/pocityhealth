/* ==========================================================================
   PO-City site content
   --------------------------------------------------------------------------
   This is the one place to edit the contact email and the team.
   Save the file and redeploy. No other code needs to change.

   EMAIL
     Replace "[EMAIL]" with the real address, for example "hello@po-city.com".
     Every "Email PO-City" button on the site uses this value.

   TEAM
     name   Full name, shown on the card and in the download dialog.
     role   Short role, shown under the name.
     cv     Path to the PDF in the /cvs folder, for example "/cvs/bueze-oriaku.pdf".
            Leave it as "" if the CV is not ready. The dialog will then say
            "The CV of [Name] is coming soon." and disable the download button.
     photo  Path to a square portrait in the /images folder, for example
            "/images/team-bueze-oriaku.jpg". Leave it as "" to show a placeholder.
   ========================================================================== */

window.POCITY = {
  email: "[EMAIL]",

  team: [
    {
      name: "Bueze Oriaku",
      role: "CEO and hardware",
      cv: "/cvs/bueze-oriaku.pdf",
      photo: ""
    },
    {
      name: "Mayowa Titilola",
      role: "[ROLE]",
      cv: "/cvs/mayowa-titilola.pdf",
      photo: ""
    },
    {
      name: "Emeka Odiwe",
      role: "[ROLE]",
      cv: "/cvs/emeka-odiwe.pdf",
      photo: ""
    },
    {
      name: "Zainab Adebayo",
      role: "[ROLE]",
      cv: "/cvs/zainab-adebayo.pdf",
      photo: ""
    }
  ]
};
