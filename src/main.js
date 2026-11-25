const app = document.getElementById("app");

app.innerHTML = `
  <main style="
    min-height:100vh;
    background:#050912;
    color:#fff;
    font-family:Arial,sans-serif;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    text-align:center;
    padding:24px;
    box-sizing:border-box;
  ">
    <p style="color:#00eaff;letter-spacing:5px">
      SHADOW EMPIRE
    </p>

    <h1 style="font-size:clamp(32px,8vw,64px)">
      RISE FROM<br>THE SHADOWS
    </h1>

    <p style="color:#aab8cc">
      Forge your destiny.
    </p>

    <p style="
      border:1px solid #00eaff;
      padding:14px 24px;
      border-radius:8px;
      color:#00eaff;
    ">
      WEBSITE LOADED SUCCESSFULLY
    </p>
  </main>
`;
