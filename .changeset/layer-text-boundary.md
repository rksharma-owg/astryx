---
'@astryxdesign/core': patch
---

[fix] Layer content starts with theme body typography and neutral text formatting instead of borrowing page formatting. Scoped visual defaults are isolated where separable; explicit inner visual providers still work. Behavior, accessibility, semantic provider inheritance, themes, and authored overrides remain unchanged. Mixed InputGroup/LayoutArea/Stepper/navigation contexts and Lab Drawer provider inheritance remain intact where safe visual separation is not yet available. Apply intentional typography and visual defaults to layer content rather than the trigger.
@cixzhang
