<script lang="ts">
  import { _ } from "svelte-i18n"
  import { onDestroy } from "svelte";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import MixinMenu from "../common/MixinMenu.svelte";
  import { easyAdvancedMode } from "$lib/stores/grow";

  onDestroy(()=>{easyAdvancedMode.set(0)})

  const back = () => {
    // Arbitrage
    if (
      $page.url.pathname.includes('arbitrage/intro') ||
      $page.url.pathname.includes('arbitrage/new/easy')
    ){
      goto('/grow/arbitrage')
      return;
    }
    
    // Market making
    if (
      $page.url.pathname.includes('market_making/intro') ||
      $page.url.pathname.includes('market_making/new/easy/one')
    ){
      goto('/grow/market_making')
      return;
    }
    if ($page.url.pathname.includes('market_making/new/easy/two')){ 
      goto('/grow/market_making/easy/one') 
      return;
    }

    // Base
    if (
      $page.url.pathname.includes('grow/arbitrage') || 
      $page.url.pathname.includes('grow/market_making')
    ){ 
      goto('/grow')
      return;
    }
  }
  $: pageName = $page.url.pathname.includes('arbitrage/intro') ?  $_('about_arbitrage') :
                $page.url.pathname.includes('arbitrage') ?  $_('arbitrage') :
                $page.url.pathname.includes('market_making/intro') ? $_('about_market_making') :
                $page.url.pathname.includes('market_making') ? $_('market_making') :
                $page.url.pathname.includes('auto_invest/intro') ? $_('about_auto_invest') :
                $page.url.pathname.includes('auto_invest') ? $_('auto_invest') : ''
</script>

<div class="flex md:px-0 items-center justify-between py-[4pt] my-[4pt] !h-[36px] !min-h-[36px] mr-[6px]">
  <div class="flex items-center px-4 w-[calc(66pt)] space-x-4">
    <button on:click={()=>{back()}}>
      <!-- Chevron left Icon -->
      <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
    </button>
    {#if pageName}
      <span class="font-bold text-nowrap"> {pageName} </span>
    {/if}
  </div>

  <div class="flex items-center">
    <MixinMenu />
  </div>
</div>