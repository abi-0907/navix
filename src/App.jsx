import { useEffect, useState, lazy, Suspense } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { supabase } from './supabase';
import Signup from './pages/Signup';

// Main pages
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CarbonCalculator from './components/CarbonCalculator';
import GamesPage from './pages/GamesPage';
import TrackleStart from './components/games/Trackle/TrackleStart';

// MRT feature pages
import MRTHome from './pages/MRTHome';
import TrainSchedules from './components/MRT/TrainSchedules';
import MRTFare from './components/MRT/MRTFare';
import MRTMap from './components/MRT/MRTMap';
import MRTDuration from './components/MRT/MRTDuration';
import MRTRoute from './components/MRT/MRTRoute';
import MRTCongestion from './components/MRT/MRTCongestion';
import TravelRoute from './pages/TravelRoute';

// 🚌 Bus feature pages
import BusDashboard from './components/Bus/BusDashboard';
import BusLiveTimings from './components/Bus/BusLiveTimings';
import BusSchedule from './components/Bus/BusSchedule';
import BusFare from './components/Bus/BusFare';
import BusDuration from './components/Bus/BusDuration'; // <-- Add this import!

// Protected route
import ProtectedRoute from './components/ProtectedRoute';

// About and Contact pages
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';

// 🎮 Lazy load the EcoSwipe game
const EcoSwipe = lazy(() => import('./components/games/EcoSwipe/EcoSwipe'));

export default function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Authentication state
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
  }, []);

  // Auto-logout after 30 minutes of inactivity
  useEffect(() => {
    if (!user) return;

    let timer;
    const logout = async () => {
      await supabase.auth.signOut();
      setUser(null);
      navigate('/login');
    };

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(logout, 1800000); // 30 mins
    };

    const activityEvents = [
      'mousemove',
      'keydown',
      'mousedown',
      'click',
      'scroll',
      'touchstart',
      'visibilitychange',
    ];

    activityEvents.forEach(event =>
      window.addEventListener(event, resetTimer)
    );

    resetTimer();

    return () => {
      clearTimeout(timer);
      activityEvents.forEach(event =>
        window.removeEventListener(event, resetTimer)
      );
    };
  }, [user, navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-inter">
      <nav className="border-b border-zinc-800 bg-zinc-900">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-3xl font-orbitron lowercase tracking-wide text-white">
            navix
          </h1>
          <ul className="flex gap-6 text-sm font-medium text-zinc-400 items-center">
            <li>
              <Link to="/" className="hover:text-white transition">Home</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-cyan-400 transition">About Us</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-green-400 transition">Contact Us</Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-white transition">Login</Link>
            </li>
            <li>
              <Link to="/dashboard" className="hover:text-white transition">Dashboard</Link>
            </li>
            {user && (
              <li>
                <button
                  onClick={handleLogout}
                  className="text-sm px-3 py-1 bg-zinc-800 rounded-md hover:bg-zinc-700 transition"
                >
                  Log out
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <Suspense fallback={<div className="text-center text-lg">Loading...</div>}>
          <Routes>
            {/* Main Pages (do not protect Home/Login/Signup/About/Contact) */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Pages */}
            <Route path="/dashboard" element={
              <ProtectedRoute user={user}>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/carbon-calculator" element={
              <ProtectedRoute user={user}>
                <CarbonCalculator />
              </ProtectedRoute>
            } />
            <Route path="/games" element={
              <ProtectedRoute user={user}>
                <GamesPage />
              </ProtectedRoute>
            } />
            <Route path="/games/ecoswipe" element={
              <ProtectedRoute user={user}>
                <EcoSwipe />
              </ProtectedRoute>
            } />
            <Route path="/games/trackle" element={
              <ProtectedRoute user={user}>
                <TrackleStart />
              </ProtectedRoute>
            } />

            {/* MRT Feature Pages (protected) */}
            <Route path="/mrt" element={
              <ProtectedRoute user={user}>
                <MRTHome />
              </ProtectedRoute>
            } />
            <Route path="/mrt/train-schedules" element={
              <ProtectedRoute user={user}>
                <TrainSchedules />
              </ProtectedRoute>
            } />
            <Route path="/mrt/fare" element={
              <ProtectedRoute user={user}>
                <MRTFare />
              </ProtectedRoute>
            } />
            <Route path="/mrt/map" element={
              <ProtectedRoute user={user}>
                <MRTMap />
              </ProtectedRoute>
            } />
            <Route path="/mrt/duration" element={
              <ProtectedRoute user={user}>
                <MRTDuration />
              </ProtectedRoute>
            } />
            <Route path="/mrt/route" element={
              <ProtectedRoute user={user}>
                <MRTRoute />
              </ProtectedRoute>
            } />
            <Route path="/mrt/congestion" element={
              <ProtectedRoute user={user}>
                <MRTCongestion />
              </ProtectedRoute>
            } />
            <Route path="/mrt/travel-route" element={
              <ProtectedRoute user={user}>
                <TravelRoute />
              </ProtectedRoute>
            } />
            <Route path="/pages/MRTHome" element={
              <ProtectedRoute user={user}>
                <MRTHome />
              </ProtectedRoute>
            } />

            {/* 🚌 Bus Feature Pages (protected) */}
            <Route path="/bus" element={
              <ProtectedRoute user={user}>
                <BusDashboard />
              </ProtectedRoute>
            } />
            <Route path="/bus/live" element={
              <ProtectedRoute user={user}>
                <BusLiveTimings />
              </ProtectedRoute>
            } />
            <Route path="/bus/schedule" element={
              <ProtectedRoute user={user}>
                <BusSchedule />
              </ProtectedRoute>
            } />
            <Route path="/bus/fare" element={
              <ProtectedRoute user={user}>
                <BusFare />
              </ProtectedRoute>
            } />
            <Route path="/bus/busDashboard" element={
              <ProtectedRoute user={user}>
                <BusDashboard />
              </ProtectedRoute>
            } />
            <Route path="/bus/duration" element={ // <-- Add this route!
              <ProtectedRoute user={user}>
                <BusDuration />
              </ProtectedRoute>
            } />
          </Routes>
        </Suspense>
      </main>

      {/* Simple footer with About Us and Contact Us */}
      <footer>
        <div className="text-center mt-16 mb-4 text-zinc-400 text-sm">
          <Link to="/about" className="hover:text-cyan-400 underline font-medium">About Us</Link>
          <span className="mx-2 text-zinc-500">|</span>
          <Link to="/contact" className="hover:text-green-400 underline font-medium">Contact Us</Link>
        </div>
      </footer>
    </div>
  );
}
