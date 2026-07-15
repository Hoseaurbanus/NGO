import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ROUTES } from '@constants'
import { AuthProvider } from '@contexts/AuthContext'
import Navbar from '@components/layout/Navbar'
import Footer from '@components/layout/Footer'
import CustomCursor from '@components/ui/CustomCursor'
import PortalLayout from '@components/layout/PortalLayout'

const Home = lazy(() => import('@pages/public/Home'))
const About = lazy(() => import('@pages/public/About'))
const Programs = lazy(() => import('@pages/public/Programs'))
const Projects = lazy(() => import('@pages/public/Projects'))
const Donate = lazy(() => import('@pages/public/Donate'))
const Volunteer = lazy(() => import('@pages/public/Volunteer'))
const Events = lazy(() => import('@pages/public/Events'))
const Blog = lazy(() => import('@pages/public/Blog'))
const Media = lazy(() => import('@pages/public/Media'))
const Contact = lazy(() => import('@pages/public/Contact'))
const FAQ = lazy(() => import('@pages/public/FAQ'))
const Privacy = lazy(() => import('@pages/public/Privacy'))
const Terms = lazy(() => import('@pages/public/Terms'))
const Careers = lazy(() => import('@pages/public/Careers'))
const Login = lazy(() => import('@pages/auth/Login'))
const Register = lazy(() => import('@pages/auth/Register'))
const ForgotPassword = lazy(() => import('@pages/auth/ForgotPassword'))
const NotFound = lazy(() => import('@pages/errors/NotFound'))
const AdminDashboard = lazy(() => import('@pages/admin/Dashboard'))
const AdminPrograms = lazy(() => import('@pages/admin/Programs'))
const AdminProjects = lazy(() => import('@pages/admin/Projects'))
const AdminEvents = lazy(() => import('@pages/admin/Events'))
const AdminUsers = lazy(() => import('@pages/admin/Users'))
const AdminSettings = lazy(() => import('@pages/admin/Settings'))
const PortalDashboard = lazy(() => import('@pages/portal/Dashboard'))
const PortalProfile = lazy(() => import('@pages/portal/Profile'))
const PortalNotifications = lazy(() => import('@pages/portal/Notifications'))
const PortalDonations = lazy(() => import('@pages/portal/Donations'))
const PortalCertificates = lazy(() => import('@pages/portal/Certificates'))
const PortalDownloads = lazy(() => import('@pages/portal/Downloads'))
const PortalActivities = lazy(() => import('@pages/portal/Activities'))

function LoadingScreen() {
  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-primary)',
    }}>
      <div style={{
        width: '48px',
        height: '48px',
        border: '3px solid var(--glass-border)',
        borderTopColor: 'var(--aurora-cyan)',
        borderRadius: '50%',
        animation: 'spin-slow 1s linear infinite',
      }} />
    </div>
  )
}

function PublicLayout({ children }) {
  return (
    <>
      <a href="#main-content" style={{
        position: 'fixed',
        top: '-100%',
        left: '16px',
        zIndex: 10000,
        padding: '12px 24px',
        background: 'var(--aurora-cyan)',
        color: 'var(--bg-primary)',
        fontWeight: 600,
        borderRadius: '0 0 var(--radius-md) var(--radius-md)',
        transition: 'top 0.3s',
      }} onFocus={(e) => { e.target.style.top = '0' }} onBlur={(e) => { e.target.style.top = '-100%' }}>
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" style={{ minHeight: '100vh' }}>
        <Suspense fallback={<LoadingScreen />}>{children}</Suspense>
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <CustomCursor />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path={ROUTES.ABOUT} element={<PublicLayout><About /></PublicLayout>} />
        <Route path={ROUTES.PROGRAMS} element={<PublicLayout><Programs /></PublicLayout>} />
        <Route path={ROUTES.PROJECTS} element={<PublicLayout><Projects /></PublicLayout>} />
        <Route path={ROUTES.DONATE} element={<PublicLayout><Donate /></PublicLayout>} />
        <Route path={ROUTES.VOLUNTEER} element={<PublicLayout><Volunteer /></PublicLayout>} />
        <Route path={ROUTES.EVENTS} element={<PublicLayout><Events /></PublicLayout>} />
        <Route path={ROUTES.BLOG} element={<PublicLayout><Blog /></PublicLayout>} />
        <Route path={ROUTES.MEDIA} element={<PublicLayout><Media /></PublicLayout>} />
        <Route path={ROUTES.CONTACT} element={<PublicLayout><Contact /></PublicLayout>} />
        <Route path={ROUTES.FAQ} element={<PublicLayout><FAQ /></PublicLayout>} />
        <Route path={ROUTES.PRIVACY} element={<PublicLayout><Privacy /></PublicLayout>} />
        <Route path={ROUTES.TERMS} element={<PublicLayout><Terms /></PublicLayout>} />
        <Route path={ROUTES.CAREERS} element={<PublicLayout><Careers /></PublicLayout>} />
        <Route path={ROUTES.LOGIN} element={<PublicLayout><Login /></PublicLayout>} />
        <Route path={ROUTES.REGISTER} element={<PublicLayout><Register /></PublicLayout>} />
        <Route path={ROUTES.FORGOT_PASSWORD} element={<PublicLayout><ForgotPassword /></PublicLayout>} />

        {/* Admin Routes */}
        <Route path={ROUTES.ADMIN} element={<Suspense fallback={<LoadingScreen />}><AdminDashboard /></Suspense>} />
        <Route path={ROUTES.ADMIN_PROGRAMS} element={<Suspense fallback={<LoadingScreen />}><AdminPrograms /></Suspense>} />
        <Route path={ROUTES.ADMIN_PROJECTS} element={<Suspense fallback={<LoadingScreen />}><AdminProjects /></Suspense>} />
        <Route path={ROUTES.ADMIN_EVENTS} element={<Suspense fallback={<LoadingScreen />}><AdminEvents /></Suspense>} />
        <Route path={ROUTES.ADMIN_USERS} element={<Suspense fallback={<LoadingScreen />}><AdminUsers /></Suspense>} />
        <Route path={ROUTES.ADMIN_SETTINGS} element={<Suspense fallback={<LoadingScreen />}><AdminSettings /></Suspense>} />

        {/* Portal Routes */}
        <Route path={ROUTES.PORTAL} element={<PortalLayout />}>
          <Route index element={<Suspense fallback={<LoadingScreen />}><PortalDashboard /></Suspense>} />
          <Route path="profile" element={<Suspense fallback={<LoadingScreen />}><PortalProfile /></Suspense>} />
          <Route path="notifications" element={<Suspense fallback={<LoadingScreen />}><PortalNotifications /></Suspense>} />
          <Route path="donations" element={<Suspense fallback={<LoadingScreen />}><PortalDonations /></Suspense>} />
          <Route path="certificates" element={<Suspense fallback={<LoadingScreen />}><PortalCertificates /></Suspense>} />
          <Route path="downloads" element={<Suspense fallback={<LoadingScreen />}><PortalDownloads /></Suspense>} />
          <Route path="activities" element={<Suspense fallback={<LoadingScreen />}><PortalActivities /></Suspense>} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
      </Routes>
    </AuthProvider>
  )
}
