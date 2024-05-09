import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import VideoCard from "../Video Item Details Route/VideoCard";

const SearchQureyApi = ({ handleVideoPlayById }) => {
  const navigate = useNavigate();
  const apiFunction = async ({ pageParam }) => {
    const cookie = Cookies.get("jwt_Token");
    if (!cookie) {
      alert("JWT token not found");
      navigate("/login", { replace: true });
    }
    const url = `api/videos/?limit=10&page=${pageParam}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    });
    console.log("response", response.data.videos);
    return response?.data?.videos;
  };

  const { data, error, status, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["testApi"],
    queryFn: apiFunction,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const returnVal = lastPage.length ? allPages.length + 1 : undefined;

      return returnVal;
    },
  });

  console.log(hasNextPage, "funmun");
  const article = data?.pages.flatMap((page) => page);

  console.log("backend Data Man", article);
  return (
    <InfiniteScroll
      dataLength={article ? article.length : 0}
      next={() => {
        console.log("Fetching next page...");
        fetchNextPage();
      }}
      hasMore={hasNextPage}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
      onScroll={() => console.log("Scroll event detected")}
    >
      {article &&
        article.map((elem) => (
          <button
            key={elem.VideoID}
            onClick={() => handleVideoPlayById(elem.VideoID)}
          >
            <VideoCard elem={elem} />
          </button>
        ))}
    </InfiniteScroll>
  );
};

export default SearchQureyApi;
