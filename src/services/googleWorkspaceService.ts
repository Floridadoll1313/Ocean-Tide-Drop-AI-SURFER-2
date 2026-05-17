
export interface CalendarEvent {
  id: string;
  summary: string;
  description?: string;
  start: { dateTime?: string; date?: string };
  end: { dateTime?: string; date?: string };
  location?: string;
}

export interface Task {
  id: string;
  title: string;
  notes?: string;
  status: 'needsAction' | 'completed';
  due?: string;
}

export const fetchCalendarEvents = async (accessToken: string): Promise<CalendarEvent[]> => {
  const timeMin = new Date().toISOString();
  const url = `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${timeMin}&singleEvents=true&orderBy=startTime`;
  
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Failed to fetch calendar events');
  }

  const data = await response.json();
  return data.items || [];
};

export const fetchTasks = async (accessToken: string): Promise<Task[]> => {
  // First get the default task list
  const listUrl = 'https://www.googleapis.com/tasks/v1/users/@me/lists';
  const listRes = await fetch(listUrl, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!listRes.ok) {
    const error = await listRes.json();
    throw new Error(error.error?.message || 'Failed to fetch task lists');
  }

  const listData = await listRes.json();
  const defaultList = listData.items?.[0];

  if (!defaultList) return [];

  const tasksUrl = `https://www.googleapis.com/tasks/v1/lists/${defaultList.id}/tasks`;
  const tasksRes = await fetch(tasksUrl, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!tasksRes.ok) {
    const error = await tasksRes.json();
    throw new Error(error.error?.message || 'Failed to fetch tasks');
  }

  const tasksData = await tasksRes.json();
  return tasksData.items || [];
};

export const createCalendarEvent = async (accessToken: string, event: Partial<CalendarEvent>): Promise<CalendarEvent> => {
  const url = 'https://www.googleapis.com/calendar/v3/calendars/primary/events';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Failed to create calendar event');
  }

  return response.json();
};

export const createTask = async (accessToken: string, task: Partial<Task>): Promise<Task> => {
  const listUrl = 'https://www.googleapis.com/tasks/v1/users/@me/lists';
  const listRes = await fetch(listUrl, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const listData = await listRes.json();
  const defaultList = listData.items?.[0];

  if (!defaultList) throw new Error('No task list found');

  const url = `https://www.googleapis.com/tasks/v1/lists/${defaultList.id}/tasks`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Failed to create task');
  }

  return response.json();
};

export const updateTaskStatus = async (accessToken: string, taskId: string, status: 'needsAction' | 'completed'): Promise<Task> => {
  const listUrl = 'https://www.googleapis.com/tasks/v1/users/@me/lists';
  const listRes = await fetch(listUrl, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const listData = await listRes.json();
  const defaultList = listData.items?.[0];

  if (!defaultList) throw new Error('No task list found');

  const url = `https://www.googleapis.com/tasks/v1/lists/${defaultList.id}/tasks/${taskId}`;
  const getTaskRes = await fetch(url, { headers: { Authorization: `Bearer ${accessToken}` } });
  const taskData = await getTaskRes.json();
  
  taskData.status = status;
  
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Failed to update task');
  }

  return response.json();
};
