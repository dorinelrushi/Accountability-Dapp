import { Box, Card, Heading, Spinner, Stack, Text } from "@chakra-ui/react";
import { ACCOUNTABILITY_CONTRACT } from "../const/addresses";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import DepositFunds from "./Deposit";
import Task from "./Task";

export default function AccountabilityCard() {
    const {
        contract
    } = useContract(ACCOUNTABILITY_CONTRACT);

    const {
        data: depositAmount,
        isLoading: isDepositAmountLoading
    } = useContractRead(
        contract,
        "getDeposit"
    );

    const {
        data: taskCount,
        isLoading: isTaskCountLoading
    } = useContractRead(
        contract,
        "getTaskCount"
    );

    return (
        <Card w={"60%"} p={10} textAlign={"center"}>
            <Heading>Accountability App</Heading>
            {!isDepositAmountLoading && !isTaskCountLoading ? (
                <Box>
                    {depositAmount == 0 && taskCount == 0 ? (
                        <DepositFunds/>
                    ): (
                        <Stack spacing={8}>
                            <Box>
                                <Text fontSize={"2xl"} fontWeight={"bold"}>Goal amount: {ethers.utils.formatEther(depositAmount)} MATIC.</Text>
                                <Text fontSize={"2xs"}>Deposit amount will be transferred back when all tasks are completed.</Text>
                            </Box>
                            <Task />
                        </Stack>
                    )}
                </Box>
            ) : (
                <Spinner />
            )}
        </Card>
    )
}