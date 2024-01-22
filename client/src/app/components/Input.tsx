export function Input() {
  return (
    <div className="flex justify-start flex-col p-2 ">
      <div className="flex ">
        <input
          className=" p-5 rounded-lg border border-gray-200 flex-1 text-sm "
          placeholder="ask any music question"
        />
        <button className="p-5 ml-2 rounded-md bg-green-400 text-white font-extrabold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
