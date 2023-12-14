import type { NextPage } from "next";
import { Box, Container, Flex } from "@chakra-ui/react";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import AccountabilityCard from "../components/AccountabilityCard";

const Home: NextPage = () => {
  const address = useAddress();
  return (
    <Container maxW={"1440px"}>
      <Flex justifyContent={"center"} alignItems={"center"} height={"100vh"} flexDirection={"column"}>
        <ConnectWallet />
        <Box h={"20px"}></Box>
        {address && (
          <AccountabilityCard />
        )}
      </Flex>
    </Container>
  );
};

export default Home;