"use client";
import { API_ENDPOINT, jwt } from "@/constants";
import { useEffect, useState } from "react";
import { FilteredSearch } from "./components/FilteredSerach";
import { Header } from "./components/Header";
import { Input } from "./components/Input";
import { Message } from "./components/Message";

export default function Home() {
  const [isFilteredSearch, setIsFilteredSearch] = useState(false);
  const [chats, setChats] = useState([]);

  function handleFilteredSearchToggle(flag: boolean) {
    setIsFilteredSearch(flag);
  }

  async function fetchChats() {
    const res = await fetch(API_ENDPOINT + "/chats", {
      method: "GET",

      headers: {
        ["Authorization"]: `Bearer ${jwt}`,
      },
    });

    const chats = await res.json();
    console.log(chats);
    setChats(chats.data);
  }

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <main className="flex h-screen flex-col items-center  w-full">
      <Header />
      <div className="flex flex-col p-5   h-[85%] lg:w-[60%] ">
        <div className="h-full  overflow-y-scroll  scrollbar-hide  ">
          {chats &&
            chats.map((chat: any) => (
              <Message
                key={chat.id}
                content={chat.message}
                senderName={chat.sender}
                role={chat.role}
              />
            ))}
        </div>
        <div>
          <div className="flex gap-x-3 pl-3 ">
            <button
              onClick={() => handleFilteredSearchToggle(false)}
              className={`border-2 border-black p-2 rounded-lg text-xs ${
                isFilteredSearch ? "" : "bg-black text-white"
              }`}
            >
              Prompt Search
            </button>
            <button
              className={`border-2 border-black p-2 rounded-lg text-xs ${
                isFilteredSearch ? "bg-black text-white" : ""
              }`}
              onClick={() => handleFilteredSearchToggle(true)}
            >
              Filtered Search
            </button>
          </div>
          {isFilteredSearch ? <FilteredSearch /> : <Input />}
        </div>
      </div>
    </main>
  );
}
