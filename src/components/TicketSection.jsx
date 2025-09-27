import React from "react";

const TicketsSection = ({
  tickets,
  taskStatus,
  resolvedTasks,
  handleTicketClick,
  handleComplete,
}) => {
  return (
    <div className="w-full px-6 py-10 flex justify-center">
      <div className="w-full max-w-5xl">

        <h1 className="text-2xl font-bold mb-6 text-center md:text-left">
          Customer Tickets
        </h1>

        <div className="flex flex-col lg:flex-row gap-6">

          <div className="w-full lg:w-[80%] grid grid-cols-1 sm:grid-cols-2 gap-5">
            {tickets.length === 0 ? (
              <p className="text-gray-500 col-span-full text-center">
                No tickets available
              </p>
            ) : (
              tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  onClick={() => handleTicketClick(ticket.title)}
                  className="bg-white shadow-md rounded-xl p-5 border border-gray-200 cursor-pointer hover:shadow-lg transition"
                >

                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-base font-semibold">{ticket.title}</h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${ticket.status === "In-Progress"
                          ? "bg-yellow-100 text-yellow-600"
                          : ticket.status === "Resolved"
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-100 text-gray-600"
                        }`}
                    >
                      {ticket.status}
                    </span>
                  </div>


                  <p className="text-sm text-gray-600 mb-3">
                    {ticket.description}
                  </p>


                  <div className="flex justify-between items-center text-xs text-gray-500">

                    <span>{ticket.customer}</span>


                    <span
                      className={`text-xs font-medium ${ticket.priority === "High"
                          ? "text-red-600"
                          : ticket.priority === "Medium"
                            ? "text-yellow-600"
                            : "text-green-600"
                        }`}
                    >
                      {ticket.priority} Priority
                    </span>


                    <div className="flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 text-gray-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.75 3v2.25M17.25 3v2.25M3 7.5h18M4.5 21h15a1.5 1.5 0 001.5-1.5V7.5H3v12a1.5 1.5 0 001.5 1.5z"
                        />
                      </svg>
                      <span>
                        {new Date(ticket.createdAt).toLocaleDateString("en-US")}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>


          <div className="w-full lg:w-[20%] max-w-[300px] flex flex-col gap-4">

            <div className="bg-white shadow-md rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">Task Status</h3>
              {taskStatus.length === 0 ? (
                <p className="text-sm text-gray-600">
                  Select a ticket to add to Task Status
                </p>
              ) : (
                taskStatus.map((title, index) => (
                  <div key={index} className="mb-2">
                    <p className="text-sm text-gray-500 mb-1">{title}</p>
                    <button
                      className="w-full bg-green-500 text-white py-1 rounded hover:bg-green-600 transition"
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
                <div className="flex flex-col gap-2">
                  {resolvedTasks.map((title, index) => (
                    <div
                      key={index}
                      className="bg-gray-100 text-gray-700 text-sm px-2 py-1 rounded"
                    >
                      {title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketsSection;
