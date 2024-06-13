export const secretEmail = (email) => {
  const [username, domain] = email.split("@");

  const screenName = username.substring(0, 1) + "*".repeat(username.length - 1);

  return `${screenName}@${domain}`;
};
//above
// dj@Gmail.com ===>  d*@Gmail.com

export const readTime = (desc) => {
  const averageReading = 225;

  const div = document.createElement("div");
  div.innerHTML = desc._html;
  const textContent= div.textContent || div.innerHTML;
  console.log(textContent);
  const words = textContent.trim().split(/\s+/);
  return Math.ceil(words.length/averageReading)
};
