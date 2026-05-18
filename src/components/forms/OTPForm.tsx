"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { API_BASE_URL } from "@/lib/constants"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

import Link from "next/link"

const OTPForm = () => {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const [countdown, setCountdown] = useState(60)
  const [canResend, setCanResend] = useState(false)

  /* --------------------------
     Load stored user on mount
  -------------------------- */
  useEffect(() => {
    const storedUser = localStorage.getItem("current_user")
    if (storedUser) {
      const parsed = JSON.parse(storedUser)
      setEmail(parsed.email || "")
    }
  }, [])

  /* --------------------------
     Countdown Timer
  -------------------------- */
  useEffect(() => {
    if (countdown <= 0) {
      setCanResend(true)
      return
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [countdown])

  /* --------------------------
     Validation
  -------------------------- */
  const validateForm = () => {
    if (!otp.trim())
      return "Please enter the full verification code."

    if (!/^\d{5}$/.test(otp))
      return "OTP must be exactly 5 digits."

    return null
  }

  /* --------------------------
     Submit Handler
  -------------------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (!navigator.onLine) {
      setError("No internet connection.")
      return
    }

    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }

    try {
      setLoading(true)

      const token = localStorage.getItem("sessionToken")
      if (!token) {
        throw new Error("Session expired. Please sign up again.")
      }

      const response = await fetch(
        `${API_BASE_URL}/auth/verify-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            email,
            otp,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        if (response.status === 400)
          throw new Error("Incorrect OTP.")

        if (response.status === 410)
          throw new Error("OTP expired. Request a new one.")

        if (response.status === 429)
          throw new Error("Too many attempts. Request a new OTP.")

        if (response.status === 422)
          throw new Error(data?.message || "Validation failed.")

        throw new Error("Verification failed. Try again.")
      }

      /* --------------------------
         SUCCESS PATH (C8.2)
      -------------------------- */

      const storedUser = localStorage.getItem("current_user")

      if (storedUser) {
        const parsedUser = JSON.parse(storedUser)
        parsedUser.isVerified = true
        localStorage.setItem("current_user", JSON.stringify(parsedUser))
      }

      setSuccess("Account verified successfully!")

      /* --------------------------
         Navigate to Home (C9)
      -------------------------- */
      setTimeout(() => {
        router.push("/")
      }, 1200)

    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  /* --------------------------
     Resend OTP (UI only trigger)
     Backend already sends on signup
  -------------------------- */
  /* --------------------------
   Resend OTP (backend integrated)
-------------------------- */

const handleResend = async () => {
  setError(null)
  setSuccess(null)

  if (!navigator.onLine) {
    setError("No internet connection.")
    return
  }

  try {
    setLoading(true)
    const response = await fetch(
      `${API_BASE_URL}/auth/resend-otp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      if (response.status === 422)
        throw new Error(data?.message || "Validation failed.")

      throw new Error(data?.message || "Failed to resend OTP. Try again.")
    }

    // Success
    setSuccess("A new OTP has been sent to your email.")
    setCountdown(60)
    setCanResend(false)

  } catch (err: any) {
    setError(err.message)
  } finally {
    setLoading(false)
  }
}

  return (
    <section className="w-full min-h-screen flex items-center justify-center px-4 py-10">
      <div
        className="
        w-full
        max-w-xl
        rounded-3xl
        border border-indigo-600
        backdrop-blur-sm
        bg-black/10
        p-6 sm:p-8 md:p-14 md:py-17
        flex flex-col gap-8
        "
      >
        {/* Header */}
        <div className="text-center space-y-2">
          <h1
            className="
            bg-gradient-to-r from-[#F262B5] to-[#9F73F1]
            bg-clip-text text-transparent
            text-2xl sm:text-3xl md:text-4xl
            font-bold font-hk uppercase
            "
          >
            Verify Your Account
          </h1>

          <p className="text-neutral-50/60 text-sm sm:text-base font-semibold font-hk">
            Enter the 5-digit code sent to your email
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email (readonly, auto-filled) */}
          <div className="space-y-2">
            <Label className="text-neutral-50 font-semibold">
              Email
            </Label>
            <Input
              value={email}
              readOnly
              className="bg-transparent border-neutral-50/30 text-white"
            />
          </div>

          {/* OTP */}
          <div className="space-y-2">
            <Label className="text-neutral-50 font-semibold">
              Verification Code
            </Label>
            <Input
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value.replace(/\D/g, ""))
              }
              maxLength={5}
              placeholder="12345"
              className="bg-transparent border-neutral-50/30 text-white text-center tracking-widest text-lg focus:border-blue-600"
            />
          </div>

          {/* Error / Success */}
          {error && (
            <p className="text-red-500 text-sm font-medium">{error}</p>
          )}
          {success && (
            <p className="text-green-500 text-sm font-medium">{success}</p>
          )}

          {/* Verify Button */}
          <Button
            type="submit"
            disabled={loading}
            className="
            w-full
            bg-gradient-to-l
            from-blue-600
            via-cyan-600
            to-blue-700
            text-white
            text-base sm:text-lg
            font-semibold
            hover:opacity-90
            py-3
            "
          >
            {loading ? "Verifying..." : "Verify"}
          </Button>

          {/* Resend */}
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

          {/* Back */}
          <p className="text-center text-sm sm:text-base font-semibold text-neutral-50/60">
            Back to{" "}
            <Link href="/login" className="text-blue-600">
              Login
            </Link>
          </p>
        </form>
      </div>
    </section>
  )
}

export default OTPForm