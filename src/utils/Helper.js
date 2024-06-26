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
  const textContent = div.textContent || div.innerHTML;
  const words = textContent.trim().split(/\s+/);
  return Math.ceil(words.length / averageReading);
};

export const formateNum = (num) => {
  if (num >= 1e9) {
    return (num / 1e9).toFixed(1) + "B";
  } else if (num >= 1e6) {
    return (num / 1e6).toFixed(1) + "M";
  } else if (num >= 1e3) {
    return (num / 1e3).toFixed(1) + "K";
  } else {
    return num.toString();
  }
};
