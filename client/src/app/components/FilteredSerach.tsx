export function FilteredSearch() {
  return (
    <>
      <div className="flex   p-5">
        <div className="flex-1  flex flex-wrap">
          <div className="">
            <label htmlFor="key">Key</label>
            <select name="key" id="">
              <option value="">C</option>
              <option value="">C#</option>
              <option value="">D</option>
              <option value="">D#</option>
              <option value="">E</option>
              <option value="">F</option>
              <option value="">F#</option>
              <option value="">G</option>
              <option value="">G#</option>
              <option value="">A</option>
              <option value="">A#</option>
              <option value="">B</option>
            </select>
          </div>
          <div>
            <select name="instrument" id="">
              <option value="">Guitar</option>
              <option value="">Piano</option>
            </select>
          </div>
          <div>
            <label htmlFor="">Artist</label>
            <input
              type=""
              placeholder="Taylor Swift"
              className="p-3 border-2 rounded-lg"
            />
          </div>
          <div>
            <label htmlFor="">Chord Progression</label>
            <input
              type=""
              placeholder="1-5-4-5"
              className="p-3 border-2 rounded-lg"
            />
          </div>
        </div>

        <div>
          <button className="p-2  rounded-md bg-green-400 text-white font-extrabold">
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
    </>
  );
}
