export const generateSocialLoginUrl = (
  provider: "facebook" | "google",
  stateCode: string
) => {
  if (provider === "facebook") {
    return `${import.meta.env.VITE_REACT_APP_FACEBOOK_LOGIN_URL}?client_id=${
      import.meta.env.VITE_REACT_APP_FACEBOOK_CLIENT_ID
    }&redirect_uri=${location.href}&state=${stateCode}`;
  } else {
    return `${import.meta.env.VITE_REACT_APP_GOOGLE_LOGIN_URL}&client_id=${
      import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID
    }&scope=openid email profile&redirect_uri=http://localhost:5173/login/client&state=${stateCode}`;
  }
};
