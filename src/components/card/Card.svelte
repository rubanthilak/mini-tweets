<script lang='ts'>
  let className:string = '';
  export { className as class };
</script>

<div class=" p-4 shadow-xs rounded border-primary-300 border {className}">
  <slot />
</div>