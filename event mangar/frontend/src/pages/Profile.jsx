"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { UserAuth } from "../context/Authcontext"
import { useNavigate } from "react-router-dom"
import api from "../context/utils/api"
import { toast } from "react-toastify"

const Profile = () => {
  const { user, isLoading, logout } = UserAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    Username: "",
    email: "",
  })
  const [isUpdating, setIsUpdating] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  useEffect(() => {
    if (user) {
      setFormData({
        Username: user?.Username || "",
        email: user?.email || "",
      })
    }
  }, [user])

  const updateUser = async () => {
    setIsUpdating(true)
    try {
      const response = await api.put(`/auth/update-user`, {
        Username: formData.Username,
        email: formData.email,
      })
      if (response.status === 200) {
        toast.success("User updated successfully")
      }
    } catch (error) {
      toast.error("User not updated")
    } finally {
      setIsUpdating(false)
    }
  }

  // Logout handler with redirect
  const logouthandler = async () => {
    setIsLoggingOut(true)
    await logout()
    navigate("/login")
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        type: "spring",
        stiffness: 100,
        damping: 15,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 50,
      transition: { duration: 0.3 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 100,
      },
    },
  }

  const avatarVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 200,
        damping: 10,
      },
    },
  }

  const inputVariants = {
    focus: {
      scale: 1.02,
      transition: { duration: 0.2 },
    },
    blur: {
      scale: 1,
      transition: { duration: 0.2 },
    },
  }

  const buttonVariants = {
    idle: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        type: "spring",
        stiffness: 400,
      },
    },
    tap: { scale: 0.95 },
    loading: {
      scale: [1, 1.02, 1],
      transition: {
        duration: 1,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  const blobVariants = {
    animate: {
      x: [0, 100, -50, 0],
      y: [0, -100, 50, 0],
      scale: [1, 1.2, 0.8, 1],
      rotate: [0, 180, 360],
      transition: {
        duration: 25,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      },
    },
  }

  // Loading UI
  if (isLoading) {
    return (
      <motion.div
        className="h-screen flex justify-center items-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          <motion.div
            className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
          <motion.p
            className="text-xl font-semibold text-white"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            Loading Profile...
          </motion.p>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-slate-800  to-slate-700 flex items-center justify-center p-4 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-purple-400/30 rounded-full mix-blend-multiply filter blur-xl"
          variants={blobVariants}
          animate="animate"
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400/30 rounded-full mix-blend-multiply filter blur-xl"
          variants={blobVariants}
          animate="animate"
          transition={{ delay: 2, duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <motion.div
          className="absolute top-40 left-40 w-80 h-80 bg-pink-400/30 rounded-full mix-blend-multiply filter blur-xl"
          variants={blobVariants}
          animate="animate"
          transition={{ delay: 4, duration: 35, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
      </div>

      <motion.div
        className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 space-y-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        whileHover={{
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          transition: { duration: 0.3 },
        }}
      >
        {/* Header */}
        <motion.div className="text-center mb-8" variants={itemVariants}>
          <motion.h1
            className="text-2xl font-bold bg-gradient-to-r from-gray-100 to-sky-800 bg-clip-text text-transparent mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Profile Settings
          </motion.h1>
          <motion.p
            className="text-gray-300 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Manage your account information
          </motion.p>
        </motion.div>

        {/* Avatar */}
        <motion.div className="flex justify-center" variants={avatarVariants}>
          <motion.div className="relative group" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <motion.div
              className="w-24 h-24 rounded-full shadow-xl flex items-center justify-center text-4xl font-bold uppercase bg-gradient-to-br from-gray-800 to-blue-900 text-white relative overflow-hidden"
              whileHover={{
                boxShadow: "0 20px 40px -12px rgba(168, 85, 247, 0.4)",
              }}
            >
              <span className="relative z-10">{user?.Username?.slice(0, 1) || "U"}</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
            </motion.div>
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-gray-500 to-blue-900 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
          </motion.div>
        </motion.div>

        {/* Info Form */}
        <motion.form className="flex flex-col gap-5" variants={itemVariants}>
          <motion.div variants={itemVariants}>
            <motion.label
              htmlFor="Username"
              className="block text-sm font-semibold mb-2 uppercase tracking-wide text-gray-300"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Username
            </motion.label>
            <motion.input
              type="text"
              name="Username"
              value={formData.Username || ""}
              onChange={(e) => setFormData({ ...formData, Username: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-400/20 transition-all duration-300 hover:bg-white/15"
              variants={inputVariants}
              whileFocus="focus"
              whileHover={{ borderColor: "#A855F7" }}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.label
              htmlFor="email"
              className="block text-sm font-semibold mb-2 uppercase tracking-wide text-gray-300"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Email
            </motion.label>
            <motion.input
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-400/20 transition-all duration-300 hover:bg-white/15"
              variants={inputVariants}
              whileFocus="focus"
              whileHover={{ borderColor: "#A855F7" }}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.label
              htmlFor="role"
              className="block text-sm font-semibold mb-2 uppercase tracking-wide text-gray-300"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              Role
            </motion.label>
            <motion.input
              type="text"
              name="role"
              value={user?.role || ""}
              readOnly
              className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-sm text-gray-400 border border-white/10 cursor-not-allowed"
              variants={inputVariants}
            />
          </motion.div>
        </motion.form>

        {/* Action Buttons */}
        <motion.div className="flex justify-center gap-4 pt-4" variants={itemVariants}>
          <motion.button
            onClick={logouthandler}
            disabled={isLoggingOut}
            className="bg-gradient-to-r from-gray-700 to-sky-900 text-white font-semibold py-3 px-6 rounded-xl shadow-lg relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
            variants={buttonVariants}
            initial="idle"
            whileHover={!isLoggingOut ? "hover" : "loading"}
            whileTap={!isLoggingOut ? "tap" : {}}
            animate={isLoggingOut ? "loading" : "idle"}
          >
            <AnimatePresence mode="wait">
              {isLoggingOut ? (
                <motion.span
                  key="logging-out"
                  className="flex items-center justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.svg
                    className="-ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </motion.svg>
                  Logging out...
                </motion.span>
              ) : (
                <motion.span
                  key="logout"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  Logout
                </motion.span>
              )}
            </AnimatePresence>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
          </motion.button>

          <motion.button
            onClick={updateUser}
            disabled={isUpdating}
            className="bg-gradient-to-r from-gray-600 to-sky-900 text-white font-semibold py-3 px-6 rounded-xl shadow-lg relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
            variants={buttonVariants}
            initial="idle"
            whileHover={!isUpdating ? "hover" : "loading"}
            whileTap={!isUpdating ? "tap" : {}}
            animate={isUpdating ? "loading" : "idle"}
          >
            <AnimatePresence mode="wait">
              {isUpdating ? (
                <motion.span
                  key="updating"
                  className="flex items-center justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.svg
                    className="-ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </motion.svg>
                  Updating...
                </motion.span>
              ) : (
                <motion.span
                  key="update"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  Update Profile
                </motion.span>
              )}
            </AnimatePresence>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default Profile
