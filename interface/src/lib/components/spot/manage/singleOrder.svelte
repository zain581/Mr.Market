<script lang="ts">
  import clsx from "clsx"
  import moment from "moment"
  import { _ } from "svelte-i18n"
  import { goto } from "$app/navigation";
  import { cancelOrder } from "$lib/stores/spot";
  // import { formatDecimals } from "$lib/helpers/utils";
  import type { SpotOrder } from "$lib/types/hufi/spot";
  import { findExchangeIconByIdentifier } from "$lib/helpers/helpers";
  import { DownColorText, UpColorText } from "$lib/helpers/constants";

  export let o: SpotOrder = {
    orderId: 'a22170a7-ec32-4718-80f7-c304959c3e42',
    snapshotId: 'd6db8dd2-089c-49df-9df7-01f810d00c27',
    userId: '5da31e04-9a35-43d1-b46f-a6960bcd8e2d',
    exchangeName: 'okx',
    type: 'Limit Buy',
    state: 'ORDER_CREATED',
    symbol: 'BTC/USDT',
    baseAssetId: 'c6d0c728-2624-429b-8e0d-d9d19b6592fa',
    targetAssetId: '43d61dcd-e413-450d-80b8-101d5e903357',
    createdAt: '2019-10-12T07:20:50.52Z',
    updatedAt: '2019-10-12T07:20:50.52Z',

    // symbol: "",
    price: 43576,
    // exchange: "okx",
    // time: "2019-10-12T07:20:50.52Z", 
    // type: "limit",
    // buy: true,
  };
  const redirect = (orderId: string) => { goto(`/spot/history/${orderId}`); }
  $: buy = o.type.toUpperCase().includes('BUY')
</script>

<div class="flex flex-col space-y-3">
  <!-- Title -->
  <div class="flex justify-between">
    <button class="flex items-center space-x-1" on:click={()=>{redirect(o.orderId)}}>
      <div class="avatar">
        <div class="w-4 h-4 rounded-full">
          <img src={findExchangeIconByIdentifier(o.exchangeName)} alt="icon" loading="lazy" class="w-4 h-4" />
        </div>
      </div>
      <span class="font-semibold"> 
        {o.symbol}
      </span>
      <!-- Chevron right Icon -->
      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-xs opacity-60" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
    </button>

    <div class="flex space-x-4 items-center">
      <button class="btn btn-xs rounded-full no-animation" on:click={()=>{cancelOrder(o)}}>
        <span class="text-xs opacity-80"> {$_('cancel_order')} </span>
      </button>
    </div>
  </div>

  <button class="flex flex-col space-y-3" on:click={()=>{redirect(o.orderId)}}>
    <!-- Info and time -->
    <div class="flex items-center justify-between w-full">
      <div class="flex space-x-2">
        <div class={clsx(buy ? "bg-green-100": "bg-red-100" ,"px-2 rounded-md")}>
          <span class={clsx(buy ? "text-green-500": "text-red-500" ,"text-sm capitalize")}>{o.type}</span>
        </div>
      </div>

      <div>
        <span class="text-xs opacity-60"> {moment(o.createdAt).format('YYYY-MM-DD hh:mm:ss')} </span>
      </div>
    </div>

    <!-- Amount and price -->
    <div class="flex space-x-4 justify-between w-full">
      <!-- Circle progress -->
      <!-- FIX: no traded amount field in return value (formatDecimals(o.traded/o.amount*100, 0))-->
      <div class={clsx("radial-progress border border-base-300", buy ? UpColorText : DownColorText)} style={`--value:${0}; --size: 44px; --thickness: 2px;`} role="progressbar">
        <span class="text-sm text-base-content">{0}%</span> 
      </div>
      
      <!-- Price -->
      <div class="flex flex-col justify-center space-y-2">
        <div class="flex items-center text-xs space-x-2 justify-between">
          <span class="opacity-50">
            {$_('amount')}
          </span>
          <span class="">
            0
          </span>
        </div>
        <div class="flex items-center text-xs space-x-2 justify-between">
          <span class="opacity-50">
            {$_('price')}
          </span>
          <span class="">
            {o.price}
          </span>
        </div>
      </div>
    </div>
  </button>
</div>