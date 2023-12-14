import { Card, Flex, Text, useToast } from "@chakra-ui/react";
import { Web3Button } from "@thirdweb-dev/react";
import { ACCOUNTABILITY_CONTRACT } from "../const/addresses";
import styles from "../styles/Home.module.css";

type Props = {
    taskId: number;
    task: string;
    isCompleted: boolean;
};

export default function TaskCard({ taskId, task, isCompleted }: Props) {
    let backgroundColor = "white";
    let borderColor = "gray.200";
    let fontColor = "gray.700";

    if (isCompleted) {
        backgroundColor = "green.200";
        borderColor = "green.400";
        fontColor = "green.700";
    }

    const toast = useToast();
    return (
        <Card p={8} backgroundColor={backgroundColor} border={"1px solid"} borderColor={borderColor}>
            <Flex flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>
                <Text fontWeight={"bold"} color={fontColor}>{task}</Text>
                {isCompleted ? (
                    <Text fontWeight={"bold"} color={fontColor}>Completed</Text>
                ) : (
                    <Web3Button
                        className={styles.completeBtn}
                        contractAddress={ACCOUNTABILITY_CONTRACT}
                        action={(contract) => contract.call(
                            "completeTask",
                            [taskId]
                        )}
                        onSuccess={() => {
                            toast({
                                title: 'Task Completed.',
                                description: "You have completed your task.",
                                status: 'success',
                                duration: 9000,
                                isClosable: true,
                              })
                        }}
                    >✓</Web3Button>
                )}
            </Flex>
        </Card>
    )
}