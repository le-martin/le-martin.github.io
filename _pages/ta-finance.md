---
layout: archive
title: "Interactive BTC Analysis"
permalink: /ta-finance/
author_profile: false
---

<style>
  /* Hide the header/masthead */
  .masthead {
    display: none !important;
  }
  /* Hide the footer */
  .page__footer {
    display: none !important;
  }
  /* Remove top margin/padding for the main content */
  .initial-content {
    padding-top: 0 !important;
  }
  #main {
    padding-top: 0 !important;
    margin-top: 0 !important;
  }
  .page {
    width: 100% !important;
    padding-right: 0 !important;
  }
  .breadcrumb {
    display: none !important;
  }
</style>



<div class="ta-finance-container">
  <p>Interactive technical analysis chart for Bitcoin (BTC-USD) generated using Plotly. 
  It includes indicators such as Moving Averages, Pi Cycle, Fear and Greed, and more.</p>
  
  <iframe 
    src="{{ '/assets/ta_finance/index.html' | relative_url }}" 
    width="100%" 
    height="800px" 
    style="border:none; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);"
    title="Interactive Plotly Chart">
  </iframe>
</div>

<style>
.ta-finance-container {
  margin-top: 20px;
}
</style>
