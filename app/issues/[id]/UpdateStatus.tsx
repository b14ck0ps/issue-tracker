"use client";
import { Issue, Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const UpdateStatus = ({ issue }: { issue: Issue }) => {
  const updateStatus = async (status: string) => {
    try {
      await axios.patch(`/api/issues/${issue.id}`, {
        status,
      });
      toast.success("Status updated!");
    } catch (error) {
      toast.error("Failed to update status!");
    }
  };
  return (
    <>
      <Select.Root defaultValue={issue.status} onValueChange={updateStatus}>
        <Select.Trigger placeholder="Update Status..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Status</Select.Label>
            <Select.Item key={Status.OPEN} value={Status.OPEN}>
              Open
            </Select.Item>
            <Select.Item key={Status.IN_PROGRESS} value={Status.IN_PROGRESS}>
              In Progress
            </Select.Item>
            <Select.Item key={Status.CLOSED} value={Status.CLOSED}>
              Closed
            </Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default UpdateStatus;
