import axios from "axios";

const Feedurl = "http://i6a601.p.ssafy.io:8080/feed";
const placeHolderurl = "http://i6a601.p.ssafy.io:8080/feed";
export const GetFeedState = (token: string | null) => {
  return axios({
    method: "GET",
    url: Feedurl,
    headers: { Authorization: "Bearer " + token },
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
