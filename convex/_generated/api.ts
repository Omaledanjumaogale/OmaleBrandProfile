export const api = {
  functions: {
    getApplications: "functions:getApplications",
    getServiceRequests: "functions:getServiceRequests",
    getAuditLogs: "functions:getAuditLogs",
    getActiveSessions: "functions:getActiveSessions",
    submitApplication: "functions:submitApplication",
    submitServiceRequest: "functions:submitServiceRequest",
    submitApplicationWorkflow: "functions:submitApplicationWorkflow",
    submitServiceRequestWorkflow: "functions:submitServiceRequestWorkflow",
    updateApplicationStatus: "functions:updateApplicationStatus",
    updateServiceRequestStatus: "functions:updateServiceRequestStatus",
    orchestrateBackgroundTasks: "functions:orchestrateBackgroundTasks",
    getSetting: "functions:getSetting",
    updateSetting: "functions:updateSetting",
    createTask: "functions:createTask",
    getTasksForUser: "functions:getTasksForUser",
    getTasksForAdmin: "functions:getTasksForAdmin",
    updateTaskStatus: "functions:updateTaskStatus",
    createBroadcast: "functions:createBroadcast",
    getLatestBroadcasts: "functions:getLatestBroadcasts",
    getHistory: "functions:getHistory",
  }
} as any;
