import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useAppDispatch } from "@/hook";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { ArrowLeft, KeyRound, Mail } from "lucide-react";
import heroImage from "@/assets/darrang-clg-anim.png";
import logo from "@/assets/logo.png";
import { login, fetchUser, clearMessages } from "./reducer/authSlice";
import { useNavigate } from "react-router-dom";
import app from "@/firebaseConfig";
import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import axios from "axios";

if (!firebase.apps.length) {
  firebase.initializeApp(app.options);
}
const auth = getAuth(app);

function FirebaseAuthUI() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // UI state
  const [needsExtraInfo, setNeedsExtraInfo] = useState(false);
  const [pendingUser, setPendingUser] = useState<any>(null);
  const [method, setMethod] = useState<"phone" | "google" | "email" | null>(
    null
  );

  // extra info fields
  const [extraPhone, setExtraPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [extraEmail, setExtraEmail] = useState("");
  const [extraName, setExtraName] = useState("");

  // Submit additional info
  const handleExtraSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pendingUser || !method) return;

    const idToken = await pendingUser.getIdToken();

    const payload: any = {
      idToken,
      name:
        method === "phone"
          ? extraName || "User"
          : pendingUser.displayName || "User",
      method,
    };

    if (method === "phone") {
      payload.phone = pendingUser.phoneNumber;
      payload.email = extraEmail;
    } else {
      payload.email = pendingUser.email;
      payload.phone = `${countryCode}${extraPhone}`;
    }

    await dispatch(login(payload)).unwrap();
    await dispatch(fetchUser()).unwrap();
    navigate("/");
  };

  // Initialize FirebaseUI
  useEffect(() => {
    const ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(firebase.auth());

    const uiConfig: firebaseui.auth.Config = {
      signInFlow: "popup",
      signInOptions: [
        {
          provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
          recaptchaParameters: {
            type: "image",
            size: "normal",
          },
          defaultCountry: "IN",
        },
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
      callbacks: {
        signInSuccessWithAuthResult: (authResult) => {
          (async () => {
            const user = authResult.user;
            if (!user) return;
            const idToken = await user.getIdToken();

            const providerId =
              user.providerData[0]?.providerId || "unknown";
            const loginMethod = user.phoneNumber
              ? "phone"
              : providerId.includes("google")
              ? "google"
              : "email";

            // 📞 PHONE LOGIN FLOW
            if (loginMethod === "phone") {
              try {
                const res = await axios.post("http://127.0.0.1:8000/api/check-phone", {
                  phone: user.phoneNumber,
                });

                if (res.data.exists) {
                  await dispatch(
                    login({
                      idToken,
                      phone: user.phoneNumber,
                      method: "phone",
                    })
                  ).unwrap();
                  await dispatch(fetchUser()).unwrap();
                  navigate("/");
                  return;
                } else {
                  // ask name + email
                  setNeedsExtraInfo(true);
                  setMethod("phone");
                  setPendingUser(user);
                  return;
                }
              } catch {
                setNeedsExtraInfo(true);
                setMethod("phone");
                setPendingUser(user);
                return;
              }
            }

            // 📧 GOOGLE OR EMAIL LOGIN FLOW
            if (loginMethod === "google" || loginMethod === "email") {
              try {
                const res = await axios.post("http://127.0.0.1:8000/api/check-phone", {
                  email: user.email,
                });

                if (res.data.phoneMissing) {
                  // ask for phone number
                  setNeedsExtraInfo(true);
                  setMethod(loginMethod);
                  setPendingUser(user);
                  return;
                }
              } catch (e) {
                console.error("Email/Google check failed", e);
              }

              // existing user → login directly
              await dispatch(
                login({
                  idToken,
                  email: user.email,
                  phone: user.phoneNumber || undefined,
                  name: user.displayName || "User",
                  method: loginMethod,
                })
              ).unwrap();

              await dispatch(fetchUser()).unwrap();
              navigate("/");
            }
          })();
          return false;
        },
      },
      tosUrl: "/terms-of-service",
      privacyPolicyUrl: "/privacy-policy",
    };

    ui.start("#firebaseui-auth-container", uiConfig);
    return () => ui.reset();
  }, [dispatch, navigate]);

  // 🔹 Extra Info Step
  if (needsExtraInfo) {
    return (
      <div className="p-4 bg-slate-700 rounded-lg text-white mt-3">
        {method === "phone" ? (
          <>
            <h3 className="text-sm font-semibold mb-2">
              Complete your registration
            </h3>
            <form onSubmit={handleExtraSubmit} className="space-y-2">
              <input
                type="text"
                value={extraName}
                onChange={(e) => setExtraName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full py-2 px-3 rounded bg-slate-600 text-white text-sm focus:ring-2 focus:ring-indigo-500"
                required
              />
              <input
                type="email"
                value={extraEmail}
                onChange={(e) => setExtraEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full py-2 px-3 rounded bg-slate-600 text-white text-sm focus:ring-2 focus:ring-indigo-500"
                required
              />
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded text-sm font-semibold"
              >
                Continue
              </button>
            </form>
          </>
        ) : (
          <>
            <h3 className="text-sm font-semibold mb-2">
              Add your phone number
            </h3>
            <form onSubmit={handleExtraSubmit} className="space-y-2">
              <div className="flex gap-2">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="bg-slate-600 text-white rounded px-2 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="+91">🇮🇳 +91</option>
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+44">🇬🇧 +44</option>
                  <option value="+61">🇦🇺 +61</option>
                  <option value="+971">🇦🇪 +971</option>
                </select>
                <input
                  type="tel"
                  value={extraPhone}
                  onChange={(e) => setExtraPhone(e.target.value)}
                  placeholder="Enter phone number"
                  className="flex-1 py-2 px-3 rounded bg-slate-600 text-white text-sm focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded text-sm font-semibold"
              >
                Continue
              </button>
            </form>
          </>
        )}
      </div>
    );
  }

  return <div id="firebaseui-auth-container" className="mt-2"></div>;
}

// 🔹 Main Auth Page
export default function AuthPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");

  const handleCustomLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    dispatch(clearMessages());

    try {
      await dispatch(login({ email, password, method: "email" })).unwrap();
      await dispatch(fetchUser()).unwrap();
      navigate("/");
    } catch (err: any) {
      if (err === "auth/user-not-found")
        setFormError("No account found with this email.");
      else if (err === "auth/wrong-password")
        setFormError("Incorrect password. Please try again.");
      else setFormError(err || "Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center font-sans p-7">
      <div className="w-full max-w-4xl mx-auto grid lg:grid-cols-2 rounded-xl shadow-xl overflow-hidden mt-10">
        {/* Left Panel */}
        <div
          className="hidden lg:flex flex-col relative text-white"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/60 to-slate-950/80"></div>
          <div className="relative z-10 flex flex-col justify-between h-full p-8">
            <a href="/" className="inline-flex items-center gap-3">
              <img
                src={logo}
                alt="Logo"
                className="w-12 h-12 rounded-full border-2 border-white"
              />
              <span className="text-xl font-extrabold">
                Darrang College Alumni
              </span>
            </a>
            <div className="text-center mt-auto mb-auto">
              <h1 className="text-3xl lg:text-4xl font-bold leading-tight">
                Capturing Moments, Creating Memories
              </h1>
              <p className="mt-3 text-indigo-200 text-base">
                Reconnect with old friends, attend events, and celebrate
                milestones together.
              </p>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="bg-slate-800 p-3 sm:p-3 flex items-center justify-center">
          <div className="w-full max-w-sm">
            <a
              href="/"
              className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors mb-6 text-xs"
            >
              <ArrowLeft size={14} />
              Back to website
            </a>

            <h2 className="text-2xl font-bold text-white mb-1">Welcome Back</h2>
            <p className="mb-4 text-slate-400 text-sm">
              Sign in with Google, Email, or Phone number.
            </p>

            <form onSubmit={handleCustomLogin} className="space-y-2">
              {(formError || error) && (
                <p className="text-center text-rose-400 text-xs">
                  {formError || error}
                </p>
              )}

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-sm py-2 px-3 pl-9 rounded bg-slate-700 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-sm py-2 px-3 pl-9 rounded bg-slate-700 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter password"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 rounded text-white font-semibold text-sm transition-colors"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Log In"}
              </button>
            </form>

            <div className="relative my-2 flex items-center">
              <div className="flex-grow border-t border-slate-600"></div>
              <span className="flex-shrink mx-3 text-slate-400 text-xs">
                Or continue with
              </span>
              <div className="flex-grow border-t border-slate-600"></div>
            </div>

            <div className="flex justify-center">
              <FirebaseAuthUI />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
