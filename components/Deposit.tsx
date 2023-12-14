import { Box, Input, Stack, Text } from "@chakra-ui/react";
import { Web3Button } from "@thirdweb-dev/react";
import { useState } from "react";
import { ACCOUNTABILITY_CONTRACT } from "../const/addresses";
import { ethers } from "ethers";

export default function DepositFunds() {
    const [depositAmount, setDepositAmount] = useState(0);

    return (
        <Stack spacing={10}>
            <Box mt={10}>
                <Text fontSize={"2xl"} mb={8}>You currently don't have a goal set.</Text>
                <Text>Desposit funds that will be transferred back once you complete the tasks you set.</Text>
            </Box>
            <Box>
                <Text textAlign={"left"} fontWeight={"bold"}>Deposit Amount:</Text>
                <Input
                    placeholder="0.0"
                    type="number"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.valueAsNumber)}
                />
            </Box>

            <Web3Button
                contractAddress={ACCOUNTABILITY_CONTRACT}
                action={(contract) => contract.call(
                    "depositFunds",
                    [],
                    {
                        value: ethers.utils.parseEther(depositAmount.toString())
                    }
                )}
            >Deposit to start</Web3Button>
        </Stack>
    )
}