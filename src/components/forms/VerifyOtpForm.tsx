"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { API_BASE_URL } from "@/lib/constants"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import Link from "next/link"

const VerifyOtpForm = () => {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [countdown, setCountdown] = useState(60)
  const [canResend, setCanResend] = useState(false)

  // -------------------------
  // Load stored email from forgot-password flow
  // -------------------------
  useEffect(() => {
    const storedUser = localStorage.getItem("current_user")
    if (storedUser) {
      const parsed = JSON.parse(storedUser)
      setEmail(parsed.email || "")
    }
  }, [])

  // -------------------------
  // Countdown timer for Resend OTP
  // -------------------------
  useEffect(() => {
    if (countdown <= 0) {
      setCanResend(true)
      return
    }
    const timer = setTimeout(() => setCountdown(prev => prev - 1), 1000)
    return () => clearTimeout(timer)
  }, [countdown])

  // -------------------------
  // Validation
  // -------------------------
  const validateForm = () => {
    if (!email.trim()) return "Email is required."
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) return "Invalid email format."

    if (!otp.trim()) return "Please enter the OTP."
    if (!/^\d{5}$/.test(otp)) return "OTP must be exactly 5 digits."

    if (!newPassword.trim()) return "New password is required."
    if (newPassword.length < 8) return "Password must be at least 8 characters."

    return null
  }

  // -------------------------
  // Submit Handler
  // -------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const validationError = validateForm()
    if (validationError) {
      toast.error(validationError)
      return
    }

    try {
      setLoading(true)

      const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      })

      const data = await response.json()

      if (!response.ok) {
        if (response.status === 400) throw new Error("Incorrect OTP.")
        if (response.status === 410) throw new Error("OTP expired. Request a new one.")
        if (response.status === 404) throw new Error("No account found with this email.")
        if (response.status === 422) throw new Error(data?.message || "Validation failed.")
        throw new Error(data?.message || "Reset failed. Try again.")
      }

      toast.success("Password reset successfully!")

      setTimeout(() => router.push("/login"), 1500)

    } catch (err: any) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  // -------------------------
  // Resend OTP Handler
  // -------------------------
  const handleResend = async () => {
    if (!email) {
      toast.error("No email available to resend OTP.")
      return
    }

    try {
      setLoading(true)
      const response = await fetch(`${API_BASE_URL}/auth/resend-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data?.message || "Failed to resend OTP.")
      }

      toast.success("A new OTP has been sent to your email.")
      setCountdown(60)
      setCanResend(false)

    } catch (err: any) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="w-full min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl rounded-3xl border border-indigo-600 backdrop-blur-sm bg-black/10 p-6 sm:p-8 md:p-14 md:py-17 flex flex-col gap-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="bg-gradient-to-r from-[#F262B5] to-[#9F73F1] bg-clip-text text-transparent text-2xl sm:text-3xl md:text-4xl font-bold font-hk uppercase">
            Reset Password
          </h1>
          <p className="text-neutral-50/60 text-sm sm:text-base font-semibold font-hk">
            Enter OTP sent to your email and choose a new password
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          
          {/* Email (readonly) */}
          <div className="space-y-2">
            <Label className="text-neutral-50 font-semibold">Email</Label>
            <Input
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="bg-transparent border-neutral-50/30 text-white"
            />
          </div>

          {/* OTP */}
          <div className="space-y-2">
            <Label className="text-neutral-50 font-semibold">OTP</Label>
            <Input
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              maxLength={5}
              placeholder="12345"
              className="bg-transparent border-neutral-50/30 text-white text-center tracking-widest text-lg focus:border-blue-600"
            />
          </div>

          {/* New Password */}
          <div className="space-y-2">
            <Label className="text-neutral-50 font-semibold">New Password</Label>
            <Input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="bg-transparent border-neutral-50/30 text-white focus:border-blue-600"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-l from-blue-600 via-cyan-600 to-blue-700 text-white text-base sm:text-lg font-semibold hover:opacity-90 py-3"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </Button>

          {/* Resend OTP */}
          <div className="text-center text-sm text-neutral-50/60">
            {canResend ? (
              <button
                type="button"
                onClick={handleResend}
                className="text-blue-600 font-semibold"
              >
                Resend OTP
              </button>
            ) : (
              <span>Resend OTP in {countdown}s</span>
            )}
          </div>

          {/* Back to Login */}
          <p className="text-center text-sm sm:text-base font-semibold text-neutral-50/60">
            Remembered your password?{" "}
            <Link href="/login" className="text-blue-600">
              Login
            </Link>
          </p>
        </form>

        {/* Footer */}
        <div className="text-center text-neutral-50/60 text-xs sm:text-sm">
          © 2026 ReactIf Printing & Design. All rights reserved
        </div>
      </div>
    </section>
  )
}

export default VerifyOtpForm