# GMail Pop3 Timer Checker
Userscript for [greasemonkey (Firefox)](https://www.greasespot.net/)/
[tampermonkey (Chrome/Chromium)](https://www.tampermonkey.net/) that causes Gmail to check pop3 boxes more frequently.

This was originally based on Daniel Slaughter's [Gmail POP3 Checker](https://www.danielslaughter.com/project/gmailpop3/)
scripts, but was reworked to avoid calls out to a server and be completely self-contained.

Basics are working, it has been tested in two different gmail accounts with chrome/chromium on linux using tampermonkey.

Will perform a check immediately when starting up, then start a 3 minute countdown timer until the next check.

If you want to change the length of the timer, change the `interval` value in the `defaults` section near the top of the
script.