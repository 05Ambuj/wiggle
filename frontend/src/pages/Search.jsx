import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LoadingAnimation } from "../components/Loading";

const Search = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchUsers() {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/user/all?search=" + search);
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      fetchUsers();
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#111] via-[#191919] to-[#1f1f1f] min-h-screen text-white font-['M_PLUS_1'] px-4 py-6">
      <div className="max-w-xl mx-auto flex flex-col items-center">
        <div className="w-full flex items-center gap-3 mb-6">
          <input
            type="text"
            className="w-full px-4 py-2 rounded-lg bg-white/10 backdrop-blur border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm"
            placeholder="Search Ronins by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={fetchUsers}
            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 transition-all text-black font-semibold rounded-lg shadow-md"
          >
            Search
          </button>
        </div>

        {loading ? (
          <LoadingAnimation />
        ) : (
          <div className="w-full space-y-3">
            {users && users.length > 0 ? (
              users.map((e) => (
                <Link
                  key={e._id}
                  to={`/user/${e._id}`}
                  className="flex items-center gap-4 p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all"
                >
                  <img
                    src={e.profilePic.url}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="text-sm font-medium text-white/90">{e.name}</span>
                </Link>
              ))
            ) : (
              <p className="text-center text-sm text-gray-400 italic">No users found. Try searching above.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
