import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";
import { PostData } from "../context/PostContext";
import { EyeIcon, EyeSlashIcon, XMarkIcon } from "@heroicons/react/24/solid";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { Listbox } from "@headlessui/react";
import "@fontsource/noto-serif-jp";
import "@fontsource/m-plus-1";

const genderOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedGender, setSelectedGender] = useState(genderOptions[0]);
  const [file, setFile] = useState(null);
  const [filePrev, setFilePrev] = useState(null);

  const { registerUser, loading } = UserData();
  const { fetchPosts } = PostData();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("gender", selectedGender.value);
    formData.append("file", file);
    registerUser(formData, navigate, fetchPosts);
  };

  const changeFileHandler = (e) => {
    const f = e.target.files[0];
    if (f) {
      const reader = new FileReader();
      reader.readAsDataURL(f);
      reader.onloadend = () => {
        setFilePrev(reader.result);
        setFile(f);
      };
    }
  };

  const particlesInit = async (main) => await loadFull(main);

  return (
    <>
      {loading ? (
        <div className="h-screen flex justify-center items-center bg-black text-white text-2xl animate-pulse font-['M_PLUS_1']">
          Preparing Your Scroll...
        </div>
      ) : (
        <div className="min-h-screen w-full bg-gradient-to-br from-[#0f0f0f] via-[#1f1f1f] to-[#292929] px-4 py-8 font-['M_PLUS_1'] overflow-auto flex justify-center items-center relative">
          <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
              fullScreen: false,
              background: { color: "transparent" },
              fpsLimit: 60,
              particles: {
                number: { value: 60 },
                size: { value: { min: 1, max: 3 } },
                move: { enable: true, speed: 0.4 },
                opacity: { value: 0.3 },
                color: { value: "#9f7f6d" },
              },
            }}
            className="absolute inset-0 -z-10"
          />

          <div className="w-full max-w-5xl my-8 bg-white/5 backdrop-blur-lg rounded-xl border border-[#804040]/30 shadow-[0_0_40px_rgba(127,0,0,0.2)] flex flex-col md:flex-row overflow-hidden">
            <div className="w-full md:w-1/2 p-6 md:p-12 text-white space-y-6 animate-slide-in-left">
              <div className="flex justify-center">
                <div className="bg-gradient-to-br from-red-700 to-yellow-400 p-4 rounded-full shadow-lg">
                  <img src="/katana-icon.png" alt="Katana Icon" className="h-8 w-8" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-['Noto_Serif_JP'] font-bold text-center tracking-wider uppercase">
                Join the Dojo
              </h1>
              <p className="text-red-200 text-center italic text-sm">
                Carve your legacy into the spirit realm.
              </p>
              <form onSubmit={submitHandler} className="space-y-6">
                <div className="flex flex-col items-center gap-4">
                  {filePrev && (
                    <div className="relative w-32 h-32">
                      <img
                        src={filePrev}
                        className="w-full h-full rounded-full object-cover border-4 border-red-600 shadow-inner bg-black/30"
                        alt="Profile Preview"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setFile(null);
                          setFilePrev(null);
                        }}
                        className="absolute -top-2 -right-2 bg-red-700 text-white p-1 rounded-full"
                      >
                        <XMarkIcon className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={changeFileHandler}
                    required={!file}
                    className="text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-red-700 file:text-white hover:file:bg-red-800"
                  />
                </div>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full bg-black/20 text-white placeholder-red-200 py-3 px-4 rounded-lg border border-red-600/30 focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ronin@edo.jp"
                  className="w-full bg-black/20 text-white placeholder-red-200 py-3 px-4 rounded-lg border border-red-600/30 focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="katana-code..."
                    className="w-full bg-black/20 text-white placeholder-red-200 py-3 px-4 pr-12 rounded-lg border border-red-600/30 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                    required
                  />
                  {showPassword ? (
                    <EyeSlashIcon
                      className="h-5 w-5 absolute top-3 right-4 text-red-400 cursor-pointer"
                      onClick={() => setShowPassword(false)}
                    />
                  ) : (
                    <EyeIcon
                      className="h-5 w-5 absolute top-3 right-4 text-red-400 cursor-pointer"
                      onClick={() => setShowPassword(true)}
                    />
                  )}
                </div>

                <div>
                  <Listbox value={selectedGender} onChange={setSelectedGender}>
                    <div className="relative">
                      <Listbox.Button className="w-full bg-black/20 text-white py-3 px-4 pr-12 rounded-lg border border-red-600/30 focus:outline-none focus:ring-2 focus:ring-yellow-600 text-left">
                        {selectedGender.label}
                      </Listbox.Button>
                      <Listbox.Options className="absolute mt-1 w-full bg-[#1a1a1a] border border-red-600 rounded-lg shadow-lg z-20">
                        {genderOptions.map((gender, idx) => (
                          <Listbox.Option
                            key={idx}
                            value={gender}
                            className={({ active, selected }) =>
                              `cursor-pointer select-none py-2 px-4 ${
                                active
                                  ? "bg-yellow-600 text-white"
                                  : selected
                                  ? "bg-red-600 text-white"
                                  : "text-gray-300"
                              }`
                            }
                          >
                            {gender.label}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </div>
                  </Listbox>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-700 to-yellow-500 py-3 rounded-lg text-white font-bold uppercase tracking-wide hover:scale-105 transition-transform duration-300"
                >
                  Carve Your Mark
                </button>
              </form>

              {/* Login button on small screens */}
              <div className="md:hidden mt-6 text-center">
                <Link
                  to="/login"
                  className="block w-full bg-gradient-to-r from-yellow-600 to-red-700 hover:brightness-110 text-white py-3 rounded-lg font-semibold border border-white/10 shadow-md transition-transform hover:scale-105"
                >
                  Already a Ronin? Enter the Dojo
                </Link>
              </div>
            </div>

            <div className="hidden md:flex w-1/2 relative rounded-tr-xl rounded-br-xl overflow-hidden">
              <div className="absolute inset-0 bg-[url('/dojo.jpg')] bg-cover bg-center z-0" />
              <div className="absolute inset-0 bg-black/60 z-10" />
              <div className="relative z-20 w-full h-full flex items-center justify-center text-white p-10">
                <div className="text-center space-y-4">
                  <h2 className="text-4xl font-['Noto_Serif_JP'] font-bold drop-shadow-xl tracking-wide">
                    Ready Your Spirit
                  </h2>
                  <p className="text-center text-red-200 text-base max-w-sm leading-relaxed">
                    Already walk the path of the warrior? Return to the dojo and reunite with your destiny.
                  </p>
                  <Link
                    to="/login"
                    className="bg-gradient-to-r from-yellow-600 to-red-700 hover:brightness-110 text-white py-3 px-8 rounded-full font-semibold border border-white/10 shadow-md transition-transform hover:scale-105"
                  >
                    Enter the Dojo
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
