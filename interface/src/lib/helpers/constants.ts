export const AppName = "HuFi"
export const AppURL = "https://hufi-interface.vercel.app"

export const SHOW_BAR = true
export const BOT_ID = '3fb68263-4f06-476e-83db-503d25d56b93'
export const OAUTH_SCOPE = 'PROFILE:READ ASSETS:READ SNAPSHOTS:READ'
export const MIXIN_MESSENGER_INSTALL = 'https://messenger.mixin.one/install'
export const MIXIN_API_BASE_URL = 'https://api.mixin.one'

export const HUFI_SOCKET_URL = '//bc6e1fa0-3c5a-4235-809c-c4fcc4a5d859.mvg.fi'
export const HUFI_BACKEND_URL = 'https://bc6e1fa0-3c5a-4235-809c-c4fcc4a5d859.mvg.fi:3000'
export const HUMAN_PROTOCOL_GROUP_URL = 'https://mixin.one/apps/5a33fc52-f445-4170-a06a-47f8be94a8f3'

export const SUPPORTED_EXCHANGES = ['binance', 'okx', 'gate', 'lbank', 'mexc', 'bitfinex']
export const SUPPORTED_PAIRS = {
  'binance': [
    'BTC/USDT',
    'ETH/USDT',
    'BNB/USDT',
    'UNI/USDT',
    'CRV/USDT',
    'SOL/USDT',
    'SUI/USDT',
  ],
  'okx': [
    'BTC/USDT',
    'ETH/USDT',
    'BNB/USDT',
    'UNI/USDT',
    'CRV/USDT',
    'SOL/USDT',
    'SUI/USDT',
  ],
}

// Limit needs 12, Market needs 10, use 14 to avoid data loss
export const ORDERBOOK_STREAM_LENGTH = 14
export const LIMIT_ORDERBOOK_LENGTH = 12
export const MARKET_ORDERBOOK_LENGTH = 10
export const LIMIT_ORDERBOOK_HALF_LENGTH = LIMIT_ORDERBOOK_LENGTH/2
export const MARKET_ORDERBOOK_HALF_LENGTH = MARKET_ORDERBOOK_LENGTH/2

export const BTC_UUID = 'c6d0c728-2624-429b-8e0d-d9d19b6592fa'

export const UpColorBg = "bg-green-500"
export const UpColorText = "text-green-600"
export const DownColorBg = "bg-red-500"
export const DownColorText = "text-red-600"
export const FocusUpColorBg = "focus:bg-green-500"
export const FocusDownColorBg = "focus:bg-red-500"

export const CoinsTypeTabs = [ "favorites", "all", "mainstream", "layer1", "layer2", "inscription", "ai", "meme", "defi", "game_fi", "nft" ]

export const maskOption = {
  numeral: true,
  numeralDecimalMark: '.',
  numeralPositiveOnly: true,
  numeralDecimalScale: 8,
  numeralThousandsGroupStyle: 'none'
}