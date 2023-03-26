import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function fetchProfile(userID) {
  const res = await axios(`http://localhost:3002/profile/${userID}`, {
    withCredentials: true,
  });

  return res;
}
export const useProfile = (userID) => {
  return useQuery(["getProfile", userID], () => fetchProfile(userID), {
    staleTime: 3 * (60 * 1000),
    refetchOnWindowFocus: false,
  });
  // const { data: profileData, status: profileStatus } =
};
