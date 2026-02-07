import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { SessionProvider } from './state/SessionContext';
import { KindKartDataProvider } from './state/KindKartDataContext';
import { NotificationsProvider } from './state/NotificationsContext';
import { ChatProvider } from './state/ChatContext';
import { DeliveriesProvider } from './state/DeliveriesContext';
import { RewardsProvider } from './state/RewardsContext';
import { ChatbotProvider } from './state/ChatbotContext';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import ChatbotWidget from './components/chatbot/ChatbotWidget';

// Public pages
import LandingPage from './pages/public/LandingPage';
import BrowseProductsPublicPage from './pages/public/BrowseProductsPublicPage';
import NGODirectoryPublicPage from './pages/public/NGODirectoryPublicPage';
import HowItWorksPage from './pages/public/HowItWorksPage';
import SafetyGuidelinesPage from './pages/public/SafetyGuidelinesPage';
import TermsOfServicePage from './pages/public/TermsOfServicePage';
import PrivacyPolicyPage from './pages/public/PrivacyPolicyPage';
import ContactUsPage from './pages/public/ContactUsPage';
import LoginPage from './pages/auth/LoginPage';
import SignUpPage from './pages/auth/SignUpPage';

// User pages
import UserHomePage from './pages/user/UserHomePage';
import UserDashboardPage from './pages/user/UserDashboardPage';
import SellProductPage from './pages/user/SellProductPage';
import SellConfirmationPage from './pages/user/SellConfirmationPage';
import MarketplacePage from './pages/user/MarketplacePage';
import ProductDetailPage from './pages/user/ProductDetailPage';
import DonateNeedBoardPage from './pages/user/DonateNeedBoardPage';
import DonatePaymentPage from './pages/user/DonatePaymentPage';
import DonationSuccessPage from './pages/user/DonationSuccessPage';
import DonationCertificatePage from './pages/user/DonationCertificatePage';
import LeaderboardPage from './pages/user/LeaderboardPage';
import UserDeliveriesPage from './pages/user/UserDeliveriesPage';

// User profile pages
import UserProfileViewPage from './pages/profile/user/UserProfileViewPage';
import UserProfileEditPage from './pages/profile/user/UserProfileEditPage';
import UserVerificationStatusPage from './pages/profile/user/UserVerificationStatusPage';
import PaymentMethodsPage from './pages/profile/user/PaymentMethodsPage';
import AddressBookPage from './pages/profile/user/AddressBookPage';
import UserSettingsPage from './pages/profile/user/UserSettingsPage';
import EmergencySupportPage from './pages/profile/user/EmergencySupportPage';

// NGO pages
import NGODashboardPage from './pages/ngo/NGODashboardPage';
import PostRequirementsPage from './pages/ngo/PostRequirementsPage';
import ReceivedDonationsPage from './pages/ngo/ReceivedDonationsPage';
import NGODeliveryTrackingPage from './pages/ngo/NGODeliveryTrackingPage';
import ImpactAnalyticsPage from './pages/ngo/ImpactAnalyticsPage';

// NGO profile pages
import NGOProfilePage from './pages/profile/ngo/NGOProfilePage';
import VerificationDocumentsPage from './pages/profile/ngo/VerificationDocumentsPage';
import NGOBankDetailsPage from './pages/profile/ngo/NGOBankDetailsPage';
import NGOSettingsPage from './pages/profile/ngo/NGOSettingsPage';

// Delivery pages
import AssignedPickupsPage from './pages/delivery/AssignedPickupsPage';
import OngoingDeliveriesPage from './pages/delivery/OngoingDeliveriesPage';
import CompletedDeliveriesPage from './pages/delivery/CompletedDeliveriesPage';
import RouteMapPage from './pages/delivery/RouteMapPage';

// Delivery profile pages
import DeliveryProfilePage from './pages/profile/delivery/DeliveryProfilePage';
import AvailabilityStatusPage from './pages/profile/delivery/AvailabilityStatusPage';
import DeliverySettingsPage from './pages/profile/delivery/DeliverySettingsPage';

// Admin pages
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import UserManagementPage from './pages/admin/UserManagementPage';
import NGOVerificationPage from './pages/admin/NGOVerificationPage';
import ListingsModerationPage from './pages/admin/ListingsModerationPage';
import AdminDeliveriesPage from './pages/admin/AdminDeliveriesPage';
import ReportsAnalyticsPage from './pages/admin/ReportsAnalyticsPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';

// Admin profile pages
import AdminProfilePage from './pages/profile/admin/AdminProfilePage';
import PlatformSettingsPage from './pages/profile/admin/PlatformSettingsPage';

// Shared pages
import PickupSchedulingPage from './pages/shared/PickupSchedulingPage';
import DeliveryTrackingPage from './pages/shared/DeliveryTrackingPage';
import HelpPage from './pages/shared/HelpPage';

// Layout components
import PublicLayout from './components/layout/PublicLayout';
import AuthenticatedLayout from './components/layout/AuthenticatedLayout';

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Toaster />
      <ChatbotWidget />
    </>
  ),
});

// Public routes
const publicRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'public',
  component: PublicLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: '/',
  component: LandingPage,
});

const browseRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: '/browse',
  component: BrowseProductsPublicPage,
});

const ngosRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: '/ngos',
  component: NGODirectoryPublicPage,
});

const howItWorksRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: '/how-it-works',
  component: HowItWorksPage,
});

const safetyRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: '/safety',
  component: SafetyGuidelinesPage,
});

const termsRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: '/terms',
  component: TermsOfServicePage,
});

const privacyRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: '/privacy',
  component: PrivacyPolicyPage,
});

const contactRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: '/contact',
  component: ContactUsPage,
});

const loginRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: '/login',
  component: LoginPage,
});

const signupRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: '/signup',
  component: SignUpPage,
});

// Authenticated routes
const authenticatedRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'authenticated',
  component: AuthenticatedLayout,
});

// User routes
const userHomeRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/user/home',
  component: UserHomePage,
});

const userDashboardRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/user/dashboard',
  component: UserDashboardPage,
});

const sellProductRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/user/sell',
  component: SellProductPage,
});

const sellConfirmationRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/user/sell/confirmation/$listingId',
  component: SellConfirmationPage,
});

const marketplaceRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/user/marketplace',
  component: MarketplacePage,
});

const productDetailRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/user/product/$productId',
  component: ProductDetailPage,
});

const donateNeedBoardRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/user/donate',
  component: DonateNeedBoardPage,
});

const donatePaymentRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/user/donate/payment/$ngoId',
  component: DonatePaymentPage,
});

const donationSuccessRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/user/donate/success/$donationId',
  component: DonationSuccessPage,
});

const donationCertificateRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/user/certificate/$donationId',
  component: DonationCertificatePage,
});

const leaderboardRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/user/leaderboard',
  component: LeaderboardPage,
});

const userDeliveriesRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/user/deliveries',
  component: UserDeliveriesPage,
});

// User profile routes
const userProfileViewRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/user/profile',
  component: UserProfileViewPage,
});

const userProfileEditRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/user/profile/edit',
  component: UserProfileEditPage,
});

const userVerificationRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/user/profile/verification',
  component: UserVerificationStatusPage,
});

const paymentMethodsRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/user/profile/payment-methods',
  component: PaymentMethodsPage,
});

const addressBookRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/user/profile/addresses',
  component: AddressBookPage,
});

const userSettingsRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/user/profile/settings',
  component: UserSettingsPage,
});

const emergencySupportRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/user/profile/emergency',
  component: EmergencySupportPage,
});

// NGO routes
const ngoDashboardRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/ngo/dashboard',
  component: NGODashboardPage,
});

const postRequirementsRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/ngo/requirements/post',
  component: PostRequirementsPage,
});

const receivedDonationsRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/ngo/donations',
  component: ReceivedDonationsPage,
});

const ngoDeliveryTrackingRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/ngo/deliveries',
  component: NGODeliveryTrackingPage,
});

const impactAnalyticsRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/ngo/analytics',
  component: ImpactAnalyticsPage,
});

// NGO profile routes
const ngoProfileRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/ngo/profile',
  component: NGOProfilePage,
});

const verificationDocumentsRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/ngo/profile/documents',
  component: VerificationDocumentsPage,
});

const ngoBankDetailsRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/ngo/profile/bank',
  component: NGOBankDetailsPage,
});

const ngoSettingsRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/ngo/profile/settings',
  component: NGOSettingsPage,
});

// Delivery routes
const assignedPickupsRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/delivery/pickups',
  component: AssignedPickupsPage,
});

const ongoingDeliveriesRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/delivery/ongoing',
  component: OngoingDeliveriesPage,
});

const completedDeliveriesRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/delivery/completed',
  component: CompletedDeliveriesPage,
});

const routeMapRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/delivery/map',
  component: RouteMapPage,
});

// Delivery profile routes
const deliveryProfileRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/delivery/profile',
  component: DeliveryProfilePage,
});

const availabilityStatusRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/delivery/profile/availability',
  component: AvailabilityStatusPage,
});

const deliverySettingsRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/delivery/profile/settings',
  component: DeliverySettingsPage,
});

// Admin routes
const adminDashboardRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/admin/dashboard',
  component: AdminDashboardPage,
});

const userManagementRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/admin/users',
  component: UserManagementPage,
});

const ngoVerificationRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/admin/ngo-verification',
  component: NGOVerificationPage,
});

const listingsModerationRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/admin/listings',
  component: ListingsModerationPage,
});

const adminDeliveriesRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/admin/deliveries',
  component: AdminDeliveriesPage,
});

const reportsAnalyticsRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/admin/reports',
  component: ReportsAnalyticsPage,
});

const adminSettingsRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/admin/settings',
  component: AdminSettingsPage,
});

// Admin profile routes
const adminProfileRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/admin/profile',
  component: AdminProfilePage,
});

const platformSettingsRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/admin/profile/platform',
  component: PlatformSettingsPage,
});

// Shared routes
const pickupSchedulingRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/pickup/schedule',
  component: PickupSchedulingPage,
});

const deliveryTrackingRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/tracking/$trackingId',
  component: DeliveryTrackingPage,
});

const helpRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/help',
  component: HelpPage,
});

const routeTree = rootRoute.addChildren([
  publicRoute.addChildren([
    indexRoute,
    browseRoute,
    ngosRoute,
    howItWorksRoute,
    safetyRoute,
    termsRoute,
    privacyRoute,
    contactRoute,
    loginRoute,
    signupRoute,
  ]),
  authenticatedRoute.addChildren([
    userHomeRoute,
    userDashboardRoute,
    sellProductRoute,
    sellConfirmationRoute,
    marketplaceRoute,
    productDetailRoute,
    donateNeedBoardRoute,
    donatePaymentRoute,
    donationSuccessRoute,
    donationCertificateRoute,
    leaderboardRoute,
    userDeliveriesRoute,
    userProfileViewRoute,
    userProfileEditRoute,
    userVerificationRoute,
    paymentMethodsRoute,
    addressBookRoute,
    userSettingsRoute,
    emergencySupportRoute,
    ngoDashboardRoute,
    postRequirementsRoute,
    receivedDonationsRoute,
    ngoDeliveryTrackingRoute,
    impactAnalyticsRoute,
    ngoProfileRoute,
    verificationDocumentsRoute,
    ngoBankDetailsRoute,
    ngoSettingsRoute,
    assignedPickupsRoute,
    ongoingDeliveriesRoute,
    completedDeliveriesRoute,
    routeMapRoute,
    deliveryProfileRoute,
    availabilityStatusRoute,
    deliverySettingsRoute,
    adminDashboardRoute,
    userManagementRoute,
    ngoVerificationRoute,
    listingsModerationRoute,
    adminDeliveriesRoute,
    reportsAnalyticsRoute,
    adminSettingsRoute,
    adminProfileRoute,
    platformSettingsRoute,
    pickupSchedulingRoute,
    deliveryTrackingRoute,
    helpRoute,
  ]),
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SessionProvider>
        <KindKartDataProvider>
          <NotificationsProvider>
            <ChatProvider>
              <DeliveriesProvider>
                <RewardsProvider>
                  <ChatbotProvider>
                    <RouterProvider router={router} />
                  </ChatbotProvider>
                </RewardsProvider>
              </DeliveriesProvider>
            </ChatProvider>
          </NotificationsProvider>
        </KindKartDataProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
