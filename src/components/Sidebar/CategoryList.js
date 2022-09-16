import HomeIcon from '@mui/icons-material/Home';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import SettingsIcon from '@mui/icons-material/Settings';

export const links = [
    {
        title: 'Main',
        links: [
            {
                id: '1',
                tooltip: 'Home',
                name: 'Home',
                path: 'home',
                icon: <HomeIcon />
            }
        ]
    },
    {
        title: 'Tools',
        links: [
            {
                id: '2',
                tooltip: 'Creator Profile Analytics tool',
                name: 'Influencer Analytics',
                path: 'analytics',
                icon: <AnalyticsIcon />
            },
            {
                id: '3',
                name: 'Fake Follower Checker',
                tooltip: 'Fake Follower Calculator tool',
                path: 'fake-follower-checker',
                icon: <ManageSearchIcon  />
            }
        ]
    },
    {
        title: 'Prices and Settings',
        links: [
            {
                id: '4',
                name: 'Prices and Plans',
                tooltip: 'Pricing and Plans',
                path: 'pricing',
                icon: <LocalOfferIcon />
            },
            {
                id: '5',
                name: 'User Settings',
                path: 'settings',
                tooltip: 'Settings',
                icon: <SettingsIcon />
            }
        ]
    }
];