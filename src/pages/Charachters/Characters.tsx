import React, { useEffect } from "react";
import styles from "./styles.module.css";
import { Flex, Text, Box, Card, Avatar } from "@radix-ui/themes";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCharacterStore } from "../../store/characterStore";
type Wand = {
  wood: string;
  core: string;
  length: number;
};

type Character = {
  id: string;
  name: string;
  image: string;
  house: string;
  species: string;
  actor: string;
  alive: boolean;
  wand: Wand;
};

const fetchCharacters = async (): Promise<Character[]> => {
  const res = await axios.get("https://hp-api.onrender.com/api/characters");
  return res.data.slice(0, 25);
};

const Characters: React.FC = () => {
  const setRefetchCharacters = useCharacterStore(
    (state) => state.setRefetchCharacters
  );

  const { data, isLoading, error, refetch } = useQuery<Character[]>({
    queryKey: ["characters"],
    queryFn: fetchCharacters,
  });

  useEffect(() => {
    setRefetchCharacters(() => {
      refetch();
    });
  }, [refetch, setRefetchCharacters]);

  const { t } = useTranslation();

  if (isLoading)
    return (
      <div className={styles.not}>
        <p className={styles.center}>Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className={styles.not}>
        <p className={styles.center}>Error!</p>
      </div>
    );

  return (
    <div className={styles.bg}>
      <div className="container">
        <h2>{t("title")}</h2>
        <div className={styles.wrapper}>
          {data?.map((item, i) => (
            <Link key={i} to={`/character/${item.id}`}>
              <Box>
                <Card className={styles.card}>
                  <Flex gap="3" align="center">
                    <Avatar
                      size="4"
                      src={item.image}
                      radius="full"
                      fallback="o"
                    />
                    <Box>
                      <Text as="p" size="2" weight="bold" color="purple">
                        {item.name}
                      </Text>
                      <Text as="p" size="2" color="gray">
                        {item.actor}
                      </Text>
                    </Box>
                  </Flex>
                </Card>
              </Box>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Characters;
