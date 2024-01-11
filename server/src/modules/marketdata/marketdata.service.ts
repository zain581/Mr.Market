import { Injectable, Logger } from '@nestjs/common';
import * as ccxt from 'ccxt';

@Injectable()
export class MarketdataService {
    private exchange: ccxt.Exchange;
    private exchanges = new Map<string, ccxt.Exchange>();
    private readonly logger = new Logger(MarketdataService.name);
    private activeSubscriptions = new Map<string, boolean>(); // Track active subscriptions


    constructor(
      ) {
        this.initializeExchange();
      }


      private initializeExchange() {
        // Initialize exchanges
        this.exchanges.set('bitfinex',new ccxt.pro.bitfinex({ apiKey: process.env.BITFINEX_API_KEY, secret: process.env.BITFINEX_SECRET}));
        this.exchanges.set('mexc', new ccxt.pro.mexc({ apiKey: process.env.MEXC_API_KEY, secret: process.env.MEXC_SECRET }));
        this.exchanges.set('binance', new ccxt.pro.binance({apiKey:process.env.BINANCE_API_KEY,secret:process.env.BINANCE_SECRET}))
      }
      async getOHLCVData(exchange: string, symbol: string, timeframe: string = '1m', since?: number, limit: number = 30): Promise<any> {
        this.exchange = this.exchanges.get(exchange);
      
        if (!this.exchange || !this.exchange.has.fetchOHLCV) {
          throw new Error('Exchange does not support fetchOHLCV or is not configured.');
        }
        this.logger.log(`Fetching OHLCV data from ${this.exchange.name} for ${symbol}`)
      
        return await this.exchange.fetchOHLCV(symbol, timeframe, since, limit);
      }


      async watchOrderBook(exchangeName: string, symbol: string, onData: (data: any) => void): Promise<void> {
        const exchange = this.exchanges.get(exchangeName);
        if (!exchange || !exchange.has.watchOrderBook) {
            throw new Error(`Exchange ${exchangeName} does not support watchOrderBook or is not configured.`);
        }
        
        const subscriptionKey = `${exchangeName}:${symbol}`;
        this.activeSubscriptions.set(subscriptionKey, true);

        while (this.activeSubscriptions.get(subscriptionKey)) {
            try {
                const orderBook = await exchange.watchOrderBook(symbol);
                onData(orderBook);
            } catch (error) {
                this.logger.error(`Error watching order book for ${symbol} on ${exchangeName}: ${error.message}`);
                await new Promise(resolve => setTimeout(resolve, 900));  // Reconnect after a delay
            }
        }
    }

    unsubscribeOrderBook(exchangeName: string, symbol: string): void {
        const subscriptionKey = `${exchangeName}:${symbol}`;
        this.activeSubscriptions.delete(subscriptionKey);
    }
}