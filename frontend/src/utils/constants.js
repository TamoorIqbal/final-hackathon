// export const baseUrl = "http://localhost:4000/api/v1";

// export const baseUrl = import.meta.env.PROD
//   ? "https://mern-app-yrcb-asbao8b1q-tamooriqbal37-gmailcom.vercel.app"
//   : "http://localhost:4000/api/v1";

export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "final-hackathon-alpha.vercel.app/api/v1"
    : "http://localhost:4000/api/v1";
