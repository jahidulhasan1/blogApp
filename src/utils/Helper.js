export const secretEmail = (email)=>{
  const [username, domain] = email.split("@");

  const screenName = username.substring(0, 1) + "*".repeat(username.length - 1);

  return `${screenName}@${domain}`;
}; 
// dj@Gmail.com ===>  d*@Gmail.com
