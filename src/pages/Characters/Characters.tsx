import React, { useEffect } from "react";
import styles from "./styles.module.css";
import { Flex, Text, Box, Card, Avatar } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCharacterStore } from "../../store/characterStore";
import { useCharacters } from "../../hooks/useCharacter";

const Characters: React.FC = () => {
  const setRefetchCharacters = useCharacterStore(
    (state) => state.setRefetchCharacters
  );

  const { data, isLoading, error, refetch } = useCharacters();

  useEffect(() => {
    setRefetchCharacters(() => {
      refetch();
    });
  }, [refetch, setRefetchCharacters]);

  const { t } = useTranslation();

  if (isLoading)
    return (
      <div className={styles.not}>
        <p className={styles.center}>{t("loading")}</p>
      </div>
    );
  if (error)
    return (
      <div className={styles.not}>
        <p className={styles.center}>{t("error")}</p>
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
                      src={item.image ? item.image : "/default2.jpg"}
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
