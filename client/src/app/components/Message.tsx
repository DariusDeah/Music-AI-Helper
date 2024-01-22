type MessageProp = {
  senderName: string | "AI";
  content: string;
  role: "user" | "ai";
};
export function Message({ content, senderName, role }: MessageProp) {
  return (
    <div className=" p-3 lg:p-6 w-full font-serif ">
      <div className="flex  items-start ">
        <div className="mr-2">
          <div
            className={` ${
              senderName === "AI" ? "bg-black text-white" : "bg-white"
            }  p-2  rounded-md font-semibold  text-xs w-fit`}
          >
            <p>{senderName}</p>
          </div>
        </div>
        <div className=" px-5 pb-3 lg:pb-8 text-balance  text-sm flex-1 border-b-[1px] w-[80%] lg:w-full">
          <p className="font-bold">{role === "user" ? "You" : "Music.AI"}</p>
          <p
            className={`font-thin ${
              senderName === "AI" ? "text-gray-600" : ""
            }`}
          >
            {content}
          </p>
        </div>
      </div>
    </div>
  );
}
