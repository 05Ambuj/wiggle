import React from "react";
import {
    LockClosedIcon,
    EyeIcon,
    EyeSlashIcon,
} from "@heroicons/react/24/solid";

import "@fontsource/noto-serif-jp";
import "@fontsource/m-plus-1";

const UpdatePasswordModal = ({
    oldPassword,
    newPassword,
    setOldPassword,
    setNewPassword,
    updatePassword,
    onClose,
}) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
        <div className="fixed inset-0 z-50 bg-black/70 flex justify-center items-center px-4">
            <div className="relative w-full max-w-md bg-[#1b1b1b]/90 backdrop-blur-md border border-red-800/40 rounded-xl shadow-xl p-8 text-white font-['M_PLUS_1'] animate-fade-in">
                <button
                    type="button"
                    className="absolute top-2 right-4 text-red-400 text-xl hover:text-white"
                    onClick={onClose} // ✅ this is crucial
                >
                    &times;
                </button>


                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-['Noto_Serif_JP'] tracking-wider font-extrabold text-red-300">
                        Update Password
                    </h2>
                    <p className="text-sm text-red-100 italic">
                        Strengthen your spirit, one code at a time.
                    </p>
                </div>

                <form onSubmit={updatePassword} className="space-y-6 mt-6">
                    <div className="space-y-2">
                        <label className="text-sm text-red-300">Old Password</label>
                        <div className="relative">
                            <LockClosedIcon className="h-5 w-5 absolute top-3 left-4 text-red-500" />
                            <input
                                type="password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                className="pl-12 w-full bg-black/30 text-white placeholder-red-200 py-3 rounded-lg border border-red-600/30 focus:outline-none focus:ring-2 focus:ring-red-500"
                                placeholder="old code..."
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm text-red-300">New Password</label>
                        <div className="relative">
                            <LockClosedIcon className="h-5 w-5 absolute top-3 left-4 text-red-500" />
                            <input
                                type={showPassword ? "text" : "password"}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="pl-12 pr-12 w-full bg-black/30 text-white placeholder-red-200 py-3 rounded-lg border border-yellow-600/30 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                placeholder="new blade technique..."
                                required
                            />
                            {showPassword ? (
                                <EyeSlashIcon
                                    className="h-5 w-5 absolute top-3 right-4 text-yellow-400 cursor-pointer"
                                    onClick={() => setShowPassword(false)}
                                />
                            ) : (
                                <EyeIcon
                                    className="h-5 w-5 absolute top-3 right-4 text-yellow-400 cursor-pointer"
                                    onClick={() => setShowPassword(true)}
                                />
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-yellow-700 to-red-700 py-3 rounded-lg font-bold uppercase tracking-wider hover:scale-105 transition-transform"
                    >
                        Update Code
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdatePasswordModal;