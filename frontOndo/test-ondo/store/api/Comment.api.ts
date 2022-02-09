import axios from "axios";

const challengeURL = process.env.BACK_EC2 + "/challenge";
const placeHolderurl = process.env.BACK_EC2 + "/feed";
const CommentApi = (token: any) => {
  return axios({
    method: "GET",
    url: challengeURL,
    headers: { Authorization: "Bearer " + token },
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
export default CommentApi;
