
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

export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  webViewLink?: string;
  iconLink?: string;
  thumbnailLink?: string;
  size?: string;
  modifiedTime?: string;
}

export const fetchDriveFiles = async (accessToken: string, query?: string): Promise<DriveFile[]> => {
  let url = 'https://www.googleapis.com/drive/v3/files?pageSize=24&fields=files(id,name,mimeType,webViewLink,iconLink,thumbnailLink,size,modifiedTime)&orderBy=modifiedTime desc';
  if (query && query.trim() !== '') {
    const escapedQuery = query.replace(/'/g, "\\'");
    url += `&q=name contains '${escapedQuery}' and trashed = false`;
  } else {
    url += '&q=trashed = false';
  }

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Failed to fetch files from Google Drive');
  }

  const data = await response.json();
  return data.files || [];
};

export const deleteDriveFile = async (accessToken: string, fileId: string): Promise<void> => {
  const url = `https://www.googleapis.com/drive/v3/files/${fileId}`;
  const response = await fetch(url, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Failed to delete file from Google Drive');
  }
};

export const uploadDriveFile = async (
  accessToken: string,
  name: string,
  content: string | Blob,
  mimeType: string
): Promise<DriveFile> => {
  const metadata = {
    name,
    mimeType,
  };

  const form = new FormData();
  form.append(
    'metadata',
    new Blob([JSON.stringify(metadata)], { type: 'application/json' })
  );
  form.append('file', content instanceof Blob ? content : new Blob([content], { type: mimeType }));

  const response = await fetch(
    'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,mimeType,webViewLink,size,modifiedTime',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: form,
    }
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: { message: 'Failed to upload' } }));
    throw new Error(error.error?.message || 'Failed to upload file to Google Drive');
  }

  return response.json();
};

export interface FormFile {
  id: string;
  name: string;
  mimeType: string;
  webViewLink?: string;
  modifiedTime?: string;
}

export interface FormItem {
  title?: string;
  itemId?: string;
  questionItem?: {
    question?: {
      questionId?: string;
      required?: boolean;
      textQuestion?: Record<string, unknown>;
      choiceQuestion?: {
        type?: string;
        options?: Array<{ value: string }>;
      };
    };
  };
}

export interface GoogleForm {
  formId: string;
  info: {
    title: string;
    documentTitle?: string;
    description?: string;
  };
  responderUri: string;
  revisionId?: string;
  items?: FormItem[];
}

export interface FormResponse {
  responseId: string;
  createTime: string;
  lastSubmittedTime: string;
  answers?: Record<string, {
    questionId: string;
    textAnswers?: {
      answers: Array<{ value: string }>;
    };
  }>;
}

export const fetchFormsFromDrive = async (accessToken: string): Promise<FormFile[]> => {
  const url = `https://www.googleapis.com/drive/v3/files?pageSize=50&fields=files(id,name,mimeType,webViewLink,modifiedTime)&q=mimeType='application/vnd.google-apps.form' and trashed=false&orderBy=modifiedTime desc`;
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Failed to fetch forms from Google Drive');
  }

  const data = await response.json();
  return data.files || [];
};

export const fetchFormDetails = async (accessToken: string, formId: string): Promise<GoogleForm> => {
  const url = `https://forms.googleapis.com/v1/forms/${formId}`;
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Failed to fetch Google Form details');
  }

  return response.json();
};

export const fetchFormResponses = async (accessToken: string, formId: string): Promise<FormResponse[]> => {
  const url = `https://forms.googleapis.com/v1/forms/${formId}/responses`;
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Failed to fetch form responses');
  }

  const data = await response.json();
  return data.responses || [];
};

export const createGoogleForm = async (
  accessToken: string,
  title: string,
  description?: string
): Promise<GoogleForm> => {
  const url = 'https://forms.googleapis.com/v1/forms';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      info: {
        title,
        documentTitle: title,
        description,
      },
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Failed to create Google Form');
  }

  const createdForm: GoogleForm = await response.json();

  // Let's add standard starter questions so it's a useful interactive form right away!
  // We'll add Name (Text question), Email (Text question), and Rating (Choice question)
  const batchUrl = `https://forms.googleapis.com/v1/forms/${createdForm.formId}:batchUpdate`;
  const batchResponse = await fetch(batchUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      requests: [
        {
          createItem: {
            item: {
              title: "Full Name",
              questionItem: {
                question: {
                  required: true,
                  textQuestion: {}
                }
              }
            },
            location: { index: 0 }
          }
        },
        {
          createItem: {
            item: {
              title: "Email Address",
              questionItem: {
                question: {
                  required: true,
                  textQuestion: {}
                }
              }
            },
            location: { index: 1 }
          }
        },
        {
          createItem: {
            item: {
              title: "Experience Rating",
              questionItem: {
                question: {
                  required: true,
                  choiceQuestion: {
                    type: "RADIO",
                    options: [
                      { value: "Excellent" },
                      { value: "Good" },
                      { value: "Average" },
                      { value: "Needs Improvement" }
                    ]
                  }
                }
              }
            },
            location: { index: 2 }
          }
        },
        {
          createItem: {
            item: {
              title: "Additional Comments",
              questionItem: {
                question: {
                  required: false,
                  textQuestion: {}
                }
              }
            },
            location: { index: 3 }
          }
        }
      ]
    }),
  });

  if (!batchResponse.ok) {
    console.warn("Could not seed starter questions for Google Form");
  }

  // Refetch full form details with items
  return fetchFormDetails(accessToken, createdForm.formId);
};

export const addFormQuestion = async (
  accessToken: string,
  formId: string,
  questionTitle: string,
  type: 'TEXT' | 'RADIO',
  options?: string[],
  required = false
): Promise<GoogleForm> => {
  const url = `https://forms.googleapis.com/v1/forms/${formId}:batchUpdate`;
  
  const questionItem: {
    question: {
      required: boolean;
      textQuestion?: Record<string, unknown>;
      choiceQuestion?: {
        type: string;
        options?: Array<{ value: string }>;
      };
    };
  } = {
    question: {
      required,
    }
  };

  if (type === 'TEXT') {
    questionItem.question.textQuestion = {};
  } else {
    questionItem.question.choiceQuestion = {
      type: 'RADIO',
      options: options?.map(o => ({ value: o })) || [{ value: 'Option 1' }],
    };
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      requests: [
        {
          createItem: {
            item: {
              title: questionTitle,
              questionItem,
            },
            location: { index: 0 },
          },
        },
      ],
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Failed to add question to Google Form');
  }

  return fetchFormDetails(accessToken, formId);
};


