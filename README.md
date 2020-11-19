## How to use

1) Copy the following code:

```
fetch('https://raw.githubusercontent.com/code-dash/shopify-files-download/main/dist/bundle.js')
  .then(res => res.text())
  .then(res => {
    var script = document.createElement('script');
    script.innerHTML = res;
    document.head.appendChild(script);
  })
```

2) Open your Shopify admin and go to the files page `/admin/settings/files`

3) Open your browser developer console (usually with F12)

4) Paste the code and press enter

5) You should see a new floating button with down arrow at the right.