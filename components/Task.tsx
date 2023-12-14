import { useState } from "react";
import {
  Input,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  Web3Button,
  useContract,
  useContractRead,
} from "@thirdweb-dev/react";
import { ACCOUNTABILITY_CONTRACT } from "../const/addresses";
import TaskCard from "./TaskCard";
import AddTask from "./AddTask";

export default function Tasks() {
  const { contract } = useContract(ACCOUNTABILITY_CONTRACT);

  const {
    data: taskCount,
    isLoading: isTaskCountLoading,
  } = useContractRead(contract, "getTaskCount");

  const [firstTask, setFirstTask] = useState("");

  const {
    data: tasks,
    isLoading: isTasksLoading,
  } = useContractRead(contract, "getTask");

  return (
    <Stack>
      {!isTaskCountLoading ? (
        taskCount !== 0 ? (
          <Stack>
           {!isTasksLoading ? (
            tasks && tasks.length > 0 ? (
              tasks.map((task: any, index: number) => (
                <TaskCard
                  key={index}
                  taskId={index}
                  task={task[0]}
                  isCompleted={task[1]}
                />
              ))
            ) : (
    <Text>No tasks available.</Text>
  )
) : (
  <Spinner />
)}
            <AddTask />
          </Stack>
        ) : (
          <Stack>
            <Text textAlign={"left"}>Create your first task:</Text>
            <Input
              placeholder="Your first task."
              type="text"
              value={firstTask}
              onChange={(e) => setFirstTask(e.target.value)}
            />
            <Web3Button
              contractAddress={ACCOUNTABILITY_CONTRACT}
              action={(contract) =>
                contract.call("createTask", [firstTask])
              }
            >
              Create task
            </Web3Button>
          </Stack>
        )
      ) : (
        <Spinner />
      )}
    </Stack>
  );
}
