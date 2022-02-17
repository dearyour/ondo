import axios from "axios";

const Feedurl = process.env.BACK_EC2 + "/feed";
const placeHolderurl = process.env.BACK_EC2 + "/feed";

export const GetFeedState = (token: string | null) => {
  return axios({
    method: "GET",
    url: Feedurl,
    // url: "https://jsonplaceholder.typicode.com/comments",
    headers: { Authorization: "Bearer " + token },
  })
    .then((comments) => {
      // console.log(comments.data.detailFeedDtos);
      return comments.data.detailFeedDtos.reverse();
    })
    .catch((err) => {
      return err;
    });
};
