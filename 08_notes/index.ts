import "dotenv/config";
import express from "express";
const app = express();

const port: number = 4000;
const githubApi = {
  login: "mhamzaaamir960",
  id: 137796896,
  node_id: "U_kgDOCDadIA",
  avatar_url: "https://avatars.githubusercontent.com/u/137796896?v=4",
  gravatar_id: "",
  url: "https://api.github.com/users/mhamzaaamir960",
  html_url: "https://github.com/mhamzaaamir960",
  followers_url: "https://api.github.com/users/mhamzaaamir960/followers",
  following_url:
    "https://api.github.com/users/mhamzaaamir960/following{/other_user}",
  gists_url: "https://api.github.com/users/mhamzaaamir960/gists{/gist_id}",
  starred_url:
    "https://api.github.com/users/mhamzaaamir960/starred{/owner}{/repo}",
  subscriptions_url:
    "https://api.github.com/users/mhamzaaamir960/subscriptions",
  organizations_url: "https://api.github.com/users/mhamzaaamir960/orgs",
  repos_url: "https://api.github.com/users/mhamzaaamir960/repos",
  events_url: "https://api.github.com/users/mhamzaaamir960/events{/privacy}",
  received_events_url:
    "https://api.github.com/users/mhamzaaamir960/received_events",
  type: "User",
  site_admin: false,
  name: "Muhammad Hamza Aamir",
  company: "@Panacloud",
  blog: "hamzaaamir.vercel.app",
  location: "Islamabad",
  email: null,
  hireable: true,
  bio: "Modern Frontend Developer | Next.js, React, TypeScript & Tailwind CSS | Restful API Integration",
  twitter_username: null,
  public_repos: 48,
  public_gists: 0,
  followers: 7,
  following: 22,
  created_at: "2023-06-26T13:29:52Z",
  updated_at: "2024-07-28T18:44:36Z",
};

app.listen(process.env.PORT, () => {
  console.log(`App is listening on port: ${process.env.PORT}`);
});

app.get("/", (req: any, res: any) => {
  res.send(process.env.PORT);
});

app.get("/github", (req, res) => {
  res.json(githubApi);
});
