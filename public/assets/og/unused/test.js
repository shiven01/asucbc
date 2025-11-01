// Lil class reg script
let lastPing= Date.now()

const tolerance = 3000;
let pinging = false;
async function looper() {
    if (pinging) {
        if (Date.now() >= lastPing + tolerance) {
            console.log("[WARN]: No response recieved after 3000ms, repining now")
            lastPing = Date.now()
        }
    }
    pinging = true
    submitAction_win2(document.win2,'DERIVED_SSR_FL_SSR_ENROLL_FL')
    while (!document.getElementById("longmsg")){
        await new Promise(res=>setTimeout(res,10))
    }
    let yap = document.getElementById("longmsg").innerText
    console.log(yap)
    
    if (yap.includes("it is too late/too early to enroll."))
     closeLastModal(null,null,oParentWin);
    pinging=false
    
}