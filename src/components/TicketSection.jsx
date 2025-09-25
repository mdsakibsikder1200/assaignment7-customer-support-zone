import React, { useState, useEffect } from "react";

const TicketsSection = ({ handleTicketClick, taskStatus, setTaskStatus }) => {
  const [tickets, setTickets] = useState([]);
  const [resolvedTasks, setResolvedTasks] = useState([]);

  const fetchTickets = async () => {
    try {
      const res = await fetch("/public/Ticekts.json");  
      const data = await res.json();
      setTickets(data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleComplete = (title) => {
    setTaskStatus((prev) => prev.filter((t) => t !== title));
    setResolvedTasks((prev) => [...prev, title]);
  };

  return (
    <div className="flex px-6 py-10 gap-4">
      {/* Left Side - 60% */}
      <div className="w-3/5 grid grid-cols-1 md:grid-cols-2 gap-4">
        {tickets.length === 0 ? (
          <p className="text-gray-500">Loading tickets...</p>
        ) : (
          tickets.map((ticket) => (
            <div
              key={ticket.id}
              onClick={() => {
                if (!taskStatus.includes(ticket.title)) handleTicketClick(ticket.title)
              }}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200 cursor-pointer hover:shadow-lg transition"
            >
              <h3 className="text-base font-semibold mb-1">{ticket.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{ticket.description}</p>

              <div className="flex justify-between items-center text-sm">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    ticket.priority === "High"
                      ? "bg-red-100 text-red-600"
                      : ticket.priority === "Medium"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {ticket.priority} Priority
                </span>

                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    ticket.status === "In-Progress"
                      ? "bg-yellow-100 text-yellow-600"
                      : ticket.status === "Resolved"
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {ticket.status}
                </span>
              </div>

              <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
                <span>{ticket.customer}</span>
                <span>{new Date(ticket.createdAt).toLocaleDateString("en-US")}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Right Side - 20% */}
      <div className="w-1/5 flex flex-col gap-4">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2">Task Status</h3>
          {taskStatus.length === 0 ? (
            <p className="text-sm text-gray-600">Select a ticket to add to Task Status</p>
          ) : (
            taskStatus.map((title, index) => (
              <div key={index} className="mb-2">
                <p className="text-sm text-gray-500 mb-1">{title}</p>
                <button
                  className="w-full bg-green-500 text-white py-1 rounded"
                  onClick={() => handleComplete(title)}
                >
                  Complete
                </button>
              </div>
            ))
          )}
        </div>

        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2">Resolved Task</h3>
          {resolvedTasks.length === 0 ? (
            <p className="text-sm text-gray-500">No resolved tasks yet.</p>
          ) : (
            resolvedTasks.map((title, index) => (
              <p key={index} className="text-sm text-gray-500 mt-1">
                {title}
              </p>
            ))
          )}
        </div>
      </div>

      {/* Remaining 20% for spacing */}
      <div className="w-1/5"></div>
    </div>
  );
};

export default TicketsSection;
