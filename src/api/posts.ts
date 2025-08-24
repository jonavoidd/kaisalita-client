import axios from "axios";
import API from "./api";
import type SubmitForm from "../types/submit-form";

export const getAllPost = async () => {
  try {
    const res = await API.get("/api/v1/posts", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.data.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error("error getting all post data:", err.response?.data);
      throw new Error(err.response?.data || "Failed to get all post.");
    } else {
      console.error(
        "unexpected error occured during fetching of all posts:",
        err
      );
      throw new Error("An unexpected error occured.");
    }
  }
};

export const getPostById = async (id: string) => {
  try {
    const res = await API.get(`/api/v1/posts/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.data.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error(
        `an error occured during fetching post with id of ${id}: ${err.response?.data}`
      );
      throw new Error(
        err.response?.data || `Failed to get post with id ${id}.`
      );
    } else {
      console.error("an unexpected error occured during fetching post:", err);
      throw new Error("An unexpected error occured.");
    }
  }
};

export const createPost = async (payload: SubmitForm) => {
  try {
    const res = await API.post("/api/v1/posts", payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error("error creating post:", err.response?.data);
      throw new Error(err.response?.data || "Creating post failed.");
    } else {
      console.error("an unexpected error occured during creating post:", err);
      throw new Error("An unexpected error occured.");
    }
  }
};
