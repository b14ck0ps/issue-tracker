"use client";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Skeleton from "react-loading-skeleton";

const AssigneeSelect = async ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUsers();

  if (error) return null;
  if (isLoading) return <Skeleton width="100%" height="2rem" />;
  const assignIssue = async (userId: string) => {
    try {
      await axios.patch(`/api/issues/${issue.id}`, {
        assigneToUserId: userId === " " ? null : userId,
      });
      toast.success("Assignee updated!");
    } catch (error) {
      toast.error("Failed to update assignee!");
    }
  };
  return (
    <>
      <Select.Root
        defaultValue={issue.assigneToUserId ? issue.assigneToUserId : " "}
        onValueChange={assignIssue}
      >
        <Select.Trigger placeholder="Assing..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Assignee</Select.Label>
            <Select.Item value=" ">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    staleTime: 1000 * 60,
    retry: 3,
    queryFn: async () => {
      const res = await axios.get("/api/users");
      return res.data;
    },
  });

export default AssigneeSelect;
