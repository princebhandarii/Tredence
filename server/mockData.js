const automations = [
  { id: "send_email", label: "Send Email", params: ["to", "subject"] },
  { id: "generate_doc", label: "Generate Document", params: ["template", "recipient"] },
  { id: "notify_slack", label: "Notify Slack", params: ["channel", "message"] },
  { id: "create_ticket", label: "Create Ticket", params: ["title", "priority"] }
];

module.exports = { automations };
