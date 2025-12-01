import "../style/index.css";

/**
 *  EDIT ONLY INSIDE THIS RENDER FUNCTION
 *  This function is called every time the user changes types or changes any input
 * 
    {
        includeCover: true, // if includeCover is true the algorithm should show the cover image
        background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da", // this is the image's url that will be used as a background for the profile cover
        avatarURL: "https://randomuser.me/api/portraits/women/42.jpg", // this is the url for the profile avatar
        socialMediaPosition: "position-right", // social media bar position (position-left or position-right)
        //for social media links, only update usernames
        twitter: null, // social media usernames
        github: null,
        linkedin: null,
        instagram: null,

        name: null,
        lastName: null,
        role: null,
        country: null,
        city: null
    }
 */
function render(variables = {}) {
  console.log("These are the current variables: ", variables); // print on the console
  // here we ask the logical questions to make decisions on how to build the html
  // if includeCover==false then we reset the cover code without the <img> tag to make the cover transparent.
  let cover = `<div class="cover"><img src="${variables.background}" /></div>`;
  if (variables.includeCover == false) cover = "<div class='cover'></div>";

  // Name
  let nameHTML = "";
  if (variables.name || variables.lastName) {
    const fullName = `${variables.name || ""} ${variables.lastName ||
      ""}`.trim();
    nameHTML = `<h1>${fullName}</h1>`;
  }

  // Role
  let roleHTML = "";
  if (variables.role) {
    roleHTML = `<h2>${variables.role}</h2>`;
  }

  // Location
  let locationHTML = "";
  if (variables.city || variables.country) {
    const location = [variables.city, variables.country]
      .filter(Boolean)
      .join(", ");
    locationHTML = `<h3>${location}</h3>`;
  }

  // Social media
  let socialHTML = "";
  const socialMedia = [
    { platform: "twitter", username: variables.twitter },
    { platform: "github", username: variables.github },
    { platform: "linkedin", username: variables.linkedin },
    { platform: "instagram", username: variables.instagram }
  ].filter(social => social.username !== null && social.username !== "");

  if (socialMedia.length > 0) {
    let socialLinks = "";
    socialMedia.forEach(social => {
      socialLinks += `<li><a href="https://${social.platform}.com/${social.username}" target="_blank"><i class="fab fa-${social.platform}"></i></a></li>`;
    });
    socialHTML = `<ul class="${variables.socialMediaPosition}">${socialLinks}</ul>`;
  }

  // reset the website body with the new html output
  document.querySelector("#widget_content").innerHTML = `<div class="widget">
            ${cover}
            <img src="${variables.avatarURL}" class="photo" />
            ${nameHTML}
            ${roleHTML}
            ${locationHTML}
            ${socialHTML}
        </div>
    `;
}

/**
 * Don't change any of the lines below, here is where we do the logic for the dropdowns
 */
window.onload = function() {
  window.variables = {
    // if includeCover is true the algorithm should show the cover image
    includeCover: true,
    // this is the image's url that will be used as a background for the profile cover
    background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da",
    // this is the url for the profile avatar
    avatarURL: "https://randomuser.me/api/portraits/women/42.jpg",
    // social media bar position (position-left or position-right)
    socialMediaPosition: "position-right",
    // social media usernames
    twitter: null,
    github: null,
    linkedin: null,
    instagram: null,
    name: null,
    lastName: null,
    role: null,
    country: null,
    city: null
  };
  render(window.variables); // render the card for the first time

  document.querySelectorAll(".picker").forEach(function(elm) {
    elm.addEventListener("change", function(e) {
      // <- add a listener to every input
      const attribute = e.target.getAttribute("for"); // when any input changes, collect the value
      let values = {};
      values[attribute] =
        this.value == "" || this.value == "null"
          ? null
          : this.value == "true"
          ? true
          : this.value == "false"
          ? false
          : this.value;
      render(Object.assign(window.variables, values)); // render again the card with new values
    });
  });
};
