/* 零SEN loading overlay: hides after page load, but not before one lift cycle (MIN_MS). */
(function(){
  var el=document.getElementById('zs-loader'); if(!el) return;
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  var MIN_MS=reduce?400:2400, MAX_MS=7000, t0=performance.now(), closed=false;
  function close(){
    if(closed) return; closed=true;
    el.classList.add('is-done');
    document.documentElement.classList.remove('zs-loading');
    setTimeout(function(){el.hidden=true},700);
  }
  function onLoad(){setTimeout(close, Math.max(0, MIN_MS-(performance.now()-t0)))}
  if(document.readyState==='complete') onLoad(); else window.addEventListener('load', onLoad);
  setTimeout(close, MAX_MS); /* failsafe */
})();
