import { IconTypography, IconUser, IconWallet, IconCurrencyBitcoin, IconCirclePlus, IconDashboard, IconBrandTelegram } from '@tabler/icons';

const icons = {
    IconTypography,
    IconUser,
    IconWallet,
    IconCurrencyBitcoin,
    IconCirclePlus,
    IconDashboard,
    IconBrandTelegram
};

const utilities = {
    id: 'utilities',
    title: 'Utilities',
    type: 'group',
    children: [
        {
            id: 'default',
            title: '개요',
            type: 'item',
            url: '',
            icon: icons.IconDashboard,
            breadcrumbs: false
        },
        {
            id: 'util-typography',
            title: '보내기',
            type: 'item',
            url: '/user',
            icon: icons.IconBrandTelegram,
            breadcrumbs: false
        },
        {
            id: 'util-Block',
            title: '받기',
            type: 'item',
            url: '/block',
            icon: icons.IconCurrencyBitcoin,
            breadcrumbs: false
        },
        {
            id: 'util-Wallet',
            title: '거래내역',
            type: 'item',
            url: '/wallet',
            icon: icons.IconWallet,
            breadcrumbs: false
        },
        {
            id: 'util-peer',
            title: '연결하기',
            type: 'item',
            url: '/peer',
            icon: icons.IconCirclePlus,
            breadcrumbs: false
        },
    ]
};

export default utilities;
