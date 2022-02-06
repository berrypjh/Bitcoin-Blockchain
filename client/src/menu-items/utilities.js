import { IconTypography, IconUser, IconWallet, IconCurrencyBitcoin, IconCirclePlus, IconHome, IconBrandTelegram } from '@tabler/icons';

const icons = {
    IconTypography,
    IconUser,
    IconWallet,
    IconCurrencyBitcoin,
    IconCirclePlus,
    IconHome,
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
            icon: icons.IconHome,
            breadcrumbs: false
        },
        {
            id: 'util-Wallet',
            title: '거래내역',
            type: 'item',
            url: '/transaction',
            icon: icons.IconWallet,
            breadcrumbs: false
        },
        {
            id: 'util-Block',
            title: '블록생성',
            type: 'item',
            url: '/block',
            icon: icons.IconCurrencyBitcoin,
            breadcrumbs: false
        },
        {
            id: 'util-peer',
            title: '연결',
            type: 'item',
            url: '/peer',
            icon: icons.IconCirclePlus,
            breadcrumbs: false
        },
    ]
};

export default utilities;
