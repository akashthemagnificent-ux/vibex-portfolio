# Four-Font System: Source Notes

These notes record the source checks completed on 16 August 2026 before the typography update. The site must not embed unlicensed copies from unofficial font-download sites.

| Typeface | Verified source | Verified finding | Implementation decision |
| --- | --- | --- | --- |
| Rosnoc | [Creative Fabrica](https://www.creativefabrica.com/product/rosnoc/) | The listing identifies Letterna as the designer, provides a commercial licence through its subscription, and states that the font can be converted for web use. | Load only after the licensed webfont files are available; preserve `Rosnoc` as the primary CSS face and use a controlled fallback in the interim. |
| PVC Dynasty | [Production Type](https://productiontype.com/font/pvc) | PVC Dynasty is a distinct, purchasable member of the PVC family. Production Type provides trials and sells the Dynasty style from €90. | Load only from a licensed copy supplied through the publisher; preserve `PVC Dynasty` as the primary CSS face and use a controlled fallback in the interim. |
| Eurostyle | [MyFonts / URW Type Foundry](https://www.myfonts.com/collections/eurostile-font-urw/) | The official family is listed as **Eurostile**, designed by Aldo Novarese and published by URW Type Foundry. MyFonts explicitly offers webfont licensing among its purchase choices. | Use the requested `Eurostyle` family name in the technical token, with a geometric fallback until a licensed Eurostyle / Eurostile webfont is supplied. |
| Satoshi | [Fontshare CDN](https://api.fontshare.com/v2/css?f[]=satoshi@700,500,400&display=swap) | The official CSS endpoint returns `Satoshi` declarations for 400, 500, and 700 weights, all with `font-display: swap`. | Import immediately from Fontshare, using only these three weights. |

The CSS will maintain the requested four typeface names as the intended system. Font fallback choices are deliberately confined to the `font-family` stacks so the page remains legible before the licensed specialty font files are connected.
