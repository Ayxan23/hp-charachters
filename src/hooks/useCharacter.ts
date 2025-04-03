import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Character } from "../types/character";
import { mainUrl } from "../config/api";


const fetchCharacters = async (): Promise<Character[]> => {
  const res = await axios.get(mainUrl);
  return res.data.slice(0, 25);
};

export const useCharacters = () => {
  return useQuery<Character[]>({
    queryKey: ["characters"],
    queryFn: fetchCharacters,
  });
};
