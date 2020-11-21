import dotenv from "dotenv";

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

export default {
  mongo: {
    url: process.env.MONGO_URL,
  },
};
