import type { Provider } from '@supabase/gotrue-js';
import { StripeCheckoutDisplayMode } from '~/lib/stripe/types';

import {
  CreditCardIcon,
  Squares2X2Icon,
  UserGroupIcon,
  UserIcon,
  CircleStackIcon,
} from '@heroicons/react/24/outline';

const production = process.env.NODE_ENV === 'production';

enum Themes {
  Light = 'light',
  Dark = 'dark',
}

const configuration = {
  site: {
    name: 'DeckMatch',
    description:
      'Launch your saas business in minutes with this all-in-one starter kit for Nextjs.',
    themeColor: '#ffffff',
    themeColorDark: '#0a0a0a',
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'All-in-One SaaS Kit by Launch Ready Apps',
    twitterHandle: '',
    githubHandle: 'hiteshgautam',
    convertKitFormId: '',
    locale: process.env.NEXT_PUBLIC_DEFAULT_LOCALE,
    // Supported languages: add more and create folder in public/locales
    languages: ['en', 'es', 'fr'],
    logoUrl: '/assets/images/logo.svg',
  },
  auth: {
    // ensure this is the same as your Supabase project. By default - it's true
    requireEmailConfirmation:
      process.env.NEXT_PUBLIC_REQUIRE_EMAIL_CONFIRMATION === 'true',
    // NB: Enable the providers below in the Supabase Console
    // in your production project
    providers: {
      emailPassword: true,
      phoneNumber: false,
      emailLink: false,
      emailOtp: false,
      oAuth: ['google'] as Provider[],
    },
  },
  production,
  environment: process.env.NEXT_PUBLIC_ENVIRONMENT,
  theme: Themes.Dark,
  features: {
    enableThemeSwitcher: true,
    enableAccountDeletion: getBoolean(
      process.env.NEXT_PUBLIC_ENABLE_ACCOUNT_DELETION,
      false,
    ),
    enableOrganizationDeletion: getBoolean(
      process.env.NEXT_PUBLIC_ENABLE_ORGANIZATION_DELETION,
      false,
    ),
  },
  paths: {
    signIn: '/auth/sign-in',
    signUp: '/auth/sign-up',
    signInMfa: '/auth/verify',
    onboarding: `/onboarding`,
    appPrefix: '/dashboard',
    appHome: '/dashboard',
    authCallback: '/auth/callback',
    settings: {
      profile: 'settings/profile',
      organization: 'settings/organization',
      subscription: 'settings/subscription',
      authentication: 'settings/profile/authentication',
      email: 'settings/profile/email',
      password: 'settings/profile/password',
    },
    tasks: 'tasks',
  },
  sentry: {
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  },
  storage: {
    bucket_name: 'deck-pdf',
  },
  stripe: {
    embedded: true,
    displayMode: StripeCheckoutDisplayMode.Popup,
    products: [
      {
        name: 'Basic',
        description: 'Description of your Basic plan',
        badge: `Up to 10 users`,
        features: [
          'Up to 40 Reports',
          'Up to 10 users',
          'Chat Support',
        ],
        plans: [
          {
            name: 'Monthly',
            price: '$49',
            stripePriceId: 'price_1NNwYHI1i3VnbZTqI2UzaHIe',
          },
          {
            name: 'Yearly',
            price: '$550',
            stripePriceId: 'basic-plan-yr',
          },
        ],
      },
      {
        name: 'Pro',
        badge: `Most Popular`,
        recommended: true,
        description: 'Description of your Pro plan',
        features: [
          'Up to 150 Reporting',
          'Up to 20 users',
          'Chat and Phone Support',
        ],
        plans: [
          {
            name: 'Monthly',
            price: '$149',
            stripePriceId: 'pro-plan-mth',
          },
          {
            name: 'Yearly',
            price: '$1600',
            stripePriceId: 'pro-plan-yr',
          },
        ],
      },
      {
        name: 'Premium',
        description: 'Description of your Premium plan',
        badge: ``,
        features: [
          'Unlimited Reporting',
          'Unlimited users',
          'Account Manager',
        ],
        plans: [
          {
            name: '',
            price: 'Contact us',
            stripePriceId: '',
            label: `common:contactUs`,
            href: `/contact`,
          },
        ],
      },
    ],
  },
};

export default configuration;

// Validate Stripe configuration
// as this is a new requirement, we throw an error if the key is not defined
// in the environment
if (
  configuration.stripe.embedded &&
  production &&
  !process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
) {
  throw new Error(
    'The key NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined. Please add it to your environment variables.',
  );
}

function getBoolean(value: unknown, defaultValue: boolean) {
  if (typeof value === 'string') {
    return value === 'true';
  }

  return defaultValue;
}

type NavigationLink = {
  label: string;
  path: string;
};

// SiteNavigation
export const siteNavigationLinks: NavigationLink[] = [
  // uncomment if you want to support blog
  // {
  //   label: 'common:blog',
  //   path: '/blog',
  // },
  // {
  //   label: 'common:buyNow',
  //   path: 'https://buy.stripe.com/7sIg2X2Qgbrt7KM000',
  // },
  // {
  //   label: 'common:documentation',
  //   path: '/docs',
  // },
  // {
  //   label: 'common:pricing',
  //   path: '/pricing',
  // },
  // {
  //   label: 'common:faq',
  //   path: '/faq',
  // },
];

// Tab Navigation in logged in area
type Divider = {
  divider: true;
};

type NavigationItemLink = {
  label: string;
  path: string;
  Icon: (props: { className: string }) => JSX.Element;
  end?: boolean;
};

type NavigationGroup = {
  label: string;
  collapsible?: boolean;
  collapsed?: boolean;
  children: NavigationItemLink[];
};

type NavigationItem = NavigationItemLink | NavigationGroup | Divider;

type NavigationConfig = {
  items: NavigationItem[];
};

const paths = configuration.paths;

export const NAVIGATION_CONFIG = (organization: string): NavigationConfig => ({
  items: [
    {
      label: 'common:tasksTabLabel',
      path: getPath(organization, 'tasks'),
      Icon: ({ className }: { className: string }) => {
        return <CircleStackIcon className={className} />;
      },
      end: true,
    },
    {
      label: 'common:settingsTabLabel',
      collapsible: false,
      children: [
        {
          label: 'common:profileSettingsTabLabel',
          path: getPath(organization, paths.settings.profile),
          Icon: ({ className }: { className: string }) => {
            return <UserIcon className={className} />;
          },
        },
        {
          label: 'common:organizationSettingsTabLabel',
          path: getPath(organization, paths.settings.organization),
          Icon: ({ className }: { className: string }) => {
            return <UserGroupIcon className={className} />;
          },
        },
        {
          label: 'common:subscriptionSettingsTabLabel',
          path: getPath(organization, paths.settings.subscription),
          Icon: ({ className }: { className: string }) => {
            return <CreditCardIcon className={className} />;
          },
        },
      ],
    },
  ],
});

function getPath(organizationId: string, path: string) {
  const appPrefix = configuration.paths.appPrefix;

  return [appPrefix, organizationId, path].filter(Boolean).join('/');
}

export const SOURCES = [
  {
    value: 'Web/Search',
    label: 'Web/Search',
  },
  {
    value: 'Friend',
    label: 'Friend',
  },
  {
    value: 'Youtube',
    label: 'Youtube',
  },
  {
    value: 'Article',
    label: 'Article',
  },
  {
    value: 'Other',
    label: 'Other',
  },
];
