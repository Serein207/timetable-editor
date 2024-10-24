import { toast } from "sonner";

const baseURL = "https://evento.sast.fun/api";

function getStartOfWeekUTC(): string {
  const currentDate = new Date();
  const dayOfWeek = currentDate.getUTCDay();
  currentDate.setUTCDate(currentDate.getUTCDate() - ((dayOfWeek + 6) % 7));
  currentDate.setUTCHours(0, 0, 0, 0);
  return currentDate.toISOString();
}

export const getEventsList = async () => {
  try {
    const response = await fetch(
      `${baseURL}/event/list?typeId=&departmentId=&time=${getStartOfWeekUTC()}`,
      { method: "POST" },
    );
    // 检查响应是否成功
    if (!response.ok) {
      throw new Error(`HTTP 错误! 状态: ${response.status}`);
    }
    const data = await response.json();
    if (data.errCode) {
      toast.error(data.errMsg);
    } else return data.data;
  } catch (error) {
    console.error("获取事件列表时出错:", error);
  }
};
