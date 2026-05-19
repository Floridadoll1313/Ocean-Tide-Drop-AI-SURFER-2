
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

export interface ChatSpace {
  name: string;
  displayName: string;
  spaceType: string;
}

export interface ChatMessage {
  text: string;
}

export interface Spreadsheet {
  spreadsheetId: string;
  spreadsheetUrl: string;
  properties: {
    title: string;
  };
}

export const createSpreadsheet = async (accessToken: string, title: string): Promise<Spreadsheet> => {
  const url = 'https://sheets.googleapis.com/v4/spreadsheets';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: {
        title,
      },
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Failed to create spreadsheet');
  }

  return response.json();
};

export interface Presentation {
  presentationId: string;
  title: string;
}

export const createPresentation = async (accessToken: string, title: string): Promise<Presentation> => {
  const url = 'https://slides.googleapis.com/v1/presentations';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Failed to create presentation');
  }

  return response.json();
};

export interface Document {
  documentId: string;
  title: string;
}

export const createDocument = async (accessToken: string, title: string): Promise<Document> => {
  const url = 'https://docs.googleapis.com/v1/documents';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Failed to create document');
  }

  return response.json();
};

export interface GmailMessage {
  id: string;
  threadId: string;
  snippet: string;
  subject?: string;
  from?: string;
  date?: string;
}

export const fetchRecentEmails = async (accessToken: string): Promise<GmailMessage[]> => {
  const url = 'https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=5&q=in:inbox';
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Failed to fetch emails lists');
  }

  const data = await response.json();
  const messages = data.messages || [];

  const detailedMessages: GmailMessage[] = [];
  for (const msg of messages) {
    const msgRes = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}?format=metadata&metadataHeaders=Subject&metadataHeaders=From&metadataHeaders=Date`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (msgRes.ok) {
      const msgData = await msgRes.json();
      const headers = msgData.payload?.headers || [];
      const subject = headers.find((h: { name: string; value: string }) => h.name === 'Subject')?.value;
      const from = headers.find((h: { name: string; value: string }) => h.name === 'From')?.value;
      const date = headers.find((h: { name: string; value: string }) => h.name === 'Date')?.value;
      detailedMessages.push({
        id: msgData.id,
        threadId: msgData.threadId,
        snippet: msgData.snippet,
        subject,
        from,
        date
      });
    }
  }

  return detailedMessages;
};

export interface KeepNote {
  name: string;
  title: string;
  createTime: string;
  updateTime: string;
}

export const fetchNotes = async (accessToken: string): Promise<KeepNote[]> => {
  const url = 'https://keep.googleapis.com/v1/notes';
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Failed to fetch notes');
  }

  const data = await response.json();
  return data.notes || [];
};

export const fetchChatSpaces = async (accessToken: string): Promise<ChatSpace[]> => {
  const url = 'https://chat.googleapis.com/v1/spaces';
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Failed to fetch chat spaces');
  }

  const data = await response.json();
  return data.spaces || [];
};

export const sendChatMessage = async (accessToken: string, spaceName: string, text: string): Promise<ChatMessage> => {
  const url = `https://chat.googleapis.com/v1/${spaceName}/messages`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Failed to send chat message');
  }

  return response.json();
};

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
