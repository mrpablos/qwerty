<script>
  let rates = {}
  fetch('https://open.er-api.com/v6/latest/USD', {
    method: 'GET',
  })
  .then(response => response.json())
  .then(result => {
    rates = result.rates;
    console.log(rates);
  })
  let currency = {
    leftInput: 1,
    leftSelect: 1,
    rightInput: 1,
    rightSelect: 1
  }
  function convertData(input, isLeft) {
    let rate = isLeft ? (currency.rightSelect / currency.leftSelect) : (currency.leftSelect / currency.rightSelect);
    return input * rate
  }
</script>

<main>
  <input 
    class='sber-value-input' 
    type='number'
    min="1" 
    bind:value={currency.leftInput} 
    on:change={() => {currency.rightInput = convertData(currency.leftInput, true)}}>
  <select class='sber-currency-selector' 
    bind:value={currency.leftSelect}
    on:change={() => currency.rightInput = convertData(currency.leftInput, true)}>
    {#each Object.entries(rates) as [key, value]}
    <option value={value}>{key}</option>
    {/each}
  </select>
  <input 
    class='sber-value-input' 
    type='number' 
    min="1"
    bind:value={currency.rightInput}
    on:change={() => {currency.leftInput = convertData(currency.rightInput, false)}}>
  <select class='sber-currency-selector' 
    bind:value={currency.rightSelect}
    on:change={() => currency.leftInput = convertData(currency.rightInput, false)}>
    {#each Object.entries(rates) as [key, value]}
    <option value={value}>{key}</option>
    {/each}
  </select>
</main>

<style>
</style>
