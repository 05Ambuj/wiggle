import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import {
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  FireIcon,
} from "@heroicons/react/24/solid";

import "@fontsource/noto-serif-jp";
import "@fontsource/m-plus-1";

import { UserData } from "../context/UserContext";
import { PostData } from "../context/PostContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { loginUser, loading } = UserData();
  const { fetchPosts } = PostData();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    loginUser(email, password, navigate, fetchPosts);
  };

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <>
      {loading ? (
        <div className="h-screen flex justify-center items-center bg-black text-white text-2xl animate-pulse font-['M_PLUS_1']">
          Summoning the Spirit Realm...
        </div>
      ) : (
        <div className="h-screen w-full bg-gradient-to-br from-[#0f0f0f] via-[#1f1f1f] to-[#292929] flex items-center justify-center px-4 font-['M_PLUS_1'] overflow-hidden">
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

          {/* Floating shapes */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="animate-float-slow bg-red-900/20 h-64 w-64 absolute top-12 left-10 rounded-full blur-3xl" />
            <div className="animate-float-medium bg-yellow-600/10 h-48 w-48 absolute bottom-20 right-20 rounded-full blur-2xl" />
          </div>

          <div className="w-full max-w-5xl h-fit bg-white/5 backdrop-blur-lg rounded-xl border border-[#804040]/30 shadow-[0_0_40px_rgba(127,0,0,0.1)] flex flex-col md:flex-row z-10 overflow-hidden">
            {/* Left Form Side */}
            <div className="w-full md:w-1/2 p-8 md:p-12 text-white space-y-8 animate-slide-in-left">
              <div className="flex justify-center">
                <div className="bg-gradient-to-br from-red-700 to-yellow-400 p-4 rounded-full shadow-lg">
                  <FireIcon className="h-8 w-8 text-white" />
                </div>
              </div>
              <h2 className="text-4xl md:text-5xl font-['Noto_Serif_JP'] font-extrabold text-center tracking-wider uppercase">
                Return, Samurai
              </h2>
              <p className="text-red-200 text-center italic text-sm">
                The Dojo awaits your wisdom.
              </p>

              <form className="space-y-6" onSubmit={submitHandler}>
                <div className="space-y-2">
                  <label className="text-sm">Email</label>
                  <div className="relative">
                    <EnvelopeIcon className="h-5 w-5 absolute top-3 left-4 text-red-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ronin@edo.jp"
                      className="pl-12 w-full bg-black/20 text-white placeholder-red-200 py-3 rounded-lg border border-red-600/30 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm">Password</label>
                  <div className="relative">
                    <LockClosedIcon className="h-5 w-5 absolute top-3 left-4 text-red-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="katana-code..."
                      className="pl-12 pr-12 w-full bg-black/20 text-white placeholder-red-200 py-3 rounded-lg border border-red-600/30 focus:outline-none focus:ring-2 focus:ring-yellow-600"
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
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-700 to-yellow-500 py-3 rounded-lg text-white font-bold uppercase tracking-wide hover:scale-105 transition-transform duration-300"
                >
                  Enter the Dojo
                </button>
              </form>

              <div className="md:hidden mt-6 text-center">
                <p className="text-red-300 mb-3">New Ronin?</p>
                <Link
                  to="/register"
                  className="block w-full bg-gradient-to-r from-yellow-600 to-red-700 hover:brightness-110 text-white py-3 rounded-lg font-semibold border border-white/10 shadow-md transition-transform hover:scale-105"
                >
                  Begin Your Path
                </Link>
              </div>
            </div>

            {/* Right Visual Side */}
            <div
              className="hidden md:flex w-1/2 bg-cover bg-center items-stretch relative"
              style={{ backgroundImage: "url('/samurai-bg.png')" }}
            >
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/60 z-0" />

              <div className="relative z-10 flex flex-col justify-center items-center px-10 py-16 m-0 w-full space-y-6 text-white animate-slide-in-right">
                <h3 className="text-4xl font-['Noto_Serif_JP'] font-bold drop-shadow-xl tracking-wide">
                  Forge Your Destiny
                </h3>
                <p className="text-center text-red-200 text-base max-w-sm leading-relaxed">
                  Step forward, brave soul. Become one with your blade, and write your own legacy in the scrolls of time.
                </p>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-yellow-600 to-red-700 hover:brightness-110 text-white py-3 px-8 rounded-full font-semibold border border-white/10 shadow-md transition-transform hover:scale-105"
                >
                  Begin Your Path
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
