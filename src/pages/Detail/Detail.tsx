import React from "react";
import styles from "./styles.module.css";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { mainUrl } from "../../config/api";

interface Wand {
  wood: string;
  core: string;
  length: number;
}

interface Character {
  id: string;
  name: string;
  gender: string;
  dateOfBirth: string;
  image: string;
  house: string;
  species: string;
  actor: string;
  ancestry: string;
  alive: boolean;
  wand: Wand;
}

const fetchCharacters = async (): Promise<Character[]> => {
  const res = await axios.get(mainUrl);
  return res.data;
};
const Detail: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery<Character[]>({
    queryKey: ["characters"],
    queryFn: fetchCharacters,
  });

  const character = data?.find((char) => char.id === id);
  const { t } = useTranslation();

  if (isLoading)
    return (
      <div className={styles.bg}>
        <p className={styles.center}>{t("loading")}</p>
      </div>
    );
  if (error)
    return (
      <div className={styles.bg}>
        <p className={styles.center}>{t("error")}</p>
      </div>
    );
  if (!character)
    return (
      <div className={styles.bg}>
        <p className={styles.center}>{t("notfound")}</p>
      </div>
    );

  return (
    <div className={styles.bg}>
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.box}>
            <img
              src={character.image ? character.image : "/default.jpg"}
              alt="Avatar"
              draggable="false"
            />
            <div className={styles.info}>
              <h2>{character.name}</h2>
              {character.ancestry && (
                <p>
                  <span>{t("ancestry")}:</span> {character.ancestry}
                </p>
              )}
              {character.actor && (
                <p>
                  <span>{t("actor")}:</span> {character.actor}
                </p>
              )}
              {character.gender && (
                <p>
                  <span>{t("gender")}:</span> {character.gender}
                </p>
              )}
              {character.house && (
                <p>
                  <span>{t("house")}:</span> {character.house}
                </p>
              )}
              {character.wand.wood && (
                <p>
                  <span>{t("wand")}:</span> {character.wand.wood}
                </p>
              )}
              {character.dateOfBirth && (
                <p>
                  <span>{t("birth")}:</span>{" "}
                  {character.dateOfBirth.split("-").join(".")}
                </p>
              )}
              {character.alive && (
                <p>
                  <span>{t("alive")}:</span> {character.alive ? "Yes" : "No"}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
