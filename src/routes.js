import Vue from 'vue'
import VueRouter from 'vue-router'

import Landing from './pages/Landing.vue'
import PhotoEditor from './components/dynamic/PhotoEditor.vue'
import Login from './pages/auth/Login.vue'
import Authenticate from './pages/auth/Authenticate.vue'
import Register from './pages/auth/Register.vue'
import Profile from './pages/Profile.vue'
import ProfileVisited from './pages/ProfileVisited.vue'
import Donations from './pages/Donations.vue'
import FundRaiser from './pages/FundRaiser.vue'
import FundRaiserStep1 from './pages/fundraiser/Step1.vue'
import FundRaiserStep2 from './pages/fundraiser/Step2.vue'
import FundRaiserStep3 from './pages/fundraiser/Step3.vue'
import FundRaiserStep4 from './pages/fundraiser/Step4.vue'
import FundRaiserStep5 from './pages/fundraiser/Step5.vue'
import Campaign from './pages/Campaign.vue'
import Donate from './pages/Donate.vue'
import DonationPayment from './pages/DonationPayment.vue'
import CampaignType from './pages/CampaignType.vue'
import Tour from './pages/Tour.vue'
import Faq from './pages/Faq.vue'
import Terms from './pages/Terms.vue'
import AboutUs from './pages/AboutUs.vue'
import SuccessStories from './pages/SuccessStories.vue'
import Pricing from './pages/Pricing.vue'
import BlogSingle from './pages/BlogSingle.vue'
import FundRaisingIdeas from './pages/FundRaisingIdeas.vue'
import FundRaisingArticle from './pages/FundRaisingArticle.vue'
import Support from './pages/Support.vue'
import DashboardIndex from './pages/dashboard/Index.vue'
import Dashboard from './pages/Dashboard.vue'
import DashboardEdit from './pages/dashboard/Edit.vue'
import DashboardShare from './pages/dashboard/Share.vue'
import DashboardEditMedia from './pages/dashboard/edit/Media.vue'
import DashboardEditStory from './pages/dashboard/edit/Story.vue'
import DashboardEditSettings from './pages/dashboard/edit/Settings.vue'
import DashboardReviewDonations from './pages/dashboard/review/Donations.vue'
import DashboardReviewComments from './pages/dashboard/review/Comments.vue'
import DashboardReviewUpdates from './pages/dashboard/review/Updates.vue'
import DashboardSettingsBasic from './pages/dashboard/settings/Basic.vue'
import DashboardSettingsPassword from './pages/dashboard/settings/Password.vue'
import DashboardSettingsCampaigns from './pages/dashboard/settings/Campaigns.vue'
import DashboardSettingsStatus from './pages/dashboard/settings/Status.vue'
import DashboardWithdraw from './pages/dashboard/Withdraw.vue'
import DashboardWithdrawBeneficiary from './pages/dashboard/withdraw/Beneficiary.vue'
import DashboardWithdrawBeneficiaryInvite from './pages/dashboard/withdraw/Invite.vue'
import DashboardWithdrawBeneficiaryIndividual from './pages/dashboard/withdraw/Individual.vue'
import DashboardWithdrawBeneficiaryIndividualGetMoney from './pages/dashboard/withdraw/GetMoney.vue'
import ExceptionCampaign404 from './pages/exceptions/campaigns/404.vue'
import ExceptionCampaign401 from './pages/exceptions/campaigns/401.vue'
import ExceptionCampaign410 from './pages/exceptions/campaigns/410.vue'
import Exception404 from './pages/exceptions/404.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Landing,
      meta: {
        forVisitors: false,
        title: 'FundAndImpact'
      }
    },
    {
      path: '/oauth/authorize',
      component: Authenticate,
      meta: {
        toAuthenticate: true,
      }
    },
    {
      path: '/photo-editor',
      component: PhotoEditor,
      meta: {
        forEditor: true,
        title: 'Photo Editor | FundAndImpact'
      }
    },
    {
      path: '/login',
      component: Login,
      meta: {
        forVisitors: true,
        title: 'Login | FundAndImpact',
        forLogin: true
      }
    },
    {
      path: '/register',
      component: Register,
      meta: {
        forVisitors: true,
        title: 'Get Stated - Create your account and launch a new Campaign | FundAndImpact',
        forRegister: true
      }
    },
    {
      path: '/profile',
      component: Profile,
      meta: {
        forAuth: true,
        title: 'User Profile | FundAndImpact'
      }
    },
    {
      path: '/profile/:id',
      component: ProfileVisited,
      meta: {
        title: 'User Profile | FundAndImpact'
      }
    },
    {
      path: '/donations',
      component: Donations,
      meta: {
        forAuth: true,
        title: 'User Donations | FundAndImpact',
        forCampaign: true
      }
    },
    {
      path: '/faq',
      component: Faq,
      meta: {
        title: 'Frequently Asked Questions | FundAndImpact',
        forCampaign: true
      }
    },
    {
      path: '/terms',
      component: Terms,
      meta: {
        title: 'Terms & Conditions | FundAndImpact',
        forCampaign: true
      }
    },
    {
      path: '/success',
      component: SuccessStories,
      meta: {
        title: 'Success Stories | FundAndImpact',
        forCampaign: true
      }
    },
    {
      path: '/about',
      component: AboutUs,
      meta: {
        title: 'About Us | FundAndImpact',
        forCampaign: true
      }
    },
    {
      path: '/pricing',
      component: Pricing,
      meta: {
        title: 'Pricing and Fees | FundAndImpact',
        forCampaign: true
      }
    },
    {
      path: '/fundraiser',
      component: FundRaiser,
      meta: {
        forAuth: true,
        inRaiser: true,
        title: 'Start Rasing Fund | FundAndImpact'
      }
    },
    {
      path: '/fundraiser/:link/media',
      component: FundRaiserStep1,
      meta: {
        forAuth: true,
        inRaiser: true,
        title: 'Add Photos or Videos to Campaign | FundAndImpact'
      }
    },
    {
      path: '/fundraiser/:link/story',
      component: FundRaiserStep2,
      meta: {
        forAuth: true,
        inRaiser: true,
        title: 'Add your story to Campaign | FundAndImpact'
      }
    },
    {
      path: '/fundraiser/:link/created',
      component: FundRaiserStep3,
      meta: {
        forAuth: true,
        inRaiser: true,
        title: 'Campaign successfully created | FundAndImpact'
      }
    },
    {
      path: '/fundraiser/:link/share',
      component: FundRaiserStep4,
      meta: {
        forAuth: true,
        inRaiser: true,
        title: 'Share your Campaign on social networks | FundAndImpact'
      }
    },
    {
      path: '/fundraiser/:link/link',
      component: FundRaiserStep5,
      meta: {
        forAuth: true,
        inRaiser: true,
        title: 'Copy, paste & share your Campaign link | FundAndImpact'
      }
    },
    {
      path: '/categories/:id',
      component: CampaignType,
      meta: {
        title: 'Types of Capaigns | FundAndImpact',
        forCampaign: true
      }
    },
    {
      path: '/tour',
      component: Tour,
      meta: {
        title: 'How does FundAndImpact Works? | FundAndImpact',
        forCampaign: true
      }
    },
    {
      path: '/ideas',
      component: FundRaisingIdeas,
      meta: {
        title: 'Fund Raising Ideas? | FundAndImpact',
        forCampaign: true
      }
    },
    {
      path: '/blog/:id',
      component: BlogSingle,
      meta: {
        title: 'Our Blog | FundAndImpact',
        forCampaign: true
      }
    },
    {
      path: '/articles/:topic',
      component: FundRaisingIdeas,
      meta: {
        title: 'Fund Raising Ideas? | FundAndImpact',
        forCampaign: true
      }
    },
    {
      path: '/article/:topic/:id',
      component: FundRaisingArticle,
      meta: {
        title: 'Fund Rasing Article | FundAndImpact',
        forCampaign: true
      }
    },
    {
      path: '/faq/:topic',
      component: Faq,
      meta: {
        title: 'Fund Raising Ideas? | FundAndImpact',
        forCampaign: true
      }
    },
    {
      path: '/faq/:topic/:id',
      component: FundRaisingArticle,
      meta: {
        title: 'Fund Rasing Article | FundAndImpact',
        forCampaign: true,
        forFaq: true
      }
    },
    {
      path: '/help',
      component: Support,
      meta: {
        title: 'Help Center | FundAndImpact',
        forHelp: true
      }
    },
    {
      path: '/help/:topic',
      component: Support,
      meta: {
        title: 'Help Center | FundAndImpact',
        forHelp: true
      }
    },
    {
      path: '/dashboard',
      component: Dashboard,
      meta: {
        title: 'Campaign Dashboard | FundAndImpact',
        forDashboard: true
      }
    },
    {
      path: '/dashboard/withdraw',
      component: DashboardWithdraw,
      meta: {
        title: 'Withdraw your Money | FundAndImpact',
        forDashboard: true,
        forWithdraw: true,
      }
    },
    {
      path: '/dashboard/:link',
      component: DashboardIndex,
      meta: {
        title: 'Campaign Dashboard | FundAndImpact',
        forDashboard: true
      }
    },
    {
      path: '/dashboard/:link/edit',
      component: DashboardEdit,
      meta: {
        title: 'Editing your Campaign | FundAndImpact',
        forDashboard: true
      }
    },
    {
      path: '/dashboard/:link/share',
      component: DashboardShare,
      meta: {
        title: 'Share your Campaign | FundAndImpact',
        forDashboard: true
      }
    },
    {
      path: '/dashboard/:link/edit/media',
      component: DashboardEditMedia,
      meta: {
        title: 'Editing your Campaign | FundAndImpact',
        forDashboard: true
      }
    },
    {
      path: '/dashboard/:link/edit/story',
      component: DashboardEditStory,
      meta: {
        title: 'Editing your Campaign | FundAndImpact',
        forDashboard: true
      }
    },
    {
      path: '/dashboard/:link/edit/setting',
      component: DashboardEditSettings,
      meta: {
        title: 'Editing your Campaign | FundAndImpact',
        forDashboard: true
      }
    },
    {
      path: '/dashboard/:link/review/donations',
      component: DashboardReviewDonations,
      meta: {
        title: 'Reviews of Campaign | FundAndImpact',
        forDashboard: true
      }
    },
    {
      path: '/dashboard/:link/review/comments',
      component: DashboardReviewComments,
      meta: {
        title: 'Reviews of Campaign | FundAndImpact',
        forDashboard: true
      }
    },
    {
      path: '/dashboard/:link/review/updates',
      component: DashboardReviewUpdates,
      meta: {
        title: 'Reviews of Campaign | FundAndImpact',
        forDashboard: true
      }
    },
    {
      path: '/dashboard/settings/basic',
      component: DashboardSettingsBasic,
      meta: {
        title: 'Settings | FundAndImpact',
        forDashboard: true
      }
    },
    {
      path: '/dashboard/settings/password',
      component: DashboardSettingsPassword,
      meta: {
        title: 'Settings | FundAndImpact',
        forDashboard: true
      }
    },
    {
      path: '/dashboard/settings/campaigns',
      component: DashboardSettingsCampaigns,
      meta: {
        title: 'Settings | FundAndImpact',
        forDashboard: true
      }
    },
    {
      path: '/dashboard/settings/status',
      component: DashboardSettingsStatus,
      meta: {
        title: 'Settings | FundAndImpact',
        forDashboard: true
      }
    },
    {
      path: '/dashboard/withdraw/beneficiary',
      component: DashboardWithdrawBeneficiary,
      meta: {
        title: 'Who will withdraw your Money? | FundAndImpact',
        forDashboard: true,
        forWithdraw: true,
      }
    },
    {
      path: '/dashboard/withdraw/beneficiary/invite',
      component: DashboardWithdrawBeneficiaryInvite,
      meta: {
        title: 'Invite someone to withdraw your Money? | FundAndImpact',
        forDashboard: true,
        forWithdraw: true,
      }
    },
    {
      path: '/dashboard/withdraw/beneficiary/individual',
      component: DashboardWithdrawBeneficiaryIndividual,
      meta: {
        title: 'Get your Money | FundAndImpact',
        forDashboard: true,
        forWithdraw: true,
      }
    },
    {
      path: '/dashboard/withdraw/beneficiary/individual/get_money',
      component: DashboardWithdrawBeneficiaryIndividualGetMoney,
      meta: {
        title: 'Get your Money | FundAndImpact',
        forDashboard: true,
        forWithdraw: true,
      }
    },
    {
      path: '/:user/:link',
      component: Campaign,
      meta: {
        title: 'Campaign | FundAndImpact',
        campaign: true
      }
    },
    {
      path: '/:user/:link/donate',
      component: Donate,
      meta: {
        title: 'Donate | FundAndImpact',
        forCampaign: true
      }
    },
    {
      path: '/:user/:link/donate/:id/payment',
      component: DonationPayment,
      meta: {
        title: 'Donation Payment | FundAndImpact',
        forCampaign: true
      }
    },
    {
      path: '/logout',
      meta: {
        logout: true
      }
    },
    {
      path: '/:user/:id/404',
      component: ExceptionCampaign404,
      meta: {
        title: 'Campaign Not Found | FundAndImpact',
        for404: true
      }
    },
    {
      path: '/:user/:id/401',
      component: ExceptionCampaign401,
      meta: {
        title: 'Unauthorized | FundAndImpact',
        for401: true
      }
    },
    {
      path: '/:user/:id/410',
      component: ExceptionCampaign410,
      meta: {
        title: 'Unauthorized | FundAndImpact',
        for410: true
      }
    },
    {
      path: '*',
      component: Exception404,
      meta: {
        title: 'Page Not Found | FundAndImpact',
        for404: true
      }
    }
  ],
  linkActiveClass: 'active',
})

export default router
